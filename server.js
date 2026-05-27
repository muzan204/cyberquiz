// ============================================
// ENEM CyberQuiz API - Version 3.0
// Backend robusto e organizado
// ============================================

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// CONFIG
// ============================================

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ ERRO: MONGO_URI não configurada no arquivo .env');
    console.error('📝 Configure sua conexão MongoDB antes de iniciar.');
    process.exit(1);
}

// ============================================
// MIDDLEWARES
// ============================================

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

// ============================================
// DATABASE CONNECTION
// ============================================

let dbConnected = false;

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => {
    dbConnected = true;
    console.log('=================================');
    console.log('✅ MongoDB conectado com sucesso');
    console.log('🚀 CyberQuiz API v3.0 Online');
    console.log('=================================');
})
.catch((err) => {
    console.error('=================================');
    console.error('❌ ERRO NA CONEXÃO COM MONGODB');
    console.error(err.message);
    console.error('=================================');
});

// ============================================
// SCHEMAS
// ============================================

const ScoreSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true,
        minlength: [2, 'Nome deve ter pelo menos 2 caracteres'],
        maxlength: [50, 'Nome deve ter no máximo 50 caracteres']
    },
    score: {
        type: Number,
        default: 0,
        min: [0, 'Score não pode ser negativo']
    },
    accuracy: {
        type: Number,
        default: 0,
        min: [0, 'Precisão não pode ser negativa'],
        max: [100, 'Precisão não pode ultrapassar 100%']
    },
    level: {
        type: Number,
        default: 1,
        min: [1, 'Nível mínimo é 1']
    },
    xp: {
        type: Number,
        default: 0,
        min: [0, 'XP não pode ser negativo']
    },
    coins: {
        type: Number,
        default: 0,
        min: [0, 'Coins não podem ser negativos']
    },
    streak: {
        type: Number,
        default: 0,
        min: [0, 'Streak não pode ser negativo']
    },
    time: {
        type: Number,
        default: 0,
        min: [0, 'Tempo não pode ser negativo']
    },
    subject: {
        type: String,
        default: 'geral'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '365d' // Auto-delete após 1 ano
    }
});

const QuestionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Matéria é obrigatória'],
        trim: true,
        enum: {
            values: ['linguagens', 'matematica', 'natureza', 'humanas', 'geral'],
            message: 'Matéria inválida. Use: linguagens, matematica, natureza, humanas ou geral'
        }
    },
    difficulty: {
        type: String,
        default: 'normal',
        enum: {
            values: ['easy', 'normal', 'hard'],
            message: 'Dificuldade inválida. Use: easy, normal ou hard'
        }
    },
    question: {
        type: String,
        required: [true, 'Pergunta é obrigatória'],
        trim: true,
        minlength: [10, 'Pergunta deve ter pelo menos 10 caracteres']
    },
    options: {
        type: [String],
        required: [true, 'Opções são obrigatórias'],
        validate: {
            validator: function(v) {
                return v.length >= 2 && v.length <= 5;
            },
            message: 'Pergunta deve ter entre 2 e 5 opções'
        }
    },
    correct: {
        type: Number,
        required: [true, 'Resposta correta é obrigatória'],
        min: [0, 'Índice inválido'],
        validate: {
            validator: function(v) {
                return Number.isInteger(v);
            },
            message: 'Resposta correta deve ser um número inteiro'
        }
    },
    explanation: {
        type: String,
        default: '',
        trim: true
    },
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Nome de usuário é obrigatório'],
        unique: true,
        trim: true,
        minlength: [3, 'Usuário deve ter pelo menos 3 caracteres'],
        maxlength: [30, 'Usuário deve ter no máximo 30 caracteres']
    },
    totalScore: {
        type: Number,
        default: 0,
        min: [0, 'Score não pode ser negativo']
    },
    level: {
        type: Number,
        default: 1,
        min: [1, 'Nível mínimo é 1']
    },
    xp: {
        type: Number,
        default: 0,
        min: [0, 'XP não pode ser negativo']
    },
    gamesPlayed: {
        type: Number,
        default: 0
    },
    bestScore: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastPlayed: {
        type: Date,
        default: Date.now
    }
});

// ============================================
// MODELS
// ============================================

const Score = mongoose.model('Score', ScoreSchema);
const Question = mongoose.model('Question', QuestionSchema);
const User = mongoose.model('User', UserSchema);

// ============================================
// ROUTES
// ============================================

// Home Route
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: '🚀 CyberQuiz API v3.0',
        version: '3.0.0',
        endpoints: {
            health: 'GET /health',
            questions: 'GET /questions/:subject',
            random: 'GET /random/:subject',
            ranking: 'GET /ranking',
            stats: 'GET /stats',
            saveScore: 'POST /save-score',
            addQuestion: 'POST /add-question',
            updateQuestion: 'PUT /update-question/:id',
            deleteQuestion: 'DELETE /delete-question/:id'
        }
    });
});

// Health Check
app.get('/health', (req, res) => {
    res.json({
        status: dbConnected ? 'healthy' : 'degraded',
        database: dbConnected ? 'connected' : 'disconnected',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// SAVE SCORE
app.post('/save-score', async (req, res) => {
    try {
        const { nome, score, accuracy, level, xp, coins, streak, time, subject } = req.body;

        // Validações básicas
        if (!nome || typeof nome !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Nome inválido ou ausente'
            });
        }

        const novoScore = new Score({
            nome: nome.trim(),
            score: score || 0,
            accuracy: accuracy || 0,
            level: level || 1,
            xp: xp || 0,
            coins: coins || 0,
            streak: streak || 0,
            time: time || 0,
            subject: subject || 'geral'
        });

        await novoScore.save();

        // Atualizar ou criar usuário
        await User.findOneAndUpdate(
            { username: nome.trim() },
            {
                $set: { lastPlayed: new Date() },
                $max: { bestScore: score || 0 },
                $max: { totalScore: score || 0 },
                $max: { level: level || 1 },
                $max: { xp: xp || 0 },
                $inc: { gamesPlayed: 1 }
            },
            { upsert: true, new: true }
        );

        res.status(201).json({
            success: true,
            message: '🏆 Score salvo com sucesso!',
            data: {
                id: novoScore._id,
                score: novoScore.score,
                accuracy: novoScore.accuracy
            }
        });

    } catch (err) {
        console.error('Erro ao salvar score:', err.message);
        res.status(500).json({
            success: false,
            error: 'Erro interno ao salvar score',
            details: err.message
        });
    }
});

// GET RANKING
app.get('/ranking', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const subject = req.query.subject;

        let query = {};
        if (subject && subject !== 'geral') {
            query.subject = subject;
        }

        const ranking = await Score.find(query)
            .sort({ score: -1, accuracy: -1, time: 1 })
            .limit(limit)
            .select('nome score accuracy level time subject createdAt');

        res.json({
            success: true,
            total: ranking.length,
            data: ranking
        });

    } catch (err) {
        console.error('Erro ao buscar ranking:', err.message);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar ranking',
            details: err.message
        });
    }
});

// GET QUESTIONS
app.get('/questions/:subject', async (req, res) => {
    try {
        const subject = req.params.subject;
        const difficulty = req.query.difficulty;

        let query = {};
        if (subject !== 'geral') {
            query.subject = subject;
        }
        if (difficulty) {
            query.difficulty = difficulty;
        }

        const questions = await Question.find(query)
            .select('-__v')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            total: questions.length,
            data: questions
        });

    } catch (err) {
        console.error('Erro ao buscar perguntas:', err.message);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar perguntas',
            details: err.message
        });
    }
});

// GET RANDOM QUESTIONS
app.get('/random/:subject', async (req, res) => {
    try {
        const subject = req.params.subject;
        const limit = Math.min(parseInt(req.query.limit) || 10, 50); // Máx 50
        const difficulty = req.query.difficulty;

        let match = {};
        if (subject !== 'geral') {
            match.subject = subject;
        }
        if (difficulty) {
            match.difficulty = difficulty;
        }

        const questions = await Question.aggregate([
            { $match: match },
            { $sample: { size: limit } },
            { $project: { __v: 0 } }
        ]);

        res.json({
            success: true,
            total: questions.length,
            data: questions
        });

    } catch (err) {
        console.error('Erro ao buscar perguntas aleatórias:', err.message);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar perguntas aleatórias',
            details: err.message
        });
    }
});

// ADD QUESTION
app.post('/add-question', async (req, res) => {
    try {
        const questionData = req.body;

        // Validação manual adicional
        if (!questionData.question || !questionData.options || questionData.correct === undefined) {
            return res.status(400).json({
                success: false,
                error: 'Pergunta, opções e resposta correta são obrigatórios'
            });
        }

        const question = new Question(questionData);
        await question.save();

        res.status(201).json({
            success: true,
            message: '📚 Pergunta adicionada com sucesso!',
            data: {
                id: question._id,
                subject: question.subject
            }
        });

    } catch (err) {
        console.error('Erro ao adicionar pergunta:', err.message);
        
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: 'Validação falhou',
                details: Object.values(err.errors).map(e => e.message)
            });
        }

        res.status(500).json({
            success: false,
            error: 'Erro ao adicionar pergunta',
            details: err.message
        });
    }
});

// UPDATE QUESTION
app.put('/update-question/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updated = await Question.findByIdAndUpdate(
            id,
            updates,
            { 
                new: true, 
                runValidators: true,
                context: 'query'
            }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                error: 'Pergunta não encontrada'
            });
        }

        res.json({
            success: true,
            message: '✅ Pergunta atualizada com sucesso!',
            data: updated
        });

    } catch (err) {
        console.error('Erro ao atualizar pergunta:', err.message);
        res.status(500).json({
            success: false,
            error: 'Erro ao atualizar pergunta',
            details: err.message
        });
    }
});

// DELETE QUESTION
app.delete('/delete-question/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Question.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: 'Pergunta não encontrada'
            });
        }

        res.json({
            success: true,
            message: '🗑️ Pergunta deletada com sucesso!',
            data: { id }
        });

    } catch (err) {
        console.error('Erro ao deletar pergunta:', err.message);
        res.status(500).json({
            success: false,
            error: 'Erro ao deletar pergunta',
            details: err.message
        });
    }
});

// GET STATS
app.get('/stats', async (req, res) => {
    try {
        const totalQuestions = await Question.countDocuments();
        const totalScores = await Score.countDocuments();
        const totalUsers = await User.countDocuments();

        const bestPlayer = await Score.findOne()
            .sort({ score: -1 })
            .select('nome score accuracy');

        const avgScore = await Score.aggregate([
            { $group: { _id: null, avg: { $avg: '$score' } } }
        ]);

        const subjectStats = await Question.aggregate([
            { $group: { _id: '$subject', count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                totalQuestions,
                totalScores,
                totalUsers,
                bestPlayer: bestPlayer || null,
                averageScore: avgScore.length > 0 ? Math.round(avgScore[0].avg) : 0,
                questionsBySubject: subjectStats.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, {})
            }
        });

    } catch (err) {
        console.error('Erro ao buscar estatísticas:', err.message);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar estatísticas',
            details: err.message
        });
    }
});

// SEED QUESTIONS
app.post('/seed', async (req, res) => {
    try {
        const questions = [
            {
                subject: 'matematica',
                difficulty: 'normal',
                question: 'Quanto é 5 x 5?',
                options: ['10', '15', '20', '25', '30'],
                correct: 3,
                explanation: '5 vezes 5 = 25'
            },
            {
                subject: 'humanas',
                difficulty: 'easy',
                question: 'Quem descobriu o Brasil?',
                options: [
                    'Dom Pedro',
                    'Pedro Álvares Cabral',
                    'Tiradentes',
                    'Getúlio Vargas',
                    'Napoleão'
                ],
                correct: 1,
                explanation: 'Pedro Álvares Cabral chegou ao Brasil em 1500.'
            }
        ];

        const result = await Question.insertMany(questions);

        res.json({
            success: true,
            message: `🔥 ${result.length} perguntas adicionadas com sucesso!`,
            inserted: result.length
        });

    } catch (err) {
        console.error('Erro ao seed perguntas:', err.message);
        res.status(500).json({
            success: false,
            error: 'Erro ao adicionar perguntas seed',
            details: err.message
        });
    }
});

// GET USER STATS
app.get('/user/:username', async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username })
            .select('-__v');

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuário não encontrado'
            });
        }

        const recentScores = await Score.find({ nome: username })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('score accuracy time createdAt');

        res.json({
            success: true,
            data: {
                user,
                recentScores
            }
        });

    } catch (err) {
        console.error('Erro ao buscar usuário:', err.message);
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar usuário',
            details: err.message
        });
    }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint não encontrado',
        path: req.path
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Tente novamente mais tarde'
    });
});

// ============================================
// SERVER START
// ============================================

const server = app.listen(PORT, () => {
    console.log('=================================');
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
    console.log(`📡 API CyberQuiz v3.0 READY`);
    console.log('=================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('📡 SIGTERM recebido. Fechando servidor...');
    server.close(() => {
        console.log('✅ Servidor fechado.');
        mongoose.connection.close(() => {
            console.log('✅ Conexão MongoDB fechada.');
            process.exit(0);
        });
    });
});

process.on('SIGINT', () => {
    console.log('📡 SIGINT recebido. Fechando servidor...');
    server.close(() => {
        console.log('✅ Servidor fechado.');
        mongoose.connection.close(() => {
            console.log('✅ Conexão MongoDB fechada.');
            process.exit(0);
        });
    });
});

module.exports = app;