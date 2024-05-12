const {Agente_Causal} = require('../models/associations');

const create = async (req, res) => {
    try {
      // Extraer la información del cuerpo de la solicitud
      const {agente} = req.body;

      if(!agente){
        res.status(400).json({
            msg :  "Datos invalidos"
        });
        return;
    }
      // Crear el usuario en la base de datos
      const nuevo = await Agente_Causal.create({
        agente
      });

      // Enviar una respuesta con el usuario creado
      res.status(201).json({ Agente_Causal: nuevo});
    } catch (error) {
      // Manejar errores
      console.error('Error al crear el estado:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };




const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const aux = await Agente_Causal.findByPk(id);
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

const getAllAgentes = async (req, res) => {
  Agente_Causal.findAll({
    attributes: ['id_agente', 'agente'],
  }).then(agentes=>{
    const agentesFormateados = agentes.map(agente=> (
      {
        id_agente_causal: agente.id_agente,
        agente: agente.agente,
      }
    ))
    res.status(200).json(agentesFormateados);
  }).catch(error => {
      console.error('Error al obtener agentes:', error);
    });
};

module.exports = {
    create,
    getById,
    getAllAgentes
};
 