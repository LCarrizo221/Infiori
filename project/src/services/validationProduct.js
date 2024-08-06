const { error } = require('console');
const express = require('express');
const {body} = require('express-validator');
const multer = require('multer');
const path = require('path');

const validationProduct = [
    body('titulo').notEmpty().withMessage('Debes agregarle el titulo del articulo'),
    body('descripcion').notEmpty().withMessage('Debes agregarle una descripcion'),
    body('tipo').notEmpty().withMessage('Debes elegir el tipo'),
    body('precio').notEmpty().withMessage('Debes agregarle un precio'),
    body('imagen').custom( (value, {req})=>{
        let file = req.file;
        let ExtensionAcepted = ['.jpg','.png','.gif'];
       
        if(!file){
            throw new Error('Tienes que subir una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
         if(!ExtensionAcepted.includes(fileExtension)){
            throw new Error(`Tienes que subir una imagen con el formato ${ExtensionAcepted.join(', ')}`);
         }
        }
         

         return true;
    })
];

module.exports = validationProduct;