const Router = require("express");
const { create, getById, getAll,update,destroy} = require("../controllers/notificacion");
const router = Router();
const { verifyToken, checkRole } = require('../helpers/jwt');

module.exports = router;

router.post('/',verifyToken, checkRole(["Administrador"]), create);
router.put('/actualizar',verifyToken, checkRole(["Administrador"]), update);
router.get('/buscar/:id',verifyToken, checkRole(["Administrador"]), getById);
router.delete('/:id',verifyToken, checkRole(["Administrador"]), destroy);
router.get('/todos', getAll); //aplique filtros