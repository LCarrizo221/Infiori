/* module.exports = (sequelize, DataTypes) => {
    const Talla = sequelize.define('Talla', {
      id_talla: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      descrption: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      id_category: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'TALLA',
      timestamps: false
    });
  
    Talla.associate = (models) => {
      Talla.belongsTo(models.Category, { foreignKey: 'id_category' });
      Talla.belongsToMany(models.Product, { 
        through: 'PRODUCTS_TALLA',
        foreignKey: 'id_talla',
        otherKey: 'id_products'
      });
    };
  
    return Talla;
  }; */