const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const UserCategory = require('./user_categories.js')(sequelize, DataTypes); // Importar y ejecutar UserCategory

module.exports = (sequelize) => {

    const USERS = sequelize.define('USERS', {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: null
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
            allowNull: null
        },
        id_category: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UserCategory,
                key: 'id_categories'
            }
        }
    }, {
        tableName: 'USERS',
        timestamps: false
    });

    // Definir las asociaciones
    USERS.associate = (models) => {
        USERS.belongsTo(models.UserCategory, { 
            foreignKey: 'id_categories',
            as: 'userCategory'
        });
        USERS.belongsToMany(models.Picture, {
            through: 'USERS_PICTURE',
            foreignKey: 'USERS_id_user',
            otherKey: 'PICTURE_id_picture'
        });
        USERS.hasMany(models.Shopping, {
            foreignKey: 'id_user'
        });
    };

    return USERS;
};
