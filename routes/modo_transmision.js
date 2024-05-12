const Router = require("express");
const { getAllmodos} = require("../controllers/modo_transmision");
const router = Router();


module.exports = router;


router.get('/todos',getAllmodos );