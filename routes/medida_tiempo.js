const Router = require("express");
const { getById, getAll} = require("../controllers/medida_tiempo");
const router = Router();

module.exports = router;

router.get('/buscar/:id', getById);
router.get('/todos', getAll);