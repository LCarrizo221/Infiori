const { check, body, validationResult } = require('express-validator');
const path = require('path');

const validateProduct = [
    check('title')
        .notEmpty()
        .withMessage('Debes agregarle el título del artículo.'),
    check('description')
        .notEmpty()
        .withMessage('Debes agregarle una descripción.')
        .isLength({ max: 255 })
        .withMessage('La descripción no puede exceder los 255 caracteres.'),
    check('category')
        .notEmpty()
        .withMessage('Seleccione la categoría.'),
    check('stock')
        .notEmpty()
        .withMessage('Seleccione si está en stock.'),
    check('price')
        .isNumeric()
        .withMessage('El precio debe ser un número.')
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser mayor que 0.'),
    check('img_url').custom((value, { req }) => {
        const file = req.file;
        const acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen en formato [.jpg, .png, .gif].');
        }
        
        const fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Tienes que subir una imagen con el formato ${acceptedExtensions.join(', ')}.`);
        }

        return true; // Finaliza la validación con éxito
    }),
/* (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('formProdEdit', {
                product: req.body,
                errors: errors.array(),
                locals: { errors: true }
            });
        }
        next();
    } */
];

module.exports = { validateProduct };