// Dark mode
let darkmode = localStorage.getItem("darkmode");
const btnSwitch = document.querySelector("#btn-switch");

const enableDarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkmode();

btnSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

// Quiz
const startBtn = document.querySelector("#start-btn");
const nextBtn = document.querySelector("#next-btn");
const questionContainer = document.querySelector("#question-container");
const questionElement = document.querySelector("#question");
const answerBtn = document.querySelector("#answer-buttons");

let shuffledQuestions, currentQuestionIndex

const questions = [
    {
        question: "Vilket hus blir Harry sorterad i vid Hogwarts?",
        answers: [
            { text: "Gryffindor", correct: true },
            { text: "Slytherin", correct: false }
        ]
    },
    {
        question: "Är Severus Snape en medlem av Dödsätarna?",
        answers: [
            {text: "Ja", correct: true },
            {text: "Nej", correct: false}
        ]
    },
    {
        question: "Vad är Dobby?",
        answers: [
            {text: "En husalf", correct: true },
            {text: "En råtta", correct: false}
        ]
    },
    {
        question: "Hur många Harry Potter filmer finns det?",
        answers: [
            {text: "8", correct: true },
            {text: "7", correct: false}
        ]
    },
    {
        question: "Vilken är den sista reliken som Harry Potter hittar?",
        answers: [
            {text: "Äldrestenen", correct: true },
            {text: "Osynlighetsmanteln", correct: false},
            {text: "Fläderstaven", correct: false},
            {text: "Snitchbollen", correct: false}
        ]
    },
    {
        question: "Vad heter den trehövdade hunden som vaktar De vises sten?",
        answers: [
            {text: "Rex", correct: true },
            {text: "Argos", correct: false},
            {text: "Cerberus", correct: false},
            {text: "Fluffy", correct: false}
        ]
    },
    {
        question: "Vad heter Harrys uggla?",
        answers: [
            {text: "Hedwig", correct: true },
            {text: "Errol", correct: false},
            {text: "Pigwidgeon", correct: false},
            {text: "Fawkes", correct: false}
        ]
    },
    {
        question: "Vilka av dessa är medlemmar i Dumbledores armé? (Finns fler än 1 rätt svar)",
        answers: [
            {text: "Hermione Granger", correct: true },
            {text: "Neville Longbottom", correct: false},
            {text: "Draco Malfoy", correct: false},
            {text: "Bellatrix Lestrange", correct: false}
        ]
    },
    {
        question: "Vilka av dessa är Horrokruxer? (Finns fler än 1 rätt svar)",
        answers: [
            {text: "Tom Riddles dagbok", correct: true },
            {text: "Fläderstaven", correct: false},
            {text: "Harry Potter", correct: false},
            {text: "Salazar Slytherins medaljong", correct: false}
        ]
    },
    {
        question: "Vilka djur kan ses som patronusformer i filmerna? (Finns fler än 1 rätt svar)",
        answers: [
            {text: "Hjort", correct: true },
            {text: "Utter", correct: false},
            {text: "Fenix", correct: false},
            {text: "Varg", correct: false}
        ]
    }

];

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startBtn.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerBtn.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add("hide");
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    setStatusClass(document.body, correct);
    if (correct) {
        score++;
    }
    Array.from(answerBtn.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove("hide");
    } else {
        showResult();
    }
};

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
};

function clearStatusClass (element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};

const resultContainer = document.querySelector("#result-container");
const resultMessage = document.querySelector("#result-message");
const resultScore = document.querySelector("#result-score");
const restartBtn = document.querySelector("#restart-btn");

let score = 0;

function showResult() {
    const container = document.querySelector(".container");
    container.classList.add("hide");
    resultContainer.classList.remove("hide");

    const scorePercentage = (score / questions.length) * 100;
    resultScore.innerText = `Du fick ${score} av ${questions.length} rätt (${Math.round(scorePercentage)}%).`;

    // Anpassa meddelande och färg baserat på procent
    if (scorePercentage < 50) {
        resultMessage.innerText = "Underkänt. Bättre lycka nästa gång!";
        resultContainer.style.color = "red"; // Röd färg för underkänt
    } else if (scorePercentage <= 75) {
        resultMessage.innerText = "Bra jobbat! Du kan mycket om Harry Potter!";
        resultContainer.style.color = "orange"; // Orange färg för "Bra"
    } else {
        resultMessage.innerText = "Riktigt bra jobbat! Du är en sann Harry Potter-expert!";
        resultContainer.style.color = "green"; // Grön färg för "Riktigt bra"
    }
}

restartBtn.addEventListener("click", () => {
    score = 0;
    resultContainer.classList.add("hide");
    const container = document.querySelector(".container");
    container.classList.remove("hide");
    startBtn.classList.remove("hide");
});
