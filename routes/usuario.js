const Router = require("express");
const { create, getById, getAllUsersPendientes,getAllUsersAceptados, login,getAll,update, destroy,  searchByTerm, getAllUsersByRol} = require("../controllers/usuario");
const router = Router();
const { verifyToken, checkRole } = require('../helpers/jwt');

module.exports = router;

// Ruta para crear un nuevo usuario
router.post('/',verifyToken, checkRole(["Administrador"]), create);

// Ruta para actualizar un usuario existente
router.put('/actualizar',verifyToken, checkRole(["Administrador"]),update);

// Ruta para eliminar un usuario
router.delete('/:id',verifyToken, checkRole(["Administrador"]), destroy);

// Ruta para obtener un usuario por su ID
router.get('/buscar/:id_usuario', getById);
router.post('/login',login);
router.get('/todos',verifyToken, checkRole(["Administrador"]),getAll);
router.get('/rol',verifyToken, checkRole(["Administrador"]),getAllUsersByRol);
router.get('/nombre',verifyToken, checkRole(["Administrador"]),searchByTerm);
router.get('/pendientes',verifyToken, checkRole(["Administrador"]),getAllUsersPendientes);
router.get('/aceptados',verifyToken, checkRole(["Administrador"]),getAllUsersAceptados);