const Router = require("express");
const { createUser, getUserById, login, orderBy} = require("../controllers/usuario");
const router = Router();

module.exports = router;

// Ruta para crear un nuevo usuario
router.post('/', createUser);

// Ruta para actualizar un usuario existente
//router.put('/:id', updateUser);

// Ruta para eliminar un usuario
//router.delete('/:id', deleteUser);

// Ruta para obtener un usuario por su ID
router.get('/buscar/:id', getUserById);
router.post('/login',login);
router.get('/orderBy',orderBy);