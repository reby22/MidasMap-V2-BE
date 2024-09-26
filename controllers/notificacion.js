const { Notificacion, Usuario, Riesgo, Tipo_Notificacion } = require('../models/associations');
const Sequelize = require('sequelize');

const create = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud

    const {
      id_administrador,
      id_tipo,
      id_riesgo,
      fecha_inicio,
      fecha_fin,
      ubicacion,
      descripcion } = req.body;

    if (!id_administrador || !id_tipo || !id_riesgo || !fecha_inicio || !fecha_fin || !ubicacion || !descripcion) {
      res.status(400).json({
        msg: "Datos invalidos"
      });
      return;
    }

    let usuario = await Usuario.findByPk(id_administrador);

    if (usuario.id_rol != 1) {
      res.status(400).json({
        msg: "Este usuario no tiene permitido crear notificacions, Solo administradores!"
      });
      return;
    }
    // Crear el usuario en la base de datos
    const nuevo = await Notificacion.create({
      id_administrador,
      id_tipo,
      id_riesgo,
      fecha_inicio,
      fecha_fin,
      ubicacion,
      descripcion
    });

    // Enviar una respuesta con el usuario creado
    res.status(201).json({ mensaje: 'Notificacion creada con Éxito!', Notificacion: nuevo });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear la notificacion:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const update = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const { id_notificacion } = req.body;

    // Buscar la notificacion en la base de datos por su ID
    let notificacion = await Notificacion.findByPk(id_notificacion);

    console.log(notificacion);

    // Verificar si la notificacion existe
    if (!notificacion) {
      return res.status(404).json({ mensaje: "Notificacion no encontrada" });
    }

    const updateData = {};

    // Verificar si cada campo está presente en el cuerpo de la solicitud y agregarlo al objeto updateData si es así
    if (req.body.id_tipo) updateData.id_tipo = req.body.id_tipo;
    if (req.body.id_riesgo) updateData.id_riesgo = req.body.id_riesgo;
    if (req.body.fecha_inicio) updateData.fecha_inicio = req.body.fecha_inicio;
    if (req.body.fecha_fin) updateData.fecha_fin = req.body.fecha_fin;
    if (req.body.ubicacion) updateData.ubicacion = req.body.ubicacion;
    if (req.body.descripcion) updateData.descripcion = req.body.descripcion;

    // Actualizar la notificacion con los datos proporcionados en el cuerpo de la solicitud
    await notificacion.update(updateData);

    // Enviar una respuesta con la notificacion actualizada
    res.status(200).json({ mensaje: "Notificacion actualizada con éxito!", notificacion });
  } catch (error) {
    // Manejar errores
    console.error('Error al actualizar la notificacion:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar la notificacion por su ID
    const notificacionEliminada = await Notificacion.destroy({ where: { id_notificacion: id } });

    // Verificar si se eliminó correctamente la notificacion
    if (notificacionEliminada === 0) {
      return res.status(404).json({ mensaje: 'Notificacion no encontrada' });
    }

    // Enviar una respuesta con el mensaje de éxito
    res.status(200).json({ mensaje: 'Notificacion eliminada correctamente' });
  } catch (error) {
    // Manejar errores
    console.error('Error al eliminar la notificacion:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const aux = await Notificacion.findByPk(id);
    if (!aux) {
      res.status(404).json({ mensaje: 'no' });
      return;
    }
    res.status(200).json({ aux });
  } catch (error) {
    console.error('Error al obtener la notificacion:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const getAll = async (req, res) => {
  try {

    let typeCondition = {};
    let riskCondition = {};
    const searchTerm = (req.query.termino || '').toLowerCase();
    const searchType = req.query.tipo; //tipo de notificacion
    const searchRisk = req.query.riesgo; //riesgo
    const searchStartDate = req.query.fecha_inicio;
    const searchEndingDate = req.query.fecha_fin;

    let whereCondition = {
      [Sequelize.Op.or]: [
        Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('Notificacion.ubicacion')),
          'LIKE',
          `%${searchTerm}%`
        ),
        Sequelize.where(
          Sequelize.fn('LOWER', Sequelize.col('Notificacion.descripcion')),
          'LIKE',
          `%${searchTerm}%`
        )
      ]
    };

    if (searchType) {
      typeCondition = { id_tipo: searchType }// Si id_tipo es un valor exacto
    }

    if (searchRisk) {
      riskCondition = { id_riesgo: searchRisk }// Si id_riesgo es un valor exacto
    }

    if (searchStartDate) {
      whereCondition.fecha_inicio = { [Sequelize.Op.gte]: searchStartDate };
    }

    if (searchEndingDate) {
      whereCondition.fecha_fin = { [Sequelize.Op.lte]: searchEndingDate };
    }

    const notificacions = await Notificacion.findAll({
      where: whereCondition,
      include: [
        { model: Usuario, attributes: ['id_usuario'] },
        {
          model: Tipo_Notificacion, attributes: ['tipo'],
          where: typeCondition
        },
        {
          model: Riesgo, attributes: ['riesgo'],
          where: riskCondition

        }
      ],
      attributes: [
        'id_notificacion',
        'fecha_inicio',
        'fecha_fin',
        'ubicacion',
        'descripcion'
      ],
    });

    const notificacionsFormateados = notificacions.map(notificacion => ({
      id_notificacion: notificacion.id_notificacion,
      fecha_inicio: notificacion.fecha_inicio,
      fecha_fin: notificacion.fecha_fin,
      ubicacion: notificacion.ubicacion,
      descripcion: notificacion.descripcion,
      administrador: notificacion.Usuario ? notificacion.Usuario.id_usuario : null,
      tipo: notificacion.Tipo_Notificacion ? notificacion.Tipo_Notificacion.tipo : null,
      riesgo: notificacion.Riesgo ? notificacion.Riesgo.riesgo : null,
    }));
    res.status(200).json(notificacionsFormateados);
  } catch (error) {
    console.error('Error al obtener notificacions:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



module.exports = {
  create,
  getById,
  getAll,
  update,
  destroy
};