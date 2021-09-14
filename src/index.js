const core = require('@actions/core');

async function run() {
  try {
    const title = core.getInput('title', {
      trimWhitespace: true,
      required: true,
    });
    const message = core.getInput('message', {
      trimWhitespace: true,
      required: false,
    });
    core.info(`Title: ${title}`);
    core.info(`Message: ${message}`);
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
