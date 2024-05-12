const {Reporte, Agente_Causal, Distribucion_Sexo, Modo_Transmision, Medida_Tiempo, Entidad, Estado, Localidad, Tipo_Enfermedad, BSL, Usuario} = require('../models/associations');
const Sequelize = require('sequelize');

const create = async (req, res) => {
    try {
      // Extraer la información del cuerpo de la solicitud
      const {
        titulo,
        descripcion,
        id_usuario,
        estado_reporte,
        id_institucion_casos,
        id_laboratorio,
        longitud,
        latitud,
        altitud,
        id_agente_causal,
        id_distribucion_sexo,
        id_modo_transmision,
        numero_casos_sospechosos,
        numero_casos_probables,
        numero_casos_confirmado,
        numero_casos_totales,
        numero_casos_hospitalizados,
        numero_muertos,
        uci,
        duracion_promedio_incubacion,
        id_medida_dpi,
        duracion_promedio_enfermedad,
        id_medida_dpe,
        signos_sintomas,
        fecha_pid,
        fecha_upd,
        fecha_registro
      } = req.body;

      if (
        !titulo ||
        !descripcion ||
        !id_usuario ||
        !estado_reporte ||
        !id_institucion_casos ||
        !id_laboratorio ||
        !longitud ||
        !latitud ||
        !altitud ||
        !id_agente_causal ||
        !id_distribucion_sexo ||
        !id_modo_transmision ||
        !numero_casos_sospechosos ||
        !numero_casos_probables ||
        !numero_casos_confirmado ||
        !numero_casos_totales ||
        !numero_casos_hospitalizados ||
        !numero_muertos ||
        !uci ||
        !duracion_promedio_incubacion ||
        !id_medida_dpi ||
        !duracion_promedio_enfermedad ||
        !id_medida_dpe ||
        !signos_sintomas ||
        !fecha_pid ||
        !fecha_upd ||
        !fecha_registro
      ) {
        res.status(400).json({
          msg: "Datos inválidos"
        });
        return;
      }
      
      // Crear el usuario en la base de datos
      const nuevo = await Reporte.create({
      titulo,
      descripcion,
      id_usuario,
      estado_reporte, 


      id_institucion_casos,
      id_laboratorio,

      longitud,
      latitud,
      altitud,
      
      id_agente_causal,
      id_distribucion_sexo,
      id_modo_transmision,

      numero_casos_sospechosos,
      numero_casos_probables,
      numero_casos_confirmado, 
      numero_casos_totales, 
      numero_casos_hospitalizados,
      numero_muertos,

      uci,
      duracion_promedio_incubacion,
      id_medida_dpi,
      duracion_promedio_enfermedad,
      id_medida_dpe,
      signos_sintomas,
      fecha_pid,
      fecha_upd,
      fecha_registro,
      });

      
      // Enviar una respuesta con el usuario creado
      res.status(201).json({ Reporte: nuevo});
    } catch (error) {
      // Manejar errores
      console.error('Error al crear el reporte:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };

  const searchByTerm = async (req, res) => {
    try {
      const searchTerm = req.query.nombre || ''; // Obtener el término de búsqueda del query params
      console.log(searchTerm);
      const searchTermLowerCase = searchTerm.toLowerCase(); // Convertir el término de búsqueda a minúsculas
  
      // Buscar todos los usuarios que coincidan con el nombre proporcionado (insensible a mayúsculas y minúsculas)
      const usuarios = await Usuario.findAll({
        where: {
          // Utilizar operadores `Op.or` para buscar en ambos casos de mayúsculas y minúsculas
          [Sequelize.Op.or]: [
            Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('Usuario.nombre')),
              'LIKE',
              `%${searchTermLowerCase}%`
            ),
            Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('Usuario.ap_materno')),
              'LIKE',
              `%${searchTermLowerCase}%`
            ),
            Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('Usuario.ap_paterno')),
              'LIKE',
              `%${searchTermLowerCase}%`
            ),
            Sequelize.where(
              Sequelize.fn('UPPER', Sequelize.col('Usuario.nombre')),
  
              'LIKE',
              `%${searchTermUpperCase}%`
            ),
            Sequelize.where(
              Sequelize.fn('UPPER', Sequelize.col('Usuario.ap_materno')),
  
              'LIKE',
              `%${searchTermUpperCase}%`
            ),
            Sequelize.where(
              Sequelize.fn('UPPER', Sequelize.col('Usuario.ap_paterno')),
  
              'LIKE',
              `%${searchTermUpperCase}%`
            ),
          ],
        },
        include: [
          { model: Titulo, attributes: ['titulo'] },
          { model: Licenciatura, attributes: ['licenciatura'] },
          { model: Grado, attributes: ['grado'] },
          { model: Rol, attributes: ['rol'] },
          {
            model: Entidad,
            attributes: ['nombre'],
            include: [
              {
                model: Localidad,
                attributes: ['localidad'],
                include: [{ model: Estado, attributes: ['estado'] }],
              },
            ],
          },
        ],
        attributes: [
          'id_usuario',
          'nombre',
          'ap_paterno',
          'ap_materno',
          'telefono_fijo',
          'telefono_celular',
          'correo',
          'contraseña',
          'especialidad',
          'sub_especialidad',
          'ultima_cedula_dgp',
          'fecha_nacimiento',
          'fecha_registro',
        ],
      });
  
      // Procesar los usuarios obtenidos
      const usuariosFormateados = usuarios.map(usuario => ({
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        ap_paterno: usuario.ap_paterno,
        ap_materno: usuario.ap_materno,
        telefono_fijo: usuario.telefono_fijo,
        telefono_celular: usuario.telefono_celular,
        correo: usuario.correo,
        contraseña: usuario.contraseña,
        titulo: usuario.Titulo ? usuario.Titulo.titulo : null,
        licenciatura: usuario.Licenciatura ? usuario.Licenciatura.licenciatura : null,
        especialidad: usuario.especialidad,
        sub_especialidad: usuario.sub_especialidad,
        ultima_cedula_dgp: usuario.ultima_cedula_dgp,
        grado: usuario.Grado ? usuario.Grado.grado : null,
        entidad: usuario.Entidad ? usuario.Entidad.nombre : null,
        localidad: usuario.Entidad ? (usuario.Entidad.Localidad ? usuario.Entidad.Localidad.localidad : null) : null,
        estado: usuario.Entidad ? (usuario.Entidad.Localidad ? (usuario.Entidad.Localidad.Estado ? usuario.Entidad.Localidad.Estado.estado : null) : null) : null,
        fecha_nacimiento: usuario.fecha_nacimiento,
        fecha_registro: usuario.fecha_registro,
        id_rol: usuario.Rol ? usuario.Rol.rol : null,
      }));
  
      res.status(200).json(usuariosFormateados);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

const getAllReports = async(req, res) =>{
  try {
    const { titulo, modo_transmision, tipo, bsl, agente_causal, distribucion_sexo, estado} = req.query;
    const searchTermLowerCase1 = titulo.toLowerCase(); // Convertir el término de búsqueda a minúsculas
    const searchTermLowerCase2 = modo_transmision.toLowerCase();
    const searchTermLowerCase3 = tipo.toLowerCase();
    const searchTermLowerCase4 = bsl.toLowerCase();
    const searchTermLowerCase5 = agente_causal.toLowerCase();
    const searchTermLowerCase6 = distribucion_sexo.toLowerCase();
    const searchTermLowerCase7 = estado.toLowerCase();

    // Buscar todos los usuarios que coincidan con el nombre proporcionado (insensible a mayúsculas y minúsculas)
    const reportes = await Reporte.findAll({
    where: {
      // Utilizar operadores `Op.or` para buscar en ambos casos de mayúsculas y minúsculas
      [Sequelize.Op.or]: [
        Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('Reporte.titulo')),
          'LIKE',
          `%${searchTermLowerCase1}%`
        ),
      ],
    },
    include: [
        { model: Usuario, atributes: ['id_usuario']}, 
        { model: Distribucion_Sexo, atributes: ['distribucion'],
        where: {
        [Sequelize.Op.or]: [              
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('Distribucion_Sexo.distribucion')),
            'LIKE',
            `%${searchTermLowerCase6}%`
          )
        ],
      }
        }, 
        { model: Modo_Transmision, atributes: ['modo_transmision'],
          where: {
            [Sequelize.Op.or]: [              
              Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('Modo_Transmision.modo_transmision')),
                'LIKE',
                `%${searchTermLowerCase2}%`
              )
            ],
          }
        },
        { model: Medida_Tiempo, atributes: ['medida']}, 
        {
          model: Agente_Causal, atributes: ['agente'],
          where: {
            // Utilizar operadores `Op.or` para buscar en ambos casos de mayúsculas y minúsculas
            [Sequelize.Op.or]: [
              Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('Agente_Causal.agente')),
                'LIKE',
                `%${searchTermLowerCase5}%`
              ),
            ],
          },
          include: [
            {
              model: Tipo_Enfermedad, attributes: ['tipo'],
              where: {
                [Sequelize.Op.or]: [              
                  Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('Agente_Causal->Tipo_Enfermedad.tipo')),

                    'LIKE',
                    `%${searchTermLowerCase3}%`
                  )
                ],
              }
            }, 
            {
              model: BSL, attributes: ['grupo'],
              where: {
                // Utilizar operadores `Op.or` para buscar en ambos casos de mayúsculas y minúsculas
                [Sequelize.Op.or]: [
                  Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('Agente_Causal->BSL.grupo')),
                    'LIKE',
                    `%${searchTermLowerCase4}%`
                  ),
                ],
              },
            }, 

          ]
        },
        {
          model: Entidad,
          as: 'EntidadReporte', // Alias para la asociación de Entidad con el reporte
          attributes: ['nombre'],
          include: [
            {
              model: Localidad,
              attributes: ['localidad'],
              include: [{ model: Estado, attributes: ['estado'],
              where: {
                // Utilizar operadores `Op.or` para buscar en ambos casos de mayúsculas y minúsculas
                [Sequelize.Op.or]: [
                  Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('EntidadReporte->Localidad->Estado.estado')),
                    'LIKE',
                    `%${searchTermLowerCase7}%`
                  ),
                ],
              },
               }],
            },
          ],
        },
        {
          model: Entidad,
          as: 'EntidadConfirmacion', // Alias para la asociación de Entidad con la confirmación
          attributes: ['nombre'],
          include: [
            {
              model: Localidad,
              attributes: ['localidad'],
              include: [{ model: Estado, attributes: ['estado']
               }],
            },
          ],
        },
    ],
    attributes: [
      'id_reporte',
      'titulo',
      'descripcion',
      'longitud',
      'latitud',
      'altitud',
      'fecha_pid',
      'fecha_upd',
      'duracion_promedio_incubacion',
      'duracion_promedio_enfermedad',
      'signos_sintomas',
      'numero_casos_sospechosos',
      'numero_casos_probables',
      'numero_casos_confirmados',
      'numero_casos_totales',
      'numero_casos_hospitalizados',
      'numero_muertos',
      'numero_casos_uci',
      'aprobado',
      'estado_reporte',
      'fecha_registro',

    ],
  });
  const reportesFormateados = reportes.map(reporte => ({
      // Formatear los datos del reporte para la respuesta
      id_reporte: reporte.id_reporte,
      titulo: reporte.titulo,
      descripcion: reporte.descripcion,
      usuario: reporte.Usuario ? reporte.Usuario.id_usuario :null,
      estado_reporte: reporte.estado_reporte,

      institucion: reporte.EntidadReporte ? reporte.EntidadReporte.nombre : null,
      localidad: reporte.EntidadReporte?.Localidad?.localidad || null,
      estado: reporte.EntidadReporte?.Localidad?.Estado?.estado || null,

      longitud: reporte.longitud,
      latitud: reporte.latitud,
      altitud: reporte.altitud,

      agente_causal: reporte.Agente_Causal ? reporte.Agente_Causal.agente : null,
      bsl: reporte.Agente_Causal?.BSL?.grupo || null,
      tipo: reporte.Agente_Causal?.Tipo_Enfermedad?.tipo || null,
      
      inst_conf: reporte.EntidadConfirmacion ? reporte.EntidadConfirmacion.nombre : null,
      localidad_conf: reporte.EntidadConfirmacion?.Localidad?.localidad || null,
      estado_conf: reporte.EntidadConfirmacion?.Localidad?.Estado?.estado || null,


      distribucion_sexo: reporte.Distribucion_Sexo.distribucion,
      modo_transmision: reporte.Modo_Transmision.modo_transmision,
      
      numero_casos_sospechosos: reporte.numero_casos_sospechosos,
      numero_casos_probables: reporte.numero_casos_probables,
      numero_casos_confirmado: reporte.numero_casos_confirmados,
      numero_casos_totales: reporte.numero_casos_totales,
      numero_casos_hospitalizados: reporte.numero_casos_hospitalizados,
      numero_muertos: reporte.numero_muertos,

      uci: reporte.uci,
      duracion_promedio_incubacion: reporte.duracion_promedio_incubacion,
      duracion_promedio_enfermedad: reporte.duracion_promedio_enfermedad,
      signos_sintomas: reporte.signos_sintomas,

      fecha_pid: reporte.fecha_pid,
      fecha_upd: reporte.fecha_upd,
      fecha_registro: reporte.fecha_registro,

    }));

    res.status(200).json(reportesFormateados);
    // Aquí puedes enviar usuariosFormateados a donde lo necesites
  } catch (error) {
    console.error('Error al obtener reportes:', error);
  }
};



const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const aux = await Reporte.findByPk(id);
        if (!aux) {
            res.status(404).json({ mensaje: 'Estado no encontrado2' });
            return;
        }
        res.status(200).json({ aux });
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

module.exports = {
    create,
    getById,
    getAllReports
};
 