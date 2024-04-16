const Router = require("express");
const { create, getById } = require("../controllers/titulo");
const router = Router();

module.exports = router;

// Ruta para crear un nuevo usuario
router.post('/', create);

// Ruta para obtener un usuario por su ID
router.get('/:id', getById);