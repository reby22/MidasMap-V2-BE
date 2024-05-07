const {Reporte, Agente_Causal, Distribucion_Sexo, Modo_Transmision, Medida_Tiempo, Entidad, Estado, Localidad, Tipo_Enfermedad, BSL, Usuario} = require('../models/associations');

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


const getAllReports = async(req, res) =>{

  Reporte.findAll({
    include: [
        { model: Usuario, atributes: ['id_usuario']}, 
        { model: Distribucion_Sexo, atributes: ['distribucion']}, 
        { model: Modo_Transmision, atributes: ['modo_transmision']},
        { model: Medida_Tiempo, atributes: ['medida']}, 
        {
          model: Agente_Causal, atributes: ['agente'],
          include: [
            {
              model: Tipo_Enfermedad, attributes: ['tipo']
            }, 
            {
              model: BSL, attributes: ['grupo']
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
              include: [{ model: Estado, attributes: ['estado'] }],
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
              include: [{ model: Estado, attributes: ['estado'] }],
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

    ]
  }).then(reportes => {
    // Procesar los usuarios obtenidos aquí
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

      agente_causal: reporte.Agente_Causal.agente,
      bsl: reporte.Agente_Causal?.BSL?.bsl || null,
      tipo: reporte.Agente_Causal?.Tipo_Enfermedad?.tipo || null,
      
      inst_conf: reporte.EntidadConfirmacion ? reporte.EntidadConfirmacion.nombre : null,
      localidad_conf: reporte.EntidadConfirmacion?.Localidad?.localidad || null,
      estado_conf: reporte.EntidadConfirmacion?.Localidad?.Estado?.estado || null,


      distribucion_sexo: reporte.Distribucion_Sexo.id_distribucion_sexo,
      modo_transmision: reporte.Modo_Transmision.id_modo_transmision,
      
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
  }).catch(error => {
    console.error('Error al obtener reportes:', error);
  });
}

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
 