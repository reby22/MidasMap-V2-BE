const Router = require("express");
const { getAll, getByPais } = require("../controllers/estado");
const router = Router();


module.exports = router;


router.get('/todos/:id_pais', getAll);
router.get('/pais/:id', getByPais);