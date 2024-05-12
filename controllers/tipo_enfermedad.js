const {Tipo_Enfermedad} = require('../models/associations');

const getAllenfermedades = async (req, res) => {
  //tipo
  Tipo_Enfermedad.findAll({
    attributes: ['id_tipo', 'tipo'],
  }).then(tipos=>{
    const tiposFormateados = tipos.map(tipo=> (
      {
        id_tipo : tipo.id_tipo,
        tipo: tipo.tipo,
      }
    ))
    res.status(200).json(tiposFormateados);
    }).catch(error => {
      console.error('Error al obtener tipos_enfermedades:', error);
      
    });

}

module.exports = {
  getAllenfermedades
};

