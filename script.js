const questions = [
    {
        question: "Which of the following is a programming language?",
        answer: [
            { text: "English", correct: false},
            { text: "Python", correct: true},
            { text: "Hindi", correct: false},
            { text: "French", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answer: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    },
    {
        question: "What is the national animal of India?",
        answer: [
            { text: "Cat", correct: false},
            { text: "Lion", correct: false},
            { text: "Tiger", correct: true},
            { text: "Bear", correct: false},
        ]
    },
    {
        question: "Ayodhya is located in which state of India?",
        answer: [
            { text: "Goa", correct: false},
            { text: "Delhi", correct: false},
            { text: "Uttar Pradesh", correct: true},
            { text: "Bihar", correct: false},
        ]
    },
    {
        question: "Who was the first president of India?",
        answer: [
            { text: "Mahatma Gandhi", correct: false},
            { text: "Sarojini Nayudu", correct: false},
            { text: "Lal Bahadur Shastri", correct: false},
            { text: "Dr. Rajendra Prasad", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn"); 
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML  = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();