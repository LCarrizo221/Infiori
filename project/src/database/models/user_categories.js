module.exports = (sequelize, DataTypes) => {
    const UserCategory = sequelize.define('UserCategory', {
      id_categories: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'categories', //recordar cambiar el nombre a user_categories a la base de datos para que despues para que funcionen las relaciones
      timestamps: false
    });
  
    UserCategory.associate = (models) => {
      UserCategory.hasMany(models.Usuario, {
        foreignKey: 'id_categories',
        as: 'Usuario'
      });
    };
  
    return UserCategory;
  };