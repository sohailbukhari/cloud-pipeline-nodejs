const exec = require('child_process').exec;

const { BRANCH, REPO_PATH, EXEC_COMMAND } = require('../config/keys');

const BRANCHES = BRANCH.split(',');
const MULTI_DEPLOYMENT = BRANCHES.length > 1;

console.log({ MULTI_DEPLOYMENT });

const init = async (payload) => {
  const { ref, pusher, repository, deleted } = payload;
  const { name, html_url } = repository;

  BRANCHES.forEach((Branch) => {
    // trigger against specific branch only
    if (!ref || !ref.includes(Branch) || deleted) {
      return console.log('BUILD SKIPPED', { BRANCH: ref });
    }

    let command = `cd ${REPO_PATH}/${name} && git pull && ${EXEC_COMMAND}`;

    // todo - attach your server repo trigger command here
    if (MULTI_DEPLOYMENT) {
      command = `cd ${REPO_PATH}/${name}-${Branch} && git pull && ${EXEC_COMMAND}`;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`EXEC ERROR: ${error}`);
        return;
      }
      console.log(`STDOUT: ${stdout}`);
      console.error(`STDERR: ${stderr}`);
    });

    console.log('BUILD_TRIGGERED: ', { name, html_url, pusher, command });
  });
};

module.exports = { init };
