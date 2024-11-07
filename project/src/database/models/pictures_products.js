module.exports = (sequelize, DataTypes) => {
  const pictures_products = sequelize.define('pictures_products', {
    PICTURES_id_picture: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
          model: 'PICTURES', // Nombre de la tabla referenciada
          key: 'id_picture', // Columna referenciada en PICTURES
      }
    },
    PRODUCTS_id_products: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
          model: 'PRODUCTS', // Nombre de la tabla referenciada
          key: 'id_products', // Columna referenciada en PRODUCTS
      }
    }
  }, {
    tableName: 'PICTURES_PRODUCTS', // Nombre en mayúsculas para la tabla
    timestamps: false
  });

  return pictures_products; 
};
