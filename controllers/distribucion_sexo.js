const {Distribucion_Sexo} = require('../models/associations');

const getAllDistribuciones = async (req, res) => {
    
  //distribucion_sexo
  Distribucion_Sexo.findAll({
    attributes: ['id_distribucion', 'distribucion'],
  }).then(distribuciones=>{
    const distribucionesFormateados = distribuciones.map(distribucion=> (
      {
        id_distribucion_sexo : distribucion.id_distribucion,
        distribucion : distribucion.distribucion,
      }
    ))
    res.status(200).json(distribucionesFormateados);
  }).catch(error => {
        console.error('Error al obtener modos transmision:', error);
      });

}


module.exports = {
    getAllDistribuciones
  };