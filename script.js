const questions = [
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<style>", "<css>", "<script>", "<link>"],
        answer: "<style>"
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: ["bgcolor", "color", "background-color", "bg-color"],
        answer: "background-color"
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Color Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which HTML attribute is used to define the style for an element?",
        options: ["style", "class", "id", "href"],
        answer: "style"
    },
    {
        question: "Which JavaScript method is used to select an element by its ID?",
        options: ["getElementById()", "querySelector()", "getElementByClass()", "getElementsByTagName()"],
        answer: "getElementById()"
    },
    {
        question: "Which tag is used to define a hyperlink in HTML?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        answer: "<a>"
    },
    {
        question: "Which of the following is a JavaScript data type?",
        options: ["Number", "String", "Boolean", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Which of these is a valid way to create a comment in JavaScript?",
        options: ["// This is a comment", "/* This is a comment */", "<!-- This is a comment -->", "/* This is a comment"],
        answer: "// This is a comment"
    },
    {
        question: "What does the acronym 'DOM' stand for in web development?",
        options: ["Document Object Model", "Dynamic Object Model", "Data Object Model", "Document Online Management"],
        answer: "Document Object Model"
    },
    {
        question: "Which tag is used to display an image in HTML?",
        options: ["<img>", "<picture>", "<image>", "<src>"],
        answer: "<img>"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10; // 10 seconds per question

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ""; // Clear previous options

    questionData.options.forEach(option => {
        const optionBtn = document.createElement("button");
        optionBtn.textContent = option;
        optionBtn.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(optionBtn);
    });

    // Enable next button
    document.getElementById("next-btn").disabled = true;
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
        score++;
    }

    // Disable all options after selection
    const options = document.querySelectorAll("#options-container button");
    options.forEach(option => option.disabled = true);

    // Enable next button
    document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        clearInterval(timer); // Stop timer
        showFinalScore();
    } else {
        loadQuestion();
        resetTimer();
    }
}

function startTimer() {
    // Clear any existing timer before starting a new one
    if (timer) {
        clearInterval(timer);
    }

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer); // Stop timer
            nextQuestion(); // Go to next question automatically when time is up
        }
    }, 1000);
}

function resetTimer() {
    timeLeft = 10; // Reset timer to 10 seconds for each question
    document.getElementById("time").textContent = timeLeft;
    startTimer();
}

function showFinalScore() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("score-container").style.display = "block";
    document.getElementById("score").textContent = score;

    // Hide the timer display
    document.getElementById("time").style.display = "none";
}

window.onload = function() {
    loadQuestion();
    startTimer();
};
