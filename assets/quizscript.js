// Element selectors
var highScoreElt = document.querySelector("#high-score");
var displayElt = document.querySelector("#display");

// displayHighScore function
function displayHighScore() {
    displayElt.textContent = ""; // clear existing content
    var h2 = document.createElement("h2");
    h2.textContent = "The high score is 99";
    displayElt.appendChild(h2);
}

// Add event listener to the high score button
highScoreElt.addEventListener("click", displayHighScore);