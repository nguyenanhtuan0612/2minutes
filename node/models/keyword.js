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
    categoryId: {
      type: DataTypes.INTEGER,
    },
    keyword: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    done: {
      type: DataTypes.BOOLEAN,
    },
    error: {
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
