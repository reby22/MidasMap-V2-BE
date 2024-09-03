const Router = require("express");
const { getAll } = require("../controllers/pais");
const router = Router();


module.exports = router;


router.get('/todos', getAll);