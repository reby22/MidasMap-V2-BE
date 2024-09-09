const { Reporte, Agente_Causal, Ruta_Transmision, Estado, Localidad, Pais, Tipo_Patogeno, Grupo_Riesgo, Usuario, Medida_Tiempo } = require('../models/associations');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const create = async (req, res) => {
  try {
    const fecha_registro = new Date();
    let aprobado = 0;

    // Extraer la información del cuerpo de la solicitud
    const {
      titulo,
      descripcion,
      id_usuario,
      id_ubicacion,
      institucion_casos,
      laboratorio_confirmacion,
      numero_casos_femeninos,
      numero_casos_masculinos,
      numero_casos_sexo_desconocido,
      longitud,
      latitud,
      altitud,
      id_agente_causal,
      id_ruta_transmision,
      numero_casos_sospechosos,
      numero_casos_probables,
      numero_casos_confirmados,
      numero_casos_totales,
      numero_hospitalizados,
      fallecimientos,
      numero_casos_uci,
      periodo_incubacion,
      duracion_promedio_enfermedad,
      signos_sintomas,
      fecha_pid,
      fecha_upd,
      id_medida_dpi,
      id_medida_dpe,
    } = req.body;
    console.log(req.body);
    if (
      !titulo ||
      !descripcion ||
      !id_usuario ||
      !id_ubicacion ||
      !institucion_casos ||
      !numero_casos_femeninos ||
      !numero_casos_masculinos ||
      !numero_casos_sexo_desconocido ||
      !longitud ||
      !latitud ||
      !altitud ||
      !id_agente_causal ||
      !id_ruta_transmision ||
      !numero_casos_sospechosos ||
      !numero_casos_probables ||
      !numero_casos_confirmados ||
      !numero_casos_totales ||
      !numero_hospitalizados ||
      !fallecimientos ||
      !numero_casos_uci ||
      !periodo_incubacion ||
      !duracion_promedio_enfermedad ||
      !signos_sintomas ||
      !fecha_pid ||
      !fecha_upd ||
      !id_medida_dpi ||
      !id_medida_dpe
    ) {
      res.status(400).json({
        msg: "Datos inválidos para el reporte"
      });
      return;
    }
    let usuario = await Usuario.findByPk(id_usuario);
    console.log(usuario);
    let estado_reporte = 'Inactivo';
    if (usuario.id_rol == 1) {
      aprobado = 1;
      estado_reporte = "Activo";
    }
    // Crear el usuario en la base de datos
    const nuevo = await Reporte.create({
      titulo,
      descripcion,
      id_usuario,
      id_ubicacion,
      estado_reporte: estado_reporte,
      aprobado: aprobado,
      institucion_casos,
      laboratorio_confirmacion,
      numero_casos_femeninos,
      numero_casos_masculinos,
      numero_casos_sexo_desconocido,
      longitud,
      latitud,
      altitud,
      id_agente_causal,
      id_ruta_transmision,
      numero_casos_sospechosos,
      numero_casos_probables,
      numero_casos_confirmados,
      numero_casos_totales,
      numero_hospitalizados,
      fallecimientos,
      numero_casos_uci: numero_casos_uci,
      periodo_incubacion,
      duracion_promedio_enfermedad,
      signos_sintomas,
      fecha_pid,
      fecha_upd,
      id_medida_dpi,
      id_medida_dpe,
      fecha_registro: fecha_registro,
    });


    // Enviar una respuesta con el usuario creado
    res.status(201).json({ mensaje: 'Reporte Creado con éxito', Reporte: nuevo });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear el reporte:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const update = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const { id_reporte } = req.body;

    // Buscar el reporte en la base de datos
    let reporte = await Reporte.findByPk(id_reporte);

    // Verificar si el reporte existe
    if (!reporte) {
      return res.status(404).json({ mensaje: "Reporte no encontrado" });
    }

    const updateData = {};

    // Verificar si cada campo está presente en el cuerpo de la solicitud y agregarlo al objeto updateData si es así
    if (req.body.titulo) updateData.titulo = req.body.titulo;
    if (req.body.descripcion) updateData.descripcion = req.body.descripcion;
    if (req.body.id_usuario) updateData.id_usuario = req.body.id_usuario;
    if (req.body.id_ubicacion) updateData.id_ubicacion = req.body.id_ubicacion;
    if (req.body.estado_reporte) updateData.estado_reporte = req.body.estado_reporte;
    if (req.body.institucion_casos) updateData.institucion_casos = req.body.institucion_casos;
    if (req.body.laboratorio_confirmacion) updateData.laboratorio_confirmacion = req.body.laboratorio_confirmacion;
    if (req.body.numero_casos_femeninos) updateData.numero_casos_femeninos = req.body.numero_casos_femeninos;
    if (req.body.numero_casos_masculinos) updateData.numero_casos_masculinos = req.body.numero_casos_masculinos;
    if (req.body.numero_casos_sexo_desconocido) updateData.numero_casos_sexo_desconocido = req.body.numero_casos_sexo_desconocido;
    if (req.body.longitud) updateData.longitud = req.body.longitud;
    if (req.body.latitud) updateData.latitud = req.body.latitud;
    if (req.body.altitud) updateData.altitud = req.body.altitud;
    if (req.body.id_agente_causal) updateData.id_agente_causal = req.body.id_agente_causal;
    if (req.body.id_ruta_transmision) updateData.id_ruta_transmision = req.body.id_ruta_transmision;
    if (req.body.numero_casos_sospechosos) updateData.numero_casos_sospechosos = req.body.numero_casos_sospechosos;
    if (req.body.numero_casos_probables) updateData.numero_casos_probables = req.body.numero_casos_probables;
    if (req.body.numero_casos_confirmados) updateData.numero_casos_confirmados = req.body.numero_casos_confirmados;
    if (req.body.numero_casos_totales) updateData.numero_casos_totales = req.body.numero_casos_totales;
    if (req.body.numero_hospitalizados) updateData.numero_hospitalizados = req.body.numero_hospitalizados;
    if (req.body.fallecimientos) updateData.fallecimientos = req.body.fallecimientos;
    //IMPORTANTE
    if (req.body.numero_casos_uci) updateData.numero_casos_uci = req.body.numero_casos_uci;
    if (req.body.periodo_incubacion) updateData.periodo_incubacion = req.body.periodo_incubacion;
    if (req.body.duracion_promedio_enfermedad) updateData.duracion_promedio_enfermedad = req.body.duracion_promedio_enfermedad;
    if (req.body.signos_sintomas) updateData.signos_sintomas = req.body.signos_sintomas;
    if (req.body.fecha_pid) updateData.fecha_pid = req.body.fecha_pid;
    if (req.body.fecha_upd) updateData.fecha_upd = req.body.fecha_upd;
    if (req.body.aprobado) updateData.aprobado = req.body.aprobado;
    if (req.body.id_medida_dpi) updateData.id_medida_dpi = req.body.id_medida_dpi;
    if (req.body.id_medida_dpe) updateData.id_medida_dpe = req.body.id_medida_dpe;

    // Actualizar el reporte con los datos proporcionados en el cuerpo de la solicitud
    await reporte.update(updateData);


    // Enviar una respuesta con el reporte actualizado
    res.status(201).json({ mensaje: "Reporte actualizado con éxito!", reporte });
  } catch (error) {
    // Manejar errores
    console.error('Error al actualizar el reporte:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getAllReportesPendientes1 = async (req, res) => {
  try {
    const reportesPendientes = await Reporte.findAll({
      where: {
        aprobado: false, // O según el campo que maneje el estado del reporte
      },
      include: [
        { model: Usuario, attributes: ['nombre'] }, // Relación con Usuario
        {
          model: Agente_Causal,
          attributes: ['agente_causal'],
          include: [
            { model: Grupo_Riesgo, attributes: ['grupo_riesgo'] }, // Relación con Grupo_Riesgo
            { model: Tipo_Patogeno, attributes: ['tipo'] }, // Relación con Tipo_Patogeno
          ]
        },
        { model: Ruta_Transmision, attributes: ['ruta_transmision'] }, // Relación con Ruta_Transmision
        {
          model: Localidad,
          attributes: ['localidad'],
          include: [
            {
              model: Estado,
              attributes: ['estado'],
              include: [
                { model: Pais, attributes: ['pais'] } // Relación con País
              ]
            }
          ]
        },
      ],
    });

    if (reportesPendientes.length > 0) {
      res.status(200).json(reportesPendientes);
    } else {
      res.status(404).json({ message: 'No hay reportes pendientes.' });
    }
  } catch (error) {
    console.error('Error al obtener reportes pendientes:', error);
    res.status(500).json({ error: 'Error al obtener los reportes pendientes.' });
  }
};

const getAllReportsPendientes = async (req, res) => {
  try {
    let rutaCondition = {}; //Ruta de transmision
    let tipoConditions = {}; //tipo patogeno 
    let grupoConditions = {}; //grupo de riesgo 
    let agenteConditions = {}; //agente causal
    let estadoConditions = {}; // estado
    let paisConditions = {}; //pais 
    const { titulo, ruta_transmision, tipo, grupo_riesgo, agente_causal, estado, pais } = req.query;
    const searchTermLowerCase = (titulo || '').toLowerCase(); // Convertir el término de búsqueda a minúsculas
    if (ruta_transmision) {
      rutaCondition = {
        id_ruta_transmision: ruta_transmision
      }
    }
    if (tipo) {
      tipoConditions = {
        id_tipo: tipo
      }
    }
    if (grupo_riesgo) {
      grupoConditions = {
        id_grupo_riesgo: grupo_riesgo
      }
    }
    if (agente_causal) {
      agenteConditions = {
        id_agente_causal: agente_causal
      }
    }
    if (estado) {
      estadoConditions = {
        id_estado: estado
      }
    }
    if (pais) {
      paisConditions = {
        id_pais: pais
      }
    }

    // Buscar todos los usuarios que coincidan con el nombre proporcionado (insensible a mayúsculas y minúsculas)
    const reportes = await Reporte.findAll({
      order: [['fecha_registro', 'DESC']],  // Ordenar por el campo 'fecha' en orden descendente (más actual primero)
      where: {
        // Utilizar operadores `Op.or` para buscar en ambos casos de mayúsculas y minúsculas
        [Sequelize.Op.or]: [
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('Reporte.titulo')),
            'LIKE',
            `%${searchTermLowerCase}%`
          ),
        ],
        aprobado: 0
      },
      include: [
        {
          model: Usuario, atributes: ['id_usuario'],

        },
        {
          model: Ruta_Transmision, atributes: ['ruta_transmision'],
          where: rutaCondition
        },
        {
          model: Agente_Causal, atributes: ['agente_causal'],
          where: agenteConditions,
          include: [
            {
              model: Tipo_Patogeno, attributes: ['tipo'],
              where: tipoConditions
            },
            {
              model: Grupo_Riesgo, attributes: ['grupo_riesgo'],
              where: grupoConditions
            },
          ]
        },
        {
          model: Localidad,
          attributes: ['localidad'],
          include: [
            {
              model: Estado,
              attributes: ['estado'],
              where: estadoConditions,
              include: [{
                model: Pais, attributes: ['pais'],
                where: paisConditions
              }],
            },
          ],
        },
        {
          model: Medida_Tiempo,
          as: 'MedidaDpi',
          attributes: ['medida'],
        },
        {
          model: Medida_Tiempo,
          as: 'MedidaDpe',
          attributes: ['medida'],
        }
      ],
      attributes: [
        'id_reporte',
        'titulo',
        'descripcion',
        'institucion_casos',
        'laboratorio_confirmacion',
        'numero_casos_femeninos',
        'numero_casos_masculinos',
        'numero_casos_sexo_desconocido',
        'longitud',
        'latitud',
        'altitud',
        'fecha_pid',
        'fecha_upd',
        'periodo_incubacion',
        'duracion_promedio_enfermedad',
        'signos_sintomas',
        'numero_casos_sospechosos',
        'numero_casos_probables',
        'numero_casos_confirmados',
        'numero_casos_totales',
        'numero_hospitalizados',
        'fallecimientos',
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
      usuario: reporte.Usuario ? reporte.Usuario.id_usuario : null,
      estado_reporte: reporte.estado_reporte,
      institucion_casos: reporte.institucion_casos,
      laboratorio_confirmacion: reporte.laboratorio_confirmacion,
      localidad: reporte.Localidad ? reporte.Localidad.localidad : null,
      estado: reporte.Localidad?.Estado?.estado || null,
      pais: reporte.Localidad?.Estado?.Pai?.pais || null,
      numero_casos_femeninos: reporte.numero_casos_femeninos,
      numero_casos_masculinos: reporte.numero_casos_masculinos,
      numero_casos_sexo_desconocido: reporte.numero_casos_sexo_desconocido,
      longitud: reporte.longitud,
      latitud: reporte.latitud,
      altitud: reporte.altitud,
      agente_causal: reporte.Agente_Causal ?.agente_causal || null,
      grupo_riesgo: reporte.Agente_Causal?.Grupo_Riesgo?.grupo_riesgo || null,
      tipo: reporte.Agente_Causal?.Tipo_Patogeno?.tipo || null,
      ruta_transmision: reporte.Ruta_Transmision.ruta_transmision,
      numero_casos_sospechosos: reporte.numero_casos_sospechosos,
      numero_casos_probables: reporte.numero_casos_probables,
      numero_casos_confirmados: reporte.numero_casos_confirmados,
      numero_casos_totales: reporte.numero_casos_totales,
      numero_hospitalizados: reporte.numero_hospitalizados,
      fallecimientos: reporte.fallecimientos,
      uci: reporte.numero_casos_uci,
      periodo_incubacion: reporte.periodo_incubacion,
      duracion_promedio_enfermedad: reporte.duracion_promedio_enfermedad,
      signos_sintomas: reporte.signos_sintomas,
      fecha_pid: reporte.fecha_pid,
      fecha_upd: reporte.fecha_upd,
      id_medida_dpi: reporte.MedidaDpi?.medida || null,
      id_medida_dpe: reporte.MedidaDpe?.medida || null,
      fecha_registro: reporte.fecha_registro,
    }));

    res.status(200).json(reportesFormateados);
    // Aquí puedes enviar usuariosFormateados a donde lo necesites
  } catch (error) {
    console.error('Error al obtener reportes:', error);
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
};

const getAllReportsAceptados = async (req, res) => {
  try {
    let rutaCondition = {};
    let tipoConditions = {};
    let grupoConditions = {};
    let agenteConditions = {};
    let estadoConditions = {};
    let paisConditions = {};
    const { titulo, ruta_transmision, tipo, grupo_riesgo, agente_causal, estado, pais } = req.query;
    const searchTermLowerCase1 = (titulo || '').toLowerCase(); // Convertir el término de búsqueda a minúsculas
    if (ruta_transmision) {
      rutaCondition = {
        id_ruta_transmision: ruta_transmision
      }
    }
    if (tipo) {
      tipoConditions = {
        id_tipo: tipo
      }
    }
    if (grupo_riesgo) {
      grupoConditions = {
        id_grupo_riesgo: grupo_riesgo
      }
    }
    if (agente_causal) {
      agenteConditions = {
        id_agente_causal: agente_causal
      }
    }
    if (estado) {
      estadoConditions = {
        id_estado: estado
      }
    }
    if (pais) {
      paisConditions = {
        id_pais: pais
      }
    }

    // Buscar todos los usuarios que coincidan con el nombre proporcionado (insensible a mayúsculas y minúsculas)
    const reportes = await Reporte.findAll({
      order: [['fecha_registro', 'DESC']],
      where: {
        // Utilizar operadores `Op.or` para buscar en ambos casos de mayúsculas y minúsculas
        [Sequelize.Op.or]: [
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('Reporte.titulo')),
            'LIKE',
            `%${searchTermLowerCase1}%`
          ),
        ],
        aprobado: 1
      },
      include: [
        {
          model: Usuario, atributes: ['id_usuario'],
        },
        {
          model: Ruta_Transmision, atributes: ['ruta_transmision'],
          where: rutaCondition
        },
        {
          model: Agente_Causal, atributes: ['agente_causal'],
          where: agenteConditions,
          include: [
            {
              model: Tipo_Patogeno, attributes: ['tipo'],
              where: tipoConditions

            },
            {
              model: Grupo_Riesgo, attributes: ['grupo_riesgo'],
              where: grupoConditions
            },
          ]
        },
        {
          model: Localidad,
          attributes: ['localidad'],
          include: [
            {
              model: Estado,
              attributes: ['estado'],
              where: estadoConditions,
              include: [{
                model: Pais, attributes: ['pais'],
                where: paisConditions
              }],
            },
          ],
        },
        {
          model: Medida_Tiempo,
          as: 'MedidaDpi',
          attributes: ['medida'],
        },
        {
          model: Medida_Tiempo,
          as: 'MedidaDpe',
          attributes: ['medida'],
        }
      ],
      attributes: [
        'id_reporte',
        'titulo',
        'descripcion',
        'institucion_casos',
        'laboratorio_confirmacion',
        'numero_casos_femeninos',
        'numero_casos_masculinos',
        'numero_casos_sexo_desconocido',
        'longitud',
        'latitud',
        'altitud',
        'fecha_pid',
        'fecha_upd',
        'periodo_incubacion',
        'duracion_promedio_enfermedad',
        'signos_sintomas',
        'numero_casos_sospechosos',
        'numero_casos_probables',
        'numero_casos_confirmados',
        'numero_casos_totales',
        'numero_hospitalizados',
        'fallecimientos',
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
      usuario: reporte.Usuario ? reporte.Usuario.id_usuario : null,
      estado_reporte: reporte.estado_reporte,
      institucion_casos: reporte.institucion_casos,
      laboratorio_confirmacion: reporte.laboratorio_confirmacion,
      localidad: reporte.Localidad ? reporte.Localidad.localidad : null,
      estado: reporte.Localidad?.Estado?.estado || null,
      pais: reporte.Localidad?.Estado?.Pai?.pais || null,
      numero_casos_femeninos: reporte.numero_casos_femeninos,
      numero_casos_masculinos: reporte.numero_casos_masculinos,
      numero_casos_sexo_desconocido: reporte.numero_casos_sexo_desconocido,
      longitud: reporte.longitud,
      latitud: reporte.latitud,
      altitud: reporte.altitud,
      agente_causal: reporte.Agente_Causal ?.agente_causal || null,
      grupo_riesgo: reporte.Agente_Causal?.Grupo_Riesgo?.grupo_riesgo || null,
      tipo: reporte.Agente_Causal?.Tipo_Patogeno?.tipo || null,
      ruta_transmision: reporte.Ruta_Transmision.ruta_transmision,
      numero_casos_sospechosos: reporte.numero_casos_sospechosos,
      numero_casos_probables: reporte.numero_casos_probables,
      numero_casos_confirmados: reporte.numero_casos_confirmados,
      numero_casos_totales: reporte.numero_casos_totales,
      numero_hospitalizados: reporte.numero_hospitalizados,
      fallecimientos: reporte.fallecimientos,
      uci: reporte.numero_casos_uci,
      periodo_incubacion: reporte.periodo_incubacion,
      duracion_promedio_enfermedad: reporte.duracion_promedio_enfermedad,
      signos_sintomas: reporte.signos_sintomas,
      fecha_pid: reporte.fecha_pid,
      fecha_upd: reporte.fecha_upd,
      id_medida_dpi: reporte.MedidaDpi?.medida || null,
      id_medida_dpe: reporte.MedidaDpe?.medida || null,
      fecha_registro: reporte.fecha_registro,
    }));

    res.status(200).json(reportesFormateados);
    // Aquí puedes enviar usuariosFormateados a donde lo necesites
  } catch (error) {
    console.error('Error al obtener reportes:', error);
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
};

const getAllReportsinMap = async (req, res) => {
  try {
    let rutaCondition = {};
    let tipoConditions = {};
    let grupoConditions = {};
    let agenteConditions = {};
    let estadoConditions = {};
    let paisConditions = {};
    const { titulo, ruta_transmision, tipo, grupo_riesgo, agente_causal, estado, pais, fecha_inicio, fecha_fin } = req.query;
    const searchTermLowerCase1 = (titulo || '').toLowerCase(); // Convertir el término de búsqueda a minúsculas
    if (ruta_transmision) {
      rutaCondition = {
        id_ruta_transmision: ruta_transmision
      }
    }
    if (tipo) {
      tipoConditions = {
        id_tipo: tipo
      }
    }
    if (grupo_riesgo) {
      grupoConditions = {
        id_grupo_riesgo: grupo_riesgo
      }
    }
    if (agente_causal) {
      agenteConditions = {
        id_agente_causal: agente_causal
      }
    }
    if (estado) {
      estadoConditions = {
        id_estado: estado
      }
    }
    if (pais) {
      paisConditions = {
        id_pais: pais
      }
    }
    // Buscar todos los usuarios que coincidan con el nombre proporcionado (insensible a mayúsculas y minúsculas)
    const reportes = await Reporte.findAll({
      order: [['fecha_registro', 'DESC']],
      where: {
        fecha_registro: { [Op.between]: [fecha_inicio, fecha_fin] },
        // Utilizar operadores `Op.or` para buscar en ambos casos de mayúsculas y minúsculas
        [Sequelize.Op.or]: [
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('Reporte.titulo')),
            'LIKE',
            `%${searchTermLowerCase1}%`
          ),
        ],
        estado_reporte: 'Activo',
        aprobado: 1,

      },
      include: [
        { model: Usuario, atributes: ['id_usuario'] },
        {
          model: Ruta_Transmision, atributes: ['ruta_transmision'],
          where: rutaCondition
        },
        {
          model: Agente_Causal, atributes: ['agente_causal'],
          where: agenteConditions,
          include: [
            {
              model: Tipo_Patogeno, attributes: ['tipo'],
              where: tipoConditions
            },
            {
              model: Grupo_Riesgo, attributes: ['grupo_riesgo'],
              where: grupoConditions
            },
          ]
        },
        {
          model: Localidad,
          attributes: ['localidad'],
          include: [
            {
              model: Estado,
              attributes: ['estado'],
              where: estadoConditions,
              include: [{
                model: Pais, attributes: ['pais'],
                where: paisConditions
              }],
            },
          ],
        },
        {
          model: Medida_Tiempo,
          as: 'MedidaDpi',
          attributes: ['medida'],
        },
        {
          model: Medida_Tiempo,
          as: 'MedidaDpe',
          attributes: ['medida'],
        }
      ],
      attributes: [
        'id_reporte',
        'titulo',
        'descripcion',
        'institucion_casos',
        'laboratorio_confirmacion',
        'numero_casos_femeninos',
        'numero_casos_masculinos',
        'numero_casos_sexo_desconocido',
        'longitud',
        'latitud',
        'altitud',
        'fecha_pid',
        'fecha_upd',
        'periodo_incubacion',
        'duracion_promedio_enfermedad',
        'signos_sintomas',
        'numero_casos_sospechosos',
        'numero_casos_probables',
        'numero_casos_confirmados',
        'numero_casos_totales',
        'numero_hospitalizados',
        'fallecimientos',
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
      usuario: reporte.Usuario ? reporte.Usuario.id_usuario : null,
      estado_reporte: reporte.estado_reporte,
      institucion_casos: reporte.institucion_casos,
      laboratorio_confirmacion: reporte.laboratorio_confirmacion,
      localidad: reporte.Localidad ? reporte.Localidad.localidad : null,
      estado: reporte.Localidad?.Estado?.estado || null,
      pais: reporte.Localidad?.Estado?.Pai?.pais || null,
      numero_casos_femeninos: reporte.numero_casos_femeninos,
      numero_casos_masculinos: reporte.numero_casos_masculinos,
      numero_casos_sexo_desconocido: reporte.numero_casos_sexo_desconocido,
      longitud: reporte.longitud,
      latitud: reporte.latitud,
      altitud: reporte.altitud,
      agente_causal: reporte.Agente_Causal ?.agente_causal || null,
      grupo_riesgo: reporte.Agente_Causal?.Grupo_Riesgo?.grupo_riesgo || null,
      tipo: reporte.Agente_Causal?.Tipo_Patogeno?.tipo || null,
      ruta_transmision: reporte.Ruta_Transmision.ruta_transmision,
      numero_casos_sospechosos: reporte.numero_casos_sospechosos,
      numero_casos_probables: reporte.numero_casos_probables,
      numero_casos_confirmados: reporte.numero_casos_confirmados,
      numero_casos_totales: reporte.numero_casos_totales,
      numero_hospitalizados: reporte.numero_hospitalizados,
      fallecimientos: reporte.fallecimientos,
      uci: reporte.numero_casos_uci,
      periodo_incubacion: reporte.periodo_incubacion,
      duracion_promedio_enfermedad: reporte.duracion_promedio_enfermedad,
      signos_sintomas: reporte.signos_sintomas,
      fecha_pid: reporte.fecha_pid,
      fecha_upd: reporte.fecha_upd,
      id_medida_dpi: reporte.MedidaDpi?.medida || null,
      id_medida_dpe: reporte.MedidaDpe?.medida || null,
      fecha_registro: reporte.fecha_registro,
    }));

    res.status(200).json(reportesFormateados);
    // Aquí puedes enviar usuariosFormateados a donde lo necesites
  } catch (error) {
    console.error('Error al obtener reportes:', error);
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
};

const getByIdUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    let rutaCondition = {};
    let tipoConditions = {};
    let grupoConditions = {};
    let agenteConditions = {};
    let estadoConditions = {};
    let paisConditions = {};
    const { titulo, ruta_transmision, tipo, grupo_riesgo, agente_causal, estado, pais } = req.query;
    const searchTermLowerCase1 = (titulo || '').toLowerCase(); // Convertir el término de búsqueda a minúsculas
    usuarioConditions = {id_usuario: id}
    if (ruta_transmision) {
      rutaCondition = {
        id_ruta_transmision: ruta_transmision
      }
    }
    if (tipo) {
      tipoConditions = {
        id_tipo: tipo
      }
    }
    if (grupo_riesgo) {
      grupoConditions = {
        id_grupo_riesgo: grupo_riesgo
      }
    }
    if (agente_causal) {
      agenteConditions = {
        id_agente_causal: agente_causal
      }
    }
    if (estado) {
      estadoConditions = {
        id_estado: estado
      }
    }
    if (pais) {
      paisConditions = {
        id_pais: pais
      }
    }

    // Buscar todos los usuarios que coincidan con el nombre proporcionado (insensible a mayúsculas y minúsculas)
    const reportes = await Reporte.findAll({
      order: [['fecha_registro', 'DESC']],
      where: {
        // Utilizar operadores `Op.or` para buscar en ambos casos de mayúsculas y minúsculas
        [Sequelize.Op.or]: [
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('Reporte.titulo')),
            'LIKE',
            `%${searchTermLowerCase1}%`
          ),
        ],
        aprobado: 1
      },
      include: [
        {
          model: Usuario, atributes: ['id_usuario'],
          where: usuarioConditions,
        },
        {
          model: Ruta_Transmision, atributes: ['ruta_transmision'],
          where: rutaCondition
        },
        {
          model: Agente_Causal, atributes: ['agente_causal'],
          where: agenteConditions,
          include: [
            {
              model: Tipo_Patogeno, attributes: ['tipo'],
              where: tipoConditions

            },
            {
              model: Grupo_Riesgo, attributes: ['grupo_riesgo'],
              where: grupoConditions
            },
          ]
        },
        {
          model: Localidad,
          attributes: ['localidad'],
          include: [
            {
              model: Estado,
              attributes: ['estado'],
              where: estadoConditions,
              include: [{
                model: Pais, attributes: ['pais'],
                where: paisConditions
              }],
            },
          ],
        },
        {
          model: Medida_Tiempo,
          as: 'MedidaDpi',
          attributes: ['medida'],
        },
        {
          model: Medida_Tiempo,
          as: 'MedidaDpe',
          attributes: ['medida'],
        }
      ],
      attributes: [
        'id_reporte',
        'titulo',
        'descripcion',
        'institucion_casos',
        'laboratorio_confirmacion',
        'numero_casos_femeninos',
        'numero_casos_masculinos',
        'numero_casos_sexo_desconocido',
        'longitud',
        'latitud',
        'altitud',
        'fecha_pid',
        'fecha_upd',
        'periodo_incubacion',
        'duracion_promedio_enfermedad',
        'signos_sintomas',
        'numero_casos_sospechosos',
        'numero_casos_probables',
        'numero_casos_confirmados',
        'numero_casos_totales',
        'numero_hospitalizados',
        'fallecimientos',
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
      usuario: reporte.Usuario ? reporte.Usuario.id_usuario : null,
      estado_reporte: reporte.estado_reporte,
      institucion_casos: reporte.institucion_casos,
      laboratorio_confirmacion: reporte.laboratorio_confirmacion,
      localidad: reporte.Localidad ? reporte.Localidad.localidad : null,
      estado: reporte.Localidad?.Estado?.estado || null,
      pais: reporte.Localidad?.Estado?.Pai?.pais || null,
      numero_casos_femeninos: reporte.numero_casos_femeninos,
      numero_casos_masculinos: reporte.numero_casos_masculinos,
      numero_casos_sexo_desconocido: reporte.numero_casos_sexo_desconocido,
      longitud: reporte.longitud,
      latitud: reporte.latitud,
      altitud: reporte.altitud,
      agente_causal: reporte.Agente_Causal ?.agente_causal || null,
      grupo_riesgo: reporte.Agente_Causal?.Grupo_Riesgo?.grupo_riesgo || null,
      tipo: reporte.Agente_Causal?.Tipo_Patogeno?.tipo || null,
      ruta_transmision: reporte.Ruta_Transmision.ruta_transmision,
      numero_casos_sospechosos: reporte.numero_casos_sospechosos,
      numero_casos_probables: reporte.numero_casos_probables,
      numero_casos_confirmados: reporte.numero_casos_confirmados,
      numero_casos_totales: reporte.numero_casos_totales,
      numero_hospitalizados: reporte.numero_hospitalizados,
      fallecimientos: reporte.fallecimientos,
      uci: reporte.numero_casos_uci,
      periodo_incubacion: reporte.periodo_incubacion,
      duracion_promedio_enfermedad: reporte.duracion_promedio_enfermedad,
      signos_sintomas: reporte.signos_sintomas,
      fecha_pid: reporte.fecha_pid,
      fecha_upd: reporte.fecha_upd,
      id_medida_dpi: reporte.MedidaDpi?.medida || null,
      id_medida_dpe: reporte.MedidaDpe?.medida || null,
      fecha_registro: reporte.fecha_registro,
    }));

    res.status(200).json(reportesFormateados);
    // Aquí puedes enviar usuariosFormateados a donde lo necesites
  } catch (error) {
    console.error('Error al obtener reportes:', error);
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    // Eliminar el reporte por su ID
    await Reporte.destroy({ where: { id_reporte: id } });
    res.status(200).json({ mensaje: 'Reporte eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el reporte:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};


module.exports = {
  create,
  getByIdUsuario,
  getAllReportsinMap,
  getAllReportsPendientes,
  update,
  destroy,
  getAllReportsAceptados
};
