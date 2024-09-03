const { Agente_Causal } = require('../models/associations');

const create = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const { agente_causal } = req.body;

    if (!agente_causal) {
      res.status(400).json({
        msg: "Datos invalidos"
      });
      return;
    }
    // Crear  en la base de datos
    const nuevo = await Agente_Causal.create({
      agente_causal
    });

    // Enviar una respuesta de AC
    res.status(201).json({ Agente_Causal: nuevo });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear el agente causal:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};




const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const aux = await Agente_Causal.findByPk(id);
    if (!aux) {
      res.status(404).json({ mensaje: 'Agente causal no encontrado' });
      return;
    }
    res.status(200).json({ aux });
  } catch (error) {
    console.error('Error al obtener el agente causal:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getAll = async (req, res) => {
  const { id_grupo_riesgo, id_tipo_patogeno } = req.query;
  Agente_Causal.findAll({
    attributes: ['id_agente_causal', 'agente_causal', 'id_grupo_riesgo', 'id_tipo_patogeno'],
    where: {
      id_tipo_patogeno: id_tipo_patogeno,
      id_grupo_riesgo: id_grupo_riesgo
    },
    order: [['agente_causal', 'ASC']]  // Ordenar por el campo 'agente' en orden ascendente (alfabético)
  }).then(agentes => {
    const agentesFormateados = agentes.map(agente_causal => (
      {
        id_agente_causal: agente_causal.id_agente_causal,
        agente_causal: agente_causal.agente_causal,
      }
    ))
    res.status(200).json(agentesFormateados);
  }).catch(error => {
    console.error('Error al obtener agentes causales:', error);
  });
};

module.exports = {
  create,
  getById,
  getAll
};