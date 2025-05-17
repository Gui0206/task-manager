// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('API Gerenciador de Tarefas funcionando');
});
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
