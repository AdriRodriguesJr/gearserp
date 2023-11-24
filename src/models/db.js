const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '35.160.120.126',
    user: 'root',
    password: '1234',  // Substitua pela senha que você configurou
    database: 'gearserp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('Conexão com o banco realizada.');

module.exports = pool;
