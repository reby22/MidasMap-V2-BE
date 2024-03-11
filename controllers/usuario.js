const sequelize  = require('sequelize');
const Usuario = require('../models').usuario;

const createUser = async (req, res) => {
    try {
      // Extraer la información del cuerpo de la solicitud
      const { nombre, ap_paterno, ap_materno, telefono_fijo, telefono_celular, correo, contraseña, id_titulo, id_licenciatura, especialidad, sub_especializacion, ultima_cedula_dgp, id_entidad, id_grado, fecha_nacimiento, fecha_registro, id_rol } = req.body;

      if(!nombre || !ap_paterno || !ap_materno || !telefono_fijo || !telefono_celular || !correo || !contraseña || !id_titulo || !id_licenciatura || !especialidad || !sub_especializacion || !ultima_cedula_dgp || !id_entidad || !id_grado || !fecha_nacimiento || !fecha_registro || !id_rol){
        res.status(400).json({
            msg :  "Datos invalidos"
        });
        return;
    }
        console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
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
        sub_especializacion,
        ultima_cedula_dgp,
        id_entidad,
        id_grado,
        fecha_nacimiento,
        fecha_registro,
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


 const listUser = (req= req, res=res) => {
     return usuario.findAll({})
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error))
 }
 const findUser = (req= req, res=res) =>{
     return usuario.findAll({
         where: {
             username: req.params.username,
         }
     })
     .then(usuario => res.status(200).send(usuario))
     .catch(error => res.status(400).send(error))
  }

  module.exports = {
    createUser,
    listUser,
    findUser
};
 
