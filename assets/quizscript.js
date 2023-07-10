// Element selectors
var highScoreElt = document.querySelector("#high-score");
var displayElt = document.querySelector("#display");
var quizStartElt = document.querySelector("#start-quiz");
var timerElt = document.querySelector("#countdown");

// countdown function
function countdown (timeLeft) {
    var timeInterval = setInterval(function () {
        // print the countdown
        timerElt.textContent = "Time left: " + timeLeft;
    
        if (timeLeft == 0) {
          clearInterval(timeInterval);
          displayResults();
        }
    
        timeLeft--;
      }, 1000);
}

// displayHighScore function
function displayHighScore() {
    displayElt.textContent = ""; // clear existing content
    var h2 = document.createElement("h2");
    h2.textContent = "The high score is 99";
    displayElt.appendChild(h2);
}

// Add event listener to the high score button
highScoreElt.addEventListener("click", displayHighScore);

// startQuiz function
function startQuiz() {
    displayElt.textContent = ""; // clear existing content
    countdown(60);
    addQuestion("Commonly used data types DO NOT include: ", "1. strings", "2. booleans", "3. alerts", "4. numbers");
}

// Add event listener to the start quiz button
quizStartElt.addEventListener("click", startQuiz);

function addQuestion(qtext, text1, text2, text3, text4) {
  displayElt.textContent = ""; // clear existing content
  var theQuestion = document.createElement("h2");
  var btnElt1 = document.createElement("button");
  var btnElt2 = document.createElement("button");
  var btnElt3 = document.createElement("button");
  var btnElt4 = document.createElement("button");

  theQuestion.textContent = qtext;
  btnElt1.textContent = text1;
  btnElt2.textContent = text2;
  btnElt3.textContent = text3;
  btnElt4.textContent = text4;

  displayElt.appendChild(theQuestion);

  var addList = document.createElement("ul");
  var toAdd = [ btnElt1, btnElt2, btnElt3, btnElt4 ]
  for (var i = 0; i < 4; i++) {
    var addThis = document.createElement("li");
    addThis.appendChild(toAdd[i]);
    addList.appendChild(addThis);
  }
  displayElt.appendChild(addList);
}