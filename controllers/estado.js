const { Estado } = require('../models/associations');

const create = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const { estado } = req.body;

    if (!estado) {
      res.status(400).json({
        msg: "Datos invalidos"
      });
      return;
    }
    // Crear el estado en la base de datos
    const nuevo = await Estado.create({
      estado
    });

    // Enviar una respuesta con el estado creado
    res.status(201).json({ Estado: nuevo });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear el estado:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};


const getAll = async (req, res) => {
  const { id_pais } = req.query;
  Estado.findAll({
    attributes: ['id_estado', 'estado', 'id_pais'],
    where: { id_pais: id_pais },
    order: [['agente_causal', 'ASC']]
  }).then(estados => {
    const estadosFormateados = estados.map(estado => (
      {
        id_estado: estado.id_estado,
        estado: estado.estado,
        id_pais: estado.id_pais
      }
    ))
    res.status(200).json(estadosFormateados);
  }).catch(error => {
    console.error('Error al obtener estados:', error);
  });
};





const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const aux = await Estado.findByPk(id);
    if (!aux) {
      res.status(404).json({ mensaje: 'Estado no encontrado' });
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
  getAll
};