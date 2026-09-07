/**
 * ENEM CyberQuiz - Front-end
 * ------------------------------------------------------------
 * Toda a lógica da interface: navegação entre telas, motor do
 * quiz, pontuação, XP/níveis, conquistas, áudio (Web Audio API),
 * atalhos de teclado e integração com o backend local (ranking).
 *
 * Funciona mesmo sem o backend rodando: se as chamadas de rede
 * falharem, o quiz usa o banco de questões local (questions.js).
 */
(function () {
  'use strict';

  // ------------------------------------------------------------
  // Constantes de regras do jogo (ver README para a explicação)
  // ------------------------------------------------------------
  const QUESTION_TIME_LIMIT = 60; // segundos por questão
  const DEFAULT_QUESTION_COUNT = 10;
  const STARTING_LIVES = 3;

  const BASE_CORRECT_POINTS = 100;
  const STREAK_BONUS_PER_HIT = 10;
  const STREAK_BONUS_MAX = 100;
  const SPEED_BONUS_PER_SEC = 2;
  const SPEED_BONUS_MAX = 120;
  const XP_PER_CORRECT = 25;
  const COINS_PER_CORRECT = 10;
  const XP_PER_LEVEL = 100;

  const STORAGE_KEY = 'cyberquiz.player.v1';
  const SUBJECT_LABELS = {
    linguagens: 'LINGUAGENS',
    matematica: 'MATEMÁTICA',
    natureza: 'CIÊNCIAS DA NATUREZA',
    humanas: 'CIÊNCIAS HUMANAS',
    geral: 'SIMULADO GERAL',
  };

  const ACHIEVEMENTS = [
    {
      id: 'first-correct',
      icon: '🎯',
      name: 'Primeiro Acerto',
      description: 'Acerte sua primeira questão',
      check: (p, run) => p.totalCorrect >= 1,
    },
    {
      id: 'combo-master',
      icon: '🔥',
      name: 'Combo Master',
      description: '5 acertos consecutivos',
      check: (p, run) => run.maxStreak >= 5,
    },
    {
      id: 'lightning',
      icon: '⚡',
      name: 'Lightning',
      description: '10 acertos consecutivos',
      check: (p, run) => run.maxStreak >= 10,
    },
    {
      id: 'half-grand',
      icon: '💰',
      name: 'Half Grand',
      description: 'Alcance 500 pontos em um simulado',
      check: (p, run) => run.score >= 500,
    },
    {
      id: 'cyber-genius',
      icon: '💎',
      name: 'Cyber Genius',
      description: 'Alcance 1000 pontos em um simulado',
      check: (p, run) => run.score >= 1000,
    },
    {
      id: 'elite-hacker',
      icon: '👑',
      name: 'Elite Hacker',
      description: 'Alcance 2000 pontos em um simulado',
      check: (p, run) => run.score >= 2000,
    },
    {
      id: 'perfect-run',
      icon: '✨',
      name: 'Perfect Run',
      description: '100% de acertos em um quiz',
      check: (p, run) => run.total > 0 && run.wrong === 0 && run.correct === run.total,
    },
    {
      id: 'marathon',
      icon: '🏃',
      name: 'Marathon',
      description: 'Complete 50 questões (total acumulado)',
      check: (p, run) => p.totalQuestionsAnswered >= 50,
    },
  ];

  // ------------------------------------------------------------
  // Referências de DOM
  // ------------------------------------------------------------
  const $ = (id) => document.getElementById(id);

  const dom = {
    score: $('score'),
    streak: $('streak'),
    accuracy: $('accuracy'),
    livesValue: $('lives-value'),
    levelDisplay: $('level-display'),
    xpBar: $('xp-bar'),
    coinsDisplay: $('coins-display'),
    audioToggle: $('audio-toggle'),

    screens: Array.from(document.querySelectorAll('.screen')),
    subjectButtons: Array.from(document.querySelectorAll('.subject-btn')),
    rankingContainer: $('ranking-container'),
    achievementsContainer: $('achievements-container'),

    progressFill: $('progress-fill'),
    currentQuestion: $('current-question'),
    totalQuestions: $('total-questions'),
    timerValue: $('timer-value'),
    questionNumber: $('question-number'),
    subjectTag: $('subject-tag'),
    questionText: $('question-text'),
    optionsContainer: $('options-container'),
    explanationContainer: $('explanation-container'),
    explanationText: $('explanation-text'),
    nextBtn: $('next-btn'),

    resultsGrade: $('results-grade'),
    correctAnswers: $('correct-answers'),
    wrongAnswers: $('wrong-answers'),
    finalScore: $('final-score'),
    finalAccuracy: $('final-accuracy'),
    maxStreakEl: $('max-streak'),
    totalTime: $('total-time'),
    resultsBreakdown: $('results-breakdown'),
    reviewBtn: $('review-btn'),
    restartBtn: $('restart-btn'),
    menuBtn: $('menu-btn'),

    playerNameInput: $('player-name-input'),
    saveScoreBtn: $('save-score-btn'),
    saveScoreFeedback: $('save-score-feedback'),

    reviewList: $('review-list'),
    backToResultsBtn: $('back-to-results'),

    toastContainer: $('toast-container'),
  };

  // ------------------------------------------------------------
  // Estado persistente do jogador (XP, nível, moedas, conquistas)
  // ------------------------------------------------------------
  function loadPlayer() {
    const fallback = {
      xp: 0,
      coins: 0,
      totalCorrect: 0,
      totalQuestionsAnswered: 0,
      bestScore: 0,
      unlockedAchievements: [],
      audioEnabled: true,
      nickname: '',
    };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return fallback;
      return Object.assign(fallback, JSON.parse(raw));
    } catch (err) {
      return fallback;
    }
  }

  function savePlayer() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
    } catch (err) {
      /* localStorage indisponível (modo privado etc.) — segue sem persistir */
    }
  }

  function levelFromXp(xp) {
    return Math.floor(xp / XP_PER_LEVEL) + 1;
  }

  const player = loadPlayer();

  // Estado da rodada atual (resetado a cada quiz)
  let run = null;

  // ------------------------------------------------------------
  // Áudio (Web Audio API — sem arquivos externos)
  // ------------------------------------------------------------
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    return audioCtx;
  }

  function beep(frequency, duration, type) {
    if (!player.audioEnabled) return;
    const ctx = getAudioCtx();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = type || 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  }

  const sfx = {
    correct: () => {
      beep(880, 0.12, 'triangle');
      setTimeout(() => beep(1174, 0.15, 'triangle'), 90);
    },
    wrong: () => beep(160, 0.3, 'sawtooth'),
    levelUp: () => {
      [523, 659, 784, 1046].forEach((freq, i) => setTimeout(() => beep(freq, 0.18, 'square'), i * 90));
    },
    achievement: () => {
      beep(660, 0.1, 'square');
      setTimeout(() => beep(990, 0.18, 'square'), 100);
    },
    click: () => beep(440, 0.05, 'sine'),
  };

  // ------------------------------------------------------------
  // Utilidades
  // ------------------------------------------------------------
  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(totalSeconds % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function letterFor(index) {
    return String.fromCharCode(65 + index); // A, B, C, D, E...
  }

  function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type || 'info'}`;
    toast.textContent = message;
    dom.toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
    setTimeout(() => {
      toast.classList.remove('toast-visible');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // ------------------------------------------------------------
  // Navegação entre telas
  // ------------------------------------------------------------
  function showScreen(id) {
    dom.screens.forEach((screen) => screen.classList.toggle('active', screen.id === id));
  }

  // ------------------------------------------------------------
  // HUD (cabeçalho): pontos, sequência, precisão, vidas, XP...
  // ------------------------------------------------------------
  function renderHud() {
    dom.score.textContent = run ? run.score : 0;
    dom.streak.textContent = `${run ? run.streak : 0}x`;
    const attempted = run ? run.correct + run.wrong : 0;
    const accuracy = attempted ? Math.round((run.correct / attempted) * 100) : 0;
    dom.accuracy.textContent = `${accuracy}%`;
    dom.livesValue.textContent = '❤️'.repeat(run ? run.lives : STARTING_LIVES) || '💀';

    const level = levelFromXp(player.xp);
    dom.levelDisplay.textContent = `Nível ${level}`;
    const xpIntoLevel = player.xp % XP_PER_LEVEL;
    dom.xpBar.style.width = `${(xpIntoLevel / XP_PER_LEVEL) * 100}%`;
    dom.coinsDisplay.textContent = player.coins;
  }

  // ------------------------------------------------------------
  // Ranking (busca do backend; se falhar, esconde a seção)
  // ------------------------------------------------------------
  async function loadRanking() {
    try {
      const res = await fetch('/ranking?limit=5');
      if (!res.ok) throw new Error('ranking indisponível');
      const data = await res.json();
      renderRanking(data.ranking || []);
    } catch (err) {
      dom.rankingContainer.innerHTML = '';
    }
  }

  function renderRanking(ranking) {
    if (!ranking.length) {
      dom.rankingContainer.innerHTML = '';
      return;
    }
    const medals = ['🥇', '🥈', '🥉'];
    dom.rankingContainer.innerHTML = `
      <h2 class="section-title">RANKING GLOBAL</h2>
      <ol class="ranking-list">
        ${ranking
          .map(
            (entry, i) => `
          <li class="ranking-item">
            <span class="ranking-rank">${medals[i] || `#${i + 1}`}</span>
            <span class="ranking-name">${escapeHTML(entry.name)}</span>
            <span class="ranking-score">${entry.score} pts</span>
          </li>`
          )
          .join('')}
      </ol>`;
  }

  // ------------------------------------------------------------
  // Conquistas
  // ------------------------------------------------------------
  function renderAchievements() {
    dom.achievementsContainer.innerHTML = `
      <h2 class="section-title">CONQUISTAS</h2>
      <div class="achievements-grid">
        ${ACHIEVEMENTS.map((a) => {
          const unlocked = player.unlockedAchievements.includes(a.id);
          return `
          <div class="achievement-badge ${unlocked ? 'unlocked' : 'locked'}" title="${escapeHTML(a.description)}">
            <span class="achievement-icon" aria-hidden="true">${a.icon}</span>
            <span class="achievement-name">${escapeHTML(a.name)}</span>
          </div>`;
        }).join('')}
      </div>`;
  }

  function checkAchievements() {
    if (!run) return;
    ACHIEVEMENTS.forEach((achievement) => {
      if (player.unlockedAchievements.includes(achievement.id)) return;
      if (achievement.check(player, run)) {
        player.unlockedAchievements.push(achievement.id);
        showToast(`Conquista desbloqueada: ${achievement.icon} ${achievement.name}`, 'success');
        sfx.achievement();
      }
    });
    savePlayer();
  }

  // ------------------------------------------------------------
  // Carregamento de questões (backend com fallback local)
  // ------------------------------------------------------------
  async function fetchQuestions(subject) {
    try {
      const res = await fetch(`/random/${subject}?limit=${DEFAULT_QUESTION_COUNT}`);
      if (!res.ok) throw new Error('backend indisponível');
      const data = await res.json();
      if (!data.questions || !data.questions.length) throw new Error('sem questões');
      return data.questions;
    } catch (err) {
      return fetchQuestionsLocally(subject);
    }
  }

  function fetchQuestionsLocally(subject) {
    const bank = window.QUESTIONS || {};
    const pool = subject === 'geral' ? Object.values(bank).flat() : bank[subject] || [];
    return shuffle(pool).slice(0, DEFAULT_QUESTION_COUNT);
  }

  // ------------------------------------------------------------
  // Motor do quiz
  // ------------------------------------------------------------
  async function startQuiz(subject) {
    sfx.click();
    const questions = await fetchQuestions(subject);

    if (!questions.length) {
      showToast('Não foi possível carregar questões para esta matéria.', 'error');
      return;
    }

    run = {
      subject,
      questions,
      index: 0,
      score: 0,
      streak: 0,
      maxStreak: 0,
      correct: 0,
      wrong: 0,
      lives: STARTING_LIVES,
      total: questions.length,
      answers: [],
      startedAt: Date.now(),
      questionStartedAt: Date.now(),
      answered: false,
      timerId: null,
      timeLeft: QUESTION_TIME_LIMIT,
    };

    showScreen('quiz-screen');
    dom.totalQuestions.textContent = questions.length;
    renderQuestion();
  }

  function renderQuestion() {
    const question = run.questions[run.index];
    run.answered = false;
    run.questionStartedAt = Date.now();
    run.timeLeft = QUESTION_TIME_LIMIT;

    dom.currentQuestion.textContent = run.index + 1;
    dom.questionNumber.textContent = `QUESTÃO ${String(run.index + 1).padStart(2, '0')}`;
    dom.subjectTag.textContent = SUBJECT_LABELS[question.subject] || SUBJECT_LABELS[run.subject] || '';
    dom.questionText.textContent = question.question;

    const progressPercent = (run.index / run.total) * 100;
    dom.progressFill.style.width = `${progressPercent}%`;
    dom.progressFill.parentElement.setAttribute('aria-valuenow', String(Math.round(progressPercent)));

    dom.optionsContainer.innerHTML = '';
    question.options.forEach((optionText, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.type = 'button';
      btn.setAttribute('data-index', String(i));
      btn.setAttribute('aria-label', `Opção ${letterFor(i)}: ${optionText}`);
      btn.innerHTML = `<span class="option-letter">${letterFor(i)}</span><span class="option-text">${escapeHTML(optionText)}</span>`;
      btn.addEventListener('click', () => selectAnswer(i));
      dom.optionsContainer.appendChild(btn);
    });

    dom.explanationContainer.classList.add('is-hidden');
    dom.nextBtn.classList.add('is-hidden');

    startTimer();
    renderHud();
  }

  function startTimer() {
    stopTimer();
    dom.timerValue.textContent = formatTime(run.timeLeft);
    run.timerId = setInterval(() => {
      run.timeLeft -= 1;
      dom.timerValue.textContent = formatTime(Math.max(run.timeLeft, 0));
      if (run.timeLeft <= 0) {
        stopTimer();
        if (!run.answered) selectAnswer(null); // tempo esgotado = resposta perdida
      }
    }, 1000);
  }

  function stopTimer() {
    if (run.timerId) {
      clearInterval(run.timerId);
      run.timerId = null;
    }
  }

  function selectAnswer(chosenIndex) {
    if (run.answered) return;
    run.answered = true;
    stopTimer();

    const question = run.questions[run.index];
    const isCorrect = chosenIndex !== null && chosenIndex === question.correct;
    const elapsedSeconds = (Date.now() - run.questionStartedAt) / 1000;
    const remainingSeconds = Math.max(QUESTION_TIME_LIMIT - elapsedSeconds, 0);

    let pointsEarned = 0;

    // Destaca visualmente as opções
    Array.from(dom.optionsContainer.children).forEach((btn) => {
      const idx = Number(btn.getAttribute('data-index'));
      btn.disabled = true;
      if (idx === question.correct) btn.classList.add('correct');
      if (idx === chosenIndex && !isCorrect) btn.classList.add('wrong');
      if (idx === chosenIndex) btn.classList.add('selected');
    });

    if (isCorrect) {
      run.streak += 1;
      run.maxStreak = Math.max(run.maxStreak, run.streak);
      run.correct += 1;

      const streakBonus = Math.min(run.streak * STREAK_BONUS_PER_HIT, STREAK_BONUS_MAX);
      const speedBonus = Math.min(Math.round(remainingSeconds * SPEED_BONUS_PER_SEC), SPEED_BONUS_MAX);
      pointsEarned = BASE_CORRECT_POINTS + streakBonus + speedBonus;

      run.score += pointsEarned;
      player.xp += XP_PER_CORRECT;
      player.coins += COINS_PER_CORRECT;
      player.totalCorrect += 1;

      const levelBefore = levelFromXp(player.xp - XP_PER_CORRECT);
      const levelAfter = levelFromXp(player.xp);
      if (levelAfter > levelBefore) {
        showToast(`Você subiu para o Nível ${levelAfter}!`, 'success');
        sfx.levelUp();
      } else {
        sfx.correct();
      }
    } else {
      run.streak = 0;
      run.wrong += 1;
      run.lives = Math.max(run.lives - 1, 0);
      sfx.wrong();
    }

    player.totalQuestionsAnswered += 1;
    savePlayer();
    checkAchievements();

    dom.explanationText.textContent = question.explanation || 'Sem explicação disponível para esta questão.';
    dom.explanationContainer.classList.remove('is-hidden');
    dom.nextBtn.classList.remove('is-hidden');
    dom.nextBtn.focus();

    run.answers.push({
      question: question.question,
      options: question.options,
      chosenIndex,
      correctIndex: question.correct,
      isCorrect,
      explanation: question.explanation,
      pointsEarned,
    });

    renderHud();

    if (run.lives <= 0) {
      run.endTimeoutId = setTimeout(() => endQuiz(), 900);
    }
  }

  function nextQuestion() {
    sfx.click();
    if (run.index + 1 >= run.total || run.lives <= 0) {
      endQuiz();
      return;
    }
    run.index += 1;
    renderQuestion();
  }

  function endQuiz() {
    if (run.ended) return;
    run.ended = true;
    if (run.endTimeoutId) clearTimeout(run.endTimeoutId);
    stopTimer();
    const totalTimeSeconds = Math.round((Date.now() - run.startedAt) / 1000);
    const attempted = run.correct + run.wrong;
    const accuracy = attempted ? Math.round((run.correct / attempted) * 100) : 0;

    player.bestScore = Math.max(player.bestScore, run.score);
    savePlayer();
    checkAchievements();
    renderAchievements();

    dom.correctAnswers.textContent = run.correct;
    dom.wrongAnswers.textContent = run.wrong;
    dom.finalScore.textContent = run.score;
    dom.finalAccuracy.textContent = `${accuracy}%`;
    dom.maxStreakEl.textContent = `${run.maxStreak}x`;
    dom.totalTime.textContent = formatTime(totalTimeSeconds);
    dom.resultsGrade.textContent = gradeFor(accuracy);

    renderBreakdown();

    dom.playerNameInput.value = player.nickname || '';
    dom.saveScoreFeedback.textContent = '';
    dom.saveScoreBtn.disabled = false;

    showScreen('results-screen');
  }

  function gradeFor(accuracy) {
    if (accuracy >= 90) return 'A+';
    if (accuracy >= 80) return 'A';
    if (accuracy >= 70) return 'B';
    if (accuracy >= 60) return 'C';
    if (accuracy >= 50) return 'D';
    return 'F';
  }

  function renderBreakdown() {
    if (run.subject !== 'geral') {
      dom.resultsBreakdown.innerHTML = '';
      return;
    }
    const bySubject = {};
    run.questions.forEach((q, i) => {
      const subj = q.subject || 'geral';
      bySubject[subj] = bySubject[subj] || { correct: 0, total: 0 };
      bySubject[subj].total += 1;
      if (run.answers[i] && run.answers[i].isCorrect) bySubject[subj].correct += 1;
    });

    dom.resultsBreakdown.innerHTML = `
      <h3 class="breakdown-title">Desempenho por área</h3>
      <ul class="breakdown-list">
        ${Object.entries(bySubject)
          .map(
            ([subj, stat]) => `
          <li class="breakdown-item">
            <span>${SUBJECT_LABELS[subj] || subj}</span>
            <span>${stat.correct}/${stat.total}</span>
          </li>`
          )
          .join('')}
      </ul>`;
  }

  // ------------------------------------------------------------
  // Revisão de respostas
  // ------------------------------------------------------------
  function renderReview() {
    dom.reviewList.innerHTML = run.answers
      .map((answer, i) => {
        const status = answer.isCorrect ? 'correct' : 'wrong';
        const chosenText =
          answer.chosenIndex === null || answer.chosenIndex === undefined
            ? '(tempo esgotado — sem resposta)'
            : answer.options[answer.chosenIndex];
        return `
        <div class="review-item review-item-${status}">
          <p class="review-question"><strong>Q${i + 1}.</strong> ${escapeHTML(answer.question)}</p>
          <p class="review-answer">Sua resposta: ${escapeHTML(chosenText)}</p>
          ${
            !answer.isCorrect
              ? `<p class="review-correct">Resposta correta: ${escapeHTML(answer.options[answer.correctIndex])}</p>`
              : ''
          }
          <p class="review-explanation">💡 ${escapeHTML(answer.explanation || '')}</p>
        </div>`;
      })
      .join('');
    showScreen('review-screen');
  }

  // ------------------------------------------------------------
  // Salvar pontuação no ranking
  // ------------------------------------------------------------
  async function saveScore() {
    const name = dom.playerNameInput.value.trim();
    if (!name) {
      dom.saveScoreFeedback.textContent = 'Digite um codinome antes de salvar.';
      return;
    }

    player.nickname = name;
    savePlayer();

    dom.saveScoreBtn.disabled = true;
    dom.saveScoreFeedback.textContent = 'Salvando...';

    const attempted = run.correct + run.wrong;
    const accuracy = attempted ? Math.round((run.correct / attempted) * 100) : 0;

    try {
      const res = await fetch('/save-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          subject: run.subject,
          score: run.score,
          accuracy,
          correct: run.correct,
          wrong: run.wrong,
          maxStreak: run.maxStreak,
          xp: player.xp,
          coins: player.coins,
          timeSeconds: Math.round((Date.now() - run.startedAt) / 1000),
        }),
      });
      if (!res.ok) throw new Error('Falha ao salvar');
      dom.saveScoreFeedback.textContent = 'Pontuação salva no ranking! 🏆';
      loadRanking();
    } catch (err) {
      dom.saveScoreFeedback.textContent = 'Não foi possível salvar agora (backend offline).';
      dom.saveScoreBtn.disabled = false;
    }
  }

  // ------------------------------------------------------------
  // Áudio: alternância de mudo
  // ------------------------------------------------------------
  function toggleAudio() {
    player.audioEnabled = !player.audioEnabled;
    savePlayer();
    dom.audioToggle.textContent = player.audioEnabled ? '🔊' : '🔇';
    dom.audioToggle.setAttribute('aria-pressed', String(player.audioEnabled));
    if (player.audioEnabled) sfx.click();
  }

  // ------------------------------------------------------------
  // Atalhos de teclado
  // ------------------------------------------------------------
  function handleKeydown(event) {
    const quizVisible = document.getElementById('quiz-screen').classList.contains('active');
    if (!quizVisible) return;

    const key = event.key;

    if (!run.answered) {
      const numberMatch = key.match(/^[1-5]$/);
      const letterMatch = key.match(/^[a-eA-E]$/);
      if (numberMatch) {
        const index = Number(key) - 1;
        if (index < run.questions[run.index].options.length) selectAnswer(index);
        return;
      }
      if (letterMatch) {
        const index = key.toUpperCase().charCodeAt(0) - 65;
        if (index < run.questions[run.index].options.length) selectAnswer(index);
        return;
      }
      return;
    }

    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      nextQuestion();
    }
  }

  // ------------------------------------------------------------
  // Inicialização
  // ------------------------------------------------------------
  function init() {
    dom.audioToggle.textContent = player.audioEnabled ? '🔊' : '🔇';
    dom.audioToggle.setAttribute('aria-pressed', String(player.audioEnabled));

    dom.subjectButtons.forEach((btn) => {
      btn.addEventListener('click', () => startQuiz(btn.getAttribute('data-subject')));
    });

    dom.nextBtn.addEventListener('click', nextQuestion);
    dom.reviewBtn.addEventListener('click', renderReview);
    dom.backToResultsBtn.addEventListener('click', () => showScreen('results-screen'));
    dom.restartBtn.addEventListener('click', () => showScreen('main-menu'));
    dom.menuBtn.addEventListener('click', () => {
      showScreen('main-menu');
      loadRanking();
    });
    dom.audioToggle.addEventListener('click', toggleAudio);
    dom.saveScoreBtn.addEventListener('click', saveScore);
    dom.playerNameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveScore();
    });

    document.addEventListener('keydown', handleKeydown);

    renderHud();
    renderAchievements();
    loadRanking();
    showScreen('main-menu');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
