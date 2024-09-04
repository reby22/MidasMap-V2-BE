const Router = require("express");
const { create, getById, getAllUsersPendientes,getAllUsersAceptados, login,getAll,update, destroy,  searchByTerm, getAllUsersByRol} = require("../controllers/usuario");
const router = Router();

module.exports = router;

// Ruta para crear un nuevo usuario
router.post('/', create);

// Ruta para actualizar un usuario existente
router.put('/actualizar',update);

// Ruta para eliminar un usuario
router.delete('/:id', destroy);

// Ruta para obtener un usuario por su ID
router.get('/buscar/:id_usuario', getById);
router.post('/login',login);
router.get('/todos',getAll);
router.get('/rol',getAllUsersByRol);
router.get('/nombre',searchByTerm);
router.get('/pendientes',getAllUsersPendientes);
router.get('/aceptados',getAllUsersAceptados);