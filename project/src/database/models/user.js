const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const UserCategory = require('./user_categories.js')(sequelize, DataTypes); // Importar y ejecutar UserCategory

module.exports = (sequelize) => {

    const Usuario = sequelize.define('Usuario', {
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
        email: {
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
        tableName: 'users',
        timestamps: false
    });

    // Definir las asociaciones
    Usuario.associate = (models) => {
        Usuario.belongsTo(models.UserCategory, { 
            foreignKey: 'id_categories',
            as: 'userCategory'
        });
        Usuario.belongsToMany(models.Picture, {
            through: 'USERS_PICTURE',
            foreignKey: 'USERS_id_user',
            otherKey: 'PICTURE_id_picture'
        });
        Usuario.hasMany(models.Shopping, {
            foreignKey: 'id_user'
        });
    };

    return Usuario;
};
