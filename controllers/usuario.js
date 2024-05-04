const {Usuario, Localidad} = require('../models/associations');



const createUser = async (req, res) => {
    try {
      // Extraer la información del cuerpo de la solicitud
      const { nombre,
        ap_paterno,
        ap_materno,
        correo,
        contraseña,
        telefono_fijo,
        telefono_celular,
        especialidad,
        sub_especialidad,
        ultima_cedula_dgp,
        fecha_nacimiento,
        id_titulo ,
        id_licenciatura,
        id_entidad,
        id_grado,
        id_rol } = req.body;

      if(!nombre || !ap_paterno || !ap_materno || !telefono_fijo || !telefono_celular || !correo || !contraseña || !id_titulo || !id_licenciatura || !especialidad || !sub_especialidad || !ultima_cedula_dgp || !id_entidad || !id_grado || !fecha_nacimiento || !id_rol){
        res.status(400).json({
            msg :  "Datos invalidos"
        });
        return;
    }
    
      // Crear el usuario en la base de datos
      const nuevoUsuario = await Usuario.create({
        nombre,
        ap_paterno,
        ap_materno,
        correo,
        contraseña,
        telefono_fijo,
        telefono_celular,
        especialidad,
        sub_especialidad,
        ultima_cedula_dgp,
        fecha_nacimiento,
        id_titulo ,
        id_licenciatura,
        id_entidad,
        id_grado,
        id_rol
      });
  
      // Enviar una respuesta con el usuario creado
      res.status(201).json({ usuario: nuevoUsuario });
    } catch (error) {
      // Manejar errores
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };
/*

  const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await Usuario.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ usuario: updatedUser });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await Usuario.findByIdAndDelete(id);
        res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};
*/
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            res.status(404).json({ mensaje: 'Usuario no encontrado3' });
            return;
        }
        res.status(200).json({ usuario });
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};


const login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
        const usuario = await Usuario.findOne({ where: { correo: correo } });
        if (!usuario) {
            res.status(404).json({ mensaje: 'Usuario no encontrado2' });
            return;
        }


        const contraseñaValida = contraseña === usuario.contraseña;

        if (!contraseñaValida) {
            res.status(401).json({ mensaje: 'Contraseña incorrecta' });
            return;
        }
        const nuevo = {
            id_usuario: String(usuario.id_usuario),
            nombre: usuario.nombre,
            ap_paterno: usuario.ap_paterno,
            ap_materno: usuario.ap_materno,
            telefono_fijo: usuario.telefono_fijo,
            telefono_celular: usuario.telefono_celular,
            correo: usuario.correo,
            contraseña: usuario.contraseña,
            titulo: req.titulo.titulo,
            licenciatura: req.licenciatura.licenciatura,
            especialidad: usuario.especialidad,
            sub_especialidad: usuario.sub_especialidad,
            ultima_cedula_dgp: usuario.ultima_cedula_dgp,
            grado: req.grado.grado,
            entidad: req.entidad.nombre,
            estado: req.estado.estado,  
            localidad: req.localidad.localidad,
            fecha_nacimiento: usuario.fecha_nacimiento,
            fecha_registro: usuario.fecha_registro,
            id_rol: req.rol.rol,            
        }

        res.status(200).json( nuevo );
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor3' });
    }
};

const orderBy = async (req, res) => {
    try {
        // Obtenemos todos los usuarios ordenados por su nombre
        const usuariosOrdenados = await Usuario.findAll({
            order: [['nombre', 'ASC']]
        });

        // Verificamos si se encontraron usuarios
        if (usuariosOrdenados.length === 0) {
            res.status(404).json({ mensaje: 'No se encontraron usuarios' });
            return;
        }

        // Enviamos la lista de usuarios ordenados en la respuesta
        res.status(200).json({ usuarios: usuariosOrdenados });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};



module.exports = {
    createUser,
    getUserById,
    login,
    orderBy
};
 
