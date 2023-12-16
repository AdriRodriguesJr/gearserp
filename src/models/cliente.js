const { Op } = require('sequelize');
const sequelize = require('./db'); // Caminho para o seu módulo de conexão Sequelize
const { Model, DataTypes } = require('sequelize');

class Cliente extends Model {}

// Inicialize o modelo apenas com os campos necessários para a consulta
Cliente.init({
    cpf: DataTypes.STRING
}, {
    sequelize,
    modelName: 'cliente',
    timestamps: false // Desative isso se sua tabela não usar campos de timestamp
});

Cliente.buscarCPF = async function(termoBusca) {
    try {
        const resultado = await Cliente.findAll({
            where: {
                cpf: {
                    [Op.like]: '%' + termoBusca + '%'
                }
            }
        });
        return resultado;
    } catch (error) {
        throw error;
    }
};

module.exports = Cliente;
