const bcrypt = require('bcrypt');
const db = require('../models/db');

exports.login = async (req, res) => {
    console.log('Iniciando o processo de login...');

    const { email, senha } = req.body;
    console.log('Email recebido:', email);
    console.log('Senha recebida:', senha);  // Remova essa linha em produção para manter a senha segura

    try {
        console.log('Consultando o banco de dados...');
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        const user = rows[0];  // Acessando o primeiro item do array
        console.log('Usuário encontrado:', user);

        if (user) {
            console.log('Usuário encontrado. Verificando se senha e hash estão definidos...');
            console.log('Senha definida?', !!senha);
            console.log('Hash definido?', !!user.senha);

            if (user.senha && senha) {
                console.log('Comparando as senhas...');
                const isMatch = bcrypt.compareSync(senha, user.senha);
                console.log('As senhas coincidem?', isMatch);

                if (isMatch) {
                    console.log('Configurando a sessão do usuário...');
                    req.session.user = user;
                    console.log('Usuário autenticado! Redirecionando para /home...');
                    res.redirect('/home');
                } else {
                    console.log('Senha incorreta.');
                    res.send('Email e/ou senha incorretos');
                }
            } else {
                console.log('Senha ou hash não definidos.');
                res.send('Email e/ou senha incorretos');
            }
        } else {
            console.log('Usuário não encontrado.');
            res.send('Email e/ou senha incorretos');
        }
    } catch (error) {
        console.error('Erro durante o processo de login:', error);
        res.status(500).send('Ocorreu um erro interno');
    }
};
