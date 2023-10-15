const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'gearserp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('conexão com o banco realizada.')

module.exports = pool;