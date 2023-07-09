// Element selectors
var highScoreElt = document.querySelector("#high-score");
var displayElt = document.querySelector("#display");

// displayHighScore function
function displayHighScore() {
    displayElt.appendChild("<h2>The high score is 99</h2>");
}

// Add event listener to the high score button
highScoreElt.addEventListener("click", displayHighScore());