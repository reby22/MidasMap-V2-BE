'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class entidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      entidad.hasMany(models.usuario, {foreignKey: "id_entidad",sourceKey: "id_entidad"});
      //entidad.belongsTo(models.tipo_entidad, {foreignKey: "id_tipo", targetKey: "id_tipo"});
      //entidad.belongsTo(models.estado_institucion, {foreignKey: "id_estado",targetKey: "id_estado"});

    }
  }
  entidad.init({
    id_entidad: DataTypes.BIGINT,
    id_estado: DataTypes.BIGINT,
    id_tipo: DataTypes.BIGINT,
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'entidad',
  });
  return entidad;
};