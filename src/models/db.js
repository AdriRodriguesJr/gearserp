const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '44.233.151.27',
    user: 'root',
    password: 'sua_senha',
    database: 'gearserp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000 // tempo limite em milissegundos (aqui, 20 segundos)
});

console.log('Configurações do pool criadas.');

// Adicione logs para verificar se o pool está sendo criado corretamente
console.log('Pool criado:', pool);

// Adicione um evento para lidar com erros
pool.on('error', (err) => {
    console.error('Erro no pool:', err);
});

// Adicione um console.log para verificar se o evento de erro foi configurado corretamente
console.log('Evento de erro adicionado ao pool.');

// Teste de conexão com o banco de dados
pool.getConnection()
    .then((connection) => {
        console.log('Conexão bem-sucedida!');

        // Adicione um console.log para verificar se a conexão foi obtida com sucesso
        console.log('Objeto de conexão:', connection);

        // Realize uma consulta de teste
        return connection.query('SELECT 1+1 as resultado');
    })
    .then(([rows, fields]) => {
        console.log('Resultado da consulta de teste:', rows);

        // Libere a conexão de volta ao pool
        pool.releaseConnection(connection);

        // Adicione um console.log para verificar se a conexão foi liberada com sucesso
        console.log('Conexão liberada de volta ao pool.');
    })
    .catch((err) => {
        console.error('Erro durante a conexão:', err);
    });

console.log('Fim do script.');
