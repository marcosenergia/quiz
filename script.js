// ======================================
// DADOS DO QUIZ - PERGUNTAS E RESPOSTAS
// ======================================

const quizData = [
    {
        question: "O que define o processo de 'Movimentação' no sistema Fluig?",
        options: [
            "É a alteração de dados organizacionais de um colaborador ativo.",
            "É o processo de desligamento temporário de um funcionário.",
            "É quando o colaborador tira férias prolongadas e vira nômade digital."
        ],
        correctAnswer: 0,
        feedback: {
            correct: "Perfeito! Movimentação é exatamente isso: alterações organizacionais mantendo o vínculo ativo.",
            incorrect: "Ops! Movimentação apenas altera dados como área, função ou salário..."
        }
    },
    {
        question: "As movimentações no Fluig são efetivadas em qual período do mês?",
        options: [
            "Imediatamente após a aprovação no sistema.",
            "Entre o 1º e o 5º dia útil do mês seguinte ao da solicitação.",
            "Apenas nas noites de lua cheia, quando o sistema está mais receptivo."
        ],
        correctAnswer: 1,
        feedback: {
            correct: "Isso mesmo! As movimentações seguem um calendário específico para processamento na folha.",
            incorrect: "Atenção ao calendário! As movimentações são processadas entre o 1º e 5º dia útil do mês seguinte."
        }
    },
    {
        question: "O Fluig permite a abertura de movimentação com data de vigência para o mês atual?",
        options: [
            "Sim, desde que seja aprovada pelo BP.",
            "Não, a data de efetivação deve ser obrigatoriamente para o mês seguinte.",
            "Sim, mas só se você pedir com jeitinho e trazer café pro RH."
        ],
        correctAnswer: 1,
        feedback: {
            correct: "Correto! O sistema só permite movimentações para o mês seguinte, respeitando o fechamento de folha.",
            incorrect: "Cuidado! Todas as movimentações devem ter vigência para o mês seguinte, sem exceções."
        }
    },
    {
        question: "Quais as três modalidades de movimentação que podem ser combinadas em uma única solicitação?",
        options: [
            "Área & Função (mesmo gestor), Localidade e Salário.",
            "Férias, Salário, Cargo e Benefícios.",
            "Café, Almoço, Happy Hour e Home Office."
        ],
        correctAnswer: 0,
        feedback: {
            correct: "Excelente! Essas são as três modalidades que podem ser combinadas numa mesma solicitação.",
            incorrect: "Revise as modalidades! As que podem ser combinadas são: Área & Função (mesmo gestor), Localidade e Salário."
        }
    },
    {
        question: "Na movimentação Entre Gestores (empresa/filial/área), de quem é a responsabilidade de definir a nova posição, função e salário do colaborador no sistema?",
        options: [
            "Gestor de origem (quem está transferindo o colaborador).",
            "O próprio sistema Fluig, que sorteia os cargos disponíveis na unidade.",
            "Gestor de destino (quem vai receber o colaborador), durante a sua etapa de aprovação."
        ],
        correctAnswer: 2,
        feedback: {
            correct: "Perfeito! No processo Entre gestores, a responsabilidade de definir a modalidade da posição, função e salário é do gestor que vai receber o colaborador.",
            incorrect: "Ops! O gestor atual apenas inicia o fluxo. Quem parametriza os novos dados é o gestor de destino"
        }
    }
];

// ======================================
// VARIÁVEIS GLOBAIS
// ======================================

let currentQuestionIndex = 0;
let score = 0;
let userName = '';
let selectedAnswer = null;

// ======================================
// ELEMENTOS DO DOM
// ======================================

const welcomeScreen = document.getElementById('welcomeScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');

const userNameInput = document.getElementById('userName');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const themeToggle = document.getElementById('themeToggle');

const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const questionTitle = document.getElementById('questionTitle');
const optionsContainer = document.getElementById('optionsContainer');
const feedback = document.getElementById('feedback');
const feedbackIcon = document.getElementById('feedbackIcon');
const feedbackText = document.getElementById('feedbackText');

const finalUserName = document.getElementById('finalUserName');
const finalScore = document.getElementById('finalScore');
const correctCount = document.getElementById('correctCount');
const incorrectCount = document.getElementById('incorrectCount');
const percentageScore = document.getElementById('percentageScore');
const performanceMessage = document.getElementById('performanceMessage');

// ======================================
// FUNÇÕES DE NAVEGAÇÃO
// ======================================

function showScreen(screen) {
    welcomeScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    
    screen.classList.remove('hidden');
}

function startQuiz() {
    userName = userNameInput.value.trim();
    
    if (!userName) {
        alert('Por favor, digite seu nome para começar! 😊');
        userNameInput.focus();
        return;
    }
    
    // Resetar variáveis
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    
    // Mostrar tela do quiz
    showScreen(quizScreen);
    loadQuestion();
}

function loadQuestion() {
    // Resetar estado
    selectedAnswer = null;
    feedback.classList.add('hidden');
    nextBtn.classList.add('hidden');
    
    // Atualizar barra de progresso
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = progress + '%';
    progressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    
    // Carregar pergunta atual
    const currentQuestion = quizData[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    
    // Renderizar opções
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = `<span>${option}</span>`;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(answerIndex) {
    // Prevenir múltiplas seleções
    if (selectedAnswer !== null) return;
    
    selectedAnswer = answerIndex;
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    // Atualizar pontuação
    if (isCorrect) {
        score++;
    }
    
    // Destacar respostas
    const optionButtons = optionsContainer.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        btn.classList.add('disabled');
        
        if (index === currentQuestion.correctAnswer) {
            btn.classList.add('correct');
        } else if (index === answerIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Mostrar feedback
    showFeedback(isCorrect, currentQuestion.feedback);
    
    // Mostrar botão de próxima
    nextBtn.classList.remove('hidden');
}

function showFeedback(isCorrect, feedbackMessages) {
    feedback.classList.remove('hidden', 'correct', 'incorrect');
    
    if (isCorrect) {
        feedback.classList.add('correct');
        feedbackIcon.textContent = '✅';
        feedbackText.textContent = feedbackMessages.correct;
    } else {
        feedback.classList.add('incorrect');
        feedbackIcon.textContent = '❌';
        feedbackText.textContent = feedbackMessages.incorrect;
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    showScreen(resultsScreen);
    
    // Preencher dados
    finalUserName.textContent = userName;
    finalScore.textContent = score;
    correctCount.textContent = score;
    incorrectCount.textContent = quizData.length - score;
    
    const percentage = Math.round((score / quizData.length) * 100);
    percentageScore.textContent = percentage + '%';
    
    // Mensagem de desempenho
    let message = '';
    
    if (percentage >= 80) {
        message = `
            <h3>🌟 Parabéns! Você mandou muito bem!</h3>
            <p>Seu conhecimento sobre o sistema Fluig está excelente! Você está preparado para orientar sua equipe com confiança.</p>
        `;
    } else if (percentage >= 60) {
        message = `
            <h3>👍 Você foi bem, mas sempre dá pra melhorar!</h3>
            <p>Você tem uma boa base de conhecimento. Revise alguns conceitos e você estará afiado em processos de movimentação!</p>
        `;
    } else {
        message = `
            <h3>📚 Sem problemas! O objetivo é aprender.</h3>
            <p>Este quiz é uma ferramenta de aprendizado. Revisite os materiais de treinamento e tente novamente. Você vai conseguir!</p>
        `;
    }
    
    performanceMessage.innerHTML = message;
}

function restartQuiz() {
    userNameInput.value = '';
    showScreen(welcomeScreen);
    userNameInput.focus();
}

// ======================================
// TEMA CLARO/ESCURO
// ======================================

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    }
}

// ======================================
// EVENT LISTENERS
// ======================================

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
themeToggle.addEventListener('click', toggleTheme);

// Permitir Enter no campo de nome
userNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startQuiz();
    }
});

// ======================================
// INICIALIZAÇÃO
// ======================================

window.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    userNameInput.focus();
});

// ======================================
// COMPATIBILIDADE COM TEAMS/SHAREPOINT
// ======================================

// Detectar se está rodando no Teams
if (window.parent !== window) {
    // Aplicação está em iframe (Teams)
    console.log('Aplicação rodando no Microsoft Teams');
}

// Prevenir zoom indesejado no iOS
document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, { passive: false });
