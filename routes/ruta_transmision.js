const Router = require("express");
const { getAll} = require("../controllers/ruta_transmision");
const router = Router();


module.exports = router;


router.get('/todos',getAll );