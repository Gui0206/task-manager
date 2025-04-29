# Gerenciador de Tarefas para Estudantes Universitários

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
│   └── TaskController.js   # Lógica de CRUD de tarefas
│
├── models/
│   └── Task.js             # Definição do modelo Task (ORM ou schema)
│
├── routes/
│   └── index.js            # Rotas principais (tasks, disciplinas, tipos)
│
├── views/
│   ├── layout.ejs          # Template base
│   └── tasks.ejs           # Página de visualização semanal
│
├── public/
│   ├── css/                # Arquivos CSS
│   ├── js/                 # Scripts de interação
│   └── images/             # Imagens e ícones
│
├── scripts/
│   └── seed.js             # (Opcional) scripts de preenchimento inicial
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
    
3. **Criar arquivo de ambiente**
    
    ```bash
    cp .env.example .env
    # Edite .env para configurar sua conexão com o banco de dados
    ```
    
4. **Criar esquema do banco de dados**
    - Se usar ORM:
        
        ```bash
        npm run migrate
        ```
        
    - Ou importar o script SQL manualmente:
        
        ```bash
        psql -U usuario -d nome_db -f schema.sql
        ```
        
5. **Iniciar o servidor**
    
    ```bash
    npm start
    # ou
    node server.js
    ```
    
6. **Acessar a aplicação**
    
    Abra no navegador: `http://localhost:3000`
    

---

## Atualizações no WAD.md

- **Seção 1 – Introdução**: Descreve objetivo e escopo do Gerenciador de Tarefas para Estudantes Universitários.
- **Seção 3.1 – Modelo de Banco de Dados**: Inclui diagrama lógico/físico (`modelo-banco.png`) de criação das tabelas.
