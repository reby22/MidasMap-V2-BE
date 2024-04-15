const {Entidad} = require('../models/associations');

const createEntidad= async (req, res) => {
    try {
      // Extraer la información del cuerpo de la solicitud
      const {nombre, id_localidad, id_estado} = req.body;

      if(!nombre || !id_localidad || !id_estado){
        res.status(400).json({
            msg :  "Datos invalidos"
        });
        return;
    }
      // Crear el usuario en la base de datos
      const nuevoEntidad = await Entidad.create({
        nombre, 
        id_localidad, 
        id_estado
      });
  
      // Enviar una respuesta con el usuario creado
      res.status(201).json({ Entidad: nuevoEntidad });
    } catch (error) {
      // Manejar errores
      console.error('Error al crear el estado:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };




const getEntidadById = async (req, res) => {
    try {
        const { id_entidad } = req.params;
        console.log(id_entidad);
        const entidad = await Entidad.findByPk(id_entidad);
        if (!entidad) {
            res.status(404).json({ mensaje: 'Estado no encontrado' });
            return;
        }
        res.status(200).json({entidad});
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

module.exports = {
    createEntidad,
    getEntidadById
};
 