const {Usuario} = require('../models/associations');

const createUser = async (req, res) => {
    try {
      // Extraer la información del cuerpo de la solicitud
      const { nombre, ap_paterno, ap_materno, telefono_fijo, telefono_celular, correo, contraseña, id_titulo, id_licenciatura, especialidad, sub_especializacion, ultima_cedula_dgp, id_entidad, id_grado, fecha_nacimiento, id_rol } = req.body;

      if(!nombre || !ap_paterno || !ap_materno || !telefono_fijo || !telefono_celular || !correo || !contraseña || !id_titulo || !id_licenciatura || !especialidad || !sub_especializacion || !ultima_cedula_dgp || !id_entidad || !id_grado || !fecha_nacimiento || !id_rol){
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
        telefono_fijo,
        telefono_celular,
        correo,
        contraseña,
        id_titulo ,
        id_licenciatura,
        especialidad,
        sub_especialidad,
        ultima_cedula_dgp,
        id_entidad,
        id_grado,
        fecha_nacimiento,
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
        console.log(req.body);
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

        res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario });
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

module.exports = {
    createUser,
    getUserById,
    login
};
 
