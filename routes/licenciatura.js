const Router = require("express");
const { create, getById } = require("../controllers/licenciatura");
const router = Router();

module.exports = router;

router.post('/', create);
router.get('/buscar/:id', getById);