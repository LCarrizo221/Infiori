const express = require("express")
const { body } = require('express-validator');
const path = require('path');


const userValidations = [
    body("userName").notEmpty().withMessage("Debe completar el campo de usuario."),
    body("password").notEmpty().withMessage("Debe completar el campo de contraseña."),
];


module.exports = userValidations;

