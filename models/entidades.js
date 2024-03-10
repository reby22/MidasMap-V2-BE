'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class entidades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      entidades.belongsTo(models.tipos_entidad, {
        foreignKey: "id_tipo",
        targetKey: "id_tipo"
      }),
      entidades.belongsTo(models.estado_instituciones, {
        foreignKey: "id_estado",
        targetKey: "id_estado"
      }),
      entidades.hasMany(models.usuarios, {
        foreignKey: "id_institucion"
      })
      
    }
  }
  entidades.init({
    id_entidad: DataTypes.INTEGER,
    id_estado: DataTypes.INTEGER,
    id_tipo: DataTypes.INTEGER,
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'entidades',
  });
  return entidades;
};