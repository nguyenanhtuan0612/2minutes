const express = require('express');
const cors = require('cors');
const http = require('http');
const crawl = require('./crawl');
const bodyParser = require('body-parser');
const { dbConnect } = require('./sequelize');
const schedule = require('node-schedule');
const wpapi = require('./wpapi');

// setup the port our backend app will run on
const PORT = 3004;
const NEW_MESSAGE_EVENT = 'new-message-event';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());

app.post('/addSite', async (req, res) => {
  const data = await crawl.addSite(req.body.site, req.body.username, req.body.password);
  return res.json(data);
});

app.get('/listSite', async (req, res) => {
  const data = await crawl.listSite(req.query.offset);
  return res.json(data);
});

app.put('/updateSite/:id', async (req, res) => {
  const data = await crawl.updateSite(req.params.id, req.body.site, req.body.username, req.body.password);
  return res.json(data);
});

app.delete('/deleteSite', async (req, res) => {
  const data = await crawl.deleteSite(req.query.id);
  return res.json(data);
});

app.post('/addKeyword', async (req, res) => {
  const data = await crawl.addKeyword(req.body.siteId, req.body.keywords, req.body.categoryId);
  return res.json(data);
});

app.delete('/deleteKeyword/:id', async (req, res) => {
  const data = await crawl.deleteKeyword(req.params.id);
  return res.json(data);
});

app.get('/listKeyword/:id', async (req, res) => {
  const data = await crawl.listKeyword(req.params.id);
  return res.json(data);
});

app.get('/listCategories/:id', async (req, res) => {
  const data = await wpapi.listCategories(req.params.id);
  return res.json(data);
});

schedule.scheduleJob('*/1 * * * *', async function () {
  const data = await crawl.getNextKeyword();
  console.log(data);
  console.log(new Date(), 'The answer to life, the universe, and everything!');
});

server.listen(PORT, async () => {
  dbConnect();
  console.log(`listening on *:${PORT}`);
});
