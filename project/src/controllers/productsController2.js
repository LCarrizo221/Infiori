// controllers/productsController2.js
const { ProductPrueba } = require('../database/models'); // Asegúrate de importar el modelo correcto

// 1. Ver todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductPrueba.findAll(); // Obtener todos los productos
    res.json(products); // Responder con los productos en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos', error});
  }
};

// 2. Ver un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await ProductPrueba.findByPk(req.params.id); // Buscar el producto por ID

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' }); // Si no se encuentra, error 404
    }

    res.json(product); // Responder con el producto encontrado
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// 3. Ver productos por categoría
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await ProductPrueba.findAll({
      where: { category: req.params.category } // Buscar por categoría
    });

    if (products.length === 0) {
      return res.status(404).json({ error: 'No se encontraron productos en esta categoría' });
    }

    res.json(products); // Responder con los productos encontrados
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos por categoría' });
  }
};
