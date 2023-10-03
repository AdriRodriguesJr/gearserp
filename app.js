const express = require('express');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = 3000;

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});