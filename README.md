# 🎯 ENEM CyberQuiz v3.0

<p align="center">
  <img src="https://img.shields.io/badge/Version-3.0.0-neon?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Node-%3E%3D18.0.0-blue?style=for-the-badge&logo=node.js" alt="Node Version">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Status-Online-brightgreen?style=for-the-badge" alt="Status">
</p>

## 🚀 Sobre o Projeto

O **ENEM CyberQuiz** é uma plataforma gamificada de estudos para o ENEM com tema cyberpunk. Através de um sistema de quiz interativo, os usuários podem testar seus conhecimentos em todas as áreas do conhecimento do ENEM, ganhar pontos, subir de nível e competir no ranking.

### ✨ Funcionalidades

- 🎮 **Quiz Gamificado** - Questões de múltipla escolha com sistema de pontuação
- 🏆 **Sistema de Conquistas** - Desbloqueie conquistas ao atingir metas
- 📊 **Ranking Online** - Competição com outros jogadores
- ⚡ **Feedback Instantâneo** - Explicações detalhadas após cada resposta
- 🎯 **Múltiplas Matérias** - Linguagens, Matemática, Natureza, Humanas
- 💎 **Sistema RPG** - XP, níveis, vidas e moedas
- 🔊 **Efeitos Sonoros** - Áudio gerado via Web Audio API
- 📱 **Responsivo** - Funciona em desktop, tablet e mobile
- ♿ **Acessível** - Suporte a leitores de tela e navegação por teclado

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Arquivos locais** - Perguntas em `questions.js` e ranking em `data/scores.json`

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com tema cyberpunk
- **JavaScript (ES6+)** - Lógica do aplicativo
- **Web Audio API** - Geração de sons

## 📋 Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com//cyberquiz.git
cd cyberquiz
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie a aplicação

#### Backend + frontend:
```bash
npm start
```

#### Desenvolvimento:
```bash
npm run dev
```

#### Verificar perguntas locais:
```bash
npm run seed
```

## 🌐 Acessando a Aplicação

- **Aplicação**: http://localhost:3000
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/health

## 📚 Estrutura do Projeto

```
cyberquiz/
├── server.js           # Backend API (Express)
├── app.js              # Frontend JavaScript
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── questions.js        # Banco de questões (local)
├── data/scores.json    # Ranking local (criado automaticamente)
├── package.json        # Dependências e scripts
├── .gitignore          # Arquivos ignorados pelo Git
└── README.md           # Esta documentação
```

## 🎮 Como Jogar

1. **Selecione uma matéria** no menu principal
2. **Responda as questões** clicando nas opções ou usando as teclas 1-5 / A-E
3. **Veja a explicação** após cada resposta
4. **Acumule pontos** e suba no ranking
5. **Desbloqueie conquistas** ao atingir metas

### Controles

- **Mouse**: Clique nas opções
- **Teclado**: 
  - `1-5` ou `A-E`: Selecionar resposta
  - `Enter`: Próxima questão
  - `Espaço`: Pular para próxima (após responder)

## 🏆 Sistema de Pontuação

- **Resposta Correta**: 100 pontos base
- **Bônus de Sequência**: +10 pontos por acerto consecutivo (máx 100)
- **Bônus de Velocidade**: +2 pontos por segundo restante (máx 120)
- **XP**: 25 pontos de experiência por acerto
- **Moedas**: 10 moedas por acerto

### Níveis

- Nível 1: 0-100 XP
- Nível 2: 100-200 XP
- Nível 3: 200-300 XP
- ... (a cada 100 XP sobe um nível)

## 🎯 Conquistas

- 🎯 **Primeiro Acerto** - Acerte sua primeira questão
- 🔥 **Combo Master** - 5 acertos consecutivos
- ⚡ **Lightning** - 10 acertos consecutivos
- 💰 **Half Grand** - Alcance 500 pontos
- 💎 **Cyber Genius** - Alcance 1000 pontos
- 👑 **Elite Hacker** - Alcance 2000 pontos
- ✨ **Perfect Run** - 100% de acertos em um quiz
- 🏃 **Marathon** - Complete 50 questões

## 📖 API Endpoints

### Principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Status da API |
| GET | `/health` | Health check |
| GET | `/random/:subject` | Questões aleatórias |
| GET | `/questions/:subject` | Todas as questões |
| POST | `/save-score` | Salvar pontuação |
| GET | `/ranking` | Ranking de jogadores |
| GET | `/stats` | Estatísticas gerais |
| POST | `/add-question` | Adicionar questão |
| PUT | `/update-question/:id` | Atualizar questão |
| DELETE | `/delete-question/:id` | Deletar questão |

### Parâmetros

- `subject`: `linguagens`, `matematica`, `natureza`, `humanas`, `geral`
- `limit`: Número de questões (padrão: 10, máximo: 50)
- `difficulty`: `easy`, `normal`, `hard`

## 🔒 Segurança

- **Nunca compartilhe** seu arquivo `.env`
- Suas credenciais do MongoDB são **confidenciais**
- O arquivo `.env` está no `.gitignore` para evitar commit acidental
- Em produção, use variáveis de ambiente do servidor

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Gustavo Belchior**

- GitHub: [@seu-usuario](https://github.com/muzan204)
- Email: contato@exemplo.com

## 🙏 Agradecimentos

- MongoDB Atlas pelo banco de dados gratuito
- Google Fonts pelas fontes Orbitron e Rajdhani
- Comunidade Node.js e Express

## 📞 Suporte

Encontrou um bug ou precisa de ajuda?

- Abra uma [issue](https://github.com/muzan204/cyberquiz/issues)
- Envie um email para contato@exemplo.com

---

<p align="center">
  <strong>🚀 Estude de forma gamificada e conquiste seu futuro!</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/ENEM-CyberQuiz-neon?style=for-the-badge" alt="ENEM CyberQuiz">
</p>
