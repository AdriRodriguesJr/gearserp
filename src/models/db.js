const Sequelize = require('sequelize');

const sequelize = new Sequelize('gearserp', 'gearserp_user', 'ZNtA5wHsdL2v7UBvHutsJHeUjsBK4JMq', {
    host: 'dpg-cln9frhll56s73feckq0-a',
    dialect: 'postgres',
    port: '5432',
});

module.exports = sequelize;