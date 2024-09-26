const Router = require("express");
const { create, getById, getAll,update,destroy} = require("../controllers/notificacion");
const router = Router();

module.exports = router;

router.post('/', create);
router.put('/actualizar', update);
router.get('/buscar/:id', getById);
router.delete('/:id', destroy);
router.get('/todos', getAll); //aplique filtros