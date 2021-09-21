const axios = require('axios').default;
const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/New_York');

const { getHexForColorString } = require('./lib/helpers');

const run = async () => {
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
    const teamsWebhoookUrl = core.getInput('webhook-url', {
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
      }) || '808080';
    const isDeployCard =
      core.getBooleanInput('deploy-card', {
        required: false,
        trimWhitespace: true,
      }) || false;

    const colorString = getHexForColorString(color);

    let messageToPost;
    if (isDeployCard) {
      const { populateCard } = require('./lib/cards/deploy');
      const [owner, repo] = (GITHUB_REPOSITORY || '').split('/');
      const sha = GITHUB_SHA || '';
      const params = { owner, repo, ref: sha };
      const runId = GITHUB_RUN_ID || '';
      const runNum = GITHUB_RUN_NUMBER || '';
      const repoName = `${owner}/${repo}`;
      const repoUrl = `https://github.com/${repoName}`;
      const octokit = new Octokit({ auth: `token ${githubToken}` });
      const commit = await octokit.repos.getCommit(params);
      const branch = GITHUB_REF.split('/')[GITHUB_REF.split('/').length - 1];
      const { author } = commit.data;
      const timestamp = dayjs()
        .tz('America/New_York')
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
      const { populateCard } = require('./lib/cards/simple');
      messageToPost = populateCard({
        title,
        message,
        color: colorString,
      });
    }
    await axios
      .post(teamsWebhoookUrl, messageToPost)
      .then(function (response) {
        // console.log(response);
        core.debug(response.data);
      })
      .catch(function (error) {
        // console.log(error);
        core.debug(error);
        throw new Error(error);
      });
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
