 //CONFIGURACION PARA EL ENTORNO LOCAL
// config/connection.js
const Sequelize = require('sequelize');

// Crear una instancia de Sequelize para conectarse a la base de datos
const sequelize = new Sequelize('infiori', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // Puede ser mysql, postgres, etc.
  logging: console.log, // Habilita el logging para ver las consultas SQL
});

// Comprobar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = sequelize;
/*
// CONFIGURACION PARA LA DB EN LA NUBE

const { Sequelize } = require("sequelize")
const config = require('./config');
const db = require("../models/index.js");
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host : dbConfig.host,
    dialect : dbConfig.dialect,

});
//para probar la conexion a la database
const testConnection = async () =>{
    try {
        await sequelize.authenticate()
        console.log("conexion a la db con exito")
    } catch (error) {
    console.log("no se pudo conectar a la base de datos")   
    }
}

testConnection();
module.exports = sequelize;
*/ 