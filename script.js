let questions = [];
let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 30; // Numero di domande da visualizzare nel quiz

fetch('question.json')
    .then(response => response.json())
    .then(data => {
        questions = data; // Salva tutte le domande
        startQuiz(); // Inizia il quiz
    })
    .catch(error => console.error('Errore nel caricamento del file JSON:', error));

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('result').classList.add('hidden');
    document.getElementById('restart').classList.add('hidden');
    // Genera un set di 30 domande casuali
    const selectedQuestions = getRandomQuestions(questions, totalQuestions);
    showQuestion(selectedQuestions);
}

// Funzione per selezionare 30 domande casuali
function getRandomQuestions(allQuestions, numberOfQuestions) {
    // Mescola tutte le domande in modo casuale
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    // Seleziona solo le prime 30 domande
    return shuffled.slice(0, numberOfQuestions);
}

function showQuestion(selectedQuestions) {
    if (currentQuestionIndex >= selectedQuestions.length) {
        endGame();
        return;
    }

    const currentQuestion = selectedQuestions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const answersElement = document.getElementById('answers');
    answersElement.innerHTML = ''; // Reset the answers

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.remove('correct', 'incorrect'); // Rimuove eventuali classi precedenti
        button.addEventListener('click', () => selectAnswer(button, index, selectedQuestions));
        answersElement.appendChild(button);
    });

    // Aggiorna il numero della domanda corrente
    document.getElementById('question-counter').textContent = `Domanda ${currentQuestionIndex + 1} di ${totalQuestions}`;
}

function selectAnswer(button, selectedIndex, selectedQuestions) {
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    // Controlla se la risposta è corretta
    if (selectedIndex === currentQuestion.correct) {
        button.classList.add('correct');  // Aggiunge il colore verde
        score++;
        document.getElementById('score').textContent = score;
    } else {
        button.classList.add('incorrect'); // Aggiunge il colore rosso
    }

    // Dopo un piccolo ritardo, passa alla domanda successiva
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion(selectedQuestions); // Passa alla prossima domanda
    }, 1000); // 1 secondo di ritardo
}

function endGame() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('restart').classList.remove('hidden');
}

document.getElementById('restart').addEventListener('click', startQuiz);
