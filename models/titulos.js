'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class titulos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      titulos.hasMany(models.usuarios,{
        foreignKey: "id_titulo"
      })
    }
  }
  titulos.init({
    id_titulo: DataTypes.INTEGER,
    nombre_titulo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'titulos',
  });

  return titulos;
};