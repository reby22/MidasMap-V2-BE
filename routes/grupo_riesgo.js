const Router = require("express");
const { create, getById, getAll} = require("../controllers/grupo_riesgo");
const router = Router();

module.exports = router;

//router.post('/', create);
//router.get('/:id', getById);

router.get('/todos',getAll);