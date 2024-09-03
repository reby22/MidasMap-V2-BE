const { Grupo_Riesgo } = require('../models/associations');


const getAll = async (req, res) => {
  Grupo_Riesgo.findAll({
    attributes: ['id_grupo_riesgo', 'grupo_riesgo'],
  }).then(grupos_riesgo => {
    const gruposFormateados = grupos_riesgo.map(grupo => (
      {
        id_grupo_riesgo: grupo.id_grupo_riesgo,
        grupo_riesgo: grupo.grupo_riesgo,
      }
    ))
    res.status(200).json(gruposFormateados);
  }).catch(error => {
    console.error('Error al obtener Grupos de riesgo:', error);
  });
};

module.exports = {
  getAll
};
