import axios from 'axios';
import * as core from '@actions/core';
import { Octokit } from '@octokit/rest';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';

import { getAdaptiveCardColorString } from './lib/helpers.js';

(async () => {
  try {
    const {
      GITHUB_REPOSITORY,
      GITHUB_SHA,
      GITHUB_RUN_ID,
      GITHUB_RUN_NUMBER,
      GITHUB_REF,
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

    let messageToPost;
    if (isDeployCard) {
      const { populateCard } = await import('./lib/cards/deploy.js');
      const [owner, repo] = (GITHUB_REPOSITORY || '').split('/');
      const sha = GITHUB_SHA || '';
      const params = { owner, repo, ref: sha };
      const runId = GITHUB_RUN_ID || '';
      const runNum = GITHUB_RUN_NUMBER || '';
      const repoName = `${owner}/${repo}`;
      const repoUrl = `https://github.com/${repoName}`;
      const octokit = new Octokit({ auth: `token ${githubToken}` });
      const commit = await octokit.repos.getCommit(params);
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
    await axios
      .post(teamsWebhookUrl, messageToPost)
      .then(function (response) {
        // console.log(response);
        core.debug(response.data);
      })
      .catch(function (error) {
        // console.log(error);
        core.debug(error);
        throw new Error(error);
      });
  } catch (error: any) {
    console.error(error);
    const { message } = error;
    core.setFailed(message);
  }
})();
