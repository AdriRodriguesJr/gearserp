const bcrypt = require('bcrypt');
const sequelize = require('../models/db'); // Atualize o caminho para o seu arquivo de conexão Sequelize

async function inserirUsuario() {
    try {
        // Informações do usuário a ser inserido
        const usuarioInfo = {
            id: 2,
            nome: 'Master',
            email: 'adriano.rodrigues.junior01@gmail.com', // substitua pelo email desejado
            senha: '',
            nivel_acesso: 'Master',
            status: true
        };

        // Criptografar a senha
        const senhaHash = await bcrypt.hash(usuarioInfo.senha, 10);

        // Inserir o usuário no banco de dados
        await sequelize.query(
            'INSERT INTO usuarios (id, nome, email, senha, nivel_acesso, status) VALUES (:id, :nome, :email, :senha, :nivel_acesso, :status)',
            {
                replacements: {
                    id: usuarioInfo.id,
                    nome: usuarioInfo.nome,
                    email: usuarioInfo.email,
                    senha: senhaHash,
                    nivel_acesso: usuarioInfo.nivel_acesso,
                    status: usuarioInfo.status
                },
                type: sequelize.QueryTypes.INSERT
            }
        );

        console.log('Usuário inserido com sucesso');
    } catch (error) {
        console.error('Erro ao inserir usuário:', error);
    }
}

inserirUsuario();