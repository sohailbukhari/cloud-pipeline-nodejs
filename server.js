const express = require('express');

const WebhookController = require('./src/controller/webhook.controller');
const { strict } = require('./src/middleware/auth');

const file = require('./package.json');
const { PORT } = require('./src/config/keys');

const app = express();

// middlewares
app.use(express.json());

// webhook route
app.post('/', strict, async (req, res) => {
  WebhookController.init(req.body);
  res.send({ success: true, message: 'Build Triggered' });
});

// heartbeat
app.get('*', async (req, res) => {
  res.send({ sucess: true, message: 'PIPELINE ACTIVE', data: { service: file.name, version: file.version, author: file.author, github: file.repository.url } });
});

// server listening
app.listen(PORT, () => {
  console.log(`Pipeline listening on http://localhost:${PORT}`);
});
