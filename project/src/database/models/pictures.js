module.exports = (sequelize, DataTypes) => {
    const Picture = sequelize.define('Picture', {
      id_picture: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      PRODUCTS_id_products: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'PICTURES',
      timestamps: false
    });
  
    Picture.associate = (models) => {
      Picture.belongsTo(models.Product, {
        foreignKey: 'PRODUCTS_id_products'
      });
    };
  
    return Picture;
  };