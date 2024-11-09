const { error } = require('console');
const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');


const validationProduct = [
    body('title').notEmpty().withMessage('Debes agregarle el titulo del articulo'),
    body('description').notEmpty().withMessage('Debes agregarle una descripcion'),
    body('category').notEmpty().withMessage('Debes elegir el tipo'),
    body('stock').notEmpty().withMessage('Debes elegir Stock'),
    body('price').notEmpty().withMessage('Debes agregarle un precio'),
    body('img_url').custom((value, { req }) => {
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