'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);

const sequelize = require('../config/connection'); 
const env = process.env.NODE_ENV || 'development'; 
const config = require(path.join(__dirname, '../config/config.js'))[env];

const db = {};

// Importar todos los modelos
db.ProductPrueba = require('./ProductPrueba')(sequelize, Sequelize.DataTypes);
db.USERS = require('./user')(sequelize, Sequelize.DataTypes);
//db.UserCategory = require('./user_categories')(sequelize, Sequelize.DataTypes);

// Configurar asociaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;