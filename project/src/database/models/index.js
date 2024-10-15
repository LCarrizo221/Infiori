'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);

// Importar la instancia de Sequelize desde connection.js
const sequelize = require('../config/connection'); 

// Definir el entorno
const env = process.env.NODE_ENV || 'development'; 

// Importar la configuración correspondiente del archivo config.js
const config = require(path.join(__dirname, '../config/config.js'))[env];

const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    //para pasar la instancia de sequelize y DataTypes
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Asociaciones entre modelos
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// agregar la instancia de sequelize y la clase Sequelize al objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
