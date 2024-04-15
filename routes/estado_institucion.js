const Router = require("express");
const { createEstado, getEstadoById} = require("../controllers/estado_institucion");
const router = Router();

module.exports = router;

// Ruta para crear un nuevo usuario
router.post('/', createEstado);

// Ruta para obtener un usuario por su ID
router.get('/:id', getEstadoById);