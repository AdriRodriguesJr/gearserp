const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
    console.log('Middleware authenticateJWT chamado');

    const token = req.cookies.token;  // Obtendo o token do cookie
    console.log('Token do cookie:', token);

    if (token) {
        jwt.verify(token, secret, (err, user) => {
            console.log('Verificando token');
            if (err) {
                console.log('Erro ao verificar token:', err);
                return res.redirect('/login');
            }
            console.log('Token verificado, usuário:', user);
            req.user = user;
            next();
        });
    } else {
        console.log('Token não encontrado, redirecionando para login');
        res.redirect('/login');
    }
};


module.exports = authenticateJWT;