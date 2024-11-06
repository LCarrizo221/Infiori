// models/Product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id_products: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    description: DataTypes.STRING(200),
    price: DataTypes.STRING(45),
    category: DataTypes.STRING(45),
    talla: DataTypes.STRING(45),
    stock: DataTypes.INTEGER
  }, {
    tableName: 'PRODUCTS',
    timestamps: false,
  });

  Product.associate = (models) => {
    // Asociación con el modelo Picture
    Product.hasMany(models.Picture, {
      foreignKey: 'id_product',
      onDelete: 'CASCADE', // Para eliminar imágenes al eliminar el producto
    });
  };

  return Product;
};
