const Router = require("express");
const { create, getById, getAll} = require("../controllers/riesgo");
const router = Router();

module.exports = router;

// Ruta para crear un nuevo usuario
router.post('/', create);

// Ruta para obtener un usuario por su ID
router.get('/todos', getAll);
router.get('/:id', getById);