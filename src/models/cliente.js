const db = require('./db'); // Caminho para o seu módulo de banco de dados

class Cliente {
    static async buscarCPF(termoBusca) {
        try {
            const [resultado] = await db.query('SELECT * FROM cliente WHERE cpf LIKE ?', ['%' + termoBusca + '%']);
            return resultado;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Cliente;
