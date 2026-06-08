// ============================================
// ENEM CyberQuiz - verificador do banco local
// ============================================

const { questionsBank } = require('./questions.js');

const subjects = Object.keys(questionsBank);
const allQuestions = subjects.flatMap(subject => questionsBank[subject]);

console.log('=================================');
console.log('CyberQuiz usando perguntas locais');
console.log('=================================');
console.log(`Total de questões: ${allQuestions.length}`);

console.log('\nQuestões por matéria:');
subjects.forEach(subject => {
    console.log(`- ${subject}: ${questionsBank[subject].length}`);
});

console.log('\nQuestões por dificuldade:');
const difficultyStats = allQuestions.reduce((acc, question) => {
    const difficulty = question.difficulty || 'normal';
    acc[difficulty] = (acc[difficulty] || 0) + 1;
    return acc;
}, {});

Object.entries(difficultyStats).forEach(([difficulty, total]) => {
    console.log(`- ${difficulty}: ${total}`);
});

const invalidQuestions = allQuestions.filter(question => (
    !question.question
    || !Array.isArray(question.options)
    || question.options.length < 2
    || question.options.length > 5
    || !Number.isInteger(question.correct)
    || question.correct < 0
    || question.correct >= question.options.length
));

if (invalidQuestions.length) {
    console.log('\nQuestões com problema:');
    invalidQuestions.forEach(question => {
        console.log(`- ${question.subject || 'sem matéria'} #${question.id || 'sem id'}`);
    });
    process.exitCode = 1;
} else {
    console.log('\nTodas as perguntas estão válidas.');
}
