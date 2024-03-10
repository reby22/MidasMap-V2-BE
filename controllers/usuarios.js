const Sequelize     = require('sequelize');
const usuario       = require('../models').usuario;
const { res, req} = require("express");

module.exports = {

 create(req, res) {
    return usuario
        .create ({
             id_usuario: req.params.id_usuario,
             name : req.params.id_name,
             id_titulo: req.params.id_titulo,
             id_licenciatura: req.params.id_licenciatura,
             especialidad: req.params.especialidad,
             sub_especializacion: req.params.sub_especializacion,
             ultima_cedula_dgp: req.params.ultima_cedula_dgp,
             id_institucion: req.id_institucion,
             id_grado: req.params.id_grado,
             fecha_nacimiento: req.params.fecha_nacimiento,
             fecha_registro: req.params.fecha_registro,
             id_rol: req.params.id_rol
        })
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error))
 },
 list(_, res) {
     return usuario.findAll({})
        .then(usuario => res.status(200).send(usuario))
        .catch(error => res.status(400).send(error))
 },
 find (req, res) {
     return usuario.findAll({
         where: {
             username: req.params.username,
         }
     })
     .then(usuario => res.status(200).send(usuario))
     .catch(error => res.status(400).send(error))
  }
};
 


