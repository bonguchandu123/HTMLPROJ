
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Text Markdown Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Sheets", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Syntax", correct: false },
    ],
  },
  {
    question: "Which tag is used to link a CSS file in HTML?",
    answers: [
      { text: "<style>", correct: false },
      { text: "<css>", correct: false },
      { text: "<link>", correct: true },
      { text: "<script>", correct: false },
    ],
  },
  {
    question: "Which property is used in CSS to change text color?",
    answers: [
      { text: "text-color", correct: false },
      { text: "font-color", correct: false },
      { text: "color", correct: true },
      { text: "background-color", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to insert an image?",
    answers: [
      { text: "<image>", correct: false },
      { text: "<img>", correct: true },
      { text: "<pic>", correct: false },
      { text: "<src>", correct: false },
    ],
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Management", correct: false },
      { text: "Document Order Mode", correct: false },
      { text: "Digital Object Method", correct: false },
    ],
  },
  {
    question: "Which language is used to add interactivity to websites?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
      { text: "JavaScript", correct: true },
      { text: "SQL", correct: false },
    ],
  },
  {
    question: "Which of the following is a JavaScript framework?",
    answers: [
      { text: "Bootstrap", correct: false },
      { text: "React", correct: true },
      { text: "HTML5", correct: false },
      { text: "Sass", correct: false },
    ],
  },
  {
    question: "Which HTTP method is used to fetch data?",
    answers: [
      { text: "POST", correct: false },
      { text: "GET", correct: true },
      { text: "PUT", correct: false },
      { text: "DELETE", correct: false },
    ],
  },
  {
    question: "What is the default port for HTTP?",
    answers: [
      { text: "3000", correct: false },
      { text: "443", correct: false },
      { text: "21", correct: false },
      { text: "80", correct: true },
    ],
  },
  {
    question: "Which of the following is used for version control?",
    answers: [
      { text: "Docker", correct: false },
      { text: "Git", correct: true },
      { text: "Figma", correct: false },
      { text: "Node.js", correct: false },
    ],
  },
  {
    question: "Which tag is used for creating a hyperlink in HTML?",
    answers: [
      { text: "<link>", correct: false },
      { text: "<href>", correct: false },
      { text: "<a>", correct: true },
      { text: "<url>", correct: false },
    ],
  },
  {
    question: "Which tool is commonly used to inspect and debug websites?",
    answers: [
      { text: "Chrome DevTools", correct: true },
      { text: "Photoshop", correct: false },
      { text: "Node Inspector", correct: false },
      { text: "Figma", correct: false },
    ],
  },
  {
    question: "Which CSS property controls the size of text?",
    answers: [
      { text: "text-size", correct: false },
      { text: "font-size", correct: true },
      { text: "size", correct: false },
      { text: "text-style", correct: false },
    ],
  },
  {
    question: "What does API stand for?",
    answers: [
      { text: "Application Programming Interface", correct: true },
      { text: "Application Program Interaction", correct: false },
      { text: "Advanced Programming Index", correct: false },
      { text: "Abstract Protocol Interface", correct: false },
    ],
  },
  {
    question: "Which tag is used to add JavaScript in HTML?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<code>", correct: false },
    ],
  },
  {
    question: "Which database is a NoSQL database?",
    answers: [
      { text: "MySQL", correct: false },
      { text: "PostgreSQL", correct: false },
      { text: "MongoDB", correct: true },
      { text: "Oracle", correct: false },
    ],
  },
  {
    question: "Which layout system is one-dimensional in CSS?",
    answers: [
      { text: "Grid", correct: false },
      { text: "Flexbox", correct: true },
      { text: "Float", correct: false },
      { text: "Table", correct: false },
    ],
  },
  {
    question: "Which is the package manager for Node.js?",
    answers: [
      { text: "npm", correct: true },
      { text: "npx", correct: false },
      { text: "node", correct: false },
      { text: "nodemon", correct: false },
    ],
  },
  {
    question: "Which tag defines a heading in HTML?",
    answers: [
      { text: "<head>", correct: false },
      { text: "<heading>", correct: false },
      { text: "<h1> to <h6>", correct: true },
      { text: "<title>", correct: false },
    ],
  }
];


// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}