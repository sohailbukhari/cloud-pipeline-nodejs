const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3838,
  SECRET: process.env.SECRET || 'admin',
  BRANCH: process.env.BRANCH || 'main',
  REPO_PATH: process.env.REPO_PATH || '~/source',
  EXEC_COMMAND: process.env.EXEC_COMMAND || 'npm run start',
  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || '',
};
