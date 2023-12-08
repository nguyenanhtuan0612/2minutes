const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crawl', 'postgres', 'penguin123', {
  host: '143.198.209.25',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

async function dbConnect() {
  await sequelize.sync();
  console.log('Connection has been established successfully.');
}

module.exports = { sequelize, dbConnect };
