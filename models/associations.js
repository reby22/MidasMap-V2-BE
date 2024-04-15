const {DataTypes, ForeignKeyConstraintError } = require('sequelize');
const {sequelize} = require('../config/dbConnection');

const Estado_institucion = sequelize.define(
    'Estado_institucion',
    {
      // Model attributes are defined here
      id_estado: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: 'estado_instituciones',
      timestamps: false
    },
  );

  const Tipo_entidad = sequelize.define(
    'Tipo_entidad',
    {
      // Model attributes are defined here
      id_tipo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: 'tipo_entidades',
      timestamps: false
    },
  );

const Titulo = sequelize.define(
    'Titulo',
    {
      // Model attributes are defined here
      id_titulo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: 'titulos',
      timestamps: false
    },
  );

const Licenciatura = sequelize.define(
    'Licenciatura',
    {
      // Model attributes are defined here
      id_licenciatura: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_licenciatura: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: 'licenciaturas',
      timestamps: false
    },
  );

  const Grado = sequelize.define(
    'Grado',
    {
      // Model attributes are defined here
      id_grado: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_grado: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: 'grados',
      timestamps: false
    },
  );
  
  const Entidad = sequelize.define(
    'Entidad',
    {
      // Model attributes are defined here
      id_entidad: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: 'entidades',
      timestamps: false
    },
  );
  
  const Rol = sequelize.define(
    'Rol',
    {
      // Model attributes are defined here
      id_rol: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: 'roles',
      timestamps: false
    },
  );
  
  const Usuario = sequelize.define(
    'Usuario',
    {
      // Model attributes are defined here
      id_usuario: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      ap_paterno: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      ap_materno: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      especialidad: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      sub_especialidad: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      ultima_cedula_dgp: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: 'usuarios',
      timestamps: true,
    },
  );

  const Tipo_Alerta = sequelize.define(
    'Tipo_Alerta',
    {
      // Model attributes are defined here
      id_tipo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: 'tipo_alertas',
      timestamps: false
    },
  );

  const Riesgo = sequelize.define(
    'Riesgo',
    {
      // Model attributes are defined here
      id_riesgo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      riesgo: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
      tableName: 'riesgos',
      timestamps: false
    },
  );

  const Alerta = sequelize.define(
    'Alerta',
    {
      // Model attributes are defined here
      id_alerta: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
        // allowNull defaults to true
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      tableName: 'alertas',
      timestamps: false
    },
  );
  
  const Control_usuario = sequelize.define(
    'Control_usuario',
    {
      // Model attributes are defined here
      id_control_usuarios: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_usuario_administrado: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    },
    {
      // Other model options go here
      tableName: 'control_usuarios',
      timestamps: true
    },
  );

  const BSL = sequelize.define(
    'BSL',
    {
      // Model attributes are defined here
      id_bsl: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      grupo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
      // Other model options go here
      tableName: 'bsls',
      timestamps: false
    },
  );

  const Enfermedad = sequelize.define(
    'Enfermedad',
    {
      // Model attributes are defined here
      id_enfermedad: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
      // Other model options go here
      tableName: 'enfermedades',
      timestamps: false
    },
  );
  const Agente_Causal = sequelize.define(
    'Agente_Causal',
    {
      // Model attributes are defined here
      id_agente_causal: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      agente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
      // Other model options go here
      tableName: 'agentes_causales',
      timestamps: false
    },
  );

  const Reporte = sequelize.define(
    'Reporte',
    {
      // Model attributes are defined here
      id_reporte: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      longitud: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // allowNull defaults to true
      },
      latitud: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // allowNull defaults to true
      },
      altitud: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // allowNull defaults to true
      },
      fecha_pid: {
        type: DataTypes.DATE,
        allowNull: false,
        // allowNull defaults to true
      },
      fecha_upd: {
        type: DataTypes.DATE,
        allowNull: false,
        // allowNull defaults to true
      },
      distribucion_sexo: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      duracion_promedio_incubacion: {
        type: DataTypes.DATE,
        allowNull: false,
        // allowNull defaults to true
      },
      duracion_promedio_enfermedad: {
        type: DataTypes.DATE,
        allowNull: false,
        // allowNull defaults to true
      },
      signos_sintomas: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      modo_transmision: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      numero_casos_sospechosos: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // allowNull defaults to true
      },
      numero_casos_probables: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // allowNull defaults to true
      },
      numero_casos_confirmados: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // allowNull defaults to true
      },
      numero_casos_totales: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // allowNull defaults to true
      },
      numero_casos_hospitalizados: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // allowNull defaults to true
      },
      numero_muertos: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // allowNull defaults to true
      },
      uci: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // allowNull defaults to true
      },

    },
    {
      // Other model options go here
      tableName: 'reportes',
      timestamps: true,
    },
  );



  

  Tipo_entidad.hasOne(Entidad, {foreignKey:'id_tipo', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  Estado_institucion.hasOne(Entidad, {foreignKey:'id_estado', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  Entidad.belongsTo(Tipo_entidad, {foreignKey: 'id_tipo'});
  Entidad.belongsTo(Estado_institucion, {foreignKey: 'id_estado'});
  Titulo.hasOne(Usuario,{foreignKey:'id_titulo', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  Licenciatura.hasOne(Usuario,{foreignKey:'id_licenciatura', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  Grado.hasOne(Usuario,{foreignKey:'id_grado', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  Rol.hasOne(Usuario,{foreignKey:'id_rol', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  Entidad.hasOne(Usuario, {foreignKey:'id_entidad', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  Usuario.belongsTo(Titulo,{foreignKey: 'id_titulo'});
  Usuario.belongsTo(Licenciatura,{foreignKey: 'id_licenciatura'});
  Usuario.belongsTo(Grado,{foreignKey:'id_grado'});
  Usuario.belongsTo(Rol,{foreignKey:'id_rol'});
  Usuario.belongsTo(Entidad,{foreignKey:'id_entidad'});
  Tipo_Alerta.hasOne(Alerta,{foreignKey:'id_tipo', onDelete:'CASCADE', onUpdate:'CASCADE'});
  Riesgo.hasOne(Alerta,{foreignKey:'id_riesgo', onDelete:'CASCADE', onUpdate:'CASCADE'});
  Alerta.belongsTo(Tipo_Alerta, {foreignKey:'id_tipo'});
  Alerta.belongsTo(Riesgo, {foreignKey:'id_riesgo'});
  Usuario.hasMany(Alerta, {foreignKey:'id_usuario', onDelete:'CASCADE', onUpdate:'CASCADE'});
  Alerta.belongsTo(Usuario, {foreignKey:'id_usuario'});
  Usuario.hasMany(Control_usuario, {foreignKey:'id_administrador'});
  Rol.hasOne(Control_usuario, {foreignKey:'id_rol', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
  Control_usuario.belongsTo(Usuario,{foreignKey:'id_usuario'});
  Control_usuario.belongsTo(Rol,{foreignKey:'id_rol'});
  BSL.hasOne(Reporte, {foreignKey:'id_bsl', onDelete:'CASCADE', onUpdate:'CASCADE'});
  Enfermedad.hasOne(Reporte,{foreignKey:'id_enfermedad', onDelete:'CASCADE', onUpdate:'CASCADE'});
  Agente_Causal.hasOne(Reporte, {foreignKey:'id_agente_causal', onDelete:'CASCADE', onUpdate:'CASCADE'});
  Reporte.belongsTo(BSL, {foreignKey:'id_bsl'});
  Reporte.belongsTo(Enfermedad, {foreignKey:'id_enfermedad'});
  Reporte.belongsTo(Agente_Causal, {foreignKey:'id_agente_causal'});
  Usuario.hasMany(Reporte,{foreignKey:'id_usuario', onDelete:'CASCADE', onUpdate:'CASCADE'});
  Reporte.belongsTo(Usuario,{foreignKey:'id_usuario'});
  Entidad.hasMany(Reporte, {foreignKey:'id_entidad', onDelete:'CASCADE', onUpdate:'CASCADE'});
  Reporte.belongsTo(Entidad, {foreignKey:'id_entidad'});






  sequelize.sync({alter:true}).then(()=>{
    //funciona
  }).catch((error)=>{
    console.log(error);
  })

  module.exports = {Entidad, Tipo_entidad, Estado_institucion, Titulo, Licenciatura, Grado, Rol, Usuario}