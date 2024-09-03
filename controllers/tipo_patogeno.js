const { Tipo_Patogeno } = require('../models/associations');

const getAll = async (req, res) => {
  //tipo
  Tipo_Patogeno.findAll({
    attributes: ['id_tipo', 'tipo'],
  }).then(tipos => {
    const tiposFormateados = tipos.map(tipo => (
      {
        id_tipo: tipo.id_tipo,
        tipo: tipo.tipo,
      }
    ))
    res.status(200).json(tiposFormateados);
  }).catch(error => {
    console.error('Error al obtener tipos de patogenos:', error);

  });

}

module.exports = {
  getAll
};

