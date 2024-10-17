const { Sequelize } = require("sequelize")
const config = require('./config');
const db = require("../models/index.js");
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host : dbConfig.host,
    dialect : dbConfig.dialect,
});
module.exports = sequelize;