const { error } = require('console');
const express = require('express');
const { body, validationResult, check  } = require('express-validator');
const multer = require('multer');
const path = require('path');


const validationProduct = [
    check('title').notEmpty().withMessage('Debes agregarle el titulo del articulo'),
    check('description').notEmpty().withMessage('Debes agregarle una descripcion'),
    check('category').notEmpty().withMessage('Seleccione la categoria'),
    check('stock').notEmpty().withMessage('Seleccione si esta en Stock'),
    check('price')
        .isNumeric()
        .withMessage('El precio debe ser un número.')
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser mayor que 0.'),    
    check('img_url').custom((value, { req }) => {
        let file = req.file;
        let ExtensionAcepted = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen en formato [.jpg - .png -.gif]');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!ExtensionAcepted.includes(fileExtension)) {
                throw new Error(`Tienes que subir una imagen con el formato ${ExtensionAcepted.join(', ')}`);
            }
        }
        return true;
    })
];

module.exports = validationProduct;