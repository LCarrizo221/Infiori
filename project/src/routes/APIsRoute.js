const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsControl.js'); // Asegúrate de que este sea el nombre correcto

// Rutas para productos
router.get('/products', productsController.getAllProducts); // Ver todos los productos
router.get('/products/:id', productsController.getProductById); // Ver producto por ID
router.get('/products/category/:category', productsController.getProductsByCategory); // Ver productos por categoría

//module.exports = router;
// Definir las rutas y asignar los métodos del controlador
router.get('/usuarios', userController.getAllUsers);
router.get('/usuarios/:id', userController.getUserById);
router.post('/usuarios', userController.createUser);
/* router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser); */

module.exports = router;
