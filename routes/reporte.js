const Router = require("express");
const { create, update, destroy,getByIdUsuario,getAllReportsinMap,getAllReportsPendientes, getAllReportsAceptados } = require("../controllers/reporte");
const router = Router();
const { verifyToken, checkRole } = require('../helpers/jwt');

module.exports = router;

router.post('/',verifyToken, checkRole(["Administrador","Colaborador"]), create);
router.put('/actualizar',verifyToken, checkRole(["Administrador"]), update);
router.delete('/:id',verifyToken, checkRole(["Administrador"]), destroy);
router.get('/buscar/:id', getByIdUsuario);
router.get('/mapa', getAllReportsinMap);
router.get('/pendientes',verifyToken, checkRole(["Administrador"]), getAllReportsPendientes);
router.get('/aceptados', getAllReportsAceptados);