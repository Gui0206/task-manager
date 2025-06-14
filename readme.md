# Gerenciador de Tarefas para Estudantes Universitários

## 🎥 Demonstração em Vídeo

Assista à demonstração do sistema funcionando no YouTube:  
👉 [https://youtu.be/-GHnzy98mWI](https://youtu.be/-GHnzy98mWI)


## Descrição do sistema

Aplicação web para auxiliar estudantes de graduação a organizar suas atividades acadêmicas de forma simples e objetiva.

Funcionalidades principais:

- Cadastrar tarefas com título, descrição, disciplina, prazo e prioridade
- Exibir tarefas em uma visão semanal
- Enviar lembretes antes do vencimento

## Estrutura de pastas e arquivos

```
csharp
CopiarEditar
meu-projeto/
│
├── config/
│   └── database.js         # Configuração de conexão com o banco
│
├── controllers/
│   └── TarefaController.js   # Lógica de CRUD de tarefas
│
├── models/
│   └── Tarefa.js             # Definição do modelo Task (ORM ou schema)
│
├── routes/
│   └── index.js            # Rotas principais (tasks, disciplinas, tipos)
│
├── views/
│   └── tarefas.ejs           # Página de visualização semanal
│
├── public/
│   ├── css/                # Arquivos CSS
│   ├── js/                 # Scripts de interação
│   └── images/             # Imagens e ícones
│
├── .env.example            # Exemplo de variáveis de ambiente
├── .gitignore              # Ignorar node_modules, .env, etc.
├── package.json            # Dependências e scripts
├── package-lock.json
├── server.js               # Ponto de entrada do servidor Express
├── WAD.md                  # Documento de Web Application Design
└── modelo-banco.png        # Diagrama lógico/físico do banco de dados

```

## Como executar o projeto localmente

1. **Clonar o repositório**

    ```bash
    git clone https://github.com/seu-usuario/seu-repo.git
    cd seu-repo
    ```

2. **Instalar dependências**

    ```bash
    npm install
    ```

3. **Configurar variáveis de ambiente**

    Copie o arquivo de exemplo e ajuste as credenciais:

    ```bash
    cp .env.example .env
    ```

    Edite o `.env` com seus dados de conexão PostgreSQL:

    ```env
    DB_HOST=seu_host_postgres
    DB_PORT=5432
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=seu_banco
    ```

4. **Criar esquema do banco de dados**

    Execute o script de migração:

    ```bash
    npm run init-db
    ```

    > O script `scripts/runSQLScript.js` lê e executa `scripts/init.sql`, criando as tabelas no seu banco PostgreSQL.

5. **Iniciar o servidor**

    ```bash
    npm start
    # ou
    node server.js
    ```

6. **Acessar a aplicação**

    Abra no navegador:

    ```
    http://localhost:3000/
    ```

---

## Conectando ao banco de dados

A configuração da conexão está em `config/database.js`:

```js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user:     process.env.DB_USER,
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port:     process.env.DB_PORT,
  ssl:      { rejectUnauthorized: false }
});

module.exports = pool;
```

---
