'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //usuario.belongsTo(models.titulo, { foreignKey: 'id_titulo', targetKey: "id_titulo"});
      //usuario.belongsTo(models.licenciatura, { foreignKey: 'id_licenciatura',targetKey: "id_licenciatura" });
      //usuario.belongsTo(models.entidad, { foreignKey: 'id_entidad', targetKey: "id_entidad" });
      //usuario.belongsTo(models.grado, { foreignKey: 'id_grado', targetKey: "id_grado"});
      //usuario.belongsTo(models.rol, { foreignKey: 'id_rol', targetKey: "id_rol"});
    }
  }
  usuario.init({
    id_usuario: DataTypes.BIGINT,
    nombre: DataTypes.STRING,
    ap_paterno: DataTypes.STRING,
    ap_materno: DataTypes.STRING,
    telefono_fijo: DataTypes.STRING,
    telefono_celular: DataTypes.STRING,
    correo: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    id_titulo: DataTypes.BIGINT,
    id_licenciatura: DataTypes.BIGINT,
    especialidad: DataTypes.STRING,
    sub_especializacion: DataTypes.STRING,
    ultima_cedula_dgp: DataTypes.STRING,
    id_entidad: DataTypes.BIGINT,
    id_grado: DataTypes.BIGINT,
    fecha_nacimiento: DataTypes.DATEONLY,
    fecha_registro: DataTypes.DATEONLY,
    id_rol: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'usuario',
  });
  return usuario;
};