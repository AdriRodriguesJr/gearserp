const bcrypt = require('bcrypt');

const password = '';

bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error('Erro ao criar a senha criptografada:', err);
        return;
    }

    console.log('Senha criptografada:', hash);
});