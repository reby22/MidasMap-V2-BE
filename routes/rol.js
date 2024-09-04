const Router = require("express");
const { create, getById, getAll} = require("../controllers/rol");
const router = Router();

module.exports = router;

router.post('/', create);
router.get('/todos', getAll);
router.get('/buscar/:id', getById);
