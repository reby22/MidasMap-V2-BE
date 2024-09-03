const { Riesgo } = require('../models/associations');
const Sequelize = require('sequelize');

const create = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const { riesgo } = req.body;

    if (!riesgo) {
      res.status(400).json({
        msg: "Datos invalidos"
      });
      return;
    }
    // Crear el riesgo en la base de datos
    const nuevo = await Riesgo.create({
      riesgo
    });

    // Enviar una respuesta con el riesgo creado
    res.status(201).json({ Riesgo: nuevo });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear el riesgo:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};


const getAll = async (req, res) => {
  Riesgo.findAll({
    atributes: [
      'id_riesgo',
      'riesgo'
    ]
  }).then(riesgos => {
    const riesgosFormateados = riesgos.map(riesgo => ({
      id_riesgo: riesgo.id_riesgo,
      riesgo: riesgo.riesgo
    }));
    res.status(200).json(riesgosFormateados);
  }).catch(error => {
    console.error('Error al obtener riesgos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
}

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const aux = await Riesgo.findByPk(id);
    if (!aux) {
      res.status(404).json({ mensaje: 'Riesgo no encontrado' });
      return;
    }
    res.status(200).json({ aux });
  } catch (error) {
    console.error('Error al obtener el riesgo:', error);
    res.status(500).json({ mensaje: 'Error interno del riesgo' });
  }
};

module.exports = {
  create,
  getById,
  getAll
};
