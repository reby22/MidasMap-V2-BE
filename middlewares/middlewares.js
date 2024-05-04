const {Usuario,Entidad,Localidad, Titulo, Licenciatura, Grado, Estado, Rol} = require('../models/associations');

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

const VerifyTitulo = async (req, res, next) => {
    try {
        const aux = await Titulo.findByPk(req.usuario.id_titulo);
        if (!aux) {
            res.status(404).json({ mensaje: 'Titulo no encontrado' });
            return;
        }
        req.titulo = aux;
        next();
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

const verifyLicenciatura = async (req, res, next) => {
    try {
        const aux = await Licenciatura.findByPk(req.usuario.id_licenciatura);
        if (!aux) {
            res.status(404).json({ mensaje: 'Licenciatura no encontrado' });
            return;
        }
        req.licenciatura = aux;
        next();
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

const verifyGrado = async (req, res, next) => {
    try {
        const aux = await Grado.findByPk(req.usuario.id_grado);
        if (!aux) {
            res.status(404).json({ mensaje: 'Grado no encontrado' });
            return;
        }
        req.grado = aux;
        next();
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

const verifyRol = async (req, res, next) => {
    try {
        const aux = await Rol.findByPk(req.usuario.id_rol);
        if (!aux) {
            res.status(404).json({ mensaje: 'Estado no encontrado' });
            return;
        }
       req.rol = aux; 
       next();
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};


const verifyLocalidad = async (req, res, next) => {
    try {
        const aux= await Localidad.findByPk(req.entidad.id_localidad);
        console.log(req.entidad.id_localidad);
        if (!aux) {
            res.status(404).json({ mensaje: 'Localidad no encontrado' });
            return;
        }
        req.localidad = aux;
        next();
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

const verifyEstado = async (req, res, next) => {
    try {
        const aux = await Estado.findByPk(req.localidad.id_estado);
        if (!aux) {
            res.status(404).json({ mensaje: 'Estado no encontrado' });
            return;
        }
        req.estado = aux;
        next();
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};


module.exports = {
    getUsuario,
    verifyEntidad,
    VerifyTitulo, 
    verifyLicenciatura, 
    verifyGrado,
    verifyRol,
    verifyLocalidad,
    verifyEstado    
};
 