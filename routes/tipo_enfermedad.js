const Router = require("express");
const { getAllenfermedades } = require("../controllers/tipo_enfermedad.js");
const router = Router();


module.exports = router;


router.get('/todos', getAllenfermedades);