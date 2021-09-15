const core = require('@actions/core');

async function run() {
  try {
    const isDeployCard =
      core.getBooleanInput('is-deploy-card', {
        required: false,
        trimWhitespace: true,
      }) || false;
    const title = core.getInput('title', {
      required: true,
      trimWhitespace: true,
    });
    const message = core.getInput('message', {
      required: false,
      trimWhitespace: true,
    });
    const color =
      core.getInput('color', {
        required: false,
        trimWhitespace: true,
      }) || '17a2b8';
    core.info(`isDeployCard: ${isDeployCard}`);
    core.info(`Title: ${title}`);
    core.info(`Message: ${message}`);
    core.info(`Color: ${color}`);
    // core.info(`Waiting ${ms} milliseconds ...`);
    // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    // core.debug((new Date()).toTimeString());
    // core.info((new Date()).toTimeString());
    // core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
