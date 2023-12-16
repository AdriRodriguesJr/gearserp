const bcrypt = require('bcrypt');
const sequelize = require('../models/db'); // Atualize o caminho para o seu arquivo de conexão Sequelize
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        console.log('Email ou senha não fornecidos');
        return res.status(400).send('Email e senha são obrigatórios');
    }

    try {
        const [results, metadata] = await sequelize.query('SELECT * FROM usuarios WHERE email = :email', {
            replacements: { email: email },
            type: sequelize.QueryTypes.SELECT
        });

        const usuario = results[0];

        if (!usuario) {
            console.log('Usuário não encontrado');
            return res.status(401).send('Email e/ou senha incorretos');
        }

        console.log('Usuário recuperado do banco de dados:', usuario);
        console.log('Senha fornecida:', senha);
        console.log('Hash de senha do banco de dados:', usuario.senha);

        if (bcrypt.compareSync(senha, usuario.senha)) {
            const token = jwt.sign({ id: usuario.id, email: usuario.email }, secret, { expiresIn: '1h' });

            // Armazenar o token em um cookie
            res.cookie('token', token, { httpOnly: true });

            // Redirecionar para a página inicial
            console.log('Redirecionando para /home');
            res.redirect('/home');
        } else {
            console.log('Comparação de senha falhou');
            res.status(401).send('Email e/ou senha incorretos');
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
        res.status(500).send('Ocorreu um erro interno');
    }
};
