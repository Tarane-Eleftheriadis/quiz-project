//Sätter darkmode
let darkmode = localStorage.getItem("darkmode");
const btnSwitch = document.querySelector("#btn-switch");

const enableDarkmode = () => {
    document.body.classList.add("darkmode")
    localStorage.setItem("darkmode", "active")
}

const disableDarkmode = () => {
    document.body.classList.remove("darkmode")
    localStorage.setItem("darkmode", null)
}

if(darkmode === "active") enableDarkmode()

btnSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode")
    darkmode !== "active" ? enableDarkmode (): disableDarkmode ()
})


const startBtn = document.querySelector("#start-btn");
const questionContainer = document.querySelector("#question-container");
const questionElement = document.querySelector("#question");
const answerBtn = document.querySelector("#answer-buttons");

const questions = [
    {
        question: "Vad heter Harry i efternamn?",
        answers: [
            { text: "Potter", correct: true },
            { text: "Granger", correct: false }
        ]
    },
    {
        qusetion: "text",
        answers: [
            {text: "text", correct: true },
            {text: "test", correct: false}
        ]
    },
    {
        qusetion: "text",
        answers: [
            {text: "text", correct: true },
            {text: "test", correct: false}
        ]
    },
    {
        qusetion: "text",
        answers: [
            {text: "text", correct: true },
            {text: "test", correct: false}
        ]
    },
    {
        qusetion: "text",
        answers: [
            {text: "text", correct: true },
            {text: "test", correct: false}
        ]
    },
    {
        qusetion: "text",
        answers: [
            {text: "text", correct: true },
            {text: "test", correct: false}
        ]
    },
    {
        qusetion: "text",
        answers: [
            {text: "text", correct: true },
            {text: "test", correct: false}
        ]
    },
    {
        qusetion: "text",
        answers: [
            {text: "text", correct: true },
            {text: "test", correct: false}
        ]
    },
    {
        qusetion: "text",
        answers: [
            {text: "text", correct: true },
            {text: "test", correct: false}
        ]
    }

];

startBtn.addEventListener("click", startGame);

function startGame() {
    startBtn.classList.add("hide");
    questionContainer.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion() {
    showQuestion(questions[0]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    // answerBtn.innerHTML = ""; // Rensar tidigare svar
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

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        console.log("Correct answer!");
    } else {
        console.log("Wrong answer.");
    }
    Array.from(answerBtn.children).forEach(button => {
        button.disabled = true;
    });
}
