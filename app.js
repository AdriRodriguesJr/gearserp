const path = require('path');
const express = require('express');
const routes = require('./src/routes'); // Certifique-se de que o caminho está correto
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'src', 'static')));

app.use(cookieParser());  // Aqui é onde o cookie-parser é configurado

// Middlewares para tratar o corpo das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
