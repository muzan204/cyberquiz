/**
 * ENEM CyberQuiz - Backend (Express)
 * ------------------------------------------------------------
 * API 100% local: nenhuma dependência de banco de dados externo.
 * O ranking e as perguntas personalizadas são persistidos em
 * arquivos JSON dentro da pasta data/ (criada automaticamente).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');

const QUESTIONS = require('./questions.js');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'data');
const SCORES_FILE = path.join(DATA_DIR, 'scores.json');
const CUSTOM_QUESTIONS_FILE = path.join(DATA_DIR, 'custom-questions.json');

const VALID_SUBJECTS = ['linguagens', 'matematica', 'natureza', 'humanas'];
const MAX_RANKING_ENTRIES = 200;

// ------------------------------------------------------------
// Utilidades de persistência local
// ------------------------------------------------------------
function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(SCORES_FILE)) fs.writeFileSync(SCORES_FILE, '[]', 'utf-8');
  if (!fs.existsSync(CUSTOM_QUESTIONS_FILE)) fs.writeFileSync(CUSTOM_QUESTIONS_FILE, '[]', 'utf-8');
}

function readJSON(filePath, fallback) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function getCustomQuestions() {
  return readJSON(CUSTOM_QUESTIONS_FILE, []);
}

function getAllQuestionsForSubject(subject) {
  const base = VALID_SUBJECTS.includes(subject) ? QUESTIONS[subject] || [] : [];
  const custom = getCustomQuestions().filter((q) => q.subject === subject);
  return [...base, ...custom];
}

function getEveryQuestion() {
  const base = VALID_SUBJECTS.flatMap((subject) => QUESTIONS[subject] || []);
  return [...base, ...getCustomQuestions()];
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sanitizeQuestionForClient(q) {
  // Nunca envia a resposta correta nem a explicação junto da pergunta,
  // para evitar que o front-end "veja" a resposta antes de o jogador responder.
  const { correct, explanation, ...rest } = q;
  return rest;
}

// ------------------------------------------------------------
// Middlewares
// ------------------------------------------------------------
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

// ------------------------------------------------------------
// Rotas
// ------------------------------------------------------------
app.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'ENEM CyberQuiz API',
    version: require('./package.json').version,
    status: 'online',
    docs: 'https://github.com/muzan204/cyberquiz#-api-endpoints',
  });
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.get(
  '/questions/:subject',
  asyncRoute((req, res) => {
    const { subject } = req.params;
    if (subject !== 'geral' && !VALID_SUBJECTS.includes(subject)) {
      return res.status(400).json({ success: false, error: `Matéria inválida: ${subject}` });
    }
    const list = subject === 'geral' ? getEveryQuestion() : getAllQuestionsForSubject(subject);
    res.json({ success: true, subject, total: list.length, questions: list.map(sanitizeQuestionForClient) });
  })
);

app.get(
  '/random/:subject',
  asyncRoute((req, res) => {
    const { subject } = req.params;
    if (subject !== 'geral' && !VALID_SUBJECTS.includes(subject)) {
      return res.status(400).json({ success: false, error: `Matéria inválida: ${subject}` });
    }

    let limit = parseInt(req.query.limit, 10);
    if (!Number.isFinite(limit) || limit <= 0) limit = 10;
    limit = Math.min(limit, 50);

    const { difficulty } = req.query;
    if (difficulty && !['easy', 'normal', 'hard'].includes(difficulty)) {
      return res.status(400).json({ success: false, error: `Dificuldade inválida: ${difficulty}` });
    }

    let pool = subject === 'geral' ? getEveryQuestion() : getAllQuestionsForSubject(subject);
    if (difficulty) pool = pool.filter((q) => q.difficulty === difficulty);

    const selected = shuffle(pool).slice(0, limit);
    res.json({ success: true, subject, total: selected.length, questions: selected.map(sanitizeQuestionForClient) });
  })
);

app.post(
  '/check-answer',
  asyncRoute((req, res) => {
    const { id, answerIndex } = req.body || {};
    if (!id || typeof answerIndex !== 'number') {
      return res.status(400).json({ success: false, error: 'Envie "id" e "answerIndex".' });
    }
    const question = getEveryQuestion().find((q) => q.id === id);
    if (!question) return res.status(404).json({ success: false, error: 'Questão não encontrada.' });

    const isCorrect = answerIndex === question.correct;
    res.json({
      success: true,
      correct: isCorrect,
      correctIndex: question.correct,
      explanation: question.explanation,
    });
  })
);

app.post(
  '/save-score',
  asyncRoute((req, res) => {
    const { name, subject, score, accuracy, correct, wrong, maxStreak, xp, coins, timeSeconds } = req.body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, error: 'O campo "name" é obrigatório.' });
    }
    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({ success: false, error: 'O campo "score" deve ser um número não negativo.' });
    }

    const entry = {
      id: crypto.randomUUID(),
      name: name.trim().slice(0, 24),
      subject: subject || 'geral',
      score: Math.round(score),
      accuracy: typeof accuracy === 'number' ? Math.round(accuracy) : null,
      correct: typeof correct === 'number' ? correct : null,
      wrong: typeof wrong === 'number' ? wrong : null,
      maxStreak: typeof maxStreak === 'number' ? maxStreak : null,
      xp: typeof xp === 'number' ? xp : null,
      coins: typeof coins === 'number' ? coins : null,
      timeSeconds: typeof timeSeconds === 'number' ? timeSeconds : null,
      createdAt: new Date().toISOString(),
    };

    const scores = readJSON(SCORES_FILE, []);
    scores.push(entry);
    scores.sort((a, b) => b.score - a.score);
    writeJSON(SCORES_FILE, scores.slice(0, MAX_RANKING_ENTRIES));

    res.status(201).json({ success: true, entry });
  })
);

app.get(
  '/ranking',
  asyncRoute((req, res) => {
    let limit = parseInt(req.query.limit, 10);
    if (!Number.isFinite(limit) || limit <= 0) limit = 10;
    limit = Math.min(limit, 100);

    const scores = readJSON(SCORES_FILE, []);
    const ranking = [...scores].sort((a, b) => b.score - a.score).slice(0, limit);
    res.json({ success: true, total: scores.length, ranking });
  })
);

app.get(
  '/stats',
  asyncRoute((req, res) => {
    const scores = readJSON(SCORES_FILE, []);
    const totalGames = scores.length;
    const averageScore = totalGames
      ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / totalGames)
      : 0;
    const topScore = totalGames ? Math.max(...scores.map((s) => s.score)) : 0;

    const questionsPerSubject = Object.fromEntries(
      VALID_SUBJECTS.map((subject) => [subject, getAllQuestionsForSubject(subject).length])
    );

    res.json({
      success: true,
      totalGamesPlayed: totalGames,
      uniquePlayers: new Set(scores.map((s) => s.name)).size,
      averageScore,
      topScore,
      questionsPerSubject,
      totalQuestions: getEveryQuestion().length,
    });
  })
);

app.post(
  '/add-question',
  asyncRoute((req, res) => {
    const { subject, question, options, correct, explanation, difficulty } = req.body || {};

    if (!VALID_SUBJECTS.includes(subject)) {
      return res.status(400).json({ success: false, error: `Matéria inválida: ${subject}` });
    }
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ success: false, error: 'O campo "question" é obrigatório.' });
    }
    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ success: false, error: 'Envie ao menos 2 "options".' });
    }
    if (typeof correct !== 'number' || correct < 0 || correct >= options.length) {
      return res.status(400).json({ success: false, error: '"correct" deve ser um índice válido de options.' });
    }

    const newQuestion = {
      id: `custom-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      subject,
      difficulty: ['easy', 'normal', 'hard'].includes(difficulty) ? difficulty : 'normal',
      question,
      options,
      correct,
      explanation: explanation || '',
      custom: true,
    };

    const custom = getCustomQuestions();
    custom.push(newQuestion);
    writeJSON(CUSTOM_QUESTIONS_FILE, custom);

    res.status(201).json({ success: true, question: newQuestion });
  })
);

app.put(
  '/update-question/:id',
  asyncRoute((req, res) => {
    const { id } = req.params;
    const custom = getCustomQuestions();
    const index = custom.findIndex((q) => q.id === id);

    if (index === -1) {
      const isStatic = getEveryQuestion().some((q) => q.id === id);
      const error = isStatic
        ? 'Questões do banco original não podem ser editadas, apenas questões customizadas.'
        : 'Questão customizada não encontrada.';
      return res.status(404).json({ success: false, error });
    }

    const allowedFields = ['question', 'options', 'correct', 'explanation', 'difficulty', 'subject'];
    for (const field of allowedFields) {
      if (field in req.body) custom[index][field] = req.body[field];
    }

    writeJSON(CUSTOM_QUESTIONS_FILE, custom);
    res.json({ success: true, question: custom[index] });
  })
);

app.delete(
  '/delete-question/:id',
  asyncRoute((req, res) => {
    const { id } = req.params;
    const custom = getCustomQuestions();
    const index = custom.findIndex((q) => q.id === id);

    if (index === -1) {
      const isStatic = getEveryQuestion().some((q) => q.id === id);
      const error = isStatic
        ? 'Questões do banco original não podem ser removidas, apenas questões customizadas.'
        : 'Questão customizada não encontrada.';
      return res.status(404).json({ success: false, error });
    }

    const [removed] = custom.splice(index, 1);
    writeJSON(CUSTOM_QUESTIONS_FILE, custom);
    res.json({ success: true, removed });
  })
);

// ------------------------------------------------------------
// 404 e tratamento de erros
// ------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[ERRO]', err);
  res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
});

// ------------------------------------------------------------
// Inicialização
// ------------------------------------------------------------
ensureDataFiles();

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🎯 ENEM CyberQuiz rodando em http://localhost:${PORT}`);
    console.log(`   Aplicação:    http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/health`);
  });
}

module.exports = app;
