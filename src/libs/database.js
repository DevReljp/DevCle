var database = require('../database.json')[process.env.NODE_ENV];
var Sequelize = require('sequelize');
var db = new Sequelize(database.database, database.user, database.password, {
  host: database.host,
  dialect: database.driver
});

module.exports = {db: db, Sequelize: Sequelize}

