const {Usuario, Titulo, Grado, Localidad, Estado, Licenciatura, Rol, Entidad, Grupo} = require('../models/associations');
const Sequelize = require('sequelize');


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
  const { id_usuario } = req.params;
  try {
    const usuario = await Usuario.findByPk(id_usuario, {
      include: [
        { model: Titulo, attributes: ['titulo'] },
        { model: Licenciatura, attributes: ['licenciatura'] },
        { model: Grado, attributes: ['grado'] },
        { model: Rol, attributes: ['rol'] },
        {
          model: Entidad,
          attributes: ['nombre'],
          include: [
            {
              model: Localidad,
              attributes: ['localidad'],
              include: [{ model: Estado, attributes: ['estado'] }],
            },
          ],
        },
      ],
      attributes: [
        'id_usuario',
        'nombre',
        'ap_paterno',
        'ap_materno',
        'telefono_fijo',
        'telefono_celular',
        'correo',
        'contraseña',
        'especialidad',
        'sub_especialidad',
        'ultima_cedula_dgp',
        'fecha_nacimiento',
        'fecha_registro',
      ],
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuarioFormateado = {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      ap_paterno: usuario.ap_paterno,
      ap_materno: usuario.ap_materno,
      telefono_fijo: usuario.telefono_fijo,
      telefono_celular: usuario.telefono_celular,
      correo: usuario.correo,
      contraseña: usuario.contraseña,
      titulo: usuario.Titulo ? usuario.Titulo.titulo : null,
      licenciatura: usuario.Licenciatura ? usuario.Licenciatura.licenciatura : null,
      especialidad: usuario.especialidad,
      sub_especialidad: usuario.sub_especialidad,
      ultima_cedula_dgp: usuario.ultima_cedula_dgp,
      grado: usuario.Grado ? usuario.Grado.grado : null,
      entidad: usuario.Entidad ? usuario.Entidad.nombre : null,
      localidad: usuario.Entidad?.Localidad?.localidad || null,
      estado: usuario.Entidad?.Localidad?.Estado?.estado || null,
      fecha_nacimiento: usuario.fecha_nacimiento,
      fecha_registro: usuario.fecha_registro,
      id_rol: usuario.Rol ? usuario.Rol.rol : null,
    };

    res.status(200).json(usuarioFormateado);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Buscar el usuario por correo y obtener los datos relacionados
    const usuario = await Usuario.findOne({
      where: { correo: correo },
      include: [
        { model: Titulo, attributes: ['titulo'] },
        { model: Licenciatura, attributes: ['licenciatura'] },
        { model: Grado, attributes: ['grado'] },
        { model: Rol, attributes: ['rol'] },
        {
          model: Entidad,
          attributes: ['nombre'],
          include: [
            {
              model: Localidad,
              attributes: ['localidad'],
              include: [{ model: Estado, attributes: ['estado'] }],
            },
          ],
        },
      ],
      attributes: [
        'id_usuario',
        'nombre',
        'ap_paterno',
        'ap_materno',
        'telefono_fijo',
        'telefono_celular',
        'correo',
        'contraseña',
        'especialidad',
        'sub_especialidad',
        'ultima_cedula_dgp',
        'fecha_nacimiento',
        'fecha_registro',
      ],
    });

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    // Verificar si la contraseña es correcta
    if (contraseña !== usuario.contraseña) {
      return res.status(401).json({ error: 'La contraseña es incorrecta' });
    }

    // Formatear los datos del usuario para la respuesta
    const usuarioFormateado = {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      ap_paterno: usuario.ap_paterno,
      ap_materno: usuario.ap_materno,
      telefono_fijo: usuario.telefono_fijo,
      telefono_celular: usuario.telefono_celular,
      correo: usuario.correo,
      contraseña: usuario.contraseña,
      titulo: usuario.Titulo ? usuario.Titulo.titulo : null,
      licenciatura: usuario.Licenciatura ? usuario.Licenciatura.licenciatura : null,
      especialidad: usuario.especialidad,
      sub_especialidad: usuario.sub_especialidad,
      ultima_cedula_dgp: usuario.ultima_cedula_dgp,
      grado: usuario.Grado ? usuario.Grado.grado : null,
      entidad: usuario.Entidad ? usuario.Entidad.nombre : null,
      localidad: usuario.Entidad?.Localidad?.localidad || null,
      estado: usuario.Entidad?.Localidad?.Estado?.estado || null,
      fecha_nacimiento: usuario.fecha_nacimiento,
      fecha_registro: usuario.fecha_registro,
      id_rol: usuario.Rol ? usuario.Rol.rol : null,
    };

    res.status(200).json(usuarioFormateado);
  } catch (error) {
    console.error('Error al realizar el inicio de sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getAllUsers = async (req, res) => {
    Usuario.findAll({
        include: [
          { model: Titulo, attributes: ['titulo'] },
          { model: Licenciatura, attributes: ['licenciatura'] },
          { model: Grado, attributes: ['grado'] },
          { model: Rol, attributes: ['rol'] },
          {
            model: Entidad, atributes: ['nombre'],
            include: [
              {
                model: Localidad, attributes: ['localidad'],
                include: [
                  {
                    model: Estado, attributes:['estado']
                  }
                ]
              }
            ]
          }
        ],
        attributes: [
          'id_usuario',
          'nombre',
          'ap_paterno',
          'ap_materno',
          'telefono_fijo',
          'telefono_celular',
          'correo',
          'contraseña',
          'especialidad',
          'sub_especialidad',
          'ultima_cedula_dgp',
          'fecha_nacimiento',
          'fecha_registro',
        ]
      }).then(usuarios => {
        // Procesar los usuarios obtenidos aquí
        const usuariosFormateados = usuarios.map(usuario => ({
          id_usuario: usuario.id_usuario,
          nombre: usuario.nombre,
          ap_paterno: usuario.ap_paterno,
          ap_materno: usuario.ap_materno,

          telefono_fijo: usuario.telefono_fijo,
          telefono_celular: usuario.telefono_celular,
          correo: usuario.correo,
          contraseña: usuario.contraseña,
          titulo: usuario.Titulo ? usuario.Titulo.titulo : null,
          licenciatura: usuario.Licenciatura ? usuario.Licenciatura.licenciatura : null,
          especialidad: usuario.especialidad,
          sub_especialidad: usuario.sub_especialidad,
          ultima_cedula_dgp: usuario.ultima_cedula_dgp,
          grado: usuario.Grado ? usuario.Grado.grado : null,
          
          entidad: usuario.Entidad ? usuario.Entidad.nombre :null,
          localidad: usuario.Entidad.Localidad ? usuario.Entidad.Localidad.localidad :null,
          estado: usuario.Entidad.Localidad.Estado ? usuario.Entidad.Localidad.Estado.estado : null,
          fecha_nacimiento: usuario.fecha_nacimiento,
          fecha_registro: usuario.fecha_registro,
          id_rol: usuario.Rol ? usuario.Rol.rol : null,

        }));
        res.status(200).json(usuariosFormateados);
        // Aquí puedes enviar usuariosFormateados a donde lo necesites
      }).catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
};

const searchByTerm = async (req, res) => {
  try {
    const searchTerm = req.query.nombre || ''; // Obtener el término de búsqueda del query params
    console.log(searchTerm);
    const searchTermLowerCase = searchTerm.toLowerCase(); // Convertir el término de búsqueda a minúsculas
    const searchTermUpperCase = searchTerm.toUpperCase(); // Convertir el término de búsqueda a mayúsculas

    // Buscar todos los usuarios que coincidan con el nombre proporcionado (insensible a mayúsculas y minúsculas)
    const usuarios = await Usuario.findAll({
      where: {
        // Utilizar operadores `Op.or` para buscar en ambos casos de mayúsculas y minúsculas
        [Sequelize.Op.or]: [
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('Usuario.nombre')),
            'LIKE',
            `%${searchTermLowerCase}%`
          ),
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('Usuario.ap_materno')),
            'LIKE',
            `%${searchTermLowerCase}%`
          ),
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('Usuario.ap_paterno')),
            'LIKE',
            `%${searchTermLowerCase}%`
          ),
          Sequelize.where(
            Sequelize.fn('UPPER', Sequelize.col('Usuario.nombre')),

            'LIKE',
            `%${searchTermUpperCase}%`
          ),
          Sequelize.where(
            Sequelize.fn('UPPER', Sequelize.col('Usuario.ap_materno')),

            'LIKE',
            `%${searchTermUpperCase}%`
          ),
          Sequelize.where(
            Sequelize.fn('UPPER', Sequelize.col('Usuario.ap_paterno')),

            'LIKE',
            `%${searchTermUpperCase}%`
          ),
        ],
      },
      include: [
        { model: Titulo, attributes: ['titulo'] },
        { model: Licenciatura, attributes: ['licenciatura'] },
        { model: Grado, attributes: ['grado'] },
        { model: Rol, attributes: ['rol'] },
        {
          model: Entidad,
          attributes: ['nombre'],
          include: [
            {
              model: Localidad,
              attributes: ['localidad'],
              include: [{ model: Estado, attributes: ['estado'] }],
            },
          ],
        },
      ],
      attributes: [
        'id_usuario',
        'nombre',
        'ap_paterno',
        'ap_materno',
        'telefono_fijo',
        'telefono_celular',
        'correo',
        'contraseña',
        'especialidad',
        'sub_especialidad',
        'ultima_cedula_dgp',
        'fecha_nacimiento',
        'fecha_registro',
      ],
    });

    // Procesar los usuarios obtenidos
    const usuariosFormateados = usuarios.map(usuario => ({
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      ap_paterno: usuario.ap_paterno,
      ap_materno: usuario.ap_materno,
      telefono_fijo: usuario.telefono_fijo,
      telefono_celular: usuario.telefono_celular,
      correo: usuario.correo,
      contraseña: usuario.contraseña,
      titulo: usuario.Titulo ? usuario.Titulo.titulo : null,
      licenciatura: usuario.Licenciatura ? usuario.Licenciatura.licenciatura : null,
      especialidad: usuario.especialidad,
      sub_especialidad: usuario.sub_especialidad,
      ultima_cedula_dgp: usuario.ultima_cedula_dgp,
      grado: usuario.Grado ? usuario.Grado.grado : null,
      entidad: usuario.Entidad ? usuario.Entidad.nombre : null,
      localidad: usuario.Entidad ? (usuario.Entidad.Localidad ? usuario.Entidad.Localidad.localidad : null) : null,
      estado: usuario.Entidad ? (usuario.Entidad.Localidad ? (usuario.Entidad.Localidad.Estado ? usuario.Entidad.Localidad.Estado.estado : null) : null) : null,
      fecha_nacimiento: usuario.fecha_nacimiento,
      fecha_registro: usuario.fecha_registro,
      id_rol: usuario.Rol ? usuario.Rol.rol : null,
    }));

    res.status(200).json(usuariosFormateados);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getAllUsersByRol = async (req, res) => {
  const { rol } = req.query;
  Usuario.findAll({
      include: [
        { model: Titulo, attributes: ['titulo'] },
        { model: Licenciatura, attributes: ['licenciatura'] },
        { model: Grado, attributes: ['grado'] },
        { model: Rol, where: { rol: rol }, attributes: ['rol']  },
        {
          model: Entidad, atributes: ['nombre'],
          include: [
            {
              model: Localidad, attributes: ['localidad'],
              include: [
                {
                  model: Estado, attributes:['estado']
                }
              ]
            }
          ]
        }
      ],
      attributes: [
        'id_usuario',
        'nombre',
        'ap_paterno',
        'ap_materno',
        'telefono_fijo',
        'telefono_celular',
        'correo',
        'contraseña',
        'especialidad',
        'sub_especialidad',
        'ultima_cedula_dgp',
        'fecha_nacimiento',
        'fecha_registro',
      ]
    }).then(usuarios => {
      // Procesar los usuarios obtenidos aquí
      const usuariosFormateados = usuarios.map(usuario => ({
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        ap_paterno: usuario.ap_paterno,
        ap_materno: usuario.ap_materno,

        telefono_fijo: usuario.telefono_fijo,
        telefono_celular: usuario.telefono_celular,
        correo: usuario.correo,
        contraseña: usuario.contraseña,
        titulo: usuario.Titulo ? usuario.Titulo.titulo : null,
        licenciatura: usuario.Licenciatura ? usuario.Licenciatura.licenciatura : null,
        especialidad: usuario.especialidad,
        sub_especialidad: usuario.sub_especialidad,
        ultima_cedula_dgp: usuario.ultima_cedula_dgp,
        grado: usuario.Grado ? usuario.Grado.grado : null,
        
        entidad: usuario.Entidad ? usuario.Entidad.nombre :null,
        localidad: usuario.Entidad.Localidad ? usuario.Entidad.Localidad.localidad :null,
        estado: usuario.Entidad.Localidad.Estado ? usuario.Entidad.Localidad.Estado.estado : null,
        fecha_nacimiento: usuario.fecha_nacimiento,
        fecha_registro: usuario.fecha_registro,
        id_rol: usuario.Rol ? usuario.Rol.rol : null,

      }));
      res.status(200).json(usuariosFormateados);
      // Aquí puedes enviar usuariosFormateados a donde lo necesites
    }).catch(error => {
      console.error('Error al obtener usuarios:', error);
    });
};





module.exports = {
    createUser,
    getUserById,
    login,
    getAllUsers,
    searchByTerm,
    getAllUsersByRol
};
 
