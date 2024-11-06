const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');


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
       
        
    }, {
        tableName: 'USERS',
        timestamps: false
    });

    // Definir las asociaciones
    USERS.associate = (models) => {
     
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
