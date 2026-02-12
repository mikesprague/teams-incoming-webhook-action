import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type FetchResponse = {
  ok: boolean;
  status: number;
  text: () => Promise<string>;
};

const mocks = vi.hoisted(() => {
  const getInput = vi.fn();
  const getBooleanInput = vi.fn();
  const setFailed = vi.fn();
  const debug = vi.fn();
  const fetch = vi.fn();
  const getCommit = vi.fn();
  const populateSimple = vi.fn();
  const populateDeploy = vi.fn();

  const Octokit = vi.fn(function OctokitMock() {
    return {
      rest: {
        repos: {
          getCommit,
        },
      },
    };
  });

  return {
    core: { getInput, getBooleanInput, setFailed, debug },
    fetch,
    getCommit,
    populateSimple,
    populateDeploy,
    Octokit,
  };
});

vi.mock('@actions/core', () => ({
  getInput: mocks.core.getInput,
  getBooleanInput: mocks.core.getBooleanInput,
  setFailed: mocks.core.setFailed,
  debug: mocks.core.debug,
}));

vi.mock('node-fetch', () => ({
  default: mocks.fetch,
}));

vi.mock('@octokit/rest', () => ({
  Octokit: mocks.Octokit,
}));

vi.mock('./lib/cards/simple.js', () => ({
  populateCard: mocks.populateSimple,
}));

vi.mock('./lib/cards/deploy.js', () => ({
  populateCard: mocks.populateDeploy,
}));

const originalEnv = process.env;
let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

const makeResponse = (
  body: string,
  ok = true,
  status = 200
): FetchResponse => ({
  ok,
  status,
  text: vi.fn(async () => body),
});

const setInputs = (inputs: Record<string, string>) => {
  mocks.core.getInput.mockImplementation((name: string) => {
    return inputs[name] ?? '';
  });
  mocks.core.getBooleanInput.mockImplementation((name: string) => {
    return inputs[name] === 'true';
  });
};

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.stubGlobal('fetch', mocks.fetch);
  consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  process.env = {
    ...originalEnv,
    GITHUB_API_URL: 'https://api.github.com',
    GITHUB_REF: 'refs/heads/main',
    GITHUB_REPOSITORY: 'octo-org/octo-repo',
    GITHUB_RUN_ID: '1234',
    GITHUB_RUN_NUMBER: '56',
    GITHUB_SERVER_URL: 'https://github.com',
    GITHUB_SHA: 'sha123',
  } as NodeJS.ProcessEnv;
});

afterEach(() => {
  process.env = originalEnv;
  consoleErrorSpy.mockRestore();
  vi.unstubAllGlobals();
});

describe('index', () => {
  it('posts a simple card using fetch', async () => {
    setInputs({
      'github-token': 'token',
      'webhook-url': 'https://hooks.example.test',
      title: 'Hello',
      message: 'World',
      color: 'success',
      timezone: 'America/New_York',
    });

    const messageToPost = { type: 'message', attachments: [] };
    mocks.populateSimple.mockReturnValue(messageToPost);
    mocks.fetch.mockResolvedValue(makeResponse('{"ok":true}'));

    await import('./index.js');

    expect(mocks.populateSimple).toHaveBeenCalledWith({
      title: 'Hello',
      text: 'World',
      titleSize: 'Default',
      color: 'Good',
    });
    expect(mocks.fetch).toHaveBeenCalledWith(
      'https://hooks.example.test',
      expect.objectContaining({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(messageToPost),
      })
    );
    expect(mocks.core.setFailed).not.toHaveBeenCalled();
  });

  it('posts a deploy card and fetches commit data', async () => {
    setInputs({
      'github-token': 'token',
      'webhook-url': 'https://hooks.example.test',
      title: 'Deploy',
      'deploy-card': 'true',
      'show-commit-message': 'true',
      color: 'accent',
      timezone: 'UTC',
    });

    const messageToPost = { type: 'message', attachments: [] };
    mocks.populateDeploy.mockReturnValue(messageToPost);
    mocks.getCommit.mockResolvedValue({ data: { author: { name: 'A' } } });
    mocks.fetch.mockResolvedValue(makeResponse(''));

    await import('./index.js');

    expect(mocks.Octokit).toHaveBeenCalledWith(
      expect.objectContaining({
        auth: 'token token',
        baseUrl: 'https://api.github.com',
        request: { fetch: mocks.fetch },
      })
    );
    expect(mocks.getCommit).toHaveBeenCalledWith({
      owner: 'octo-org',
      repo: 'octo-repo',
      ref: 'sha123',
    });
    expect(mocks.populateDeploy).toHaveBeenCalledWith(
      expect.objectContaining({
        showCommitMessage: true,
      })
    );
    expect(mocks.fetch).toHaveBeenCalledWith(
      'https://hooks.example.test',
      expect.objectContaining({
        body: JSON.stringify(messageToPost),
      })
    );
  });

  it('uses default API URL and handles missing env values', async () => {
    setInputs({
      'github-token': 'token',
      'webhook-url': 'https://hooks.example.test',
      title: 'Deploy',
      'deploy-card': 'true',
    });

    delete process.env.GITHUB_API_URL;
    delete process.env.GITHUB_REF;
    delete process.env.GITHUB_REPOSITORY;
    delete process.env.GITHUB_RUN_ID;
    delete process.env.GITHUB_RUN_NUMBER;
    delete process.env.GITHUB_SHA;

    const messageToPost = { type: 'message', attachments: [] };
    mocks.populateDeploy.mockReturnValue(messageToPost);
    mocks.getCommit.mockResolvedValue({ data: { author: { name: 'A' } } });
    mocks.fetch.mockResolvedValue(makeResponse(''));

    await import('./index.js');

    expect(mocks.Octokit).toHaveBeenCalledWith(
      expect.objectContaining({
        baseUrl: 'https://api.github.com',
      })
    );
    expect(mocks.populateDeploy).toHaveBeenCalledWith(
      expect.objectContaining({
        branch: undefined,
        repoName: '/undefined',
        runId: '',
        runNum: '',
        sha: '',
      })
    );
  });

  it('logs non-JSON webhook responses', async () => {
    setInputs({
      'github-token': 'token',
      'webhook-url': 'https://hooks.example.test',
      title: 'Hello',
      message: 'World',
    });

    mocks.populateSimple.mockReturnValue({
      type: 'message',
      attachments: [],
    });
    mocks.fetch.mockResolvedValue(makeResponse('ok-but-not-json'));

    await import('./index.js');

    expect(mocks.core.debug).toHaveBeenCalledWith('ok-but-not-json');
  });

  it('fails the action when the webhook responds with an error', async () => {
    setInputs({
      'github-token': 'token',
      'webhook-url': 'https://hooks.example.test',
      title: 'Oops',
      message: 'Fail',
    });

    mocks.populateSimple.mockReturnValue({ type: 'message', attachments: [] });
    mocks.fetch.mockResolvedValue(makeResponse('bad request', false, 400));

    await import('./index.js');

    expect(mocks.core.setFailed).toHaveBeenCalledWith('bad request');
  });

  it('uses status message when error response is empty', async () => {
    setInputs({
      'github-token': 'token',
      'webhook-url': 'https://hooks.example.test',
      title: 'Oops',
      message: 'Fail',
    });

    mocks.populateSimple.mockReturnValue({
      type: 'message',
      attachments: [],
    });
    mocks.fetch.mockResolvedValue(makeResponse('', false, 500));

    await import('./index.js');

    expect(mocks.core.setFailed).toHaveBeenCalledWith('Request failed: 500');
  });
});
