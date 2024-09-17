const Router = require("express");
const { getById, getAll} = require("../controllers/region");
const router = Router();

module.exports = router;

router.get('/todos', getAll);
router.get('/buscar/:id', getById);
