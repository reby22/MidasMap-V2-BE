const { Rol } = require('../models/associations');

const create = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const { rol } = req.body;

    if (!rol) {
      res.status(400).json({
        msg: "Datos invalidos"
      });
      return;
    }
    // Crear el rol en la base de datos
    const nuevo = await Rol.create({
      rol
    });

    // Enviar una respuesta con el rol creado
    res.status(201).json({ Rol: nuevo });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear el rol:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};




const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const aux = await Rol.findByPk(id);
    if (!aux) {
      res.status(404).json({ mensaje: 'Rol no encontrado' });
      return;
    }
    res.status(200).json({ aux });
  } catch (error) {
    console.error('Error al obtener el rol:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};


const getAll = async (req, res) => {
  Rol.findAll({
    attributes: ['id_rol', 'rol'],
  }).then(roles => {
    const rolesFormateados = roles.map(rol => (
      {
        id_rol: rol.id_rol,
        rol: rol.rol
      }
    ))
    res.status(200).json(rolesFormateados);
  }).catch(error => {
    console.error('Error al obtener roles: ', error);
  });
};


module.exports = {
  create,
  getById,
  getAll,
};
