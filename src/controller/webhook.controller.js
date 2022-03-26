const exec = require('child_process').exec;
const { BRANCH } = require('../config/keys');

const REPO_PATH = '~/source';

const init = async (payload) => {
  const { ref, pusher, repository, deleted } = payload;
  const { name, html_url } = repository;

  // trigger against specific branch only
  if (!ref.includes(BRANCH) || deleted) {
    return console.log('BUILD SKIPPED', { BRANCH: ref });
  }

  // todo - attach your server repo trigger command here
  exec(`cd ${REPO_PATH}/${name} && git pull && npm run build && npm run start`);

  console.log('BUILD TRIGGERED', { name, html_url, pusher });
};

module.exports = { init };
