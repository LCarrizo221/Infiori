const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsControl.js'); // Asegúrate de que este sea el nombre correcto
const userController = require('../controllers/userController.js'); // Asegúrate de que este sea el nombre correcto

// Rutas para productos
router.get('/products', productsController.getAllProductsAPI); // Ver todos los productos
router.get('/products/:id', productsController.getProductByIdAPI); // Ver producto por ID
router.get('/products/category/:category', productsController.getProductsByCategory); // Ver productos por categoría
router.get('/products/last', productsController.getLastProductAPI);

// Definir las rutas y asignar los métodos del controlador
router.get('/users', userController.getAllUsersAPI);
router.get('/users/:id', userController.getUserByIdAPI);
router.post('/users', userController.createUser2);
/* router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser); */

module.exports = router;
