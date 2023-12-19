const Sequelize = require('sequelize');

// Substitua pela sua URL de conexão
const DATABASE_URL = 'postgres://gearserp_user:ZNtA5wHsdL2v7UBvHutsJHeUjsBK4JMq@dpg-cln9frhll56s73feckq0-a.oregon-postgres.render.com/gearserp';

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Isso deve ser ajustado de acordo com suas necessidades de segurança
        }
    }
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
