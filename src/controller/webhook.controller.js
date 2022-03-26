const exec = require('child_process').exec;

const { BRANCH, REPO_PATH, EXEC_COMMAND } = require('../config/keys');

const init = async (payload) => {
  const { ref, pusher, repository, deleted } = payload;
  const { name, html_url } = repository;

  // trigger against specific branch only
  if (!ref.includes(BRANCH) || deleted) {
    return console.log('BUILD SKIPPED', { BRANCH: ref });
  }

  // todo - attach your server repo trigger command here
  const command = `cd ${REPO_PATH}/${name} && git pull && ${EXEC_COMMAND}`;
  exec(command);

  console.log('BUILD TRIGGERED', { name, html_url, pusher, command });
};

module.exports = { init };
