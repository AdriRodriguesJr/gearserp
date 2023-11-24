const db = require('../models/db'); // Caminho para o seu módulo de banco de dados

//Cadastra os clientes no banco
exports.cadastrarCliente = async (req, res) => {
    try {
        // Extrair dados do cliente e do veículo
        const { cliente, veiculo } = req.body;
       
        // Inserir primeiro o cliente no banco de dados
        const resultCliente = await db.query('INSERT INTO cliente (nome, email, telefone, cpf, cep, endereco, numero, estado, cidade, tipo, genero, ativo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [cliente.nome, cliente.email, cliente.telefone, cliente.cpf, cliente.cep, cliente.endereco, cliente.numero, cliente.estado, cliente.cidade, cliente.tipo, cliente.genero, 1]);

        // Obter o ID do cliente inserido
        const clienteId = resultCliente.insertId;

        // Inserir o veículo relacionado ao cliente
        const resultVeiculo = await db.query('INSERT INTO veiculo (tipo, montadora, modelo, ano, placa) VALUES (?, ?, ?, ?, ?)',
        [veiculo.tipo, veiculo.montadora, veiculo.modelo, veiculo.ano, veiculo.placa]);

        // Redirecionar ou enviar mensagem de sucesso
        res.redirect('/cadastroCliente'); // ou res.send('Cadastro realizado com sucesso');
    } catch (error) {
        // Tratar erros
        console.error('Erro no cadastro:', error);
        res.status(500).send('Erro ao cadastrar cliente e veículo');
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

