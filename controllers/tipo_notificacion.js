const { Tipo_Notificacion } = require('../models/associations');

const create = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const { tipo } = req.body;

    if (!tipo) {
      res.status(400).json({
        msg: "Datos invalidos"
      });
      return;
    }
    // Crear el tipo_notificacion en la base de datos
    const nuevo = await Tipo_Notificacion.create({
      tipo
    });

    // Enviar una respuesta con el tipo creado
    res.status(201).json({ Tipo_Notificacion: nuevo });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear el tipo de notificacion:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getAll = async (req, res) => {
  Tipo_Notificacion.findAll({
    atributes: [
      'id_tipo',
      'tipo'
    ]
  }).then(tipo_notificaciones => {
    const tiposFormateados = tipo_notificaciones.map(tipo_notificacion => ({
      id_tipo: tipo_notificacion.id_tipo,
      tipo: tipo_notificacion.tipo
    }));
    res.status(200).json(tiposFormateados);
  }).catch(error => {
    console.error('Error al obtener tipos de notificaciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
}

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const aux = await Tipo_Notificacion.findByPk(id);
    if (!aux) {
      res.status(404).json({ mensaje: 'Tipo de notificación no encontrado' });
      return;
    }
    res.status(200).json({ aux });
  } catch (error) {
    console.error('Error al obtener el tipo de notificacion:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  create,
  getAll,
  getById
};