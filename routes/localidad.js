const Router = require("express");
const { createLocalidad, getLocalidadById } = require("../controllers/localidad");
const router = Router();

module.exports = router;

// Ruta para crear un nuevo usuario
router.post('/', createLocalidad);

// Ruta para obtener un usuario por su ID
router.get('/:id', getLocalidadById);