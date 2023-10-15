const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const authenticateJWT = require('../controllers/authenticateJWT'); // Importe o middleware

router.get('/', homeController.index);
router.get('/funcionalidades', homeController.funcionalidades);
router.get('/sobre', homeController.sobre);
router.get('/planos', homeController.planos);
router.get('/contato', homeController.contato);
router.get('/login', homeController.showLoginPage);

router.post('/login', loginController.login);

/* pós login - rotas protegidas */
router.get('/home', authenticateJWT, homeController.home);
router.get('/listaos', authenticateJWT, homeController.listaos);
router.get('/cadastroCliente', authenticateJWT, homeController.cadastroCliente);

module.exports = router;
