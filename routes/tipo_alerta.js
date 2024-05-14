const Router = require("express");
const { create, getById, getAllAlertTypes} = require("../controllers/tipo_alerta");
const router = Router();

module.exports = router;

// Ruta para crear un nuevo usuario
router.post('/', create);

// Ruta para obtener un usuario por su ID
router.get('/todos', getAllAlertTypes);
router.get('/:id', getById);