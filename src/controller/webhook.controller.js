const exec = require('child_process').exec;
const slackService = require('../services/slack');

const { BRANCH, REPO_PATH, EXEC_COMMAND } = require('../config/keys');

const BRANCHES = BRANCH.split(',');
const MULTI_DEPLOYMENT = BRANCHES.length > 1;

const init = async (payload) => {
  const { push, repository, actor } = payload;

  if (!push) {
    return console.log('BUILD SKIPPED', { REASON: 'NO_PUSH', repository: repository.name });
  }

  const branch = push.changes[0].new.name;
  const message = push.changes[0].new.target.message;

  const name = repository.name;
  const html_url = repository.links.html.href;

  const pusher = actor.display_name;

  console.log({ branch, message, name, html_url, pusher });

  const slack_payload = {
    author: pusher,
    branch: branch,
    repository: name,
    commit: message,
    is_success: true,
  };

  BRANCHES.forEach((Branch) => {
    // trigger against specific branch only
    if (Branch !== branch) {
      return console.log('BUILD SKIPPED', { BRANCH: branch });
    }

    let command = `cd ${REPO_PATH}/${name} && git pull && ${EXEC_COMMAND}`;

    // todo - attach your server repo trigger command here
    if (MULTI_DEPLOYMENT) {
      command = `cd ${REPO_PATH}/${name}-${Branch} && git pull && ${EXEC_COMMAND}`;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`EXEC ERROR: ${error}`);
        slack_payload.is_success = false;
        slackService.notification(slack_payload);
        return;
      }

      slackService.notification(slack_payload);
      console.log(`STDOUT: ${stdout}`);
      console.error(`STDERR: ${stderr}`);
    });

    console.log('BUILD_TRIGGERED: ', { name, html_url, pusher, command });
  });
};

module.exports = { init };
