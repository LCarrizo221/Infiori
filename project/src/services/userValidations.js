const express = require("express")
const { body } = require('express-validator');
const path = require('path');


const userValidations = [
    body("userName").notEmpty().withMessage("Debe completar el campo de usuario."),
    body("name").notEmpty().withMessage("Debe completar el campo de nombre"),
    body("password").notEmpty().withMessage("Debe completar el campo de contraseña."),
    body("repassword").notEmpty().withMessage("Debe completar el campo de repetir contraseña."),
    body("repassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Las contraseñas no coinciden.");
        }
        return true;
    })
];

module.exports = userValidations;

