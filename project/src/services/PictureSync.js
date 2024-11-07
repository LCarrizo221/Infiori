const { Product, Picture } = require('../database/models');

const getProductWithPictures = async (productId) => {
  try {
    const product = await Product.findOne({
      where: { id_products: productId },
      include: [Picture], // Incluir las imágenes asociadas
    });
    return product;
  } catch (error) {
    throw new Error('Error obteniendo imagenes: ' + error.message);
  }
};

module.exports = {
  getProductWithPictures,
};
