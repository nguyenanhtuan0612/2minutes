const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

const Keyword = sequelize.define(
  'Keyword',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    siteId: {
      type: DataTypes.INTEGER,
    },
    keyword: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    done: {
      type: DataTypes.BOOLEAN,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    modelName: 'keywords',
  }
);

module.exports = { Keyword };
