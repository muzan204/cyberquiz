// ============================================
// ENEM CyberQuiz API - local backend
// ============================================

const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { questionsBank } = require('./questions.js');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const SCORES_FILE = path.join(DATA_DIR, 'scores.json');
const SUBJECTS = ['linguagens', 'matematica', 'natureza', 'humanas'];

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.static(__dirname));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

function getAllQuestions() {
    return SUBJECTS.flatMap(subject => questionsBank[subject] || []);
}

function getQuestionsBySubject(subject) {
    if (subject === 'geral') {
        return getAllQuestions();
    }

    return questionsBank[subject] || [];
}

function shuffleArray(items) {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function sanitizeScorePayload(body) {
    const nome = String(body.nome || 'Player').trim().slice(0, 50) || 'Player';

    return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        nome,
        score: Math.max(0, Number(body.score) || 0),
        accuracy: Math.min(100, Math.max(0, Number(body.accuracy) || 0)),
        level: Math.max(1, Number(body.level) || 1),
        xp: Math.max(0, Number(body.xp) || 0),
        coins: Math.max(0, Number(body.coins) || 0),
        streak: Math.max(0, Number(body.streak) || 0),
        time: Math.max(0, Number(body.time) || 0),
        subject: SUBJECTS.includes(body.subject) ? body.subject : 'geral',
        createdAt: new Date().toISOString()
    };
}

async function readScores() {
    try {
        const content = await fs.readFile(SCORES_FILE, 'utf8');
        const scores = JSON.parse(content);
        return Array.isArray(scores) ? scores : [];
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [];
        }
        throw err;
    }
}

async function writeScores(scores) {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(SCORES_FILE, `${JSON.stringify(scores, null, 2)}\n`, 'utf8');
}

function sortRanking(scores) {
    return [...scores].sort((a, b) => (
        (b.score || 0) - (a.score || 0)
        || (b.accuracy || 0) - (a.accuracy || 0)
        || (a.time || 0) - (b.time || 0)
    ));
}

app.get('/api', (req, res) => {
    res.json({
        status: 'online',
        storage: 'local',
        message: 'CyberQuiz API local',
        endpoints: {
            app: 'GET /',
            health: 'GET /health',
            questions: 'GET /questions/:subject',
            random: 'GET /random/:subject',
            ranking: 'GET /ranking',
            stats: 'GET /stats',
            saveScore: 'POST /save-score',
            user: 'GET /user/:username'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        database: 'local files',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.get('/questions/:subject', (req, res) => {
    const subject = req.params.subject;
    const difficulty = req.query.difficulty;
    let questions = getQuestionsBySubject(subject);

    if (difficulty) {
        questions = questions.filter(question => question.difficulty === difficulty);
    }

    res.json({
        success: true,
        total: questions.length,
        data: questions
    });
});

app.get('/random/:subject', (req, res) => {
    const subject = req.params.subject;
    const difficulty = req.query.difficulty;
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
    let questions = getQuestionsBySubject(subject);

    if (difficulty) {
        questions = questions.filter(question => question.difficulty === difficulty);
    }

    const randomQuestions = shuffleArray(questions).slice(0, limit);

    res.json({
        success: true,
        total: randomQuestions.length,
        data: randomQuestions
    });
});

app.post('/save-score', async (req, res, next) => {
    try {
        const score = sanitizeScorePayload(req.body);
        const scores = await readScores();
        scores.push(score);
        await writeScores(sortRanking(scores).slice(0, 100));

        res.status(201).json({
            success: true,
            message: 'Score salvo localmente!',
            data: score
        });
    } catch (err) {
        next(err);
    }
});

app.get('/ranking', async (req, res, next) => {
    try {
        const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
        const subject = req.query.subject;
        let scores = await readScores();

        if (subject && subject !== 'geral') {
            scores = scores.filter(score => score.subject === subject);
        }

        const ranking = sortRanking(scores).slice(0, limit);
        res.json({
            success: true,
            total: ranking.length,
            data: ranking
        });
    } catch (err) {
        next(err);
    }
});

app.get('/stats', async (req, res, next) => {
    try {
        const scores = await readScores();
        const questions = getAllQuestions();
        const bestPlayer = sortRanking(scores)[0] || null;
        const averageScore = scores.length
            ? Math.round(scores.reduce((sum, score) => sum + (score.score || 0), 0) / scores.length)
            : 0;

        res.json({
            success: true,
            data: {
                totalQuestions: questions.length,
                totalScores: scores.length,
                totalUsers: new Set(scores.map(score => score.nome)).size,
                bestPlayer,
                averageScore,
                questionsBySubject: SUBJECTS.reduce((acc, subject) => {
                    acc[subject] = (questionsBank[subject] || []).length;
                    return acc;
                }, {})
            }
        });
    } catch (err) {
        next(err);
    }
});

app.get('/user/:username', async (req, res, next) => {
    try {
        const username = req.params.username;
        const scores = (await readScores()).filter(score => score.nome === username);

        if (!scores.length) {
            return res.status(404).json({
                success: false,
                error: 'Usuário não encontrado'
            });
        }

        const ranking = sortRanking(scores);
        const best = ranking[0];

        res.json({
            success: true,
            data: {
                user: {
                    username,
                    totalScore: scores.reduce((sum, score) => sum + (score.score || 0), 0),
                    gamesPlayed: scores.length,
                    bestScore: best.score,
                    level: best.level,
                    xp: best.xp,
                    lastPlayed: scores[scores.length - 1].createdAt
                },
                recentScores: scores.slice(-5).reverse()
            }
        });
    } catch (err) {
        next(err);
    }
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint não encontrado',
        path: req.path
    });
});

app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: err.message
    });
});

const server = app.listen(PORT, () => {
    console.log('=================================');
    console.log(`CyberQuiz rodando em http://localhost:${PORT}`);
    console.log('Banco de dados: perguntas locais + ranking em JSON');
    console.log('=================================');
});

function shutdown(signal) {
    console.log(`${signal} recebido. Fechando servidor...`);
    server.close(() => {
        console.log('Servidor fechado.');
        process.exit(0);
    });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

module.exports = app;
