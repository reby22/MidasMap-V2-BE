const {Usuario,Entidad,Estado_institucion,Localidad} = require('../models/associations');

const getUsuario = async (req, res, next) => {
    try {
        const { correo, contraseña } = req.body;
        console.log(req.body);
        const usuario = await Usuario.findOne({ where: { correo: correo } });
        if (!usuario) {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
            return;
        }

        const contraseñaValida = contraseña === usuario.contraseña;

        if (!contraseñaValida) {
            res.status(401).json({ mensaje: 'Contraseña incorrecta' });
            return;
        }
        req.usuario = usuario;
        //console.log(req.usuario);
        next();
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor1' });
    }
};

const verifyEntidad = async (req, res, next) => {
    try {
        const aux = await Entidad.findByPk(req.usuario.id_entidad);
        if (!aux) {
            res.status(404).json({ mensaje: 'Entidad no encontrada' });
            return;
        }
        req.entidad = aux;
        next();
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor2' });
    }
};


module.exports = {
    getUsuario,
    verifyEntidad
};
 