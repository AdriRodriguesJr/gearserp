const bcrypt = require('bcrypt');
const db = require('../models/db');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        console.log('Email ou senha não fornecidos');
        return res.status(400).send('Email e senha são obrigatórios');
    }

    try {
        const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (!user || user.length === 0) {
            console.log('Usuário não encontrado');
            return res.status(401).send('Email e/ou senha incorretos');
        }

        const userData = user[0];

        console.log('Usuário recuperado do banco de dados:', userData);
        console.log('Senha fornecida:', senha);
        console.log('Hash de senha do banco de dados:', userData.senha);

        if (bcrypt.compareSync(senha, userData.senha)) {
            const token = jwt.sign({ id: userData.id, email: userData.email }, secret, { expiresIn: '1h' });

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
