// Element selectors
var highScoreElt = document.querySelector("#high-score");
var displayElt = document.querySelector("#display");
var quizStartElt = document.querySelector("#start-quiz");
var timerElt = document.querySelector("#countdown");

var yourScore = 0;
var defaultTimeRemaining = 60; // global variable
var currentTimeRemaining = defaultTimeRemaining; // initial value
var timeInterval;
var questionCount = 0;
const maxNumberOfQuestions = 2; // when questionCount equals this, quit all

// countdown function
/* seconds: Seconds in the countdown, i.e. currentTimeRemaining
 * addSeconds: Seconds to add to an EXISTING countdown
 */
function countdown (seconds, addSeconds) {
  // clear existing interval
  if (timeInterval) {
    clearInterval(timeInterval);
    console.log("Interval cleared");
  }

  if (addSeconds != 0) {
    currentTimeRemaining += addSeconds;
  }
  // print the countdown
  timerElt.textContent = "Time left: " + currentTimeRemaining;

  timeInterval = setInterval(function () {
    if (currentTimeRemaining == 0) {
      clearInterval(timeInterval);
      return;
    }
    currentTimeRemaining--;
    timerElt.textContent = "Time left: " + currentTimeRemaining;
  }, 1000);
}

// displayHighScore function
function displayHighScore() {
  displayElt.textContent = ""; // clear existing contents
  var h2 = document.createElement("h2");
  h2.textContent = "High scores";
  displayElt.appendChild(h2);

  var existingScores = JSON.parse(localStorage.getItem("scores"));
  if (!existingScores) {
    h2.textContent = "No scores recorded!";
    displayElt.appendChild(h2);
  }
  var numArr = [];
  for (var i = 0; i < existingScores.length; i++) {
    numArr.push(existingScores[i]["score"]);
    console.log(existingScores[i]["score"]);
  }
  console.log(numArr);
  var maximum = findMaximum(numArr);
  var p1 = document.createElement("p");
  p1.textContent = "The current high score is: " + maximum;
  displayElt.appendChild(p1);

  // display all scores
  var table = document.createElement("table");
  for (var i = 0; i < existingScores.length; i++) {
    var tr = document.createElement("tr");
    var tdInitials = document.createElement("td");
    var tdScore = document.createElement("td");
    var tdTime = document.createElement("td");
    tdInitials.textContent = existingScores[i]["initials"];
    tdScore.textContent = existingScores[i]["score"];
    tdTime.textContent = existingScores[i]["time"];
    tr.appendChild(tdScore);
    tr.appendChild(tdInitials);
    tr.appendChild(tdTime);
    table.appendChild(tr);
  }
  displayElt.appendChild(table);

  // add buttons to go back or clear
  var btnElt1 = document.createElement("button");
  var btnElt2 = document.createElement("button");
  btnElt1.textContent = "Go back";
  btnElt2.textContent = "Clear high scores";
  btnElt1.setAttribute("style", "margin: 5px;");
  btnElt2.setAttribute("style", "margin: 5px;");
  btnElt1.addEventListener("click", displayStartingScreen());
  btnElt2.addEventListener("click", function () {
    localStorage.clear();
  });

  var p2 = document.createElement("p");
  p2.appendChild(btnElt1);
  p2.appendChild(btnElt2);
  displayElt.appendChild(p2);
}

function displayStartingScreen() {
  return;
}

// function courtesy Fabian De La Peña Montero
function findMaximum(numArr) {
  var maxNum = numArr[0];
  for (var i = 1; i < numArr.length; i++) {
    if (numArr[i] > maxNum) {
      maxNum = numArr[i];
    }
  }
  return maxNum;
}

// Add event listener to the high score button
highScoreElt.addEventListener("click", displayHighScore);

// startQuiz function
function startQuiz() {
  displayElt.textContent = ""; // clear existing content
  countdown(defaultTimeRemaining, 0);
  addQuestion(questionArray[questionCount]);
}

// Add event listener to the start quiz button
quizStartElt.addEventListener("click", startQuiz);

function addQuestion(questionObject) {
  // Create elements that will hold the question
  var theQuestion = document.createElement("h2");
  var btnElt1 = document.createElement("button");
  var btnElt2 = document.createElement("button");
  var btnElt3 = document.createElement("button");
  var btnElt4 = document.createElement("button");

  // Assign question text to those elements
  theQuestion.textContent = questionObject.qtext;
  btnElt1.textContent = questionObject.text1;
  btnElt2.textContent = questionObject.text2;
  btnElt3.textContent = questionObject.text3;
  btnElt4.textContent = questionObject.text4;

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
  if (questionObject.ans1 == true) {
    btnElt1.addEventListener("click", rightAnswerListener);
  }
  else {
    btnElt1.addEventListener("click", wrongAnswerListener);
  }
  if (questionObject.ans2 == true) {
    btnElt2.addEventListener("click", rightAnswerListener);
  }
  else {
    btnElt2.addEventListener("click", wrongAnswerListener);
  }
  if (questionObject.ans3 == true) {
    btnElt3.addEventListener("click", rightAnswerListener);
  }
  else {
    btnElt3.addEventListener("click", wrongAnswerListener);
  }
  if (questionObject.ans4 == true) {
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
  setTimeout(function () {
    questionCount += 1;
    clearAndAdvanceQuestion(questionCount);
  }, 1000);
}

function wrongAnswerListener() {
  var thing = document.createElement("h2");
  thing.textContent = "INCORRECT!";
  displayElt.appendChild(thing);
  yourScore -= 10;
  setTimeout(function () {
    // separate function to clear and advance question
    questionCount += 1;
    clearAndAdvanceQuestion(questionCount);
  }, 1000);
  countdown(currentTimeRemaining, -10);
}

function clearAndAdvanceQuestion(questionNumber) {
  // clear the screen
  displayElt.textContent = "";
  if (questionNumber < maxNumberOfQuestions) {
    addQuestion(questionArray[questionNumber]);
  }
  else { // quit
    showFinalScore();
  }
}

// function for summary
function showFinalScore() {
  // clear the screen
  displayElt.textContent = "";

  // Element variables
  var h2 = document.createElement("h2");
  var p1 = document.createElement("p");
  var p2 = document.createElement("p");
  var formElt = document.createElement("form");
  var inputElt = document.createElement("input");
  var labelElt = document.createElement("label");
  var btnElt = document.createElement("button");

  h2.textContent = "All done!";
  displayElt.appendChild(h2);
  p1.textContent = "Your final score is " + yourScore;
  displayElt.appendChild(p1);
  labelElt.textContent = "Enter your initials: ";
  labelElt.setAttribute("for", "initials");
  inputElt.setAttribute("name", "initials");
  inputElt.setAttribute("id", "initials");
  btnElt.textContent = "Submit";
  formElt.addEventListener("submit", submitScore);
  formElt.appendChild(labelElt);
  formElt.appendChild(inputElt);
  formElt.appendChild(btnElt);
  p2.appendChild(formElt);
  displayElt.appendChild(p2);
}

function submitScore(event) {
  event.preventDefault();
  var initials = document.getElementById("initials").value;
  var existingScores = localStorage.getItem("scores");
  /*var score = document.getElementById("initials").value;
  console.log(initials);
  if (!score || ) 
  localStorage.setItem("score", yourScore);
  localStorage.setItem("user", initials);
  localStorage.setItem("time", Date());*/

  var currentTime = Date();
  var storeThis = {
    "initials": initials,
    "score": yourScore,
    "time": currentTime
  };
  
  if (!existingScores) {
    var storeArray = [];
    storeArray.push(storeThis);
    localStorage.setItem("scores", JSON.stringify(storeArray));
  }
  else {
    var theScores = JSON.parse(existingScores);
    theScores.push(storeThis);
    localStorage.setItem("scores", JSON.stringify(theScores));
  }
  displayAfterScoreSubmitted();
}

function displayAfterScoreSubmitted() {
  var h3 = document.createElement("h3");
  h3.textContent = "Your score has been submitted!";
  displayElt.appendChild(h3);
}

// Question Objects
const firstQuestion = {
  qtext: "Commonly used data types DO NOT include: ", 
  text1: "1. strings", 
  text2: "2. booleans", 
  text3: "3. alerts", 
  text4: "4. numbers", 
  ans1: false, 
  ans2: false, 
  ans3: true, 
  ans4: false
};
const secondQuestion = {
  qtext: "The condition in an if/else statement is enclosed within: ", 
  text1: "1. quotes", 
  text2: "2. curly brackets", 
  text3: "3. parentheses", 
  text4: "4. square brackets", 
  ans1: false, 
  ans2: false, 
  ans3: true, 
  ans4: false
};

const questionArray = [ firstQuestion, secondQuestion ];
