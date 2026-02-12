import type { Endpoints } from '@octokit/types';

import { describe, expect, it } from 'vitest';

import { populateCard } from './deploy.js';

type GetCommitResponse =
  Endpoints['GET /repos/{owner}/{repo}/commits/{ref}']['response'];

describe('deploy card', () => {
  it('builds a deploy payload with links and metadata', () => {
    const commit = {
      data: {
        commit: {
          author: { name: 'Alice' },
          message: 'Fix deployment\n\nBody text',
        },
        html_url: 'https://github.com/octo-org/octo-repo/commit/sha123',
      },
    } as unknown as GetCommitResponse;
    const author = { login: 'octo' } as GetCommitResponse['data']['author'];

    const card = populateCard({
      title: 'Deploy',
      color: 'good',
      message: 'Deployment started',
      commit,
      branch: 'main',
      author,
      runNum: '7',
      runId: '99',
      repoName: 'octo-org/octo-repo',
      sha: 'sha123456789',
      repoUrl: 'https://github.com/octo-org/octo-repo',
      showCommitMessage: true,
      timestamp: 'Mon, 1 Jan 2024 00:00:00 +0000',
    });

    const body = card.attachments[0].content.body;
    const titleText = body[0].items[0].text;
    const messageText = body[1].text as string;
    const workflowText = body[2].text as string;
    const detailsText = body[3].text as string;
    const branchText = body[4].items[0].columns[1].items[0].text as string;
    const commitText = body[4].items[0].columns[1].items[1].text as string;

    expect(titleText).toBe('✅ Deploy');
    expect(messageText).toBe('Deployment started');
    expect(workflowText).toContain('Workflow Run #7');
    expect(workflowText).toContain(
      '(https://github.com/octo-org/octo-repo/actions/runs/99)'
    );
    expect(workflowText).toContain('octo-org/octo-repo');
    expect(detailsText).toContain('by **Alice**');
    expect(detailsText).toContain('[**@octo**](https://github.com/octo)');
    expect(detailsText).toContain('Mon, 1 Jan 2024 00:00:00 +0000');
    expect(branchText).toBe(
      '[**main**](https://github.com/octo-org/octo-repo/tree/main)'
    );
    expect(commitText).toBe(
      '[**sha1234**](https://github.com/octo-org/octo-repo/commit/sha123)' +
        ' - Fix deployment'
    );
  });

  it('omits the commit message when the flag is disabled', () => {
    const commit = {
      data: {
        commit: {
          author: { name: 'Alice' },
          message: 'Fix deployment\n\nBody text',
        },
        html_url: 'https://github.com/octo-org/octo-repo/commit/sha123',
      },
    } as unknown as GetCommitResponse;
    const author = { login: 'octo' } as GetCommitResponse['data']['author'];

    const card = populateCard({
      title: 'Deploy',
      color: 'good',
      commit,
      branch: 'main',
      author,
      runNum: '7',
      runId: '99',
      repoName: 'octo-org/octo-repo',
      sha: 'sha123456789',
      repoUrl: 'https://github.com/octo-org/octo-repo',
      showCommitMessage: false,
      timestamp: 'Mon, 1 Jan 2024 00:00:00 +0000',
    });

    const commitText = card.attachments[0].content.body[3].items[0].columns[1]
      .items[1].text as string;

    expect(commitText).toBe(
      '[**sha1234**](https://github.com/octo-org/octo-repo/commit/sha123)'
    );
  });

  it('omits commit message when it is empty', () => {
    const commit = {
      data: {
        commit: { author: { name: 'Alice' }, message: '' },
        html_url: 'https://github.com/octo-org/octo-repo/commit/sha123',
      },
    } as unknown as GetCommitResponse;
    const author = { login: 'octo' } as GetCommitResponse['data']['author'];

    const card = populateCard({
      title: 'Deploy',
      color: 'good',
      commit,
      branch: 'main',
      author,
      runNum: '7',
      runId: '99',
      repoName: 'octo-org/octo-repo',
      sha: 'sha123456789',
      repoUrl: 'https://github.com/octo-org/octo-repo',
      showCommitMessage: true,
      timestamp: 'Mon, 1 Jan 2024 00:00:00 +0000',
    });

    const commitText = card.attachments[0].content.body[3].items[0].columns[1]
      .items[1].text as string;

    expect(commitText).toBe(
      '[**sha1234**](https://github.com/octo-org/octo-repo/commit/sha123)'
    );
  });

  it('handles missing author details', () => {
    const commit = {
      data: {
        commit: { author: undefined },
        html_url: 'https://github.com/octo-org/octo-repo/commit/sha123',
      },
    } as unknown as GetCommitResponse;

    const card = populateCard({
      title: 'Deploy',
      color: 'warning',
      commit,
      branch: undefined,
      author: null,
      runNum: '7',
      runId: '99',
      repoName: 'octo-org/octo-repo',
      sha: 'sha123456789',
      repoUrl: 'https://github.com/octo-org/octo-repo',
      timestamp: 'Mon, 1 Jan 2024 00:00:00 +0000',
    });

    const detailsText = card.attachments[0].content.body[2].text as string;

    expect(detailsText).toContain('by **Unknown**');
    expect(detailsText).not.toContain('[**@');
  });

  it('renders bot authors without profile links', () => {
    const commit = {
      data: {
        commit: { author: { name: 'Dependabot' } },
        html_url: 'https://github.com/octo-org/octo-repo/commit/sha123',
      },
    } as unknown as GetCommitResponse;
    const author = {
      login: 'dependabot[bot]',
    } as GetCommitResponse['data']['author'];

    const card = populateCard({
      title: 'Deploy',
      color: 'good',
      commit,
      branch: 'main',
      author,
      runNum: '7',
      runId: '99',
      repoName: 'octo-org/octo-repo',
      sha: 'sha123456789',
      repoUrl: 'https://github.com/octo-org/octo-repo',
      timestamp: 'Mon, 1 Jan 2024 00:00:00 +0000',
    });

    const detailsText = card.attachments[0].content.body[2].text as string;

    expect(detailsText).toContain('by **Dependabot**');
    expect(detailsText).toContain('(**@dependabot[bot]**)');
    expect(detailsText).not.toContain('https://github.com/dependabot');
  });

  it('skips the message block when not provided', () => {
    const commit = {
      data: {
        commit: { author: { name: 'Alice' } },
        html_url: 'https://github.com/octo-org/octo-repo/commit/sha123',
      },
    } as unknown as GetCommitResponse;
    const author = { login: 'octo' } as GetCommitResponse['data']['author'];

    const card = populateCard({
      title: 'Deploy',
      color: 'good',
      commit,
      branch: 'main',
      author,
      runNum: '7',
      runId: '99',
      repoName: 'octo-org/octo-repo',
      sha: 'sha123456789',
      repoUrl: 'https://github.com/octo-org/octo-repo',
      timestamp: 'Mon, 1 Jan 2024 00:00:00 +0000',
    });

    const workflowText = card.attachments[0].content.body[1].text as string;

    expect(workflowText).toContain('Workflow Run #7');
  });
});
