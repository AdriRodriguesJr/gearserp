const path = require('path');
const express = require('express');
const app = express();
const routes = require('./src/routes'); // Certifique-se de que o caminho está correto

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views', 'pre_login'));
app.set('views', path.join(__dirname, 'src', 'views', 'pos_login'));

app.use(express.static(path.join(__dirname, 'src', 'static')));


app.use('/', routes); // Esta linha estava faltando

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
