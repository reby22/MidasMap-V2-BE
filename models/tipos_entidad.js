'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipos_entidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here
      tipos_entidad.hasMany(models.entidades,{
        foreignKey: "id_tipo",
        sourceKey: 'id_tipo'
      })
    }
  }
  tipos_entidad.init({
    id_tipo: DataTypes.INTEGER,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipos_entidad',
  });
  return tipos_entidad;
};