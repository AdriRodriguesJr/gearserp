const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./src/routes'); // Certifique-se de que o caminho está correto

const app = express();

app.use(session({
    secret: 'batatinha',  // Substitua por sua própria chave secreta
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Defina como true se você estiver em um ambiente de produção com HTTPS
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'src', 'static')));

// Middlewares para tratar o corpo das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
