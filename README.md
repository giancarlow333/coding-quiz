# Javascript Coding Quiz

This app is a timed coding quiz with multiple-choice questions. This app will run in the browser and features dynamically updated HTML and CSS powered by JavaScript code that I have written.

## Functionality

The basic logic of the app is as follows:

```
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

Note that, as currently setup:

* Each question is worth ten points.
* You are given ten seconds to answer each question.
* Each wrong answer deducts ten points from your score and ten seconds from your time to answer subsequent questions.

You can change these in the [quizscript.js file](./assets/quizscript.js) at the very top.  For example, for a ten question quiz where each question is worth three points and you get five seconds per question:

```
const maxNumberOfQuestions = 10;
const secondsPerQuestion = 5;
const pointsPerQuestion = 3;
```

## Mock-Up

The below gif shows the basic functionality of the app:

![An animation showing, in sequence, the starting screen, a question, the final score form, and the list of high scores](./assets/mockup.gif)

## Deployed Application

You can find a live version of the app [here](https://giancarlow333.github.io/coding-quiz/).

## Sources

Non-original code in this project:

 * I consulted [this StackOverflow thread](https://stackoverflow.com/questions/59408241/how-to-stop-a-running-countdown-timer) on modifying an existing countdown while it's running.  In particular, user Ajay's code made me realize I needed to place the timeInterval variable as a global variable.
 * I also consulted [this freeCodeCamp.Org thread](https://www.freecodecamp.org/news/how-to-submit-a-form-with-javascript/) about using JavaScript to submit forms.
 * I consulted [this StackOverflow thread](https://stackoverflow.com/questions/35963412/append-data-to-localstorage-object) (particularly the answer by Dimitris Karagiannis) on how to append items to an object already existing in localStorage.
 * The findMaximum() function is via [Fabian De La Peña Montero](http://fdlpm.com).

---
Written by Giancarlo Whitaker, 2023