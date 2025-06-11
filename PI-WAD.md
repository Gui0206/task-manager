# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Task Manager

#### Guilherme Holanda Marques

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução

Neste projeto, será desenvolvido um **Gerenciador de Tarefas para Estudantes Universitários**,  com foco em organização acadêmica individual. A aplicação tem como objetivo ajudar alunos de graduação a:

- Registrar e categorizar tarefas por disciplina ou tipo de atividade;
- Definir prazos de entrega e lembretes de provas e sessões de estudo;
- Priorizar atividades (ex.: trabalhos, leituras, revisões) e acompanhar o progresso em uma **visão semanal**;

A solução adota arquitetura full-stack, integrando banco de dados, backend e frontend via API para garantir consistência e desempenho. Ao final, espera-se entregar uma ferramenta leve e intuitiva que auxilie universitários a planejar suas semanas acadêmicas de forma prática.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas

![Imagem Persona](assets/images/template-persona.png)

### 2.2. User Stories

| ID | User Story |
| --- | --- |
| US01 | Como estudante universitário, quero **cadastrar uma tarefa** com título, descrição, disciplina e prazo, para que eu possa organizar minhas atividades acadêmicas. |
| US02 | Como estudante universitário, quero **visualizar minhas tarefas em uma visão semanal**, para que eu saiba exatamente o que preciso entregar em cada dia da semana. |
| US03 | Como estudante universitário, quero **receber lembretes antes do vencimento** das tarefas, para que eu não perca prazos importantes. |

---

### INVEST da US02

> US02 | Como estudante universitário, quero visualizar minhas tarefas em uma visão semanal, para que eu saiba exatamente o que preciso entregar em cada dia da semana.
> 
- **I – Independente**
    
    A implementação da visão semanal pode ser feita isoladamente, consumindo a lista de tarefas já cadastradas, sem depender de criação ou edição de tarefas.
    
- **N – Negociável**
    
    O layout (cores, estilo de calendário, número de tarefas exibidas por dia) pode ser ajustado conforme feedback, sem afetar o comportamento central.
    
- **V – Valiosa**
    
    Oferece ao usuário um panorama claro da semana, reduzindo ansiedade e ajudando na priorização das atividades.
    
- **E – Estimável**
    
    É possível estimar horas para:
    
    1. Consumir a API de tarefas;
    2. Renderizar o componente de calendário;
    3. Testar responsividade e interações.
- **S – Pequena (Small)**
    
    A primeira versão pode exibir apenas blocos com título e prazo, sem detalhes avançados (como arrastar tarefas), mantendo o escopo contido.
    
- **T – Testável**
    
    Testes automatizados ou manuais podem verificar se:
    
    - Todas as tarefas aparecem no dia correto;
    - A semana inicial e final estão corretas;
    - A visualização reage bem a diferentes tamanhos de tela.


---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados 

*Posicione aqui os diagramas de modelos relacionais do seu banco de dados, apresentando todos os esquemas de tabelas e suas relações. Utilize texto para complementar suas explicações, se necessário.*

*Posicione também o modelo físico com o Schema do BD (arquivo .sql)*

### 3.1.1 BD e Models

O banco de dados PostgreSQL foi inicializado via script SQL (`init.sql`), criando as seguintes tabelas:

- **disciplinas**  
  - `id` (PK)  
  - `nome`  
- **tipos_atividade**  
  - `id` (PK)  
  - `nome`  
- **atividades**  
  - `id` (PK)  
  - `titulo`  
  - `descricao`  
  - `data_criacao` (TIMESTAMP)  
  - `data_limite` (DATE)  
  - `status`  
  - `prioridade`  
  - `disciplina_id` (FK → `disciplinas.id`)  
  - `tipo_id` (FK → `tipos_atividade.id`)  

Os **Models** foram implementados em `models/Tarefa.js`, expondo métodos assíncronos para `create`, `findAll`, `findById`, `update` e `remove`, todos executando SQL puro via `pg`.


### 3.2 Arquitetura

A aplicação segue o padrão **MVC**:

- **Model:**  
  Tabelas e lógica de acesso ao banco (em `models/Tarefa.js`), usando o pacote `pg`.  
- **Controller:**  
  `controllers/TarefaController.js` recebe as requisições, chama os métodos de Model e devolve JSON.  
- **View:**  
  Nesta parte do módulo, atuamos apenas como API; o frontend consome JSON via HTTP.  

![Diagrama MVC](assets/images/diagrama_mvc.png)
> Fluxo:  
> 1. Cliente faz requisição HTTP →  
> 2. **Controller** processa →  
> 3. chama **Model** (SQL via `pg`) →  
> 4. retorna dados →  
> 5. Controller envia JSON →  
> 6. Cliente consome resposta.

### 3.3. Wireframes

A seguir, apresento os wireframes das telas principais do Gerenciador de Tarefas, alinhados às User Stories:

---

#### 3.3.1 Tela Principal (Visão Semanal)

- **Objetivo (US02):** permitir ao usuário visualizar todas as tarefas da semana de forma clara.
- **Componentes principais:**
    - **Cabeçalho**
        - Logo / nome da aplicação (esquerda)
        - Botão “+ Nova tarefa” (direita)
    - **Navegação de datas**
        - Setas “<” e “>” para navegar entre semanas
        - Indicador da semana atual (ex: “Semana de 05/05 a 11/05”)
    - **Grade Semanal**
        - 7 colunas (segunda a domingo)
        - Cada coluna exibe cartões de tarefas com:
            - **Título**
            - **Prazo** (hora)
            - **Prioridade** (ícone ou cor de borda)
    - **Legenda / Filtros (opcional)**
        - Checkboxes para filtrar por disciplina ou prioridade

![Wireframe Tela Semanal](assets/images/wireframe-tasks.png)


---

#### 3.3.2 Tela de Criação/Edição de Tarefa

- **Objetivo (US01, US03):** cadastrar nova tarefa com todos os detalhes necessários.
- **Componentes principais:**
    - **Formulário**
        - Campo “Título” (input text)
        - Campo “Descrição” (textarea)
        - Dropdown “Tipo de atividade”
        - Campo “Data limite” (date picker)
        - Radio buttons ou dropdown “Prioridade”

![Wireframe Tela Semanal](assets/images/wireframe-new-task.png)


---

> Relação com as User Stories
> 
> - **US02:** Tela Principal exibe a visão semanal.
> - **US01 & US03:** Tela de Criação/Edição cobre cadastro de tarefas e geração de lembrete.

Os wireframes de baixa fidelidade focam na estrutura e navegação, garantindo que os fluxos principais (listar, criar e editar tarefas) estejam contemplados antes de avançar para o design de alta fidelidade.

### 3.4. Guia de estilos

Este guia de estilos foi criado para garantir uma identidade visual coerente e uma boa experiência de uso em toda a aplicação. A seguir estão as instruções para a utilização correta dos componentes visuais:

---![Guia de estilos e layout das telas](assets/images/prototipo-alta-layouts.png)
<br>


### Tipografia

- A fonte padrão é **Inter**, utilizada em toda a aplicação.
- Hierarquia:
  - `H1`: para títulos principais (branco, grande destaque)
  - `H2`, `H3`, `H4`: para subtítulos e textos auxiliares, com opacidade e tamanhos reduzidos conforme o nível
  - O texto H4 deve ter **60% de opacidade**

### Paleta de Cores

- **#191919** — Fundo principal da aplicação
- **#202020** — Fundo do cabeçalho secundário
- **#2C2C2C** — Fundo de cards e elementos de interface
- **#B3B3B3** — Texto secundário e elementos menos relevantes
- **#FFFFFF** — Texto principal e elementos em destaque

### Botões

- O botão principal (`+ Nova Tarefa`) tem texto branco com borda branca e fundo transparente.
- Em interações (hover, focus), a cor de fundo pode inverter para branco, e o texto deve seguir a cor de fundo original.
- O botão deve ter **border-radius: 6px** e **padding adequado**.

### Bordas

- **Espessura**: 4px
- **Raio**: 6px
- Usadas em cards, campos de input e divisão de colunas.

### Cards

- Os cards devem seguir estrutura consistente:
  - Título (H4 - branco)
  - Descrição (texto secundário - opacidade menor)
  - Tipo e Prioridade (texto menor - cor #B3B3B3)
- Fundo escuro (`#2C2C2C`) com borda (`#2C2C2C` ou `#2C2C2C` opaco)


### 3.5. Protótipo de alta fidelidade 

![Protótipo de alta fidelidade das telas](assets/images/prototipo-alta-paginas.png)
<br>


### 3.6 WebAPI e Endpoints

| Método | Rota                 | Controller                    | Descrição                         |
| ------ | -------------------- | ----------------------------- | --------------------------------- |
| POST   | `/api/tarefas`       | `TarefaController.criarTarefa`  | Cria uma nova tarefa              |
| GET    | `/api/tarefas`       | `TarefaController.listarTarefas`| Lista todas as tarefas            |
| GET    | `/api/tarefas/:id`   | `TarefaController.buscarTarefa` | Busca uma tarefa por ID           |
| PUT    | `/api/tarefas/:id`   | `TarefaController.editarTarefa` | Atualiza os dados de uma tarefa   |
| DELETE | `/api/tarefas/:id`   | `TarefaController.excluirTarefa`| Remove uma tarefa pelo ID         |

### 3.7 Interface e Navegação 

Nesta fase, o frontend foi implementado para permitir que o usuário interaja diretamente com as tarefas:

- **Tela Principal (views/tarefas.ejs)**  
  - Exibe uma grade semanal (segunda a domingo) utilizando um grid de 7 colunas.  
  - Cada coluna mostra os cards de tarefa cujas datas caem naquela semana, preenchidos dinamicamente via JavaScript e Fetch API.  
  - O cabeçalho possui apenas o botão “+ Nova Tarefa” (sem título fixo), seguindo o guia de estilos.

- **Modal de Criação/Edição (views/partials/modal-nova-tarefa.ejs)**  
  - Sobrepõe a tela principal com um overlay semitransparente (rgba(0,0,0,0.7)).  
  - Contém campos para “Título”, “Descrição”, “Tipo de atividade”, “Prioridade” e “Data”.  
  - Botão “Salvar” (btn-submit) com fundo branco e texto escuro, e “Cancelar” (btn-cancel) transparente.  
  - O mesmo modal é usado para criar ou editar; ao clicar em um card, o formulário é preenchido com os dados existentes.

- **Integração com Back-end**  
  - Ao carregar a página, `calendar.js` faz `GET /api/tarefas`, gera as colunas e injeta cada card de tarefa na coluna correspondente (baseado em `data_limite`).  
  - Navegação entre semanas: botões “<” e “>” ajustam a variável `startOfWeek` em incrementos de 7 dias, recarregando as tarefas visualizadas.  
  - Enviar formulário dispara `POST /api/tarefas` (criação) ou `PUT /api/tarefas/:id` (edição), retornando JSON e atualizando a grade sem recarregar a página.

- **Fluxo Resumido**  
  1. **Acesso** → redireciona para `/tarefas` → EJS renderiza a estrutura básica.  
  2. **JavaScript** → busca tarefas, monta colunas e cards.  
  3. **Criar/Edição** → abre modal, preenche (se editar), envia com fetch → backend atualiza banco → frontend recarrega grade.  
  4. **Navegação Semanal** → muda `startOfWeek` e chama novamente `loadTasksForWeek()`.

  ![Imagem Home](assets/images/imagem-home.png)
  ![Imagem Nova Tarefa](assets/images/imagem-nova-tarefa.png)

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web 

### 4.1 Demonstração do Sistema Web

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros 

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---
