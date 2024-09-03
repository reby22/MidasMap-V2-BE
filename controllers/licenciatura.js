const { Licenciatura } = require('../models/associations');

const create = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const { nombre_licenciatura } = req.body;

    if (!nombre_licenciatura) {
      res.status(400).json({
        msg: "Datos invalidos"
      });
      return;
    }
    // Crear licenciatura en la base de datos
    const nuevo = await Licenciatura.create({
      nombre_licenciatura
    });

    // Enviar una respuesta con licenciatura creada
    res.status(201).json({ Licenciatura: nuevo });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear licenciatura:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};




const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const aux = await Licenciatura.findByPk(id);
    if (!aux) {
      res.status(404).json({ mensaje: 'Licenciatura no encontrada' });
      return;
    }
    res.status(200).json({ aux });
  } catch (error) {
    console.error('Error al obtener licenciatura:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getAll = async (req, res) => {
  Licenciatura.findAll({
    attributes: ['id_licenciatura', 'licenciatura'],
  }).then(licenciaturas => {
    const licenciaturasFormateados = licenciaturas.map(licenciatura => (
      {
        id_licenciatura: licenciatura.id_licenciatura,
        licenciatura: licenciatura.licenciatura
      }
    ))
    res.status(200).json(licenciaturasFormateados);
  }).catch(error => {
    console.error('Error al obtener titulos:', error);
  });
};

module.exports = {
  create,
  getById,
  getAll
};
