const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3838,
  SECRET: process.env.SECRET || 'admin',
  BRANCH: 'main',
};
