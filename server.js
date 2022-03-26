const express = require('express');

const file = require('./package.json');
const { PORT } = require('./src/config/keys');

const { strict } = require('./src/middleware/auth');

const app = express();

// middlewares
app.use(express.json());

// routes
app.get('/', async (req, res) => {
  res.send({ sucess: true, message: 'PIPELINE ACTIVE', data: { service: file.name, version: file.version, author: file.author, github: file.repository.url } });
});

app.post('/', strict, async (req, res) => {
  const { headers, body } = req;
  console.log({ headers, body });

  res.send({ success: true, message: 'Build Triggered' });
});

// server listening
app.listen(PORT, () => {
  console.log(`Pipeline listening on http://localhost:${PORT}`);
});
