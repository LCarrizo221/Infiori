'use strict';

module.exports = (sequelize, DataTypes) => {
    const USERS = sequelize.define('USERS', {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category: {  // Asegúrate de que este nombre coincida con tu columna en la base de datos
            type: DataTypes.STRING(45),
            allowNull: false
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: true,
          },
    }, {
        tableName: 'USERS',
        timestamps: false
    });

    USERS.associate = (models) => {
      
        
        if (models.Shopping) {
            USERS.hasMany(models.Shopping, {
                foreignKey: 'id_user'
            });
        }
    };

    return USERS;
};