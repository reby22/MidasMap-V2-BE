const { DataTypes, ForeignKeyConstraintError } = require('sequelize');
const { sequelize } = require('../config/dbConnection');

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

const Tipo_Entidad = sequelize.define(
  'Tipo_Entidad',
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
    tableName: 'tipos_entidad',
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
      type: DataTypes.STRING(40),
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
      type: DataTypes.STRING(20),
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    tableName: 'tipos_alerta',
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
    tableName: 'alertas',
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
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: 'bsls',
    timestamps: false
  },
);

const Tipo_Enfermedad = sequelize.define(
  'Tipo_Enfermedad',
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
    tableName: 'tipos_enfermedad',
    timestamps: false
  },
);
const Agente_Causal = sequelize.define(
  'Agente_Causal',
  {
    // Model attributes are defined here
    id_agente: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    agente: {
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

const Distribucion_Sexo = sequelize.define(
  'Distribucion_Sexo',
  {
    // Model attributes are defined here
    id_distribucion: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    distribucion: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: 'distribuciones_sexo',
    timestamps: false
  },
);

const Modo_Transmision = sequelize.define(
  'Modo_Transmision',
  {
    // Model attributes are defined here
    id_modo_transmision: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    modo_transmision: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: 'modos_transmision',
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
    duracion_promedio_incubacion: {
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
    numero_casos_hospitalizados: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    numero_muertos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
    numero_casos_uci: {
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


Entidad.belongsTo(Localidad, { foreignKey: 'id_localidad' });
Entidad.belongsTo(Tipo_Entidad, { foreignKey: 'id_tipo' });
Usuario.belongsTo(Titulo, { foreignKey: 'id_titulo' });
Usuario.belongsTo(Licenciatura, { foreignKey: 'id_licenciatura' });
Usuario.belongsTo(Grado, { foreignKey: 'id_grado' });
Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });
Usuario.belongsTo(Entidad, { foreignKey: 'id_entidad' });
Alerta.belongsTo(Tipo_Alerta, { foreignKey: 'id_tipo' });
Alerta.belongsTo(Riesgo, { foreignKey: 'id_riesgo' });
Alerta.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Control_usuario.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Control_usuario.belongsTo(Rol, { foreignKey: 'id_rol' });
Agente_Causal.belongsTo(BSL, { foreignKey: 'id_bsl' });
Agente_Causal.belongsTo(Tipo_Enfermedad, { foreignKey: 'id_tipo' });
Reporte.belongsTo(Agente_Causal, { foreignKey: 'id_agente_causal' });
Reporte.belongsTo(Distribucion_Sexo, { foreignKey: 'id_distribucion_sexo' });
Reporte.belongsTo(Modo_Transmision, { foreignKey: 'id_modo_transmision' });
Reporte.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Reporte.belongsTo(Medida_Tiempo, { foreignKey: 'id_medida_dpi' });
Reporte.belongsTo(Medida_Tiempo, { foreignKey: 'id_medida_dpe' });
Reporte.belongsTo(Entidad, { foreignKey: 'id_institucion_casos',as: 'EntidadReporte' });
Reporte.belongsTo(Entidad, { foreignKey: 'id_laboratorio',as: 'EntidadConfirmacion'});
Localidad.belongsTo(Estado, { foreignKey: 'id_estado'});

//Entidad
Localidad.hasMany(Entidad, { foreignKey: 'id_localidad', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Tipo_Entidad.hasMany(Entidad, { foreignKey: 'id_tipo', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Estado.hasMany(Localidad, { foreignKey: 'id_estado', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
//Usuario-Información
Titulo.hasMany(Usuario, { foreignKey: 'id_titulo', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Licenciatura.hasMany(Usuario, { foreignKey: 'id_licenciatura', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Grado.hasMany(Usuario, { foreignKey: 'id_grado', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Rol.hasMany(Usuario, { foreignKey: 'id_rol', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

//Tablas de Alertas
Tipo_Alerta.hasMany(Alerta, { foreignKey: 'id_tipo', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Riesgo.hasMany(Alerta, { foreignKey: 'id_riesgo', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Usuario.hasMany(Alerta, { foreignKey: 'id_usuario', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
//
Usuario.hasMany(Control_usuario, { foreignKey: 'id_administrador' });
Usuario.hasMany(Control_usuario, { foreignKey: 'id_usuario' });
Rol.hasMany(Control_usuario, { foreignKey: 'id_rol', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
//Reporte
BSL.hasMany(Agente_Causal, { foreignKey: 'id_bsl', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Tipo_Enfermedad.hasMany(Agente_Causal, { foreignKey: 'id_tipo', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Distribucion_Sexo.hasMany(Reporte, {foreignKey: 'id_distribucion_sexo', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Modo_Transmision.hasMany(Reporte, {foreignKey: 'id_modo_transmision', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Medida_Tiempo.hasMany(Reporte, {foreignKey: 'id_medida_dpi', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Medida_Tiempo.hasMany(Reporte, {foreignKey: 'id_medida_dpe', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Usuario.hasMany(Reporte, { foreignKey: 'id_usuario', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Entidad.hasMany(Reporte, { foreignKey: 'id_institucion_casos', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'EntidadReporte'});
Entidad.hasMany(Reporte, { foreignKey: 'id_laboratorio', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'EntidadConfirmacion'});



sequelize.sync({ alter: true }).then(() => {
  console.log("DB creada, Todo funciona Bien")
}).catch((error) => {
  console.log(error);
})

module.exports = { Entidad, Estado, Tipo_Entidad, Titulo, Licenciatura, Grado, Rol, Usuario, Localidad, Reporte, BSL, Tipo_Enfermedad, Agente_Causal, Modo_Transmision, Medida_Tiempo,Distribucion_Sexo, Control_usuario, Alerta, Tipo_Alerta, Riesgo }