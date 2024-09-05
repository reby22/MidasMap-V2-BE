const Router = require("express");
const { getAll } = require("../controllers/estado");
const router = Router();


module.exports = router;


router.get('/todos/:id_pais', getAll);