'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class estado_instituciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      estado_instituciones.hasMany(models.entidades,{
        foreignKey:"id_estado"
      })
    }
  }
  estado_instituciones.init({
    id_estado: DataTypes.INTEGER,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'estado_instituciones',
  });
  return estado_instituciones;
};