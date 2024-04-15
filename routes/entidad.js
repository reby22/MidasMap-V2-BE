const Router = require("express");
const { createEntidad, getEntidadById } = require("../controllers/entidad");
const router = Router();

module.exports = router;

// Ruta para crear un nuevo usuario
router.post('/', createEntidad);

// Ruta para obtener un usuario por su ID
router.get('/:id', getEntidadById);