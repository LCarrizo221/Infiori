
module.exports = (sequelize, DataTypes) => {
  const PRODUCTS = sequelize.define('PRODUCTS', {
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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    img_url: {
      type: DataTypes.STRING(255),

    }
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

  return PRODUCTS;
};