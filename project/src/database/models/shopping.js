module.exports = (sequelize, DataTypes) => {
    const Shopping = sequelize.define('Shopping', {
      id_shopping: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date_info: {
        type: DataTypes.DATE,
        allowNull: false
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'SHOPPING',
      timestamps: false
    });
  
    Shopping.associate = (models) => {
      Shopping.belongsTo(models.USERS, { foreignKey: 'id_user' });
      Shopping.belongsToMany(models.ProductsTalla, { 
        through: 'PRODUCTS_SHOPPING',
        foreignKey: 'SHOPPING_id_shopping',
        otherKey: 'PRODUCTS_TALLA_PRODUCTS_id_products'
      });
    };
  
    return Shopping;
  };