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