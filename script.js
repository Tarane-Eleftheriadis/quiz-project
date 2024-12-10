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
            { text: "Slytherin", correct: false },
            { text: "Gryffindor", correct: true }            
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
            {text: "7", correct: false },
            {text: "8", correct: true}
        ]
    },
    {
        question: "Vilken är den sista reliken som Harry Potter hittar?",
        answers: [
            {text: "Äldrestenen", correct: false },
            {text: "Osynlighetsmanteln", correct: false},
            {text: "Fläderstaven", correct: true},
            {text: "Snitchbollen", correct: false}
        ]
    },
    {
        question: "Vad heter den trehövdade hunden som vaktar De vises sten?",
        answers: [
            {text: "Rex", correct: false },
            {text: "Argos", correct: false},
            {text: "Cerberus", correct: false},
            {text: "Fluffy", correct: true}
        ]
    },
    {
        question: "Vad heter Harrys uggla?",
        answers: [
            {text: "Hedwig", correct: true },
            {text: "Nymphadora Tonks", correct: false},
            {text: "Pigwidgeon", correct: false},
            {text: "Fawkes", correct: false}
        ]
    },
    {
        question: "Vilka av dessa är medlemmar i Dumbledores armé? (Finns fler än 1 rätt svar)",
        answers: [
            {text: "Ginny Weasley", correct: true },
            {text: "Neville Longbottom", correct: true},
            {text: "Draco Malfoy", correct: false},
            {text: "Bellatrix Lestrange", correct: false}
        ]
    },
    {
        question: "Vilka av dessa är Horrokruxer? (Finns fler än 1 rätt svar)",
        answers: [
            {text: "Tom Riddles dagbok", correct: true },
            {text: "Nagini", correct: true},
            {text: "Harry Potter", correct: true},
            {text: "Fläderstaven", correct: false}
        ]
    },
    {
        question: "Vilka djur kan ses som patronusformer i filmerna? (Finns fler än 1 rätt svar)",
        answers: [
            {text: "Ulllig mammut", correct: true },
            {text: "Utter", correct: true},
            {text: "Fågel Fenix", correct: true},
            {text: "Jack Russell terrier", correct: true}
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

    questionElement.style.color = "";
    
    showQuestion();
};

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    const multipleAnswers = currentQuestion.answers.filter(answer => answer.correct).length > 1;

    currentQuestion.answers.forEach(answer => {
        if (multipleAnswers) {
            let container = document.createElement("label");
            container.classList.add("checkbox");

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.dataset.correct = answer.correct;

            container.appendChild(document.createTextNode(answer.text));
            container.appendChild(checkbox);

            answerBtns.appendChild(container);
        } else {
            const button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("btn");
            answerBtns.appendChild(button);
            if (answer.correct) {
            button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        }
    });

    if (multipleAnswers) {
        const submitBtn = document.createElement("button");
        submitBtn.classList.add("submitbtn");
        submitBtn.innerText = "Bekräfta";
        submitBtn.addEventListener("click", submitAnswers);
        answerBtns.appendChild(submitBtn);
    }
}

function submitAnswers() {
    validateCheckboxAnswers();

    const submitBtn = answerBtns.querySelector(".submitbtn");
    if (submitBtn) {
        submitBtn.remove();
    }
}

function validateCheckboxAnswers() {
    const selectedCheckboxes = Array.from(answerBtns.querySelectorAll("input[type='checkbox']"));
    let allCorrect = true;

    selectedCheckboxes.forEach(checkbox => {
        if (checkbox.dataset.correct === "true") {
            if (!checkbox.checked) allCorrect = false;
            checkbox.parentElement.classList.add("correct");
        } else if (checkbox.checked) {
            allCorrect = false;
            checkbox.parentElement.classList.add("incorrect");
        }
        checkbox.disabled = true;
    });

    if (allCorrect) score++;
    nextBtn.style.display = "block";
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

function showResult() {
    resetState();

    // Hämta container-elementet
    const container = document.querySelector(".container");
    container.innerHTML = ""; // Rensa tidigare innehåll

    // Rubrik för resultatet
    const resultHeading = document.createElement("h1");
    resultHeading.innerText = "Resultat";
    container.appendChild(resultHeading);

    // Resultatmeddelande
    const resultMessage = document.createElement("p");
    const scorePercentage = (score / questions.length) * 100;
    if (scorePercentage < 50) {
        resultMessage.innerText = `Underkänt! Bättre lycka nästa gång!`;
        resultMessage.style.color = "red";
    } else if (scorePercentage < 75) {
        resultMessage.innerText = `Bra jobbat! Du kan mycket om Harry Potter!`;
        resultMessage.style.color = "orange";
    } else {
        resultMessage.innerText = `Riktigt bra jobbat! Du är en sann Harry Potter-expert!`;
        resultMessage.style.color = "green";
    }
    container.appendChild(resultMessage);

    // Resultatpoäng
    const resultScore = document.createElement("p");
    resultScore.innerText = `Du fick ${score} av ${questions.length} rätt (${Math.round(scorePercentage)}%).`;
    container.appendChild(resultScore);

    // Detaljerade frågor och svar
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question-div");

        const questionText = document.createElement("p");
        questionText.innerText = `${index + 1}. ${q.question}`;
        questionText.style.fontWeight = "bold";
        questionDiv.appendChild(questionText);

        q.answers.forEach(answer => {
            const answerText = document.createElement("p");
            answerText.innerText = `- ${answer.text} ${answer.correct ? "(Rätt svar)" : ""}`;
            answerText.style.color = answer.correct ? "limegreen" : "red";
            questionDiv.appendChild(answerText);
        });

        container.appendChild(questionDiv);
    });

    // Lägg till en spela igen-knapp
    const restartBtn = document.createElement("button");
    restartBtn.classList.add("btn");
    restartBtn.innerText = "Spela igen";
    restartBtn.addEventListener("click", startQuiz);
    container.appendChild(restartBtn);
}



