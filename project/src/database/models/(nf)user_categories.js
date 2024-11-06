'use strict';

module.exports = (sequelize, DataTypes) => {
    const UserCategory = sequelize.define('UserCategory', {
      id_categories: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'categories',
      timestamps: false
    });
  
    UserCategory.associate = (models) => {
      UserCategory.hasMany(models.USERS, {
        foreignKey: 'id_category',  // Debe coincidir con el campo en la tabla USERS
        sourceKey: 'id_categories', // La clave primaria de UserCategory
        as: 'Usuario'
      });
    };
  
    return UserCategory;
};