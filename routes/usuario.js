const Router = require("express");
const { create, getById, login,getAll, search, getAllByRol} = require("../controllers/usuario");
const router = Router();

module.exports = router;

// Ruta para crear un nuevo usuario
router.post('/', create);

// Ruta para actualizar un usuario existente
//router.put('/:id', updateUser);

// Ruta para eliminar un usuario
//router.delete('/:id', deleteUser);

// Ruta para obtener un usuario por su ID
router.get('/buscar/:id_usuario', getById);
router.post('/login',login);
router.get('/todos',getAll);
router.get('/nombre',search);
router.get('/rol',getAllByRol);