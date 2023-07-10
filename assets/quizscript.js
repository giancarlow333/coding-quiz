// Element selectors
var highScoreElt = document.querySelector("#high-score");
var displayElt = document.querySelector("#display");
var quizStartElt = document.querySelector("#start-quiz");
var timerElt = document.querySelector("#countdown");

var yourScore = 0;
var defaultTimeRemaining = 5; // global variable
var currentTimeRemaining = defaultTimeRemaining;
console.log("Starting currentTimeRemaining: ", currentTimeRemaining);

// countdown function
function countdown (seconds, currentTimeRemaining) {
  /* seconds: 
   * addSeconds: 
   */
  var now = new Date().getTime();
  console.log("now: ", now/1000);

  // default case
  if (seconds == currentTimeRemaining) {
    var then = now + seconds * 1000;
    console.log("default time case");
    console.log("then: ", then/1000);
  }
  else {
    var then = now + seconds * 1000 - currentTimeRemaining * 1000;
    console.log("other time case");
    console.log("then: ", then/1000);
  }
  console.log("currentTimeRemaining: ", currentTimeRemaining);
  // print the countdown
  timerElt.textContent = "Time left: " + currentTimeRemaining;
  var timeInterval = setInterval(function () {
    if ((then - now) == 0) {
      clearInterval(timeInterval);
      return;
    }
    seconds--;
    currentTimeRemaining--;
    timerElt.textContent = "Time left: " + seconds;
    then = now + seconds;
    console.log("currentTimeRemaining: ", currentTimeRemaining);
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
    countdown(defaultTimeRemaining, defaultTimeRemaining);
    addQuestion("Commonly used data types DO NOT include: ", "1. strings", "2. booleans", "3. alerts", "4. numbers", false, false, true, false);
}

// Add event listener to the start quiz button
quizStartElt.addEventListener("click", startQuiz);

function addQuestion(qtext, text1, text2, text3, text4, ans1, ans2, ans3, ans4) {
  // Create elements that will hold the question
  var theQuestion = document.createElement("h2");
  var btnElt1 = document.createElement("button");
  var btnElt2 = document.createElement("button");
  var btnElt3 = document.createElement("button");
  var btnElt4 = document.createElement("button");

  // Assign question text to those elements
  theQuestion.textContent = qtext;
  btnElt1.textContent = text1;
  btnElt1.setAttribute("id", "question-1");
  btnElt2.textContent = text2;
  btnElt2.setAttribute("id", "question-2");
  btnElt3.textContent = text3;
  btnElt3.setAttribute("id", "question-3");
  btnElt4.textContent = text4;
  btnElt4.setAttribute("id", "question-4");

  // Add text of the question to the display
  displayElt.appendChild(theQuestion);

  // Add an unordered list showing the possible answers
  var addList = document.createElement("ul");
  var btnList = [ btnElt1, btnElt2, btnElt3, btnElt4 ]
  for (var i = 0; i < 4; i++) {
    var addThis = document.createElement("li");
    addThis.appendChild(btnList[i]);
    addList.appendChild(addThis);
  }
  displayElt.appendChild(addList);

  // Add event listeners for each possible answer
  if (ans1 == true) {
    btnElt1.addEventListener("click", rightAnswerListener);
  }
  else {
    btnElt1.addEventListener("click", wrongAnswerListener);
  }
  if (ans2 == true) {
    btnElt2.addEventListener("click", rightAnswerListener);
  }
  else {
    btnElt2.addEventListener("click", wrongAnswerListener);
  }
  if (ans3 == true) {
    btnElt3.addEventListener("click", rightAnswerListener);
  }
  else {
    btnElt3.addEventListener("click", wrongAnswerListener);
  }
  if (ans4 == true) {
    btnElt4.addEventListener("click", rightAnswerListener);
  }
  else {
    btnElt4.addEventListener("click", wrongAnswerListener);
  }
}

// Event listeners for each possible answer
function rightAnswerListener() {
  var thing = document.createElement("h2");
  thing.textContent = "CORRECT!";
  displayElt.appendChild(thing);
  yourScore += 10;
  var questionTimeout = setTimeout(function () {
    displayElt.textContent = ""; // clear existing content
  }, 1000);
  countdown(10, currentTimeRemaining);
}

function wrongAnswerListener() {
  var thing = document.createElement("h2");
  thing.textContent = "INCORRECT!";
  displayElt.appendChild(thing);
  yourScore -= 10;
  //timeRemaining -= 10;
  //countdown(timeRemaining);
  var questionTimeout = setTimeout(function () {
    displayElt.textContent = ""; // clear existing content
  }, 1000);
}