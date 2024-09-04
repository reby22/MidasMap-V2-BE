const Router = require("express");
const { create, update, destroy,getById,getAllReportsinMap,getAllReportsPendientes, getAllReportsAceptados } = require("../controllers/reporte");
const router = Router();

module.exports = router;

router.post('/', create);
router.put('/actualizar', update);
router.delete('/:id', destroy);
router.get('/buscar/:id', getById);
router.get('/mapa', getAllReportsinMap);
router.get('/pendientes', getAllReportsPendientes);
router.get('/aceptados', getAllReportsAceptados);