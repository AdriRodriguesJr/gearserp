const bcrypt = require('bcrypt');
const sequelize = require('../models/db'); // Atualize o caminho para o seu arquivo de conexão Sequelize
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    const { email, senha } = req.body;
    console.log('Iniciando o processo de login');

    if (!email || !senha) {
        console.log('Email ou senha não fornecidos');
        return res.status(400).send('Email e senha são obrigatórios');
    }

    try {
        console.log('Buscando usuário no banco de dados');
        const [results, metadata] = await sequelize.query('SELECT * FROM usuarios WHERE email = :email', {
            replacements: { email: email },
            type: sequelize.QueryTypes.SELECT
        });

        const usuario = results[0];

        if (!usuario) {
            console.log('Usuário não encontrado para o email:', email);
            return res.status(401).send('Email e/ou senha incorretos');
        }

        console.log('Usuário recuperado do banco de dados:', usuario);
        console.log('Comparando a senha fornecida com o hash de senha do banco de dados');

        if (bcrypt.compareSync(senha, usuario.senha)) {
            console.log('Senha correta, gerando token JWT');
            const token = jwt.sign({ id: usuario.id, email: usuario.email }, secret, { expiresIn: '1h' });

            // Armazenar o token em um cookie
            console.log('Armazenando token no cookie');
            res.cookie('token', token, { httpOnly: true });

            // Redirecionar para a página inicial
            console.log('Redirecionando para /home');
            res.redirect('/home');
        } else {
            console.log('Falha na comparação de senha');
            res.status(401).send('Email e/ou senha incorretos');
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
        res.status(500).send('Ocorreu um erro interno');
    }
};
