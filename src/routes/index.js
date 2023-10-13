const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.index);
router.get('/funcionalidades', homeController.funcionalidades);
router.get('/sobre', homeController.sobre);
router.get('/planos', homeController.planos);
router.get('/contato', homeController.contato);
router.get('/login', homeController.login);

/*pós login */

router.get('/home', homeController.home);
router.get('/listaos', homeController.listaos);
router.get('/cadastroCliente', homeController.cadastroCliente);

module.exports = router;