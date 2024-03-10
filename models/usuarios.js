'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuarios.belongsTo(models.titulos,{
        foreigWnKey: "id_titulo",
        targetKey: "id_titulo"
      }),
      usuarios.belongsTo(models.licenciaturas,{
        foreignKey: "id_licenciatura",
        targetKey: "id_licenciatura"
      }),
      usuarios.belongsTo(models.grados,{
        foreignKey: "id_grado",
        targetKey: "id_grado"
      }),
      usuarios.belongsTo(models.roles,{
        foreignKey: "id_rol",
        targetKey: "id_rol"
      }),
      usuarios.belongsTo(models.entidades,{
        foreignKey: "id_entidad",
        targetKey: "id_entidad"
      })
    }
  }
  usuarios.init({
    id_usuario: DataTypes.INTEGER,
    nombre: DataTypes.STRING, 
    ap_paterno: DataTypes.STRING,
    ap_materno: DataTypes.STRING,
    telefono_fijo: DataTypes.INTEGER,
    telefono_celular: DataTypes.INTEGER,
    correo: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    id_titulo: DataTypes.INTEGER,
    id_licenciatura: DataTypes.INTEGER,
    especialidad: DataTypes.STRING,
    sub_especializacion: DataTypes.STRING,
    ultima_cedula_dgp: DataTypes.INTEGER,
    id_entidad: DataTypes.INTEGER,
    id_grado: DataTypes.INTEGER,
    fecha_nacimiento: DataTypes.DATEONLY,
    fecha_registro: DataTypes.DATE,
    id_rol: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usuarios',
  });

  return usuarios;
};