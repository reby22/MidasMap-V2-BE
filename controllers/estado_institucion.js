const {Estado_institucion} = require('../models/associations');

const createEstado = async (req, res) => {
    try {
      // Extraer la información del cuerpo de la solicitud
      const {estado} = req.body;

      if(!estado){
        res.status(400).json({
            msg :  "Datos invalidos"
        });
        return;
    }
      // Crear el usuario en la base de datos
      const nuevoEstado = await Estado_institucion.create({
        estado
      });
  
      // Enviar una respuesta con el usuario creado
      res.status(201).json({ Estado_institucion: nuevoEstado });
    } catch (error) {
      // Manejar errores
      console.error('Error al crear el estado:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };




const getEstadoById = async (req, res) => {
    try {
        const { id_estado } = req.params;
        console.log(id_estado);
        const estado = await Estado_institucion.findByPk(id_estado);
        if (!estado) {
            res.status(404).json({ mensaje: 'Estado no encontrado' });
            return;
        }
        res.status(200).json({ estado });
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

module.exports = {
    createEstado,
    getEstadoById
};
 