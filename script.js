// Dark mode
const btnSwitch = document.querySelector("#btn-switch");
// Hämta värde från webbläsarens localStorage
let darkmode = localStorage.getItem("darkmode");

const darkmodeActive = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "true");
};

const darkmodeInactive = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", "false");
};

btnSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "true" ? darkmodeActive() : darkmodeInactive();
});

if (darkmode === "true") darkmodeActive();

// Quiz

const questions = [
    {
        question: "Blir Harry sorterad i Gryffindor vid Hogwarts?",
        answers: [
            { text: "Falskt", correct: false },
            { text: "Sant", correct: true }            
        ]
    },
    {
        question: "Är Severus Snape en medlem av Dödsätarna?",
        answers: [
            {text: "Sant", correct: true },
            {text: "Falskt", correct: false}
        ]
    },
    {
        question: "Är Dobby en råtta?",
        answers: [
            {text: "Falskt", correct: true },
            {text: "Sant", correct: false}
        ]
    },
    {
        question: "Finns det 9 Harry Potter filmer?",
        answers: [
            {text: "Sant", correct: false },
            {text: "Falskt", correct: true}
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

const questionDiv = document.querySelector("#question");
const answerBtnsDiv = document.querySelector("#answer-buttons-div");
const startBtn = document.querySelector("#start-btn");
const nextBtn = document.querySelector("#next-btn");

//Vilken fråga som visas
let currentQuestionIndex = 0;
//Poängräknare
let score = 0;
//Användarens svar
let userAnswers = [];

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    startBtn.classList.add("hide");
    document.querySelector("#question-container").classList.remove("hide");
    
    showQuestion();
};

function showQuestion() {
    cleanUp();

    //Visar vilket nummer och själva frågan som skall visas
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionDiv.innerText = questionNo + ". " + currentQuestion.question;

    //Kollar om det finns fler än 1 rätt
    const multipleAnswers = currentQuestion.answers.filter(answer => answer.correct).length > 1;

    //Skapar checkbox el knapp
    currentQuestion.answers.forEach(answer => {
        if (multipleAnswers) {
            let labelContainer = document.createElement("label");
            labelContainer.classList.add("label");

            let inputCheckbox = document.createElement("input");
            inputCheckbox.type = "checkbox";
            inputCheckbox.dataset.correct = answer.correct;

            labelContainer.append(document.createTextNode(answer.text));
            labelContainer.append(inputCheckbox);

            answerBtnsDiv.append(labelContainer);
        } else {
            const answerbtn = document.createElement("button");
            answerbtn.innerText = answer.text;
            answerbtn.classList.add("btn");
            
            answerBtnsDiv.append(answerbtn);
          
            answerbtn.dataset.correct = answer.correct;
        
            answerbtn.addEventListener("click", selectAnswer);
        }
    });

    if (multipleAnswers) {
        const submitBtn = document.createElement("button");
        submitBtn.classList.add("submitbtn");
        submitBtn.innerText = "Bekräfta";
        submitBtn.addEventListener("click", submitAnswers);
        answerBtnsDiv.append(submitBtn);
    }
}

function submitAnswers() {
    //validerar svar samt tar bort knappen
    validate();

    const submitBtn = answerBtnsDiv.querySelector(".submitbtn");
    if (submitBtn) {
        submitBtn.remove();
    }
}

function validate() {
    //skapar en array av samtliga checkboxar
    const selectedCheckboxes = Array.from(answerBtnsDiv.querySelectorAll("input[type='checkbox']"));
    let allCorrect = true;

    //// Spara användarens val
    userAnswers[currentQuestionIndex] = selectedCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.parentElement.textContent.trim());

    //Går igenom en checkbox i taget
    selectedCheckboxes.forEach(checkbox => {
        if (checkbox.dataset.correct === "true") {
            if (!checkbox.checked) allCorrect = false;
            checkbox.parentElement.classList.add("correct");
        } else if (checkbox.checked) {
            allCorrect = false;
            checkbox.parentElement.classList.add("incorrect");
        }
        //Låser lådorna
        checkbox.disabled = true;
    });

    //Om ALLA lådor är rätt, ger det poäng
    if (allCorrect) score++;
    nextBtn.style.display = "block";
}

function cleanUp() {
    //Tar bort nästa-knapp och rensar textinnehåll i svars-knapp
    nextBtn.style.display = "none";
    answerBtnsDiv.innerText = "";
}

function selectAnswer(e) {
    //Vilken knapp som klickas
    const selectedBtn = e.target;
    //Kollar om rätt svar
    const isCorrect = selectedBtn.dataset.correct === "true";

    //Sparar svaret
    userAnswers[currentQuestionIndex] = selectedBtn.innerText;

    //Sätter klass och poäng (vid rätt)
    if (isCorrect) {
       selectedBtn.classList.add("correct");
       score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    //Visa rätt svar och gör alla knappar inaktiva
    Array.from(answerBtnsDiv.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
};

nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
     setNextQuestion();
    } 
 });

function setNextQuestion() {
   currentQuestionIndex++;
   if (currentQuestionIndex < questions.length) {
    showQuestion();
   } else {
    showResult();
   }
};

function showResult() {
    cleanUp();

    const container = document.querySelector(".container");
    container.innerHTML = "";

    const resultH1 = document.createElement("h1");
    resultH1.innerText = "Resultat";
    container.append(resultH1);

    //Resultat text
    const resultMessage = document.createElement("p");
    const scorePercentage = (score / questions.length) * 100;
    if (scorePercentage < 50) {
        resultMessage.innerText = `Underkänt - Det där gick ju inte så bra.... DISQUALIAMOUS!`;
        resultMessage.style.color = "red";
    } else if (scorePercentage < 75) {
        resultMessage.innerText = `Bra jobbat, men jag tror du kan bättre - Replayious!`;
        resultMessage.style.color = "orange";
    } else {
        resultMessage.innerText = `Riktigt bra jobbat! Du är en sann Harry Potter expert - EXCELLENTUS!`;
        resultMessage.style.color = "green";
    }
    container.append(resultMessage);

    // Resultatpoäng
    const resultScore = document.createElement("p");
    resultScore.innerText = `Du fick ${score} av ${questions.length} rätt (${scorePercentage}%).`;
    container.append(resultScore);

    //Frågor och svar
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question-div");

        const questionText = document.createElement("p");
        questionText.innerText = `${index + 1}. ${q.question}`;
        questionText.style.fontWeight = "bold";
        questionDiv.append(questionText);

        q.answers.forEach(answer => {
            const answerText = document.createElement("p");
            answerText.innerText = `- ${answer.text}`;
            answerText.style.color = answer.correct ? "limegreen" : "red";
            questionDiv.append(answerText);

            // Markera användarens val
            if (userAnswers[index]) {
                if (Array.isArray(userAnswers[index])) {
                    // Checkbox-fråga
                    if (userAnswers[index].includes(answer.text)) {
                        answerText.style.fontWeight = "bold";
                        answerText.style.border = "2px solid yellow";
                    }
                } else if (userAnswers[index] === answer.text) {
                    // Enkelval-fråga
                    answerText.style.fontWeight = "bold";
                    answerText.style.border = "2px solid yellow";
                }
            }

            questionDiv.append(answerText);
        });
        container.append(questionDiv);
    });

    // Spela igen
    let restartBtn = document.createElement("button");
    restartBtn.classList.add("btn");
    restartBtn.innerText = "Spela igen";
    restartBtn.addEventListener("click", () => {
        location.reload();
    });
    container.append(restartBtn);

    }



