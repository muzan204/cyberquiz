// ============================================
// ENEM CyberQuiz - Script de Seed para MongoDB
// ============================================

require('dotenv').config();
const mongoose = require('mongoose');
const { questionsBank } = require('./questions.js');

// Schema do Question
const QuestionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        enum: ['linguagens', 'matematica', 'natureza', 'humanas']
    },
    difficulty: {
        type: String,
        enum: ['easy', 'normal', 'hard'],
        default: 'normal'
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true,
        validate: [arrayLimit, 'Pergunta deve ter entre 2 e 5 opções']
    },
    correct: {
        type: Number,
        required: true
    },
    explanation: {
        type: String,
        default: ''
    },
    id: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

function arrayLimit(val) {
    return val.length >= 2 && val.length <= 5;
}

const Question = mongoose.model('Question', QuestionSchema);

// Função principal de seed
async function seedDatabase() {
    console.log('🚀 Iniciando seed do banco de dados...');
    
    try {
        // Conectar ao MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('✅ MongoDB conectado com sucesso!');

        // Limpar banco de dados
        console.log('🗑️ Limpando questões existentes...');
        await Question.deleteMany({});
        console.log('✅ Questões antigas removidas');

        // Preparar todas as questões
        const allQuestions = [
            ...questionsBank.linguagens,
            ...questionsBank.matematica,
            ...questionsBank.natureza,
            ...questionsBank.humanas
        ];

        console.log(`📚 Total de questões para inserir: ${allQuestions.length}`);

        // Inserir questões
        await Question.insertMany(allQuestions);
        console.log('✅ Todas as questões foram inseridas com sucesso!');

        // Estatísticas
        console.log('\n📊 ESTATÍSTICAS DO BANCO DE DADOS:');
        console.log('=====================================');
        
        const totalQuestions = await Question.countDocuments();
        console.log(`📝 Total de questões: ${totalQuestions}`);

        const stats = await Question.aggregate([
            { $group: { _id: '$subject', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        console.log('\n📚 Questões por matéria:');
        stats.forEach(stat => {
            const subjectNames = {
                'linguagens': 'Linguagens',
                'matematica': 'Matemática',
                'natureza': 'Ciências da Natureza',
                'humanas': 'Ciências Humanas'
            };
            console.log(`   ${subjectNames[stat._id] || stat._id}: ${stat.count} questões`);
        });

        const difficultyStats = await Question.aggregate([
            { $group: { _id: '$difficulty', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        console.log('\n⚡ Questões por dificuldade:');
        difficultyStats.forEach(stat => {
            const difficultyNames = {
                'easy': 'Fácil',
                'normal': 'Normal',
                'hard': 'Difícil'
            };
            console.log(`   ${difficultyNames[stat._id] || stat._id}: ${stat.count} questões`);
        });

        console.log('\n=====================================');
        console.log('🎉 Seed concluído com sucesso!');
        console.log('=====================================\n');

    } catch (error) {
        console.error('❌ ERRO durante o seed:', error.message);
        console.error('\nPossíveis soluções:');
        console.log('1. Verifique se sua conexão MongoDB está correta no arquivo .env');
        console.log('2. Certifique-se de que o MongoDB Atlas está acessível');
        console.log('3. Verifique se as credenciais estão corretas');
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Conexão MongoDB fechada');
        process.exit(0);
    }
}

// Executar seed
seedDatabase();