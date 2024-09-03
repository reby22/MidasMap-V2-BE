const Router = require("express");
const { create, getById, getAll} = require("../controllers/grupo_riesgo");
const router = Router();

module.exports = router;

// Ruta para crear un nuevo usuario
//router.post('/', create);

// Ruta para obtener un usuario por su ID
//router.get('/:id', getById);

router.get('/todos',getAll);