const {DataTypes}= require('sequelize')
const sequelize=require('../config/config.js')
const { type } = require('os')
const { timeStamp } = require('console')

const Usuario=sequelize.define('Usuario',{
    id_user:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRINGg,
        allowNull: null
    },
    firstname:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: null
    }, 
    id_categoria:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
     tablename: 'users',
     timeStamp:false
})