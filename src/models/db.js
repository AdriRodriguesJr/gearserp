const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '10.0.2.15',  // Substitua pelo IP da sua VM
    user: 'root',
    password: '503271962',  // Substitua pela senha que você configurou
    database: 'gearserp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('Conexão com o banco realizada.');

module.exports = pool;
