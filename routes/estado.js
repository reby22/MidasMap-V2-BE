const Router = require("express");
const { getAllestados } = require("../controllers/estado");
const router = Router();


module.exports = router;


router.get('/todos', getAllestados);