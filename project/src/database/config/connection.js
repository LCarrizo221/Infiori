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
