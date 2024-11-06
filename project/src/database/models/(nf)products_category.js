/* module.exports = (sequelize, DataTypes) => {
  const products_category = sequelize.define('Category', {
    id_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'CATEGORY', //  la tabla en la base de datos esta en mayúsculas
    timestamps: false
  });

  products_category.associate = (models) => {
    // Definiendo las relaciones
    products_category.hasMany(models.Product, { foreignKey: 'id_category' });
    products_category.hasMany(models.Talla, { foreignKey: 'id_category' });
  };

  return products_category; 
};
 */