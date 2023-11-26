const express = require('express');
const cors = require('cors');
const http = require('http');
const crawl = require('./crawl');
const bodyParser = require('body-parser');

// setup the port our backend app will run on
const PORT = 3000;
const NEW_MESSAGE_EVENT = 'new-message-event';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());

app.post('/crawl', async (req, res) => {
  const data = await crawl(req.body.keywords || []);
  return res.json(data);
});

server.listen(PORT, async () => {
  console.log(`listening on *:${PORT}`);
});
