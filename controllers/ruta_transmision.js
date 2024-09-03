const { Ruta_Transmision } = require('../models/associations');

const getAll = async (req, res) => {
  Ruta_Transmision.findAll({
    attributes: ['id_ruta_transmision', 'ruta_transmision'],
  }).then(rutas => {
    const rutasFormateados = rutas.map(ruta => (
      {
        id_ruta_transmision: ruta.id_ruta_transmision,
        ruta_transmision: ruta.ruta_transmision,
      }
    ))
    res.status(200).json(rutasFormateados);
  }).catch(error => {
    console.error('Error al obtener rutas transmision:', error);
  });

}


module.exports = {
  getAll
};