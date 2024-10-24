const pictures_products = require("./pictures_products");

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
      Picture.hasMany(models.pictures_products, { foreignKey: 'PICTURES_id_picture' });
      
    };
  
    return Picture;
  };