const {Titulo} = require('../models/associations');

const create= async (req, res) => {
    try {
      // Extraer la información del cuerpo de la solicitud
      const {nombre_titulo} = req.body;

      if(!nombre_titulo){
        res.status(400).json({
            msg :  "Datos invalidos"
        });
        return;
    }
      // Crear el usuario en la base de datos
      const nuevo = await Titulo.create({
        nombre_titulo
      });
  
      // Enviar una respuesta con el usuario creado
      res.status(201).json({ Titulo: nuevo });
    } catch (error) {
      // Manejar errores
      console.error('Error al crear el estado:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };




const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const aux = await Titulo.findByPk(id);
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
 