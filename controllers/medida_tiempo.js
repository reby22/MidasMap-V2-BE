const { Medida_Tiempo } = require('../models/associations');

const getAll = async (req, res) => {
    Medida_Tiempo.findAll({
        attributes: ['id_medida', 'medida'],
    }).then(medidas => {
        const medidasFormateados = medidas.map(medida => (
            {
                id_medida: medida.id_medida,
                medida: medida.medida
            }
        ))
        res.status(200).json(medidasFormateados);
    }).catch(error => {
        console.error('Error al obtener medidas: ', error);
    });
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const aux = await Medida_Tiempo.findByPk(id);
        if (!aux) {
            res.status(404).json({ mensaje: 'Medida de tiempo no encontrado' });
            return;
        }
        res.status(200).json({ aux });
    } catch (error) {
        console.error('Error al obtener la medida del tiempo:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

module.exports = {
    getAll,
    getById
};
