const Router = require("express");
const { getAll } = require("../controllers/tipo_patogeno.js");
const router = Router();


module.exports = router;


router.get('/todos', getAll);