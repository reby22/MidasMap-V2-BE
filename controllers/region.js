const { Region } = require('../models/associations');

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const aux = await Region.findByPk(id);
        if (!aux) {
            res.status(404).json({ mensaje: 'Region no encontrada' });
            return;
        }
        res.status(200).json({ aux });
    } catch (error) {
        console.error('Error al obtener la region', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};


const getAll = async (req, res) => {
    Region.findAll({
        attributes: ['id_region', 'region'],
    }).then(regiones => {
        const regionesFormateados = regiones.map(region => (
            {
                id_region: region.id_region,
                region: region.region
            }
        ))
        res.status(200).json(regionesFormateados);
    }).catch(error => {
        console.error('Error al obtener regiones:  ', error);
    });
};

module.exports = {
    getById,
    getAll,
};