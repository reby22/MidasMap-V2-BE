const {BSL} = require('../models/associations');


const getAllbsls = async (req, res) => {
  BSL.findAll({
    attributes: ['id_bsl', 'grupo'],
  }).then(bsls=>{
    const bslsFormateados = bsls.map(bsl=> (
      {
        id_bsl: bsl.id_bsl,
        grupo: bsl.grupo,
      }
    ))
    res.status(200).json(bslsFormateados);
  }).catch(error => {
      console.error('Error al obtener BSLs:', error);
    });
};

module.exports = {
    getAllbsls,
};
 