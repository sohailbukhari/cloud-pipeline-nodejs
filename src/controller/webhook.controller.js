const { BRANCH } = require('../config/keys');

const init = async (payload) => {
  const { ref, pusher, repository } = payload;
  const { name, html_url } = payload.repository;

  // trigger against specific branch only
  if (!ref.includes(BRANCH)) {
    return console.log('BUILD SKIPPED', { BRANCH: ref });
  }

  // todo
  console.log('BUILD TRIGGERED', { payload });
};

module.exports = { init };
