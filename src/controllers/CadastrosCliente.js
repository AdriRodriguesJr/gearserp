const sequelize = require('../path/to/your/db'); // Caminho para o seu Sequelize

exports.cadastrarCliente = async (req, res) => {
    try {
        const { cliente, veiculo } = req.body;

        // Inserir o cliente no banco de dados
        await sequelize.query(
            'INSERT INTO cliente (nome, email, telefone, cpf, cep, endereco, numero, estado, cidade, tipo, genero, ativo) VALUES (:nome, :email, :telefone, :cpf, :cep, :endereco, :numero, :estado, :cidade, :tipo, :genero, :ativo)',
            {
                replacements: {
                    nome: cliente.nome,
                    email: cliente.email,
                    telefone: cliente.telefone,
                    cpf: cliente.cpf,
                    cep: cliente.cep,
                    endereco: cliente.endereco,
                    numero: cliente.numero,
                    estado: cliente.estado,
                    cidade: cliente.cidade,
                    tipo: cliente.tipo,
                    genero: cliente.genero,
                    ativo: 1 // ou cliente.ativo se você está recebendo esse valor do req.body
                },
                type: sequelize.QueryTypes.INSERT
            }
        );

        await sequelize.query(
            'INSERT INTO veiculo (tipo, montadora, modelo, ano, placa, cliente_id) VALUES (:tipo, :montadora, :modelo, :ano, :placa, :cliente_id)',
            {
                replacements: { ...veiculo, cliente_id: clienteId },
                type: sequelize.QueryTypes.INSERT
            }
        );

        res.redirect('/cadastroCliente');
    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).send('Erro ao cadastrar cliente');
    }
};


//Exibe os dados do cliente cadastrado no banco
exports.exibirClientes = async (req, res) => {
    try {
        const [clientes] = await db.query('SELECT * FROM cliente');
        res.render('cadastroCliente', { clientes: clientes });
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).send('Erro ao buscar informações dos clientes');
    }
};

