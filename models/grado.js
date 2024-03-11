'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      grado.hasMany(models.usuario,{foreignKey: "id_grado",sourceKey: 'id_grado'});
    }
  }
  grado.init({
    id_grado: DataTypes.BIGINT,
    nombre_grado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'grado',
  });
  return grado;
};