// Dark mode
const btnSwitch = document.querySelector("#btn-switch");
let darkmode = localStorage.getItem("darkmode");

const darkmodeActive = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
};

const darkmodeInactive = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
};

btnSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? darkmodeActive() : darkmodeInactive();
});

if (darkmode === "active") darkmodeActive();

// Quiz

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

const startBtn = document.querySelector("#start-btn");
const questionElement = document.querySelector("#question");
const nextBtn = document.querySelector("#next-btn");
const answerBtns = document.querySelector("#answer-buttons");

let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    startBtn.classList.add("hide");
    document.querySelector("#question-container").classList.remove("hide");
    nextBtn.innerText = "Nästa";
    
    showQuestion();
};

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
       selectedBtn.classList.add("correct");
       score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
};

function showResult() {
    resetState();
    questionElement.innerHTML = `Du fick ${score} av ${questions.length} rätt`;
    nextBtn.innerHTML = "Spela igen";
    nextBtn.style.display = "block";
    document.querySelector(".container").classList.add("hide");
    document.querySelector("#result-container").classList.remove("hide");
};

function setNextQuestion() {
   currentQuestionIndex++;
   if (currentQuestionIndex < questions.length) {
    showQuestion();
   } else {
    showResult();
   }
};

nextBtn.addEventListener("click", () => {
   if(currentQuestionIndex < questions.length){
    setNextQuestion();
   } else {
    startQuiz();
   }
});

startQuiz();



    // const container = document.querySelector(".container");
    // container.classList.add("hide");
    // resultContainer.classList.remove("hide");

    // const scorePercentage = (score / questions.length) * 100;
    // (${Math.round(scorePercentage)}%).;
   

//     // Anpassa meddelande och färg baserat på procent
//     if (scorePercentage < 50) {
//         resultMessage.innerText = "Underkänt. Bättre lycka nästa gång!";
//         resultContainer.style.color = "red"; // Röd färg för underkänt
//     } else if (scorePercentage <= 75) {
//         resultMessage.innerText = "Bra jobbat! Du kan mycket om Harry Potter!";
//         resultContainer.style.color = "orange"; // Orange färg för "Bra"
//     } else {
//         resultMessage.innerText = "Riktigt bra jobbat! Du är en sann Harry Potter-expert!";
//         resultContainer.style.color = "green"; // Grön färg för "Riktigt bra"
//     }
// }









// function setStatusClass(element, correct) {
//     clearStatusClass(element)
//     if (correct) {
//         element.classList.add("correct");
//     } else {
//         element.classList.add("wrong");
//     }
// };



// const resultContainer = document.querySelector("#result-container");
// const resultMessage = document.querySelector("#result-message");
// const resultScore = document.querySelector("#result-score");
// const restartBtn = document.querySelector("#restart-btn");

