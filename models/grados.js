'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      grados.hasMany(models.usuarios,{
        foreignKey: "id_grado",
        sourceKey: 'id_grado'
      })
    }
  }
  grados.init({
    id_grado: DataTypes.INTEGER,
    nombre_grado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'grados',
  });
  return grados;
};