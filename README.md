# 🎯 ENEM CyberQuiz v3.1

<p align="center">
  <img src="https://img.shields.io/badge/Version-3.1.0-neon?style=for-the-badge&color=00f0ff&labelColor=0a0a0f" alt="Version">
  <img src="https://img.shields.io/badge/Node-%3E%3D18.0.0-blue?style=for-the-badge&logo=node.js&labelColor=0a0a0f" alt="Node Version">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge&labelColor=0a0a0f" alt="License">
  <img src="https://img.shields.io/badge/Status-Online-brightgreen?style=for-the-badge&labelColor=0a0a0f" alt="Status">
</p>

<p align="center">
  <strong>Uma plataforma gamificada de estudos para o ENEM, com tema cyberpunk, 100% local — sem depender de nenhum banco de dados externo.</strong>
</p>

---

## 📑 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#️-tecnologias-utilizadas)
- [Instalação](#-instalação)
- [Como jogar](#-como-jogar)
- [Sistema de pontuação](#-sistema-de-pontuação)
- [Conquistas](#-conquistas)
- [API](#-api-endpoints)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🚀 Sobre o Projeto

O **ENEM CyberQuiz** é uma plataforma de estudos gamificada, com estética cyberpunk, para treinar para o ENEM. Através de um quiz interativo, você testa seus conhecimentos nas quatro áreas do exame, ganha pontos, sobe de nível e disputa posição em um ranking local.

Todo o backend roda com **arquivos JSON locais** — não é necessário configurar nenhum banco de dados (MongoDB, PostgreSQL, etc.) para colocar o projeto no ar.

## ✨ Funcionalidades

- 🎮 **Quiz gamificado** — questões de múltipla escolha com pontuação dinâmica
- 🏆 **Sistema de conquistas** — 8 conquistas desbloqueáveis por desempenho
- 📊 **Ranking local** — competição registrada em `data/scores.json`
- ⚡ **Feedback instantâneo** — explicação detalhada após cada resposta
- 🎯 **5 modos de estudo** — Linguagens, Matemática, Natureza, Humanas ou Simulado Geral
- 💎 **Sistema RPG** — XP, níveis, vidas e moedas, persistidos no navegador
- 🔊 **Efeitos sonoros** — sintetizados via Web Audio API (nenhum arquivo de áudio externo)
- ⌨️ **Atalhos de teclado** — jogue sem tirar a mão do teclado
- 📱 **Responsivo** — desktop, tablet e mobile
- ♿ **Acessível** — leitores de tela, navegação por teclado e `prefers-reduced-motion`
- 🌐 **Funciona offline** — se o backend estiver fora do ar, o quiz continua jogável com o banco de questões local

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js** + **Express 5** — API REST
- **Arquivos locais** — perguntas em `questions.js`, ranking em `data/scores.json`, perguntas customizadas em `data/custom-questions.json`

### Frontend

- **HTML5** semântico
- **CSS3** — tema cyberpunk (Orbitron + Rajdhani via Google Fonts)
- **JavaScript (ES6+)** vanilla — sem frameworks, sem build step
- **Web Audio API** — geração de efeitos sonoros em tempo real

## 📋 Pré-requisitos

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/muzan204/cyberquiz.git
cd cyberquiz
```

### 2. Instale as dependências

```bash
npm install
```

### 3. (Opcional) Verifique o banco de questões

```bash
npm run seed
```

Isso valida a integridade das questões e cria a pasta `data/` (ranking e perguntas customizadas) se ela ainda não existir.

### 4. Inicie a aplicação

```bash
npm start
```

Para desenvolvimento com reinício automático ao salvar arquivos:

```bash
npm run dev
```

## 🌐 Acessando a Aplicação

| Recurso       | URL                                |
| ------------- | ----------------------------------- |
| Aplicação     | http://localhost:3000              |
| Health check  | http://localhost:3000/health       |
| Status da API | http://localhost:3000/             |

> A porta pode ser customizada com a variável de ambiente `PORT`.

## 🎮 Como Jogar

1. **Selecione uma matéria** no menu principal
2. **Responda as questões** clicando nas opções ou usando o teclado
3. **Veja a explicação** exibida após cada resposta
4. **Acumule pontos** e suba no ranking
5. **Desbloqueie conquistas** ao atingir metas de desempenho

### Controles

| Ação                      | Como fazer                     |
| -------------------------- | ------------------------------- |
| Selecionar resposta        | Clique do mouse, teclas `1`–`5` ou `A`–`E` |
| Avançar após responder      | `Enter` ou `Espaço`             |
| Alternar som                | Botão 🔊 no cabeçalho           |

## 🏆 Sistema de Pontuação

| Bônus                  | Valor                                             |
| ----------------------- | -------------------------------------------------- |
| Resposta correta         | 100 pontos base                                    |
| Bônus de sequência       | +10 pontos por acerto consecutivo (máx. 100)       |
| Bônus de velocidade      | +2 pontos por segundo restante (máx. 120)          |
| XP por acerto            | 25 pontos de experiência                           |
| Moedas por acerto        | 10 moedas                                          |

### Níveis

O nível é calculado como `⌊XP ÷ 100⌋ + 1` — ou seja, a cada 100 XP acumulado você sobe um nível.

## 🎯 Conquistas

| Ícone | Nome           | Como desbloquear                     |
| ----- | -------------- | -------------------------------------- |
| 🎯    | Primeiro Acerto | Acerte sua primeira questão            |
| 🔥    | Combo Master    | 5 acertos consecutivos                 |
| ⚡    | Lightning       | 10 acertos consecutivos                |
| 💰    | Half Grand      | Alcance 500 pontos em um simulado      |
| 💎    | Cyber Genius    | Alcance 1000 pontos em um simulado     |
| 👑    | Elite Hacker    | Alcance 2000 pontos em um simulado     |
| ✨    | Perfect Run     | 100% de acertos em um quiz             |
| 🏃    | Marathon        | Complete 50 questões (total acumulado) |

## 📖 API Endpoints

Todas as respostas seguem o formato `{ success: boolean, ...dados }` ou `{ success: false, error: string }`.

| Método | Endpoint                | Descrição                              |
| ------ | ------------------------ | ---------------------------------------- |
| GET    | `/`                       | Status da API                            |
| GET    | `/health`                 | Health check                             |
| GET    | `/random/:subject`        | Questões aleatórias                      |
| GET    | `/questions/:subject`     | Todas as questões da matéria             |
| POST   | `/check-answer`           | Confere uma resposta pelo ID da questão  |
| POST   | `/save-score`             | Salva pontuação no ranking               |
| GET    | `/ranking`                | Ranking dos melhores jogadores           |
| GET    | `/stats`                  | Estatísticas gerais                      |
| POST   | `/add-question`           | Adiciona uma questão customizada         |
| PUT    | `/update-question/:id`    | Atualiza uma questão customizada         |
| DELETE | `/delete-question/:id`    | Remove uma questão customizada           |

> Apenas questões customizadas (criadas via `/add-question`) podem ser editadas ou removidas — o banco original em `questions.js` permanece intacto.

### Parâmetros

- `subject`: `linguagens`, `matematica`, `natureza`, `humanas` ou `geral`
- `limit` (em `/random/:subject`): número de questões (padrão: 10, máximo: 50)
- `difficulty` (em `/random/:subject`): `easy`, `normal` ou `hard`

## 📚 Estrutura do Projeto

```
cyberquiz/
├── server.js              # Backend (API Express)
├── app.js                 # Lógica do front-end
├── index.html             # Página principal
├── styles.css             # Estilos (tema cyberpunk)
├── questions.js           # Banco de questões (local, original)
├── seed.js                # Script de verificação/inicialização
├── data/                  # Criado automaticamente (ignorado pelo git)
│   ├── scores.json        # Ranking local
│   └── custom-questions.json
├── package.json           # Dependências e scripts
├── .gitignore
├── LICENSE
└── README.md
```

## 🔒 Segurança

- Este projeto **não usa banco de dados externo** — não há credenciais para vazar.
- Ainda assim, se você adicionar variáveis de ambiente (`.env`) no futuro, elas já estão no `.gitignore` por padrão.
- Em produção, prefira sempre configurar a porta via variável de ambiente `PORT` em vez de hardcode.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Rode `npm run seed` para garantir que o banco de questões continua íntegro
4. Commit suas mudanças: `git commit -m "Adiciona minha-feature"`
5. Push para a branch: `git push origin feature/minha-feature`
6. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Gustavo Belchior**

- GitHub: [@muzan204](https://github.com/muzan204)

## 🙏 Agradecimentos

- Google Fonts pelas fontes Orbitron e Rajdhani
- Comunidade Node.js e Express

## 📞 Suporte

Encontrou um bug ou tem uma sugestão?

- Abra uma [issue](https://github.com/muzan204/cyberquiz/issues)

---

<p align="center"><strong>🚀 Estude de forma gamificada e conquiste seu futuro!</strong></p>
