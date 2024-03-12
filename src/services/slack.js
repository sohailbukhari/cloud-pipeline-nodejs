const axios = require('axios');

const { SLACK_WEBHOOK_URL } = require('../config/keys');

const failure_image = 'https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527121.jpg';
const success_image = 'https://img.freepik.com/free-vector/goal-achievement-planning-checklist-flat-composition-with-man-holding-pencil-tick-image_1284-63673.jpg';

const slackService = {
  notification: async (payload) => {
    const { author, branch, repository, commit, is_success } = payload;

    if (SLACK_WEBHOOK_URL === '' || SLACK_WEBHOOK_URL === undefined) {
      return 'SLACK_WEBHOOK_URL is not defined in .env file. Please define it and try again.';
    }

    const image = is_success ? success_image : failure_image;
    const message = is_success ? 'Deployment Success' : 'Deployment Failed';

    try {
      await axios.post(SLACK_WEBHOOK_URL, {
        blocks: [
          {
            type: 'header',
            text: { type: 'plain_text', text: message, emoji: true },
          },
          {
            type: 'context',
            elements: [
              { type: 'image', image_url: image, alt_text: 'images' },
              { type: 'mrkdwn', text: `Repo: *${repository}*` },
              { type: 'mrkdwn', text: `Branch: *${branch}*` },
            ],
          },
          { type: 'divider' },
          {
            type: 'context',
            elements: [
              { type: 'mrkdwn', text: `*Author* ${author}` },
              { type: 'mrkdwn', text: `*Commit* ${commit}` },
            ],
          },
        ],
      });
    } catch (err) {
      console.log('Slack notification error: ', err);
    }
  },
};

module.exports = slackService;
