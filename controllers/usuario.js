const { Usuario, Titulo, Grado, Licenciatura, Rol } = require('../models/associations');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const { generateJWT } = require("../helpers/jwt");
const { sendConfirmationEmail } = require('./email');

const create = async (req, res) => {
  try {
    const fecha_registro = new Date();
    const id_rol = 3;
    // Extraer la información del cuerpo de la solicitud
    const { nombre,
      ap_paterno,
      ap_materno,
      correo,
      contraseña,
      telefono_fijo,
      telefono_celular,
      foto_perfil,
      especialidad,
      sub_especialidad,
      ultima_cedula_dgp,
      fecha_nacimiento,
      id_titulo,
      id_licenciatura,
      institucion_inscripcion,
      id_grado } = req.body;

    if (!nombre || !ap_paterno || !ap_materno || !telefono_fijo || !telefono_celular || !correo || !contraseña || !id_titulo || !id_licenciatura || !especialidad || !sub_especialidad || !ultima_cedula_dgp || !institucion_inscripcion || !id_grado || !fecha_nacimiento) {
      res.status(400).json({
        msg: "Datos invalidos"
      });
      return;
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);


    // Crear el usuario en la base de datos
    const nuevoUsuario = await Usuario.create({
      nombre,
      ap_paterno,
      ap_materno,
      correo,
      contraseña: hashedPassword,
      telefono_fijo,
      telefono_celular,
      foto_perfil,
      especialidad,
      sub_especialidad,
      ultima_cedula_dgp,
      fecha_nacimiento,
      fecha_registro: fecha_registro,
      id_titulo,
      id_licenciatura,
      institucion_inscripcion,
      id_grado,
      id_rol: id_rol
    });

    // Enviar una respuesta con el usuario creado
    res.status(201).json({ mensaje: "Usuario creado con éxito!" });
  } catch (error) {
    // Manejar errores
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id_usuario, contraseña_actual, nueva_contraseña } = req.body;
    console.log(req.body);
    // Validación de datos
    if (!id_usuario || !contraseña_actual || !nueva_contraseña) {
      return res.status(400).json({ msg: 'Faltan datos' });
    }

    // Buscar al usuario en la base de datos
    const usuario = await Usuario.findOne({
      where: { id_usuario },
      attributes: ['id_usuario', 'contraseña'],
    });

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    // Verificar si la contraseña actual es correcta
    const esContraseñaCorrecta = await bcrypt.compare(contraseña_actual, usuario.contraseña);
    if (!esContraseñaCorrecta) {
      return res.status(401).json({ error: 'La contraseña actual es incorrecta' });
    }

    // Encriptar la nueva contraseña
    const saltRounds = 10;
    const hashednueva_contraseña = await bcrypt.hash(nueva_contraseña, saltRounds);

    // Actualizar la contraseña en la base de datos
    await Usuario.update(
      { contraseña: hashednueva_contraseña },
      { where: { id_usuario } }
    );

    res.status(200).json({ msg: 'Contraseña actualizada con éxito' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ error: 'Error al cambiar la contraseña' });
  }
};



const update = async (req, res) => {
  try {
    // Extraer la información del cuerpo de la solicitud
    const { id_usuario } = req.body;

    // Crear el usuario en la base de datos
    let usuario = await Usuario.findByPk(id_usuario);

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const rol_pasado= usuario.rol;
    const updateData = {};

    // Verificar si cada campo está presente en el cuerpo de la solicitud y agregarlo al objeto updateData si es así
    if (req.body.nombre) updateData.nombre = req.body.nombre;
    if (req.body.ap_paterno) updateData.ap_paterno = req.body.ap_paterno;
    if (req.body.ap_materno) updateData.ap_materno = req.body.ap_materno;
    if (req.body.correo) updateData.correo = req.body.correo;
    if (req.body.telefono_fijo) updateData.telefono_fijo = req.body.telefono_fijo;
    if (req.body.telefono_celular) updateData.telefono_celular = req.body.telefono_celular;
    if (req.body.foto_perfil) updateData.foto_perfil = req.body.foto_perfil;
    if (req.body.especialidad) updateData.especialidad = req.body.especialidad;
    if (req.body.sub_especialidad) updateData.sub_especialidad = req.body.sub_especialidad;
    if (req.body.ultima_cedula_dgp) updateData.ultima_cedula_dgp = req.body.ultima_cedula_dgp;
    if (req.body.fecha_nacimiento) updateData.fecha_nacimiento = req.body.fecha_nacimiento;
    if (req.body.id_titulo) updateData.id_titulo = req.body.id_titulo;
    if (req.body.id_licenciatura) updateData.id_licenciatura = req.body.id_licenciatura;
    if (req.body.institucion_inscripcion) updateData.institucion_inscripcion = req.body.institucion_inscripcion;
    if (req.body.id_grado) updateData.id_grado = req.body.id_grado;
    if (req.body.id_rol) updateData.id_rol = req.body.id_rol;
    // Actualizar el usuario con los datos proporcionados en el cuerpo de la solicitud
    await usuario.update(updateData);

    if(rol_pasado=== 3 && usuario.id_rol!==3){
      await sendConfirmationEmail(usuario.nombre, usuario.ap_paterno, usuario.id_titulo, usuario.correo, usuario.id_rol);
    }


    // Enviar una respuesta con el usuario creado
    res.status(201).json({ mensaje: "Usuario actualizado con éxito!", usuario });
  } catch (error) {
    // Manejar errores
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    // Eliminar el usuario por su ID
    await Usuario.destroy({ where: { id_usuario: id } });
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};


const getById = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const usuario = await Usuario.findByPk(id_usuario, {
      include: [
        { model: Titulo, attributes: ['titulo'] },
        { model: Licenciatura, attributes: ['licenciatura'] },
        { model: Grado, attributes: ['grado'] },
        { model: Rol, attributes: ['rol'] },
      ],
      attributes: [
        'id_usuario',
        'nombre',
        'ap_paterno',
        'ap_materno',
        'telefono_fijo',
        'telefono_celular',
        'foto_perfil',
        'correo',
        'contraseña',
        'especialidad',
        'sub_especialidad',
        'ultima_cedula_dgp',
        'fecha_nacimiento',
        'institucion_inscripcion',
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
      foto_perfil: usuario.foto_perfil,
      correo: usuario.correo,
      titulo: usuario.Titulo ? usuario.Titulo.titulo : null,
      licenciatura: usuario.Licenciatura ? usuario.Licenciatura.licenciatura : null,
      especialidad: usuario.especialidad,
      sub_especialidad: usuario.sub_especialidad,
      ultima_cedula_dgp: usuario.ultima_cedula_dgp,
      grado: usuario.Grado ? usuario.Grado.grado : null,
      fecha_nacimiento: usuario.fecha_nacimiento,
      institucion_inscripcion: usuario.institucion_inscripcion,
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

    if (!correo || !contraseña) {
      //validación de que estan todos
      return res.status(400).json({
        msg: "Faltan datos"
      });
    }
    // Buscar el usuario por correo y obtener los datos relacionados
    const usuario = await Usuario.findOne({
      where: { correo: correo },
      include: [
        { model: Titulo, attributes: ['titulo'] },
        { model: Licenciatura, attributes: ['licenciatura'] },
        { model: Grado, attributes: ['grado'] },
        { model: Rol, attributes: ['rol'] },
      ],
      attributes: [
        'id_usuario',
        'nombre',
        'ap_paterno',
        'ap_materno',
        'telefono_fijo',
        'telefono_celular',
        'foto_perfil',
        'correo',
        'contraseña',
        'especialidad',
        'sub_especialidad',
        'ultima_cedula_dgp',
        'fecha_nacimiento',
        'institucion_inscripcion',
        'fecha_registro',
      ],
    });

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    // Verificar si la contraseña es correcta
    const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!validPassword) {
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
      foto_perfil: usuario.foto_perfil,
      correo: usuario.correo,
      titulo: usuario.Titulo ? usuario.Titulo.titulo : null,
      licenciatura: usuario.Licenciatura ? usuario.Licenciatura.licenciatura : null,
      especialidad: usuario.especialidad,
      sub_especialidad: usuario.sub_especialidad,
      ultima_cedula_dgp: usuario.ultima_cedula_dgp,
      grado: usuario.Grado ? usuario.Grado.grado : null,
      institucion_inscripcion: usuario.institucion_inscripcion,
      fecha_nacimiento: usuario.fecha_nacimiento,
      fecha_registro: usuario.fecha_registro,
      id_rol: usuario.Rol ? usuario.Rol.rol : null,
    };

    //me regresa la promesa de q me manda un token y se genera
    generateJWT(usuarioFormateado).then((token) => {
      res.status(200).json({
        msg: "Authentificación exitosa",
        //tokn de respuesta
        token, usuarioFormateado
      });
    }).catch((error) => {
      console.error('Error al autenticar:', error);
      res.status(500).json({ message: 'Error en el servidor.' });
    })
    //res.status(200).json(usuarioFormateado);
  } catch (error) {
    console.error('Error al realizar el inicio de sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  Usuario.findAndCountAll({
    order: [['fecha_registro', 'DESC']],
    include: [
      { model: Titulo, attributes: ['titulo'] },
      { model: Licenciatura, attributes: ['licenciatura'] },
      { model: Grado, attributes: ['grado'] },
      { model: Rol, attributes: ['rol'] },
    ],
    limit: parseInt(limit),
    offset: parseInt(offset),
    attributes: [
      'id_usuario',
      'nombre',
      'ap_paterno',
      'ap_materno',
      'telefono_fijo',
      'telefono_celular',
      'foto_perfil',
      'correo',
      'contraseña',
      'especialidad',
      'sub_especialidad',
      'ultima_cedula_dgp',
      'fecha_nacimiento',
      'institucion_inscripcion',
      'fecha_registro',
    ]
  }).then(usuarios => {
    // Procesar los usuarios obtenidos aquí
    const usuariosFormateados = usuarios.rows.map(usuario => ({
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      ap_paterno: usuario.ap_paterno,
      ap_materno: usuario.ap_materno,
      telefono_fijo: usuario.telefono_fijo,
      telefono_celular: usuario.telefono_celular,
      foto_perfil: usuario.foto_perfil,
      correo: usuario.correo,
      titulo: usuario.Titulo ? usuario.Titulo.titulo : null,
      licenciatura: usuario.Licenciatura ? usuario.Licenciatura.licenciatura : null,
      especialidad: usuario.especialidad,
      sub_especialidad: usuario.sub_especialidad,
      ultima_cedula_dgp: usuario.ultima_cedula_dgp,
      grado: usuario.Grado ? usuario.Grado.grado : null,
      institucion_inscripcion: usuario.institucion_inscripcion,
      fecha_nacimiento: usuario.fecha_nacimiento,
      fecha_registro: usuario.fecha_registro,
      id_rol: usuario.Rol ? usuario.Rol.rol : null,
    }));
    res.status(200).json({
      totalItems: usuarios.count,
      totalPages: Math.ceil(usuarios.count / limit),
      currentPage: parseInt(page),
      usuarios: usuariosFormateados
    });
    // Aquí puedes enviar usuariosFormateados a donde lo necesites
  }).catch(error => {
    console.error('Error al obtener usuarios:', error);
  });
};

const getAllUsersPendientes = async (req, res) => {
  const { page = 1, limit = 10 , nombre} = req.query;
  const offset = (page - 1) * limit;

  console.log(nombre);
  const searchTermLowerCase = (nombre || '').toLowerCase();

  Usuario.findAndCountAll({
    order: [['fecha_registro', 'DESC']],
    include: [
      { model: Titulo, attributes: ['titulo'] },
      { model: Licenciatura, attributes: ['licenciatura'] },
      { model: Grado, attributes: ['grado'] },
      {
        model: Rol, attributes: ['rol'],
        where: {
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
          ],
          rol: 'Pendiente'
        }
      },
    ],
    limit: parseInt(limit),
    offset: parseInt(offset),
    attributes: [
      'id_usuario',
      'nombre',
      'ap_paterno',
      'ap_materno',
      'telefono_fijo',
      'telefono_celular',
      'foto_perfil',
      'correo',
      'contraseña',
      'especialidad',
      'sub_especialidad',
      'ultima_cedula_dgp',
      'fecha_nacimiento',
      'institucion_inscripcion',
      'fecha_registro',
    ]
  }).then(usuarios => {
    // Procesar los usuarios obtenidos aquí
    const usuariosFormateados = usuarios.rows.map(usuario => ({
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      ap_paterno: usuario.ap_paterno,
      ap_materno: usuario.ap_materno,
      telefono_fijo: usuario.telefono_fijo,
      telefono_celular: usuario.telefono_celular,
      foto_perfil: usuario.foto_perfil,
      correo: usuario.correo,
      titulo: usuario.Titulo ? usuario.Titulo.titulo : null,
      licenciatura: usuario.Licenciatura ? usuario.Licenciatura.licenciatura : null,
      especialidad: usuario.especialidad,
      sub_especialidad: usuario.sub_especialidad,
      ultima_cedula_dgp: usuario.ultima_cedula_dgp,
      grado: usuario.Grado ? usuario.Grado.grado : null,
      institucion_inscripcion: usuario.institucion_inscripcion,
      fecha_nacimiento: usuario.fecha_nacimiento,
      fecha_registro: usuario.fecha_registro,
      id_rol: usuario.Rol ? usuario.Rol.rol : null,

    }));
    res.status(200).json({
      totalItems: usuarios.count,
      totalPages: Math.ceil(usuarios.count / limit),
      currentPage: parseInt(page),
      usuarios: usuariosFormateados
    });
  }).catch(error => {
    console.error('Error al obtener usuarios:', error);
  });
};

const getAllUsersAceptados = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const searchTerm = req.query.nombre || ''; 
  console.log(searchTerm);
  const searchTermLowerCase = searchTerm.toLowerCase(); 

  Usuario.findAndCountAll({
    order: [['fecha_registro', 'DESC']],
    include: [
      { model: Titulo, attributes: ['titulo'] },
      { model: Licenciatura, attributes: ['licenciatura'] },
      { model: Grado, attributes: ['grado'] },
      {
        model: Rol, attributes: ['rol'],
        where: { [Sequelize.Op.or]: [
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
          )
        ],
        rol: ['Administrador', 'Colaborador'] }
      },
    ],
    limit: parseInt(limit),
    offset: parseInt(offset),
    attributes: [
      'id_usuario',
      'nombre',
      'ap_paterno',
      'ap_materno',
      'telefono_fijo',
      'telefono_celular',
      'foto_perfil',
      'correo',
      'contraseña',
      'especialidad',
      'sub_especialidad',
      'ultima_cedula_dgp',
      'fecha_nacimiento',
      'institucion_inscripcion',
      'fecha_registro',
    ]
  }).then(usuarios => {
    // Procesar los usuarios obtenidos aquí
    const usuariosFormateados = usuarios.rows.map(usuario => ({
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      ap_paterno: usuario.ap_paterno,
      ap_materno: usuario.ap_materno,
      telefono_fijo: usuario.telefono_fijo,
      telefono_celular: usuario.telefono_celular,
      foto_perfil: usuario.foto_perfil,
      correo: usuario.correo,
      titulo: usuario.Titulo ? usuario.Titulo.titulo : null,
      licenciatura: usuario.Licenciatura ? usuario.Licenciatura.licenciatura : null,
      especialidad: usuario.especialidad,
      sub_especialidad: usuario.sub_especialidad,
      ultima_cedula_dgp: usuario.ultima_cedula_dgp,
      grado: usuario.Grado ? usuario.Grado.grado : null,
      fecha_nacimiento: usuario.fecha_nacimiento,
      institucion_inscripcion: usuario.institucion_inscripcion,
      fecha_registro: usuario.fecha_registro,
      id_rol: usuario.Rol ? usuario.Rol.rol : null,

    }));
    res.status(200).json({
      totalItems: usuarios.count,
      totalPages: Math.ceil(usuarios.count / limit),
      currentPage: parseInt(page),
      usuarios: usuariosFormateados
    });
  }).catch(error => {
    console.error('Error al obtener usuarios:', error);
  });
};

const searchByTerm = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const searchTerm = req.query.nombre || ''; // Obtener el término de búsqueda del query params
    console.log(searchTerm);
    const searchTermLowerCase = searchTerm.toLowerCase(); // Convertir el término de búsqueda a minúsculas

    // Buscar todos los usuarios que coincidan con el nombre proporcionado (insensible a mayúsculas y minúsculas)
    const usuarios = await Usuario.findAndCountAll({
      order: [['fecha_registro', 'DESC']],
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
          )
        ],
      },
      include: [
        { model: Titulo, attributes: ['titulo'] },
        { model: Licenciatura, attributes: ['licenciatura'] },
        { model: Grado, attributes: ['grado'] },
        { model: Rol, attributes: ['rol'] },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: [
        'id_usuario',
        'nombre',
        'ap_paterno',
        'ap_materno',
        'telefono_fijo',
        'telefono_celular',
        'foto_perfil',
        'correo',
        'contraseña',
        'especialidad',
        'sub_especialidad',
        'ultima_cedula_dgp',
        'fecha_nacimiento',
        'institucion_inscripcion',
        'fecha_registro',
      ],
    });

    // Procesar los usuarios obtenidos
    const usuariosFormateados = usuarios.rows.map(usuario => ({
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      ap_paterno: usuario.ap_paterno,
      ap_materno: usuario.ap_materno,
      telefono_fijo: usuario.telefono_fijo,
      telefono_celular: usuario.telefono_celular,
      foto_perfil: usuario.foto_perfil,
      correo: usuario.correo,
      titulo: usuario.Titulo ? usuario.Titulo.titulo : null,
      licenciatura: usuario.Licenciatura ? usuario.Licenciatura.licenciatura : null,
      especialidad: usuario.especialidad,
      sub_especialidad: usuario.sub_especialidad,
      ultima_cedula_dgp: usuario.ultima_cedula_dgp,
      grado: usuario.Grado ? usuario.Grado.grado : null,
      fecha_nacimiento: usuario.fecha_nacimiento,
      institucion_inscripcion: usuario.institucion_inscripcion,
      fecha_registro: usuario.fecha_registro,
      id_rol: usuario.Rol ? usuario.Rol.rol : null,
    }));

    res.status(200).json({
      totalItems: usuarios.count,
      totalPages: Math.ceil(usuarios.count / limit),
      currentPage: parseInt(page),
      usuarios: usuariosFormateados
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getAllUsersByRol = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const { rol } = req.query;
  Usuario.findAndCountAll({
    order: [['fecha_registro', 'DESC']],
    include: [
      { model: Titulo, attributes: ['titulo'] },
      { model: Licenciatura, attributes: ['licenciatura'] },
      { model: Grado, attributes: ['grado'] },
      { model: Rol, where: { rol: rol }, attributes: ['rol'] },
    ],
    limit: parseInt(limit),
    offset: parseInt(offset),
    attributes: [
      'id_usuario',
      'nombre',
      'ap_paterno',
      'ap_materno',
      'telefono_fijo',
      'telefono_celular',
      'foto_perfil',
      'correo',
      'contraseña',
      'especialidad',
      'sub_especialidad',
      'ultima_cedula_dgp',
      'fecha_nacimiento',
      'institucion_inscripcion',
      'fecha_registro',
    ]
  }).then(usuarios => {
    // Procesar los usuarios obtenidos aquí
    const usuariosFormateados = usuarios.rows.map(usuario => ({
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      ap_paterno: usuario.ap_paterno,
      ap_materno: usuario.ap_materno,
      telefono_fijo: usuario.telefono_fijo,
      telefono_celular: usuario.telefono_celular,
      foto_perfil: usuario.foto_perfil,
      correo: usuario.correo,
      titulo: usuario.Titulo ? usuario.Titulo.titulo : null,
      licenciatura: usuario.Licenciatura ? usuario.Licenciatura.licenciatura : null,
      especialidad: usuario.especialidad,
      sub_especialidad: usuario.sub_especialidad,
      ultima_cedula_dgp: usuario.ultima_cedula_dgp,
      grado: usuario.Grado ? usuario.Grado.grado : null,
      institucion_inscripcion: usuario.institucion_inscripcion,
      fecha_nacimiento: usuario.fecha_nacimiento,
      fecha_registro: usuario.fecha_registro,
      id_rol: usuario.Rol ? usuario.Rol.rol : null,

    }));
    res.status(200).json({
      totalItems: usuarios.count,
      totalPages: Math.ceil(usuarios.count / limit),
      currentPage: parseInt(page),
      usuarios: usuariosFormateados
    });
  }).catch(error => {
    console.error('Error al obtener usuarios:', error);
  });
};


module.exports = {
  create,
  changePassword,
  getById,
  login,
  getAll,
  searchByTerm,
  getAllUsersByRol,
  update,
  destroy,
  getAllUsersPendientes,
  getAllUsersAceptados
};
