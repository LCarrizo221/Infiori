/* module.exports = (sequelize, DataTypes) => {
    const ProductsTalla = sequelize.define('ProductsTalla', {
      id_products_talla: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_products: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_talla: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'products_talla',
      timestamps: false
    });
  
    ProductsTalla.associate = (models) => {
      ProductsTalla.belongsTo(models.Product, { foreignKey: 'id_products' });
      ProductsTalla.belongsTo(models.Talla, { foreignKey: 'id_talla' });
      ProductsTalla.belongsToMany(models.Shopping, { 
        through: 'PRODUCTS_SHOPPING',
        foreignKey: 'PRODUCTS_TALLA_PRODUCTS_id_products',
        otherKey: 'SHOPPING_id_shopping'
      });
    };
  
    return ProductsTalla;
  }; */
