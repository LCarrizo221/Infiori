'use strict';

module.exports = (sequelize, DataTypes) => {
  const ProductPrueba = sequelize.define('ProductPrueba', {
    id: {
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
    }
  }, {
    tableName: 'productsprueba',
    timestamps: false,
  });

  return ProductPrueba;
};