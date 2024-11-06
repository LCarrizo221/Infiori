/* module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    id_picture: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_product: {
      type: DataTypes.INTEGER,
      references: {
        model: 'PRODUCTS',
        key: 'id_products',
      },
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'PICTURES',
    timestamps: false,
  });

  Picture.associate = (models) => {
    Picture.belongsTo(models.Product, {
      foreignKey: 'id_product',
    });
  };

  return Picture;
} */
