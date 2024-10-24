module.exports = (sequelize, DataTypes) => {
    const pictures_products = sequelize.define('pictures_products', {
      PICTURES_id_picture: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'products', // Nombre de la tabla referenciada
            key: 'id_products', // Columna de la tabla referenciada
      }},
      PRODUCTS_id_products: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'pictures', // Nombre de la tabla referenciada
            key: 'id_picture', // Columna de la tabla referenciada
        },
      }
    }, {
      tableName: 'PICTURES_PRODUCTS', //  la tabla en la base de datos esta en mayúsculas
      timestamps: false
    });
  
    pictures_products.associate = (models) => {
      // Definiendo las relaciones
      pictures_products.hasMany(models.Product, { foreignKey: 'id_products' });
      pictures_products.hasMany(models.Picture, { foreignKey: 'id_picture' });
    };
  
    return pictures_products; 
  };
  