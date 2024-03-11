'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class licenciatura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      licenciatura.hasMany(models.usuario,{foreignKey: "id_licenciatura",sourceKey: 'id_licenciatura'});
    }
  }
  licenciatura.init({
    id_licenciatura: DataTypes.BIGINT,
    nombre_licenciatura: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'licenciatura',
  });
  return licenciatura;
};