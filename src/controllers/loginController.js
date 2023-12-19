const sequelize = require('../models/db'); // Caminho para a conexão Sequelize

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send('Email e senha são obrigatórios');
    }

    try {
        const [usuarios] = await sequelize.query(
            'SELECT * FROM usuarios WHERE email = :email AND senha = :senha',
            {
                replacements: { email, senha },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (usuarios.length === 0) {
            return res.status(401).send('Email ou senha incorretos');
        }

        // Login bem-sucedido
        res.redirect('/home');
    } catch (error) {
        console.error('Erro ao tentar login:', error);
        res.status(500).send('Ocorreu um erro interno');
    }
};
