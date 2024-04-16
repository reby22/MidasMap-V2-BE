const {Licenciatura} = require('../models/associations');

const create= async (req, res) => {
    try {
      // Extraer la información del cuerpo de la solicitud
      const {nombre_licenciatura} = req.body;

      if(!nombre_licenciatura){
        res.status(400).json({
            msg :  "Datos invalidos"
        });
        return;
    }
      // Crear el usuario en la base de datos
      const nuevo = await Licenciatura.create({
        nombre_licenciatura
      });
  
      // Enviar una respuesta con el usuario creado
      res.status(201).json({ Licenciatura: nuevo });
    } catch (error) {
      // Manejar errores
      console.error('Error al crear el estado:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };




const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const aux = await Licenciatura.findByPk(id);
        if (!aux) {
            res.status(404).json({ mensaje: 'Estado no encontrado' });
            return;
        }
        res.status(200).json({aux});
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

module.exports = {
    create,
    getById
};
 