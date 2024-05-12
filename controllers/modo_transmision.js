const {Modo_Transmision} = require('../models/associations');

const getAllmodos = async (req, res) => {
    Modo_Transmision.findAll({
        attributes: ['id_modo_transmision', 'modo_transmision'],
      }).then(modos=>{
        const modosFormateados = modos.map(modo=> (
          {
            id_modo_transmision : modo.id_modo_transmision,
            modo: modo.modo_transmision,
          }
        ))
        res.status(200).json(modosFormateados);
      }).catch(error => {
        console.error('Error al obtener modos transmision:', error);
      });

}


module.exports = {
    getAllmodos
  };