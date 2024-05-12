const Router = require("express");
const { create, getById, getAllAgentes } = require("../controllers/agente_causal");
const router = Router();

module.exports = router;

// Ruta para crear un nuevo usuario
//router.post('/', create);

// Ruta para obtener un usuario por su ID
//router.get('/:id', getById);

router.get('/todos', getAllAgentes);