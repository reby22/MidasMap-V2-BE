const Router = require("express");
const { create, getById, getAll} = require("../controllers/licenciatura");
const router = Router();

module.exports = router;

router.post('/', create);
router.get('/buscar/:id', getById);
router.get('/todos', getAll);