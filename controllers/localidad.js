const {Localidad} = require('../models/associations');

const createLocalidad = async (req, res) => {
    try {
      // Extraer la información del cuerpo de la solicitud
      const {localidad} = req.body;

      if(!localidad){
        res.status(400).json({
            msg :  "Datos invalidos"
        });
        return;
    }
      // Crear el usuario en la base de datos
      const nuevoLocalidad = await Localidad.create({
        localidad
      });
  
      // Enviar una respuesta con el usuario creado
      res.status(201).json({ Localidad: nuevoLocalidad });
    } catch (error) {
      // Manejar errores
      console.error('Error al crear el estado:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };




const getLocalidadById = async (req, res) => {
    try {
        const { id_localidad } = req.params;
        console.log(id_localidad);
        const localidad = await Localidad.findByPk(id_localidad);
        if (!localidad) {
            res.status(404).json({ mensaje: 'Estado no encontrado' });
            return;
        }
        res.status(200).json({ localidad });
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

module.exports = {
    createLocalidad,
    getLocalidadById
};
 