const { Alerta, Tipo_Alerta, Usuario, Riesgo } = require('../models/associations');

const create = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const {
      id_usuario,
      id_tipo,
      id_riesgo,
      fecha_inicio,
      fecha_fin,
      ubicacion,
      descripcion } = req.body;

    if (!id_usuario || !id_tipo || !id_riesgo || !fecha_inicio || !fecha_fin || !ubicacion || !descripcion) {
      res.status(400).json({
        msg: "Datos invalidos"
      });
      return;
    }
    // Crear el usuario en la base de datos
    const nuevo = await Alerta.create({
      id_usuario,
      id_tipo,
      id_riesgo,
      fecha_inicio,
      fecha_fin,
      ubicacion,
      descripcion
    });

    // Enviar una respuesta con el usuario creado
    res.status(201).json({ Alerta: nuevo });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear el estado:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getAllAlerts = async (req, res) => {
  Alerta.findAll({
    include: [
      { model: Usuario, atributes: ['id_usuario'] },
      { model: Tipo_Alerta, atributes: ['id_tipo'] },
      { model: Riesgo, atributes: ['id_riesgo'] }
    ],
    atributes: [
      'id_alerta',
      'fecha_inicio',
      'fecha_fin',
      'ubicacion',
      'descripcion'
    ]
  }).then(alertas => {
    const alertasFormateados = alertas.map(alerta => ({
      id_alerta: alerta.id_alerta,
      fecha_inicio: alerta.fecha_inicio,
      fecha_fin: alerta.fecha_fin,
      ubicacion: alerta.ubicacion,
      descripcion: alerta.descripcion,
    }));
    res.status(200).json(alertasFormateados);
  }).catch(error => {
    console.error('Error al obtener alertas:', error);
  });
}

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const aux = await Alerta.findByPk(id);
    if (!aux) {
      res.status(404).json({ mensaje: 'no' });
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
  getAllAlerts
};
