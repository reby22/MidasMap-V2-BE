const { Grado } = require('../models/associations');

const create = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const { nombre_grado } = req.body;

    if (!nombre_grado) {
      res.status(400).json({
        msg: "Datos invalidos"
      });
      return;
    }
    // Crear el grado en la base de datos
    const nuevo = await Grado.create({
      nombre_grado
    });

    // Enviar una respuesta con el grado creado
    res.status(201).json({ Grado: nuevo });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear el grado:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};




const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const aux = await Grado.findByPk(id);
    if (!aux) {
      res.status(404).json({ mensaje: 'Grado no encontrado' });
      return;
    }
    res.status(200).json({ aux });
  } catch (error) {
    console.error('Error al obtener el grado:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getAll = async (req, res) => {
  Grado.findAll({
    attributes: ['id_grado', 'grado'],
  }).then(grados => {
    const gradosFormateados = grados.map(grado => (
      {
        id_grado: grado.id_grado,
        grado: grado.grado
      }
    ))
    res.status(200).json(gradosFormateados);
  }).catch(error => {
    console.error('Error al obtener grados: ', error);
  });
};

module.exports = {
  create,
  getById,
  getAll
};
