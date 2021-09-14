const core = require('@actions/core');

async function run() {
  try {
    const title = core.getInput('title', { required: true });
    core.info(`Title: ${title}`);
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
