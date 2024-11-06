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
        id_category: {  // Asegúrate de que este nombre coincida con tu columna en la base de datos
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'USERS',
        timestamps: false
    });

    USERS.associate = (models) => {
        USERS.belongsTo(models.UserCategory, { 
            foreignKey: 'id_category',     // El campo en la tabla USERS
            targetKey: 'id_categories',    // El campo en la tabla categories
            as: 'categoria'                // Alias para la relación
        });
        
        // Mantén estas asociaciones solo si tienes estos modelos
        if (models.Picture) {
            USERS.belongsToMany(models.Picture, {
                through: 'USERS_PICTURE',
                foreignKey: 'USERS_id_user',
                otherKey: 'PICTURE_id_picture'
            });
        }
        
        if (models.Shopping) {
            USERS.hasMany(models.Shopping, {
                foreignKey: 'id_user'
            });
        }
    };

    return USERS;
};