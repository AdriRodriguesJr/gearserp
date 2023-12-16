const Sequelize = require('sequelize');

const sequelize = new Sequelize('gearserp', 'gearserp_user', 'ZNtA5wHsdL2v7UBvHutsJHeUjsBK4JMq', {
    host: 'dpg-cln9frhll56s73feckq0-a',
    dialect: 'postgres',
    port: '5432',
});

// Testando a conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o Banco de Dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

module.exports = sequelize;
