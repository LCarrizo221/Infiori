module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    id_picture: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'PICTURES',
    timestamps: false
  });

  Picture.associate = (models) => {
    // Relación muchos a muchos con Product a través de la tabla intermedia pictures_products
    Picture.belongsToMany(models.Product, {
      through: 'pictures_products', // Tabla intermedia
      foreignKey: 'PICTURES_id_picture', // Clave foránea en pictures_products que referencia PICTURES
      otherKey: 'PRODUCTS_id_products' // Clave foránea en pictures_products que referencia PRODUCTS
    });
    Picture.hasMany(models.pictures_products, { foreignKey: 'PICTURES_id_picture' });
  };

  return Picture;
};
