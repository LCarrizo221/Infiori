const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsControl.js'); // Asegúrate de que este sea el nombre correcto

// Rutas para productos
router.get('/products', productsController.getAllProducts); // Ver todos los productos
router.get('/products/:id', productsController.getProductById); // Ver producto por ID
router.get('/products/category/:category', productsController.getProductsByCategory); // Ver productos por categoría

module.exports = router;
