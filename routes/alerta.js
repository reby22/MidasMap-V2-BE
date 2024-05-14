const Router = require("express");
const { create, getById, getAllAlerts, searchAlerts ,} = require("../controllers/alerta");
const router = Router();

module.exports = router;

// Ruta para crear un nuevo usuario
router.post('/', create);

// Ruta para obtener un usuario por su ID
router.get('/buscar/:id', getById);

router.get('/todos', getAllAlerts);

router.get('/buscador',searchAlerts);