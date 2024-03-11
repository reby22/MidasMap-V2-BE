'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class estado_institucion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //estado_institucion.hasMany(models.entidad,{foreignKey:"id_estado",sourceKey: 'id_estado'});
    }
  }
  estado_institucion.init({
    id_estado: DataTypes.BIGINT,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'estado_institucion',
  });
  return estado_institucion;
};