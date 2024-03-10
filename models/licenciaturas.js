'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class licenciaturas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      licenciaturas.hasMany(models.usuarios,{
        foreignKey: "id_licenciatura",
        sourceKey: 'id_licenciatura'
      })
    }
  }
  licenciaturas.init({
    id_licenciatura: DataTypes.INTEGER,
    nombre_licenciatura: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'licenciaturas',
  });

  return licenciaturas;
};