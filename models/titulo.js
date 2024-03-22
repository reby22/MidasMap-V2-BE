'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class titulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //titulo.hasMany(models.usuario,{foreignKey: "id_titulo",sourceKey: 'id_titulo'});
    }
  }
  titulo.init({
    id_titulo: DataTypes.BIGINT,
    nombre_titulo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'titulo',
  });
  return titulo;
};