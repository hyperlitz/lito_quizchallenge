document.addEventListener('DOMContentLoaded', function() {
  const quizQuestions = [
{
question: "What is the capital of France?",
choices: ["Paris", "London", "Rome", "Berlin"],
answer: "Paris"
},
{
question: "Which programming language is often used for web development?",
choices: ["JavaScript", "Python", "Ruby", "PHP"],
answer: "JavaScript"
},
{
question: "What is the largest planet in our solar system?",
choices: ["Jupiter", "Saturn", "Neptune", "Earth"],
answer: "Jupiter"
},
{
question: "Which country is known as the 'Land of the Rising Sun'?",
choices: ["Japan", "China", "India", "South Korea"],
answer: "Japan"
},
{
question: "Which is the longest river in the world?",
choices: ["Nile", "Amazon", "Yangtze", "Mississippi"],
answer: "Nile"
},
{
question: "Who is the author of the book 'To Kill a Mockingbird'?",
choices: ["Harper Lee", "Mark Twain", "J.K. Rowling", "George Orwell"],
answer: "Harper Lee"
},
{
question: "What is the chemical symbol for the element Iron?",
choices: ["Fe", "Au", "Ag", "Cu"],
answer: "Fe"
},
{
question: "Which city hosted the 2016 Summer Olympics?",
choices: ["Rio de Janeiro", "London", "Beijing", "Tokyo"],
answer: "Rio de Janeiro"
},
{
question: "Who painted the famous artwork 'The Starry Night'?",
choices: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
answer: "Vincent van Gogh"
},
{
question: "What is the largest ocean on Earth?",
choices: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
answer: "Pacific Ocean"
},
{
question: "What does HTML stand for?",
choices: ["Hypertext Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language", "Hypertext Machine Language"],
answer: "Hypertext Markup Language"
},
{
question: "Which CSS property is used to change the background color of an element?",
choices: ["background-color", "color", "font-size", "margin"],
answer: "background-color"
},
{
question: "Which JavaScript framework is commonly used for building single-page applications?",
choices: ["React", "Angular", "Vue", "Ember"],
answer: "React"
},
{
question: "What is the purpose of a CSS flexbox?",
choices: ["To create flexible layouts", "To add animations", "To manipulate the DOM", "To fetch data from an API"],
answer: "To create flexible layouts"
},
{
question: "What does API stand for in web development?",
choices: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Application Process Interface"],
answer: "Application Programming Interface"
},
{
question: "What is the box model in CSS?",
choices: ["A layout model that consists of content, padding, border, and margin", "A method for organizing code into reusable components", "A technique for positioning elements on a web page", "A set of rules for naming HTML elements"],
answer: "A layout model that consists of content, padding, border, and margin"
},
{
question: "What is the purpose of the <canvas> element in HTML5?",
choices: ["To draw graphics and animations using JavaScript", "To embed video and audio content", "To create forms for user input", "To define the structure and layout of a web page"],
answer: "To draw graphics and animations using JavaScript"
},
{
question: "What is the difference between margin and padding in CSS?",
choices: ["Margin is the space outside an element, while padding is the space inside an element", "Margin adds space between elements, while padding adds space within an element", "Margin sets the background color of an element, while padding adjusts its size", "Margin defines the border of an element, while padding defines its content"],
answer: "Margin is the space outside an element, while padding is the space inside an element"
},
{
question: "What is a responsive web design?",
choices: ["A design approach that ensures websites work well on different devices and screen sizes", "A technique for optimizing website performance", "A method for securing web applications from attacks", "A framework for building interactive user interfaces"],
answer: "A design approach that ensures websites work well on different devices and screen sizes"
},
{
question: "What is the purpose of a CSS preprocessor?",
choices: ["To extend the functionality of CSS with features like variables and mixins", "To generate HTML code from CSS styles", "To optimize the loading speed of CSS files", "To convert CSS code into JavaScript"],
answer: "To extend the functionality of CSS with features like variables and mixins"
},
{
question: "What is the difference between GET and POST HTTP methods?",
choices: ["GET is used for retrieving data, while POST is used for submitting data", "GET is more secure than POST", "GET is faster than POST", "GET can only be used for small amounts of data"],
answer: "GET is used for retrieving data, while POST is used for submitting data"
}
];

  let highScores = [];
  let currentQuestionIndex = 0;
  let timer;
  let timeLeft = 150;  
  let score = 0;
  
  const timerEl = document.getElementById("timer");
  const questionNumEl = document.getElementById("question-num");
  const questionStatementEl = document.getElementById("question-statement");
  const choicesListEl = document.getElementById("choices");
  const submitBtn = document.getElementById("submit-btn");
  const finalScoreEl = document.getElementById("final-score");
  const initialsForm = document.getElementById("initials-form");
  const initialsInput = document.getElementById("initials");
  const scoreSectionEl = document.getElementById("score-section");
  const selectedQuestions = quizQuestions.slice(0, 10);

  quizQuestions.length = 0;
  quizQuestions.push(...selectedQuestions);



  function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

quizQuestions.forEach((question) => {
  shuffleArray(question.choices);
});


  function shuffleQuestions() {
    for (let i = quizQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]];
    }
  }

  function startQuiz() {
    shuffleQuestions(); 
    document.getElementById("quiz-section").classList.remove("hide");


    timer = setInterval(function () {
      timeLeft--;
      timerEl.textContent = timeLeft;

      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);

 
    displayQuestion();
  }


  function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionNumEl.textContent = currentQuestionIndex + 1;
    questionStatementEl.textContent = currentQuestion.question;
    choicesListEl.innerHTML = "";


    for (let i = 0; i < currentQuestion.choices.length; i++) {
      const choice = currentQuestion.choices[i];
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = choice;
      button.classList.add("choice-btn"); 
      li.appendChild(button);
      choicesListEl.appendChild(li);
    }
  }

  function checkAnswer(event) {
    if (event.target.classList.contains("choice-btn")) {
      const selectedChoice = event.target.textContent;
      const currentQuestion = quizQuestions[currentQuestionIndex];

      if (selectedChoice === currentQuestion.answer) {
        score++;
      } else {
        timeLeft -= 1; 
        if (timeLeft < 0) {
          timeLeft = 0;
        }
        timerEl.textContent = timeLeft;
      }

      const scoreMsg = selectedChoice === currentQuestion.answer ? "Correct!" : "Wrong!";
      const totalScoreMsg = `Score: ${score}/${currentQuestionIndex + 1}`;
      alert(`${scoreMsg}\n${totalScoreMsg}`);

      currentQuestionIndex++;

      if (currentQuestionIndex === quizQuestions.length || timeLeft <= 0) {
        endQuiz();
      } else {
        displayQuestion();
      }
    }
  }


  function displayScore() {
    clearInterval(timer);
    document.getElementById("quiz-section").classList.add("hide");
    scoreSectionEl.style.display = "block";
    finalScoreEl.textContent = score;
    const initials = initialsInput.value;
    
    
    const highScoresList = document.getElementById("high-scores-list");
    const scoreItem = document.createElement("li");
    scoreItem.textContent = `${initials}: ${score}`;
    highScoresList.appendChild(scoreItem);
  }

  
  function endQuiz() {
    clearInterval(timer);
    document.getElementById("quiz-section").classList.add("hide");
    scoreSectionEl.style.display = "block";
    displayScore();
    finalScoreEl.textContent = score;
  }

  function saveHighScore(initials, score) {
    highScores.push({ initials, score });
  }

 
  function saveScore(event) {
event.preventDefault();

const initials = initialsInput.value.trim();
if (initials !== "") {

saveHighScore(initials, score);


localStorage.setItem("highScores", JSON.stringify(highScores));


const previousScore = localStorage.getItem("score");
const previousInitials = localStorage.getItem("initials");


if (!previousScore || score > parseInt(previousScore)) {
  
  localStorage.setItem("score", score);
  localStorage.setItem("initials", initials);
}


currentQuestionIndex = 0;
timeLeft = 150; 
score = 0;
timerEl.textContent = timeLeft;
initialsForm.reset();
scoreSectionEl.classList.add("hide");
scoreSectionEl.style.display = "none";
document.getElementById("quiz-section").classList.remove("hide");


shuffleQuestions();


displayQuestion();


updateHighScoresDisplay();
}
}

function updateHighScoresDisplay() {
const highScoresList = document.getElementById("high-scores-list");
highScoresList.innerHTML = "";


const storedHighScores = localStorage.getItem("highScores");
if (storedHighScores) {
const parsedHighScores = JSON.parse(storedHighScores);


const sortedHighScores = parsedHighScores.sort((a, b) => b.score - a.score);


sortedHighScores.forEach((highScore) => {
  const scoreItem = document.createElement("li");
  scoreItem.textContent = `${highScore.initials}: ${highScore.score}`;
  highScoresList.appendChild(scoreItem);
});
}
}

 
  choicesListEl.addEventListener("click", checkAnswer);
  initialsForm.addEventListener("submit", saveScore);

  updateHighScoresDisplay();
  
  startQuiz();


  const clearScoresBtn = document.getElementById("clear-scores-btn");
  clearScoresBtn.addEventListener("click", clearHighScores);
});


function clearHighScores() {
  const confirmed = confirm("Are you sure you want to clear the high scores?");

  if (confirmed) {
    highScores = [];
    localStorage.removeItem("highScores");
    updateHighScoresDisplay();
    document.getElementById("high-scores-section").style.display = "none";
    document.getElementById("toggle-high-scores-btn").textContent = "Show High Scores";
  }
}


function updateHighScoresDisplay() {
  const highScoresList = document.getElementById("high-scores-list");
  highScoresList.innerHTML = "";

 
  const storedHighScores = localStorage.getItem("highScores");
  if (storedHighScores) {
    const parsedHighScores = JSON.parse(storedHighScores);

   
    const sortedHighScores = parsedHighScores.sort((a, b) => b.score - a.score);

    
    sortedHighScores.forEach((highScore) => {
      const scoreItem = document.createElement("li");
      scoreItem.textContent = `${highScore.initials}: ${highScore.score}`;
      highScoresList.appendChild(scoreItem);
    });
  }
}

function toggleHighScores() {
  const highScoresSection = document.getElementById("high-scores-section");
  const toggleButton = document.getElementById("toggle-high-scores-btn");

  if (highScoresSection.style.display === "none") {
    highScoresSection.style.display = "block";
    toggleButton.textContent = "Hide High Scores";
    toggleButton.classList.add("show-scores");
  } else {
    highScoresSection.style.display = "none";
    toggleButton.textContent = "Show High Scores";
    toggleButton.classList.remove("show-scores");
  }
}