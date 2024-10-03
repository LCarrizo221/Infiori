module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
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
      tableName: 'CATEGORY',
      timestamps: false
    });
  
    Category.associate = (models) => {
      Category.hasMany(models.Product, { foreignKey: 'id_category' });
      Category.hasMany(models.Talla, { foreignKey: 'id_category' });
    };
  
    return Category;
  };