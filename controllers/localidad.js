const { Localidad } = require('../models/associations');

const create = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const { localidad } = req.body;

    if (!localidad) {
      res.status(400).json({
        msg: "Datos invalidos"
      });
      return;
    }
    // Crear localidad en la base de datos
    const nuevoLocalidad = await Localidad.create({
      localidad
    });

    // Enviar una respuesta con localidad creada
    res.status(201).json({ Localidad: nuevoLocalidad });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear localidad:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getAll = async (req, res) => {
  const { id_estado } = req.params;
  Localidad.findAll({
    attributes: ['id_localidad', 'localidad', 'id_estado'],
    where: { id_estado: id_estado }
  }).then(localidades => {
    const localidadesFormateados = localidades.map(localidad => (
      {
        id_localidad: localidad.id_localidad,
        localidad: localidad.localidad,
        id_estado: localidad.id_estado
      }
    ))
    res.status(200).json(localidadesFormateados);
  }).catch(error => {
    console.error('Error al obtener estados:', error);
  });
};

const getById = async (req, res) => {
  try {
    const { id_localidad } = req.params;
    const localidad = await Localidad.findByPk(id_localidad);
    if (!localidad) {
      res.status(404).json({ mensaje: 'Localida no encontrada' });
      return;
    }
    res.status(200).json({ localidad });
  } catch (error) {
    console.error('Error al obtener localidad: ', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  create,
  getById,
  getAll
};