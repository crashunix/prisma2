require("dotenv").config();

const express = require('express');

const cors = require('cors');

// Iniciando o App
const app = express();
app.use(express.json());
app.use(cors());

// Rotas
app.use('/api', require('./routes/index'));

app.listen(process.env.PORT || 3000);