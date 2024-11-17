const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsControl.js'); // Asegúrate de que este sea el nombre correcto
const userController = require('../controllers/userController.js'); // Asegúrate de que este sea el nombre correcto

// Rutas para productos
router.get('/products', productsController.getAllProducts); // Ver todos los productos
router.get('/products/:id', productsController.getProductById); // Ver producto por ID
router.get('/products/category/:category', productsController.getProductsByCategory); // Ver productos por categoría

//module.exports = router;
// Definir las rutas y asignar los métodos del controlador
router.get('/usuarios', userController.getAllUsers2);
router.get('/usuarios/:id', userController.getUserById2);
router.post('/usuarios', userController.createUser2);
/* router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser); */

module.exports = router;
