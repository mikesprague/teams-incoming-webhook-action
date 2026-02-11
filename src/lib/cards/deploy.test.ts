import type { Endpoints } from '@octokit/types';

import { describe, expect, it } from 'vitest';

import { populateCard } from './deploy.js';

type GetCommitResponse =
  Endpoints['GET /repos/{owner}/{repo}/commits/{ref}']['response'];

describe('deploy card', () => {
  it('builds a deploy payload with links and metadata', () => {
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

    const body = card.attachments[0].content.body;
    const titleText = body[0].items[0].text;
    const detailsText = body[2].text as string;
    const facts = body[3].facts;
    const actions = body[4].actions;

    expect(titleText).toBe('✅ Deploy');
    expect(detailsText).toContain('by Alice (@octo)');
    expect(detailsText).toContain('Mon, 1 Jan 2024 00:00:00 +0000');
    expect(facts[0]).toEqual({ title: 'Branch', value: 'main' });
    expect(facts[1]).toEqual({ title: 'Commit', value: 'sha1234' });
    expect(actions[0].url).toBe(
      'https://github.com/octo-org/octo-repo/actions/runs/99'
    );
    expect(actions[1].url).toBe(
      'https://github.com/octo-org/octo-repo/commit/sha123'
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

    expect(detailsText).toContain('by Unknown');
    expect(detailsText).not.toContain('(@');
  });
});
