const { DataTypes, ForeignKeyConstraintError } = require('sequelize');
const { sequelize } = require('../config/dbConnection');

const Pais = sequelize.define(
  'Pais',
  {
    // Model attributes are defined here
    id_pais: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pais: {
      type: DataTypes.STRING(40),
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    tableName: 'paises',
    timestamps: false
  },
);

const Estado = sequelize.define(
  'Estado',
  {
    // Model attributes are defined here
    id_estado: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pais: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(40),
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    tableName: 'estados',
    timestamps: false
  },
);

const Localidad = sequelize.define(
  'Localidad',
  {
    // Model attributes are defined here
    id_localidad: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_estado: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    localidad: {
      type: DataTypes.STRING(40),
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    tableName: 'localidades',
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
    titulo: {
      type: DataTypes.STRING(20),
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
    licenciatura: {
      type: DataTypes.STRING(50),
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
    grado: {
      type: DataTypes.STRING(40),
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
      type: DataTypes.STRING(20),
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
    id_rol: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_titulo: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_licenciatura: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_grado: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // allowNull defaults to true
    },
    ap_paterno: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // allowNull defaults to true
    },
    ap_materno: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // allowNull defaults to true
    },
    correo: {
      type: DataTypes.STRING(40),
      allowNull: false,
      // allowNull defaults to true
    },
    contraseña: {
      type: DataTypes.STRING(20),
      allowNull: false,
      // allowNull defaults to true
    },
    foto_perfil: {
      type: DataTypes.STRING(100),
      allowNull: true,
      // allowNull defaults to true
    },
    telefono_fijo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      // allowNull defaults to true
    },
    telefono_celular: {
      type: DataTypes.STRING(20),
      allowNull: false,
      // allowNull defaults to true
    },
    institucion_inscripcion: {
      type: DataTypes.STRING(100),
      allowNull: false,
      // allowNull defaults to true
    },
    especialidad: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // allowNull defaults to true
    },
    sub_especialidad: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // allowNull defaults to true
    },
    ultima_cedula_dgp: {
      type: DataTypes.STRING(10),
      allowNull: false,
      // allowNull defaults to true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      // allowNull defaults to true
    },
    fecha_registro: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    tableName: 'usuarios',
    timestamps: false,
  },
);

const Tipo_Notificacion = sequelize.define(
  'Tipo_Notificacion',
  {
    // Model attributes are defined here
    id_tipo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    tableName: 'tipos_notificacion',
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
      type: DataTypes.STRING(20),
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

const Notificacion = sequelize.define(
  'Notificacion',
  {
    // Model attributes are defined here
    id_notificacion: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_administrador: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_tipo: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_riesgo: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      // allowNull defaults to true
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: 'notificaciones',
    timestamps: false
  },
);

const Control_usuario = sequelize.define(
  'Control_usuario',
  {
    // Model attributes are defined here
    id_control_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_administrador: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_rol_anterior: {
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

const Grupo_Riesgo = sequelize.define(
  'Grupo_Riesgo',
  {
    // Model attributes are defined here
    id_grupo_riesgo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_ubicacion: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    grupo_riesgo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(400),
      allowNull: true,
    },
  },
  {
    // Other model options go here
    tableName: 'grupos_riesgo',
    timestamps: false
  },
);

const Tipo_Patogeno = sequelize.define(
  'Tipo_Patogeno',
  {
    // Model attributes are defined here
    id_tipo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: 'tipos_patogeno',
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
    id_tipo_patogeno: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_grupo_riesgo: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    agente_causal: {
      // type: DataTypes.STRING(40),
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: 'agentes_causales',
    timestamps: false
  },
);

const Ruta_Transmision = sequelize.define(
  'Ruta_Transmision',
  {
    // Model attributes are defined here
    id_ruta_transmision: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ruta_transmision: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: 'rutas_transmision',
    timestamps: false
  },
);

const Medida_Tiempo = sequelize.define(
  'Medida_Tiempo',
  {
    // Model attributes are defined here
    id_medida: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    medida: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: 'medidas_tiempo',
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
    id_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_ubicacion: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_agente_causal: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    medida_dpi: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    medida_dpe: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    id_ruta_transmision: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false,
      // allowNull defaults to true
    },
    descripcion: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      // allowNull defaults to true
    },
    institucion_casos: {
      type: DataTypes.STRING(100),
      allowNull: false,
      // allowNull defaults to true
    },
    //puede ser null
    laboratorio_confirmacion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      // allowNull defaults to true
    },
    longitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
      // allowNull defaults to true
    },
    latitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
      // allowNull defaults to true
    },
    altitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
      // allowNull defaults to true
    },
    fecha_pid: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      // allowNull defaults to true
    },
    fecha_upd: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      // allowNull defaults to true
    },
    id_agente_causal: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    periodo_incubacion: {
      type: DataTypes.INTEGER ,
      allowNull: false,
      // allowNull defaults to true
    },
    duracion_promedio_enfermedad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    signos_sintomas: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      // allowNull defaults to true
    },
    numero_casos_sospechosos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    numero_casos_probables: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    numero_casos_confirmados: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    numero_casos_totales: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    numero_hospitalizados: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    numero_casos_uci: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    fallecimientos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    }, 
    aprobado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      // allowNull defaults to true
    },
    estado_reporte: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    fecha_registro: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      // allowNull defaults to true
    },

  },
  {
    // Other model options go here
    tableName: 'reportes',
    timestamps: false,
  },
);

Usuario.belongsTo(Titulo, { foreignKey: 'id_titulo',targetKey: 'id_titulo' });
Usuario.belongsTo(Licenciatura, { foreignKey: 'id_licenciatura',targetKey: 'id_licenciatura' });
Usuario.belongsTo(Grado, { foreignKey: 'id_grado',targetKey: 'id_grado' });
Usuario.belongsTo(Rol, { foreignKey: 'id_rol',targetKey: 'id_rol' });
Notificacion.belongsTo(Tipo_Notificacion, { foreignKey: 'id_tipo' ,targetKey: 'id_tipo'});
Notificacion.belongsTo(Riesgo, { foreignKey: 'id_riesgo',targetKey: 'id_riesgo' });
Notificacion.belongsTo(Usuario, { foreignKey: 'id_administrador' ,targetKey: 'id_usuario'});
Control_usuario.belongsTo(Usuario, { foreignKey: 'id_usuario',targetKey: 'id_usuario' });
Control_usuario.belongsTo(Usuario, { foreignKey: 'id_administrador' ,targetKey: 'id_usuario'});
Control_usuario.belongsTo(Rol, { foreignKey: 'id_rol_anterior' ,targetKey: 'id_rol'});
Agente_Causal.belongsTo(Grupo_Riesgo, { foreignKey: 'id_grupo_riesgo' ,targetKey: 'id_grupo_riesgo'});
Agente_Causal.belongsTo(Tipo_Patogeno, { foreignKey: 'id_tipo' ,targetKey: 'id_tipo'});
Reporte.belongsTo(Localidad, {foreignKey: 'id_ubicacion',targetKey: 'id_localidad',as: 'ubicacion' });
Reporte.belongsTo(Agente_Causal, { foreignKey: 'id_agente_causal' ,targetKey: 'id_agente_causal',as: 'agente_causal'});
Reporte.belongsTo(Ruta_Transmision, { foreignKey: 'id_ruta_transmision',targetKey: 'id_ruta_transmision' });
Reporte.belongsTo(Usuario, { foreignKey: 'id_usuario' ,targetKey: 'id_titulo'});
Reporte.belongsTo(Medida_Tiempo, { foreignKey: 'id_medida_dpi' ,targetKey: 'id_medida'});
Reporte.belongsTo(Medida_Tiempo, { foreignKey: 'id_medida_dpe' ,targetKey: 'id_medida'});
Localidad.belongsTo(Estado, { foreignKey: 'id_estado',targetKey: 'id_estado'});
Estado.belongsTo(Pais, { foreignKey: 'id_pais',targetKey: 'id_pais'});

//Paises
Estado.hasMany(Localidad, { foreignKey: 'id_estado',sourceKey: 'id_estado', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Pais.hasMany(Estado, { foreignKey: 'id_pais',sourceKey: 'id_pais', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

//Usuario-Información
Titulo.hasMany(Usuario, { foreignKey: 'id_titulo',sourceKey: 'id_titulo', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Licenciatura.hasMany(Usuario, { foreignKey: 'id_licenciatura',sourceKey: 'id_licenciatura', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Grado.hasMany(Usuario, { foreignKey: 'id_grado',sourceKey: 'id_grado', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Rol.hasMany(Usuario, { foreignKey: 'id_rol',sourceKey: 'id_rol', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

//Tablas de Notificacion
Tipo_Notificacion.hasMany(Notificacion, { foreignKey: 'id_tipo',sourceKey: 'id_tipo', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Riesgo.hasMany(Notificacion, { foreignKey: 'id_riesgo',sourceKey: 'id_riesgo', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Usuario.hasMany(Notificacion, { foreignKey: 'id_administrador',sourceKey: 'id_usuario', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
//
Usuario.hasMany(Control_usuario, { foreignKey: 'id_administrador' ,sourceKey: 'id_usuario'});
Usuario.hasMany(Control_usuario, { foreignKey: 'id_usuario' ,sourceKey: 'id_usuario', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
Rol.hasMany(Control_usuario, { foreignKey: 'id_rol_anterior',sourceKey: 'id_rol', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
//Reporte
Grupo_Riesgo.hasMany(Agente_Causal, { foreignKey: 'id_grupo_riesgo',sourceKey: 'id_grupo_riesgo', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Tipo_Patogeno.hasMany(Agente_Causal, { foreignKey: 'id_tipo',sourceKey: 'id_tipo', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Agente_Causal.hasMany(Reporte, { foreignKey: 'id_agente_causal',sourceKey: 'id_agente_causal', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Ruta_Transmision.hasMany(Reporte, {foreignKey: 'id_ruta_transmision',sourceKey: 'id_ruta_transmision', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Medida_Tiempo.hasMany(Reporte, {foreignKey: 'id_medida_dpi',sourceKey: 'id_medida', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Medida_Tiempo.hasMany(Reporte, {foreignKey: 'id_medida_dpe',sourceKey: 'id_medida', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Usuario.hasMany(Reporte, { foreignKey: 'id_usuario',sourceKey: 'id_usuario', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Localidad.hasMany(Reporte, {foreignKey: 'id_ubicacion',sourceKey: 'id_localidad',onDelete: 'CASCADE', onUpdate: 'CASCADE'});

sequelize.sync({ alter: true }).then(() => {
  console.log("DB creada, Todo funciona Bien")
}).catch((error) => {
  console.log(error);
})

module.exports = { Pais, Estado, Titulo, Licenciatura, Grado, Rol, Usuario, Localidad, Reporte, Grupo_Riesgo, Tipo_Patogeno, Agente_Causal, Ruta_Transmision, Medida_Tiempo, Control_usuario, Notificacion, Tipo_Notificacion, Riesgo }