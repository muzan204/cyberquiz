/**
 * ENEM CyberQuiz - Script de verificação (seed)
 * ------------------------------------------------------------
 * Não usa nenhum banco de dados externo: apenas valida a
 * integridade do banco de questões local (questions.js) e
 * garante que os arquivos de dados (data/scores.json e
 * data/custom-questions.json) existam antes do primeiro start.
 *
 * Uso: npm run seed
 */
'use strict';

const fs = require('fs');
const path = require('path');

const QUESTIONS = require('./questions.js');

const DATA_DIR = path.join(__dirname, 'data');
const SCORES_FILE = path.join(DATA_DIR, 'scores.json');
const CUSTOM_QUESTIONS_FILE = path.join(DATA_DIR, 'custom-questions.json');

const VALID_SUBJECTS = ['linguagens', 'matematica', 'natureza', 'humanas'];
const REQUIRED_FIELDS = ['id', 'subject', 'difficulty', 'question', 'options', 'correct', 'explanation'];

function validateQuestions() {
  const issues = [];
  const seenIds = new Set();
  let total = 0;

  for (const subject of VALID_SUBJECTS) {
    const list = QUESTIONS[subject];
    if (!Array.isArray(list) || list.length === 0) {
      issues.push(`Matéria "${subject}" não possui questões.`);
      continue;
    }

    list.forEach((q) => {
      total++;
      for (const field of REQUIRED_FIELDS) {
        if (q[field] === undefined) issues.push(`Questão "${q.id || '(sem id)'}" sem o campo "${field}".`);
      }
      if (seenIds.has(q.id)) issues.push(`ID duplicado: "${q.id}".`);
      seenIds.add(q.id);
      if (q.subject !== subject) issues.push(`Questão "${q.id}" tem subject "${q.subject}", esperado "${subject}".`);
      if (Array.isArray(q.options) && (q.correct < 0 || q.correct >= q.options.length)) {
        issues.push(`Índice "correct" inválido em "${q.id}".`);
      }
    });

    console.log(`  ✓ ${subject.padEnd(12)} ${list.length} questões`);
  }

  return { total, issues };
}

function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log('  ✓ Pasta data/ criada');
  }
  if (!fs.existsSync(SCORES_FILE)) {
    fs.writeFileSync(SCORES_FILE, '[]', 'utf-8');
    console.log('  ✓ data/scores.json inicializado');
  }
  if (!fs.existsSync(CUSTOM_QUESTIONS_FILE)) {
    fs.writeFileSync(CUSTOM_QUESTIONS_FILE, '[]', 'utf-8');
    console.log('  ✓ data/custom-questions.json inicializado');
  }
}

function main() {
  console.log('🎯 ENEM CyberQuiz — verificação do banco de questões\n');

  const { total, issues } = validateQuestions();
  console.log(`\n  Total geral: ${total} questões`);

  console.log('\n📁 Verificando arquivos de dados locais...');
  ensureDataFiles();

  if (issues.length) {
    console.log(`\n❌ ${issues.length} problema(s) encontrado(s):`);
    issues.forEach((issue) => console.log(`   - ${issue}`));
    process.exitCode = 1;
    return;
  }

  console.log('\n✅ Tudo certo! O banco de questões está íntegro e os dados locais prontos.');
}

main();
