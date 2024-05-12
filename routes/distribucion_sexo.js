const Router = require("express");
const { getAllDistribuciones  } = require("../controllers/distribucion_sexo.js");
const router = Router();


module.exports = router;


router.get('/todos', getAllDistribuciones );