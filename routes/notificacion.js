const Router = require("express");
const { create, getById, getAll, search} = require("../controllers/notificacion");
const router = Router();

module.exports = router;

// Ruta para crear un nuevo usuario
router.post('/', create);

// Ruta para obtener un usuario por su ID
router.get('/buscar/:id', getById);

router.get('/todos', getAll);

router.get('/buscador',search);