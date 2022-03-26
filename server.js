const express = require('express');

const PORT = process.env.PORT || 3838;

const app = express();

app.get('/', async (req, res) => {
  res.send({ success: true, message: 'Pipline Active' });
});

app.listen(PORT, () => {
  console.log(`Pipeline listening on http://localhost:${PORT}`);
});
