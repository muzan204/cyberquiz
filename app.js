// ============================================
// ENEM CyberQuiz Ultra 3.0 🔥
// Frontend melhorado com recursos avançados
// ============================================

// Base da API: no modo local, tenta reaproveitar a mesma origem do site
// (se você rodar backend em outra porta, o fetch vai acompanhar essa porta).
const API = `${window.location.origin}`;

// ============================================
// AUDIO SYSTEM
// ============================================

class AudioSystem {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.3;
        this.init();
    }

    init() {
        // Create audio context for better sound generation
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.audioContext = null;
        }
    }

    // Generate synthetic sounds (no files needed)
    playTone(frequency, duration, type = 'sine') {
        if (!this.audioContext || !this.enabled) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            // Silent fail
        }
    }

    playCorrect() {
        this.playTone(523.25, 0.1); // C5
        setTimeout(() => this.playTone(659.25, 0.1), 100); // E5
        setTimeout(() => this.playTone(783.99, 0.2), 200); // G5
    }

    playWrong() {
        this.playTone(200, 0.3, 'sawtooth');
    }

    playClick() {
        this.playTone(800, 0.05, 'square');
    }

    playLevelUp() {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((note, i) => {
            setTimeout(() => this.playTone(note, 0.2), i * 100);
        });
    }

    playAchievement() {
        const notes = [783.99, 987.77, 1174.66, 1318.51];
        notes.forEach((note, i) => {
            setTimeout(() => this.playTone(note, 0.15, 'triangle'), i * 80);
        });
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

// ============================================
// ACHIEVEMENTS SYSTEM
// ============================================

const ACHIEVEMENTS = {
    FIRST_CORRECT: { id: 'first_correct', name: '🎯 Primeiro Acerto', desc: 'Acerte sua primeira questão', icon: '🎯' },
    STREAK_5: { id: 'streak_5', name: '🔥 Combo Master', desc: '5 acertos consecutivos', icon: '🔥' },
    STREAK_10: { id: 'streak_10', name: '⚡ Lightning', desc: '10 acertos consecutivos', icon: '⚡' },
    SCORE_500: { id: 'score_500', name: '💰 Half Grand', desc: 'Alcance 500 pontos', icon: '💰' },
    SCORE_1000: { id: 'score_1000', name: '💎 Cyber Genius', desc: 'Alcance 1000 pontos', icon: '💎' },
    SCORE_2000: { id: 'score_2000', name: '👑 Elite Hacker', desc: 'Alcance 2000 pontos', icon: '👑' },
    SPEED_DEMON: { id: 'speed_demon', name: '⏱ Speed Demon', desc: 'Responda em menos de 5 segundos', icon: '⏱' },
    PERFECT_QUIZ: { id: 'perfect_quiz', name: '✨ Perfect Run', desc: '100% de acertos em um quiz', icon: '✨' },
    MARATHON: { id: 'marathon', name: '🏃 Marathon', desc: 'Complete 50 questões', icon: '🏃' },
    DIVERSO: { id: 'diverso', name: '🌟 Diversificado', desc: 'Jogue todas as matérias', icon: '🌟' }
};

class AchievementSystem {
    constructor() {
        this.unlocked = new Set(JSON.parse(localStorage.getItem('cyberquiz-achievements') || '[]'));
    }

    check(context) {
        const newAchievements = [];

        // First correct
        if (context.correctAnswers === 1 && !this.unlocked.has(ACHIEVEMENTS.FIRST_CORRECT.id)) {
            this.unlock(ACHIEVEMENTS.FIRST_CORRECT);
            newAchievements.push(ACHIEVEMENTS.FIRST_CORRECT);
        }

        // Streak 5
        if (context.maxStreak >= 5 && !this.unlocked.has(ACHIEVEMENTS.STREAK_5.id)) {
            this.unlock(ACHIEVEMENTS.STREAK_5);
            newAchievements.push(ACHIEVEMENTS.STREAK_5);
        }

        // Streak 10
        if (context.maxStreak >= 10 && !this.unlocked.has(ACHIEVEMENTS.STREAK_10.id)) {
            this.unlock(ACHIEVEMENTS.STREAK_10);
            newAchievements.push(ACHIEVEMENTS.STREAK_10);
        }

        // Score milestones
        if (context.score >= 500 && !this.unlocked.has(ACHIEVEMENTS.SCORE_500.id)) {
            this.unlock(ACHIEVEMENTS.SCORE_500);
            newAchievements.push(ACHIEVEMENTS.SCORE_500);
        }

        if (context.score >= 1000 && !this.unlocked.has(ACHIEVEMENTS.SCORE_1000.id)) {
            this.unlock(ACHIEVEMENTS.SCORE_1000);
            newAchievements.push(ACHIEVEMENTS.SCORE_1000);
        }

        if (context.score >= 2000 && !this.unlocked.has(ACHIEVEMENTS.SCORE_2000.id)) {
            this.unlock(ACHIEVEMENTS.SCORE_2000);
            newAchievements.push(ACHIEVEMENTS.SCORE_2000);
        }

        // Perfect quiz
        if (context.totalAnswered > 0 && context.correctAnswers === context.totalAnswered && context.totalAnswered >= 5) {
            if (!this.unlocked.has(ACHIEVEMENTS.PERFECT_QUIZ.id)) {
                this.unlock(ACHIEVEMENTS.PERFECT_QUIZ);
                newAchievements.push(ACHIEVEMENTS.PERFECT_QUIZ);
            }
        }

        // Marathon
        if (context.totalAnswered >= 50 && !this.unlocked.has(ACHIEVEMENTS.MARATHON.id)) {
            this.unlock(ACHIEVEMENTS.MARATHON);
            newAchievements.push(ACHIEVEMENTS.MARATHON);
        }

        return newAchievements;
    }

    unlock(achievement) {
        this.unlocked.add(achievement.id);
        localStorage.setItem('cyberquiz-achievements', JSON.stringify([...this.unlocked]));
    }

    isUnlocked(id) {
        return this.unlocked.has(id);
    }

    getAll() {
        return Object.values(ACHIEVEMENTS).map(a => ({
            ...a,
            unlocked: this.unlocked.has(a.id)
        }));
    }
}

// ============================================
// MAIN GAME CLASS
// ============================================

class CyberQuiz {
    constructor() {
        // ==================================
        // GAME STATE
        // ==================================
        this.currentScreen = 'main-menu';
        this.currentSubject = null;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answered = false;
        this.questionStartTime = 0;

        // ==================================
        // STATS
        // ==================================
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.totalAnswered = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.userAnswers = [];
        this.subjectsPlayed = new Set();

        // ==================================
        // RPG SYSTEM
        // ==================================
        this.level = 1;
        this.xp = 0;
        this.coins = 0;
        this.lives = 3;
        this.maxLives = 3;

        // ==================================
        // TIMER
        // ==================================
        this.timerInterval = null;
        this.autoSaveInterval = null;
        this.elapsedTime = 0;
        this.questionTimeLimit = 60; // seconds per question

        // ==================================
        // SYSTEMS
        // ==================================
        this.audio = new AudioSystem();
        this.achievements = new AchievementSystem();

        // ==================================
        // PLAYER
        // ==================================
        this.playerName = localStorage.getItem('cyberquiz-playerName') || 'Player';
        this.currentQuestionOptions = [];

        // ==================================
        // UI ELEMENTS CACHE
        // ==================================
        this.ui = {};

        // ==================================
        // INIT
        // ==================================
        this.init();
    }

    // ==================================
    // INITIALIZATION
    // ==================================

    init() {
        this.cacheUI();
        this.bindEvents();
        this.loadProgress();
        this.showScreen('main-menu');
        this.createParticles();
        this.updateHeaderStats();
        this.renderRanking();
        this.renderAchievements();

        this.autoSaveInterval = setInterval(() => this.saveProgress(), 30000);

        // Resume audio context on first interaction
        document.addEventListener('click', () => {
            if (this.audio.audioContext && this.audio.audioContext.state === 'suspended') {
                this.audio.audioContext.resume();
            }
        }, { once: true });

        console.log('🚀 CyberQuiz v3.0 initialized');
    }

    cacheUI() {
        this.ui = {
            screens: document.querySelectorAll('.screen'),
            score: document.getElementById('score'),
            streak: document.getElementById('streak'),
            accuracy: document.getElementById('accuracy'),
            lives: document.getElementById('lives-display'),
            level: document.getElementById('level-display'),
            xp: document.getElementById('xp-bar'),
            coins: document.getElementById('coins-display'),
            questionNumber: document.getElementById('question-number'),
            subjectTag: document.getElementById('subject-tag'),
            questionText: document.getElementById('question-text'),
            optionsContainer: document.getElementById('options-container'),
            explanationContainer: document.getElementById('explanation-container'),
            explanationText: document.getElementById('explanation-text'),
            nextBtn: document.getElementById('next-btn'),
            progressFill: document.getElementById('progress-fill'),
            currentQuestion: document.getElementById('current-question'),
            totalQuestions: document.getElementById('total-questions'),
            timerValue: document.querySelector('.timer-value'),
            mainMenu: document.getElementById('main-menu'),
            quizScreen: document.getElementById('quiz-screen'),
            resultsScreen: document.getElementById('results-screen'),
            reviewScreen: document.getElementById('review-screen')
        };
    }

    // ==================================
    // EVENT BINDINGS
    // ==================================

    bindEvents() {
        // Subject buttons
        document.querySelectorAll('.subject-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                this.audio.playClick();
                const subject = btn.dataset.subject;
                await this.startQuiz(subject);
            });
        });

        // Navigation buttons
        this.bindButton('next-btn', () => this.nextQuestion());
        this.bindButton('restart-btn', async () => {
            this.audio.playClick();
            await this.startQuiz(this.currentSubject);
        });
        this.bindButton('menu-btn', () => {
            this.audio.playClick();
            this.showScreen('main-menu');
        });
        this.bindButton('review-btn', () => {
            this.audio.playClick();
            this.showReview();
        });
        this.bindButton('back-to-results', () => {
            this.audio.playClick();
            this.showScreen('results-screen');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Audio toggle
        const audioToggle = document.getElementById('audio-toggle');
        if (audioToggle) {
            audioToggle.addEventListener('click', () => {
                const enabled = this.audio.toggle();
                audioToggle.textContent = enabled ? '🔊' : '🔇';
                audioToggle.title = enabled ? 'Som ativado' : 'Som desativado';
            });
        }
    }

    bindButton(id, handler) {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', handler);
    }

    // ==================================
    // KEYBOARD CONTROLS
    // ==================================

    handleKeyboard(e) {
        if (this.currentScreen !== 'quiz-screen' || this.answered) {
            if (e.key === 'Enter' && !this.answered) {
                this.nextQuestion();
            }
            return;
        }

        const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4 };
        const key = e.key.toLowerCase();

        if (key in keyMap) {
            this.selectAnswer(keyMap[key]);
        }
    }

    // ==================================
    // QUIZ MANAGEMENT
    // ==================================

    async startQuiz(subject) {
        try {
            this.currentSubject = subject;
            this.subjectsPlayed.add(subject);
            this.resetStats();
            this.showLoading(true);

            const response = await fetch(`${API}/random/${subject}?limit=10`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            this.questions = result.data || result || [];

            this.showLoading(false);

            if (!this.questions.length) {
                this.showToast('⚠️ Nenhuma pergunta encontrada para esta matéria!', 'warning');
                return;
            }

            this.shuffleArray(this.questions);
            this.currentQuestionIndex = 0;
            this.startTimer();
            this.showScreen('quiz-screen');
            this.displayQuestion();

        } catch (err) {
            console.error('Erro ao iniciar quiz:', err);
            this.showLoading(false);
            this.showToast('❌ Erro ao carregar perguntas. Verifique se o servidor está rodando.', 'error');
        }
    }

    displayQuestion() {
        this.answered = false;
        this.questionStartTime = Date.now();

        const question = this.questions[this.currentQuestionIndex];
        if (!question) return;

        // Update UI
        this.ui.questionNumber.textContent = `QUESTÃO ${this.currentQuestionIndex + 1}`;
        this.ui.subjectTag.textContent = question.subject || this.currentSubject;
        this.renderMultilineText(this.ui.questionText, question.question);
        this.ui.currentQuestion.textContent = this.currentQuestionIndex + 1;
        this.ui.totalQuestions.textContent = this.questions.length;

        // Progress bar
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.ui.progressFill.style.width = `${progress}%`;

        // Options
        this.clearElement(this.ui.optionsContainer);

        const options = question.options || [];
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

        // Shuffle options but keep correct answer in sync
        const shuffledOptions = this.shuffleArray(
            options.map((text, originalIndex) => ({ text, originalIndex }))
        );
        const newCorrectPosition = shuffledOptions.findIndex(option => option.originalIndex === question.correct);
        this.currentQuestionOptions = shuffledOptions;

        shuffledOptions.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.setAttribute('role', 'button');

            const letter = letters[index] || String(index + 1);
            btn.setAttribute('aria-label', `Opção ${letter}: ${option.text}`);

            btn.append(
                this.createElement('span', 'option-letter', letter),
                this.createElement('span', 'option-text', option.text)
            );

            btn.addEventListener('click', () => this.selectAnswer(index, newCorrectPosition));
            this.ui.optionsContainer.appendChild(btn);
        });

        // Hide explanation and next button
        this.ui.explanationContainer.style.display = 'none';
        this.ui.nextBtn.style.display = 'none';

        // Add animation
        const questionContainer = document.querySelector('.question-container');
        if (questionContainer) {
            questionContainer.classList.remove('fadeIn');
            void questionContainer.offsetWidth; // Trigger reflow
            questionContainer.classList.add('fadeIn');
        }
    }

    renderMultilineText(container, text = '') {
        this.clearElement(container);

        String(text).split(/\n{2,}/).forEach((paragraph, paragraphIndex) => {
            if (paragraphIndex > 0) {
                container.appendChild(document.createElement('br'));
            }

            paragraph.split('\n').forEach((line, lineIndex) => {
                if (lineIndex > 0) {
                    container.appendChild(document.createElement('br'));
                }
                container.appendChild(document.createTextNode(line));
            });
        });
    }

    // ==================================
    // ANSWER HANDLING
    // ==================================

    selectAnswer(selectedIndex, correctIndex) {
        if (this.answered) return;
        this.answered = true;

        const question = this.questions[this.currentQuestionIndex];
        const options = this.ui.optionsContainer.querySelectorAll('.option-btn');
        const responseTime = (Date.now() - this.questionStartTime) / 1000;

        // Disable all options
        options.forEach(btn => {
            btn.classList.add('disabled');
            btn.setAttribute('aria-disabled', 'true');
        });

        const isCorrect = selectedIndex === correctIndex;
        const selectedOption = this.currentQuestionOptions[selectedIndex];
        const correctOption = this.currentQuestionOptions[correctIndex];

        this.userAnswers.push({
            questionIndex: this.currentQuestionIndex,
            selectedIndex,
            correctIndex,
            selectedText: selectedOption?.text || '',
            correctText: correctOption?.text || '',
            isCorrect,
            responseTime
        });

        this.totalAnswered++;

        if (isCorrect) {
            this.handleCorrectAnswer(options, selectedIndex, question, responseTime);
        } else {
            this.handleWrongAnswer(options, selectedIndex, correctIndex, question);
        }

        // Update level
        this.level = Math.floor(this.xp / 100) + 1;

        // Check achievements
        const newAchievements = this.achievements.check({
            correctAnswers: this.correctAnswers,
            maxStreak: this.maxStreak,
            score: this.score,
            totalAnswered: this.totalAnswered
        });

        // Show new achievements
        newAchievements.forEach((achievement, i) => {
            setTimeout(() => {
                this.showAchievementPopup(achievement);
                this.audio.playAchievement();
            }, i * 500);
        });

        this.updateHeaderStats();

        // Show explanation
        if (question.explanation) {
            this.ui.explanationText.textContent = question.explanation;
            this.ui.explanationContainer.style.display = 'block';
            this.ui.explanationContainer.classList.add('slideIn');
        }

        // Show next button
        this.ui.nextBtn.style.display = 'flex';

        this.saveProgress();
    }

    handleCorrectAnswer(options, index, question, responseTime) {
        this.audio.playCorrect();
        this.correctAnswers++;
        this.streak++;

        // XP and coins
        const xpGain = 25 + Math.max(0, Math.floor((this.questionTimeLimit - responseTime) / 2));
        this.xp += xpGain;
        this.coins += 10;

        this.showFloatingText(`+${xpGain} XP`, options[index]);

        if (this.streak > this.maxStreak) {
            this.maxStreak = this.streak;
        }

        // Score calculation
        const basePoints = 100;
        const streakBonus = Math.min(this.streak * 10, 100);
        const speedBonus = Math.max(0, Math.floor((this.questionTimeLimit - responseTime) * 2));
        this.score += basePoints + streakBonus + speedBonus;

        // Visual feedback
        options[index].classList.add('correct');
        options[index].classList.add('pulse');

        // Speed demon achievement check
        if (responseTime < 5) {
            this.showFloatingText('⚡ SPEED BONUS!', options[index]);
        }

    }

    handleWrongAnswer(options, selectedIndex, correctIndex, question) {
        this.audio.playWrong();
        this.wrongAnswers++;
        this.streak = 0;
        this.lives = Math.max(0, this.lives - 1);

        // Visual feedback
        options[selectedIndex].classList.add('wrong');
        options[selectedIndex].classList.add('shake');

        if (correctIndex !== undefined && correctIndex !== selectedIndex) {
            options[correctIndex].classList.add('correct');
        }

        // Check game over
        if (this.lives <= 0) {
            setTimeout(() => this.finishQuiz(), 1500);
            return;
        }

        this.updateLivesDisplay();
    }

    // ==================================
    // NAVIGATION
    // ==================================

    nextQuestion() {
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
        } else {
            this.finishQuiz();
        }
    }

    finishQuiz() {
        this.stopTimer();
        this.incrementTotalGames();
        this.showScreen('results-screen');
        this.displayResults();
        this.saveScore();
    }

    // ==================================
    // RESULTS
    // ==================================

    displayResults() {
        const accuracy = this.totalAnswered > 0
            ? Math.round((this.correctAnswers / this.totalAnswered) * 100)
            : 0;

        const grade = this.getGrade(accuracy);

        // Update results UI
        this.setTextContent('results-grade', grade);
        this.setTextContent('correct-answers', this.correctAnswers);
        this.setTextContent('wrong-answers', this.wrongAnswers);
        this.setTextContent('final-score', this.score);
        this.setTextContent('final-accuracy', `${accuracy}%`);
        this.setTextContent('max-streak', `${this.maxStreak}x`);
        this.setTextContent('total-time', this.formatTime(this.elapsedTime));

        // Grade animation
        const gradeEl = document.getElementById('results-grade');
        if (gradeEl) {
            gradeEl.classList.add('grade-appear');
            setTimeout(() => gradeEl.classList.remove('grade-appear'), 1000);
        }

        // Subject breakdown
        this.displaySubjectBreakdown();
    }

    displaySubjectBreakdown() {
        const breakdown = document.getElementById('results-breakdown');
        if (!breakdown) return;

        const subjectStats = {};

        this.userAnswers.forEach(answer => {
            const question = this.questions[answer.questionIndex];
            const subject = question.subject || 'Outros';

            if (!subjectStats[subject]) {
                subjectStats[subject] = { correct: 0, total: 0 };
            }
            subjectStats[subject].total++;
            if (answer.isCorrect) subjectStats[subject].correct++;
        });

        this.clearElement(breakdown);
        breakdown.appendChild(this.createElement('h3', 'section-heading', '📊 DESEMPENHO POR MATÉRIA'));

        Object.entries(subjectStats).forEach(([subject, stats]) => {
            const percentage = Math.round((stats.correct / stats.total) * 100);
            const tone = percentage >= 70 ? 'good' : percentage >= 40 ? 'warn' : 'bad';
            const item = this.createElement('div', `breakdown-item breakdown-${tone}`);
            const meter = this.createElement('div', 'breakdown-meter');
            const bar = this.createElement('div', 'breakdown-bar');
            const fill = this.createElement('div', 'breakdown-fill');

            fill.style.width = `${percentage}%`;
            bar.appendChild(fill);
            meter.append(bar, this.createElement('span', 'breakdown-score', `${stats.correct}/${stats.total} (${percentage}%)`));
            item.append(this.createElement('span', 'breakdown-subject', subject), meter);
            breakdown.appendChild(item);
        });
    }

    setTextContent(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    // ==================================
    // SAVE & LOAD
    // ==================================

    async saveScore() {
        try {
            const accuracy = this.totalAnswered > 0
                ? Math.round((this.correctAnswers / this.totalAnswered) * 100)
                : 0;

            const response = await fetch(`${API}/save-score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: this.playerName,
                    score: this.score,
                    accuracy,
                    level: this.level,
                    xp: this.xp,
                    streak: this.maxStreak,
                    coins: this.coins,
                    time: this.elapsedTime,
                    subject: this.currentSubject
                })
            });

            if (response.ok) {
                this.renderRanking();
            }
        } catch (err) {
            console.error('Erro ao salvar score:', err);
        }
    }

    saveProgress() {
        const previousSave = this.getSavedProgress();
        const saveData = {
            xp: this.xp,
            level: this.level,
            coins: this.coins,
            playerName: this.playerName,
            totalGames: previousSave.totalGames || 0,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem('cyberquiz-save', JSON.stringify(saveData));
    }

    getSavedProgress() {
        try {
            return JSON.parse(localStorage.getItem('cyberquiz-save') || '{}');
        } catch (e) {
            return {};
        }
    }

    incrementTotalGames() {
        const previousSave = this.getSavedProgress();
        localStorage.setItem('cyberquiz-save', JSON.stringify({
            ...previousSave,
            totalGames: (previousSave.totalGames || 0) + 1
        }));
    }

    loadProgress() {
        const data = this.getSavedProgress();
        if (Object.keys(data).length) {
            this.xp = data.xp || 0;
            this.level = data.level || 1;
            this.coins = data.coins || 0;
            this.playerName = data.playerName || 'Player';
        }
    }

    // ==================================
    // RANKING
    // ==================================

    async renderRanking() {
        try {
            const response = await fetch(`${API}/ranking?limit=10`);
            const result = await response.json();
            const ranking = result.data || result || [];

            const container = document.getElementById('ranking-container');
            if (!container) return;
            this.clearElement(container);

            if (ranking.length === 0) {
                container.appendChild(this.createElement('p', 'empty-state', 'Nenhum score registrado ainda. Seja o primeiro! 🏆'));
                return;
            }

            ranking.forEach((player, index) => {
                const medals = ['🥇', '🥈', '🥉'];
                const medal = index < 3 ? medals[index] : `#${index + 1}`;
                const isCurrentUser = player.nome === this.playerName;
                const item = this.createElement('div', `ranking-item ${isCurrentUser ? 'current-user' : ''}`);

                item.append(
                    this.createElement('span', 'ranking-position', medal),
                    this.createElement('span', 'ranking-name', player.nome || 'Player'),
                    this.createElement('span', 'ranking-score', String(player.score || 0)),
                    this.createElement('span', 'ranking-accuracy', `${player.accuracy || 0}%`)
                );
                container.appendChild(item);
            });

        } catch (err) {
            console.error('Erro ao carregar ranking:', err);
        }
    }

    // ==================================
    // ACHIEVEMENTS
    // ==================================

    renderAchievements() {
        const container = document.getElementById('achievements-container');
        if (!container) return;

        const allAchievements = this.achievements.getAll();
        this.clearElement(container);
        container.appendChild(this.createElement('h3', 'section-heading', '🏆 CONQUISTAS'));

        const grid = this.createElement('div', 'achievements-grid');
        allAchievements.forEach(achievement => {
            const item = this.createElement(
                'div',
                `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`
            );
            item.title = achievement.desc;
            item.append(
                this.createElement('span', 'achievement-icon', achievement.icon),
                this.createElement('span', 'achievement-name', achievement.name)
            );
            grid.appendChild(item);
        });
        container.appendChild(grid);
    }

    showAchievementPopup(achievement) {
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        const content = this.createElement('div', 'achievement-popup-content');
        const text = this.createElement('div', 'achievement-popup-text');

        text.append(
            this.createElement('h4', '', '🏆 CONQUISTA DESBLOQUEADA!'),
            this.createElement('p', '', achievement.name)
        );
        content.append(this.createElement('span', 'achievement-popup-icon', achievement.icon), text);
        popup.appendChild(content);

        document.body.appendChild(popup);

        // Animate in
        setTimeout(() => popup.classList.add('show'), 10);

        // Remove after delay
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
        }, 4000);
    }

    // ==================================
    // TIMER
    // ==================================

    startTimer() {
        this.stopTimer();
        this.elapsedTime = 0;
        this.updateTimerDisplay();

        this.timerInterval = setInterval(() => {
            this.elapsedTime++;
            this.updateTimerDisplay();

            // Warning when time is low
            if (this.elapsedTime > 0 && this.elapsedTime % 30 === 0) {
                this.showToast(`⏱ ${Math.floor(this.elapsedTime / 60)}:${String(this.elapsedTime % 60).padStart(2, '0')} decorridos`, 'info');
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateTimerDisplay() {
        if (this.ui.timerValue) {
            this.ui.timerValue.textContent = this.formatTime(this.elapsedTime);
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // ==================================
    // SCREEN MANAGEMENT
    // ==================================

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;

            // Add entrance animation
            targetScreen.classList.add('fadeIn');
            setTimeout(() => targetScreen.classList.remove('fadeIn'), 300);
        }

        if (screenId === 'main-menu') {
            this.renderRanking();
            this.renderAchievements();
        }
    }

    // ==================================
    // UI UPDATES
    // ==================================

    updateHeaderStats() {
        if (this.ui.score) this.ui.score.textContent = this.score;
        if (this.ui.streak) this.ui.streak.textContent = `${this.streak}x`;
        
        const accuracy = this.totalAnswered > 0
            ? Math.round((this.correctAnswers / this.totalAnswered) * 100)
            : 0;
        if (this.ui.accuracy) this.ui.accuracy.textContent = `${accuracy}%`;

        this.updateLivesDisplay();
        this.updateLevelDisplay();
    }

    updateLivesDisplay() {
        const livesContainer = document.getElementById('lives-display');
        if (livesContainer) {
            const value = livesContainer.querySelector('.stat-value') || livesContainer;
            value.textContent = '❤️'.repeat(this.lives) + '🖤'.repeat(Math.max(0, this.maxLives - this.lives));
        }
    }

    updateLevelDisplay() {
        const levelEl = document.getElementById('level-display');
        const xpEl = document.getElementById('xp-bar');

        if (levelEl) levelEl.textContent = `Nível ${this.level}`;
        if (xpEl) {
            const xpNeeded = this.level * 100;
            const xpProgress = (this.xp % 100);
            xpEl.style.width = `${xpProgress}%`;
        }
    }

    // ==================================
    // REVIEW SCREEN
    // ==================================

    showReview() {
        this.showScreen('review-screen');

        const list = document.getElementById('review-list');
        if (!list) return;

        const letters = ['A', 'B', 'C', 'D', 'E'];
        this.clearElement(list);

        this.userAnswers.forEach((answer, index) => {
            const question = this.questions[answer.questionIndex];
            if (!question) return;

            const statusClass = answer.isCorrect ? 'correct' : 'wrong';
            const statusIcon = answer.isCorrect ? '✅' : '❌';
            const statusText = answer.isCorrect ? 'Correta' : 'Incorreta';
            const selectedLetter = letters[answer.selectedIndex] || String(answer.selectedIndex + 1);
            const correctLetter = letters[answer.correctIndex] || String(answer.correctIndex + 1);
            const item = this.createElement('div', `review-item ${statusClass}`);
            const header = this.createElement('div', 'review-header');
            const questionText = this.createElement('p', 'review-question-text');
            const answers = this.createElement('div', 'review-answers');

            header.append(
                this.createElement('span', 'review-status', `${statusIcon} ${statusText}`),
                this.createElement('span', 'review-question-num', `QUESTÃO ${index + 1}`),
                this.createElement('span', 'review-time', `⏱ ${answer.responseTime?.toFixed(1) || '0'}s`)
            );

            this.renderMultilineText(questionText, question.question);
            answers.appendChild(this.createElement(
                'div',
                'review-your-answer',
                `Sua resposta: ${selectedLetter} - ${answer.selectedText}`
            ));

            answers.appendChild(this.createElement(
                'div',
                'review-correct-answer',
                `Resposta correta: ${correctLetter} - ${answer.correctText}`
            ));


            item.append(header, questionText, answers);

            if (question.explanation) {
                const explanation = this.createElement('div', 'review-explanation');
                explanation.appendChild(this.createElement('strong', '', '💡 Explicação: '));
                explanation.appendChild(document.createTextNode(question.explanation));
                item.appendChild(explanation);
            }

            list.appendChild(item);
        });
    }

    // ==================================
    // RESET
    // ==================================

    resetStats() {
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.totalAnswered = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.userAnswers = [];
        this.elapsedTime = 0;
        this.lives = this.maxLives;
        this.updateHeaderStats();
    }

    // ==================================
    // UTILITIES
    // ==================================

    showLoading(show) {
        let loading = document.getElementById('loading');
        
        if (!loading && show) {
            loading = document.createElement('div');
            loading.id = 'loading';
            loading.className = 'loading-overlay';
            loading.append(
                this.createElement('div', 'loading-spinner'),
                this.createElement('p', 'loading-text', 'CARREGANDO...')
            );
            document.body.appendChild(loading);
        }

        if (loading) {
            loading.style.display = show ? 'flex' : 'none';
        }
    }

    showFloatingText(text, parent) {
        const el = document.createElement('div');
        el.className = 'floating-text';
        el.textContent = text;

        if (parent) {
            const rect = parent.getBoundingClientRect();
            el.style.left = `${rect.left + rect.width / 2}px`;
            el.style.top = `${rect.top}px`;
        }

        document.body.appendChild(el);

        // Animate
        requestAnimationFrame(() => {
            el.classList.add('float-up');
        });

        setTimeout(() => el.remove(), 2000);
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    createParticles() {
        const container = document.body;
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${3 + Math.random() * 4}s`;
            particle.style.opacity = String(0.3 + Math.random() * 0.4);
            container.appendChild(particle);
        }
    }

    createElement(tagName, className = '', text = '') {
        const element = document.createElement(tagName);
        if (className) element.className = className;
        if (text !== '') element.textContent = text;
        return element;
    }

    clearElement(element) {
        if (!element) return;
        element.replaceChildren();
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    getGrade(accuracy) {
        if (accuracy >= 95) return 'LEGEND';
        if (accuracy >= 85) return 'MASTER';
        if (accuracy >= 75) return 'DIAMOND';
        if (accuracy >= 65) return 'PLATINUM';
        if (accuracy >= 50) return 'GOLD';
        if (accuracy >= 35) return 'SILVER';
        return 'BRONZE';
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    new CyberQuiz();
});
