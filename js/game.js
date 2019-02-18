var counter = 15;
var userChoice;
var gameTimer;

var questionArray = [
"What instrument keeps the beat of a song?",
"Which band wrote the song Stairway To Heaven?",
"Which genre of music is known for heavy riffs and fast paced songs?",
"How does one become better at playing an instrument?",
"Which band wrote the song Comfortably Numb?"];

var answerArray = [
    ['guitar', 'drums', 'keyboard', 'bass'],
    ['van halen', 'boston', 'led zeppelin', 'twisted sister'],
    ['rock', 'pop', 'jazz', 'metal'],
    ['be naturally good', 'theres no way', 'practice, practice', 'fake it till you make it'],
    ['pink floyd','motley crew', 'black sabbath', 'metallica']
];

var correctAnswers = [
    "drums",
    "led zeppelin",
    "metal",
    "practice, practice",
    "pink floyd"];

var internalCounter = 0;
var correctAnswerCounter = 0;
var wrongAnswerCounter = 0;
var timeOuts = 0;
var fartNoise = new Audio("sound/fart.mp3");

function createGame() { // creates the game's HTML and populate the questions which are held in an array
                        
    hideGameMessages();
    $("#question-here").html(questionArray[internalCounter]);
    $("#first-a").html(answerArray[internalCounter][0]);
    $("#second-a").html(answerArray[internalCounter][1]);
    $("#third-a").html(answerArray[internalCounter][2]);
    $("#fourth-a").html(answerArray[internalCounter][3]);
    showQuestions();
}

function timerCounter() {
    gameTimer = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(gameTimer);
            timeOutLoss();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function gameTracker() {           // internal tracker that keeps track of total questions asked/passed/failed, 
    if (internalCounter < 4) {    
        internalCounter++;
        counter = 15;
        createGame();
        timerCounter();
    } else {
        gameOverScreen();
    }
}

$("#user-question-area").hide(); 
$("#user-timeover-area").hide(); 
$("#user-gameover-area").hide(); 
$("#user-wronganswer-area").hide(); 
$("#user-correctanswer-area").hide();  

$(document).ready(function () {

    $("body").on("click", ".start-button", function (event) {

        fartNoise.play();  // Plays a beautiful fart noise
        hideStartGameButton();
        createGame();
        timerCounter();

    }); 

    $("body").on("click", ".answer", function (event) {
        
        fartNoise.play();
        userChoice = $(this).text();
        console.log(userChoice);
        console.log(correctAnswers[internalCounter])
        if (userChoice === correctAnswers[internalCounter]) {
            clearInterval(gameTimer);
            userWins();
        } else {
            clearInterval(gameTimer);
            userLoses();
        }
    }); 

    $("body").on("click", ".reset-button", function (event) {
        fartNoise.play();
        resetGame();
    }); 

}); 

// runs whenever the user runs out of time
function timeOutLoss() {    
    timeOuts++;
    showGameMessages();
    showTimeOver();
    setTimeout(gameTracker, 3000); 
}

// runs when the user chooses the right answer
function userWins() {       
    correctAnswerCounter++;
    showGameMessages();
    showCorrectAnswer();
    setTimeout(gameTracker, 3000); 
}

// runs when the user chooses the wrong answer
function userLoses() {      
    wrongAnswerCounter++;
    showGameMessages();
    showWrongAnswer();
    setTimeout(gameTracker, 3000); 
}

function gameOverScreen() {
    hideGameMessages();
    showGameOver();
}

// resets all counters to 0, resets questions, hides Game Over screen
function resetGame() {      
    internalCounter = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    timeOuts = 0;
    counter = 15;
    createGame();
    timerCounter();
    hideGameOver();
}

// Functions for making the code cleaner

function hideQuestions() {
    $("#user-question-area").hide();
}

function showQuestions() {
    $("#user-question-area").show();
}

function hideTimeOver() {
    $("#user-timeover-area").hide();
}

function showTimeOver() {
    $("#user-timeover-area").show();
}

function hideWrongAnswer() {
    $("#user-wronganswer-area").hide();
}

function showWrongAnswer() {
    $("#user-wronganswer-area").show();
}

function hideCorrectAnswer() {
    $("#user-correctanswer-area").hide();
}

function showCorrectAnswer() {
    $("#user-correctanswer-area").show();
}

function hideGameOver() {
    $("#user-gameover-area").hide();
}

function showGameOver() {
    $("#user-gameover-area").show();
    $('#user-correct-total').html(correctAnswerCounter);
    $('#user-wrong-total').html(wrongAnswerCounter);
    $('#user-timeout-total').html(timeOuts);
}

function hideGameMessages() {
    hideTimeOver();
    hideCorrectAnswer();
    hideWrongAnswer();
}

function showGameMessages() {
    $(".timer").html(counter);
    correctAnswerIs();
    hideQuestions();
}

function hideStartGameButton() {
    $(".intro-screen").hide();
}

function correctAnswerIs() {
    $('.correct-answer').html(correctAnswers[internalCounter]);
}