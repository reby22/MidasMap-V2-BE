'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_entidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //tipo_entidad.hasMany(models.entidad,{foreignKey: "id_tipo",sourceKey: 'id_tipo'});
    }
  }
  tipo_entidad.init({
    id_tipo: DataTypes.BIGINT,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipo_entidad',
  });
  return tipo_entidad;
};