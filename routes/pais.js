const Router = require("express");
const { getAll, getByRegion } = require("../controllers/pais");
const router = Router();


module.exports = router;


router.get('/todos', getAll);
router.get('/region/:id', getByRegion);