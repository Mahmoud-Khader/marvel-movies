"use strict";

const { Sequelize, DataTypes } = require("sequelize");

const user = require("./users.js");
const marvel = require("./marvel.model");
const DataCollection = require("./data-collection");

const DATABASE_URL =  process.env.DATABASE_URL;



const sequelize = new Sequelize(DATABASE_URL, {});

const userModel= user(sequelize,DataTypes)
const marvelMovie = marvel(sequelize, DataTypes);

userModel.hasMany(marvelMovie, { foreignKey: 'userId', sourceKey: 'id'});
marvelMovie.belongsTo(userModel, { foreignKey: 'userId', targetKey: 'id'});

module.exports = {
  db: sequelize,
  marvelMovie: new DataCollection(marvelMovie),
  users: userModel,
};