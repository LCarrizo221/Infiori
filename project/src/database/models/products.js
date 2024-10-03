module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id_products: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      description: DataTypes.STRING(200),
      price: DataTypes.STRING(45),
      id_category: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'PRODUCTS',
      timestamps: false
    });
  
    Product.associate = (models) => {
      Product.belongsTo(models.Category, { foreignKey: 'id_category' });
      Product.hasMany(models.Picture, { 
        foreignKey: 'PRODUCTS_id_products'
      });
      Product.belongsToMany(models.Talla, { 
        through: 'PRODUCTS_TALLA',
        foreignKey: 'id_products',
        otherKey: 'id_talla'
      });
    };
  
    return Product;
  };