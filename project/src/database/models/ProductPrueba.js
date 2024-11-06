'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id_products: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
   /* Implentar a futuro la talla
    talla: {
      type: DataTypes.STRING(15),
      allowNull: true,
    }
    */
  }, {
    tableName: 'PRODUCTS',
    timestamps: false,
  });

  return Product;
};