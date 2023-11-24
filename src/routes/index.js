const express = require('express');
const authenticateJWT = require('../controllers/authenticateJWT');
const router = express.Router();
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const buscarCliente = require('../controllers/cadastroOs');
const cadastros = require('../controllers/CadastrosCliente')

router.get('/', homeController.index);
router.get('/funcionalidades', homeController.funcionalidades);
router.get('/sobre', homeController.sobre);
router.get('/planos', homeController.planos);
router.get('/contato', homeController.contato);
router.get('/login', homeController.showLoginPage);

router.post('/login', loginController.login);

/* pós login - rotas protegidas - Exibição apenas */
router.get('/home', authenticateJWT, homeController.home);
router.get('/listaos', authenticateJWT, homeController.listaos);

/* Rotas de requisição envolvendo o banco */

router.post('/login', loginController.login);
router.post('/cadastrar', authenticateJWT, cadastros.cadastrarCliente);
router.get('/cadastroCliente', authenticateJWT, cadastros.exibirClientes);
router.get('/buscarCliente', authenticateJWT,)

module.exports = router;
