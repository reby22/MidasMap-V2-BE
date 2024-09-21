const { Pais, Pais_Region, Region } = require('../models/associations');

const create = async (req, res) => {
    try {
        // Extraer la información del cuerpo de la solicitud
        const { pais } = req.body;

        if (!pais) {
            res.status(400).json({
                msg: "Datos invalidos"
            });
            return;
        }
        // Crear el pais en la base de datos
        const nuevo = await Pais.create({
            pais
        });

        // Enviar una respuesta con el pais creado
        res.status(201).json({ Pais: nuevo });
    } catch (error) {
        // Manejar errores
        console.error('Error al crear el pais:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};


const getAll = async (req, res) => {
    Pais.findAll({
        attributes: ['id_pais', 'pais'],
    }).then(paises => {
        const paisesFormateados = paises.map(pais => (
            {
                id_pais: pais.id_pais,
                pais: pais.pais,
            }
        ))
        res.status(200).json(paisesFormateados);
    }).catch(error => {
        console.error('Error al obtener paises:', error);
    });
};





const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const aux = await Pais.findByPk(id);
        if (!aux) {
            res.status(404).json({ mensaje: 'Pais no encontrado' });
            return;
        }
        res.status(200).json({ aux });
    } catch (error) {
        console.error('Error al obtener el pais:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

const getByRegion = async (req, res) => {
    try {
        const whereRegion = {};
        const { id } = req.params;
        whereRegion.id_region = id;
        const paises = await Pais.findAll({
            order: [['pais', 'ASC']],
            where: {},
            include: [
                {
                    model: Pais_Region,
                    attributes: [],
                    where: {},
                    include: [{
                        model: Region,
                        attributes: [],
                        where: whereRegion,
                    }]
                }]
        });

        if (paises.length > 0) {
            const paisesFormateados = paises.map(pais => ({
                id_pais: pais.id_pais,
                pais: pais.pais
            }));
            res.status(200).json(paisesFormateados);
        } else {
            res.status(404).json({ message: 'No hay Paises.' });
        }
    } catch (error) {
        console.error('Error al obtener paises:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

module.exports = {
    create,
    getById,
    getAll,
    getByRegion
};