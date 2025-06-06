// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Configurações de view (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Redireciona “/” para “/tarefas”
app.get('/', (req, res) => {
  res.redirect('/tarefas');
});

// Rotas de página (HTML/EJS)
app.use('/', webRoutes);

// Rotas da API (JSON)
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
