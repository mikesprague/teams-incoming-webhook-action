import * as core from '@actions/core';
import { Octokit } from '@octokit/rest';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import fetch from 'node-fetch';

import { getAdaptiveCardColorString } from './lib/helpers.js';

interface TeamsMessage {
  type: string;
  attachments: Array<{
    contentType: string;
    content: Record<string, unknown>;
  }>;
}

try {
  const {
    GITHUB_API_URL,
    GITHUB_REF,
    GITHUB_REPOSITORY,
    GITHUB_RUN_ID,
    GITHUB_RUN_NUMBER,
    GITHUB_SERVER_URL,
    GITHUB_SHA,
  } = process.env;
  const githubToken = core.getInput('github-token', {
    required: true,
    trimWhitespace: true,
  });
  const teamsWebhookUrl = core.getInput('webhook-url', {
    required: true,
    trimWhitespace: true,
  });
  const title = core.getInput('title', {
    required: true,
    trimWhitespace: true,
  });
  const message =
    core.getInput('message', {
      required: false,
      trimWhitespace: true,
    }) || '';
  const color =
    core.getInput('color', {
      required: false,
      trimWhitespace: true,
    }) || 'default';
  const isDeployCard =
    core.getBooleanInput('deploy-card', {
      required: false,
      trimWhitespace: true,
    }) || false;
  const timezoneString =
    core.getInput('timezone', {
      required: false,
      trimWhitespace: true,
    }) || 'America/New_York';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault(timezoneString);

  const colorString = getAdaptiveCardColorString(color);

  let messageToPost: TeamsMessage;
  if (isDeployCard) {
    const { populateCard } = await import('./lib/cards/deploy.js');
    const [owner, repo] = (GITHUB_REPOSITORY ?? '').split('/');
    const sha = GITHUB_SHA ?? '';
    const params = { owner, repo, ref: sha };
    const runId = GITHUB_RUN_ID ?? '';
    const runNum = GITHUB_RUN_NUMBER ?? '';
    const repoName = `${owner}/${repo}`;
    const repoUrl = `${GITHUB_SERVER_URL}/${repoName}`;
    const octokit = new Octokit({
      auth: `token ${githubToken}`,
      baseUrl: GITHUB_API_URL || 'https://api.github.com',
      request: { fetch },
    });
    const commit = await octokit.rest.repos.getCommit(params);
    const branch = GITHUB_REF?.split('/')[GITHUB_REF.split('/').length - 1];
    const { author } = commit.data;
    const timestamp = dayjs()
      .tz(timezoneString)
      .format('ddd, D MMM YYYY hh:mm:ss Z');

    messageToPost = populateCard({
      title,
      color: colorString,
      commit,
      branch,
      author,
      runNum,
      runId,
      repoName,
      sha,
      repoUrl,
      timestamp,
    });
  } else {
    const { populateCard } = await import('./lib/cards/simple.js');
    messageToPost = populateCard({
      title,
      text: message,
      color: colorString,
    });
  }
  const response = await fetch(teamsWebhookUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(messageToPost),
  });

  const responseText = await response.text();
  let responseData: unknown = responseText;
  if (responseText) {
    try {
      responseData = JSON.parse(responseText) as unknown;
    } catch {
      responseData = responseText;
    }
  }

  if (!response.ok) {
    core.debug(responseData as string);
    throw new Error(responseText || `Request failed: ${response.status}`);
  }

  core.debug(responseData as string);
} catch (error: unknown) {
  console.error(error);
  const { message } = error as Error;
  core.setFailed(message);
}
