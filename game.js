let buttonColours = ["red", "blue", "green", "yellow"];

// what game is demanding
let gamePattern = [];

// what user is clicking
let userClickedPattern = [];

// press a key to start the game
let level = 0
let started = false;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    }
})

// make user to click
$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.indexOf(userChosenColour))
})





// FUNTIONS

// increase the level, choose color, amke it blink and play sound
function nextSequence() { 
    level++;
    $("#level-title").text("Level " + level)
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    let activeButton = $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        activeButton.removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) { // index of user input 
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            
            userClickedPattern = [];
            // Call for nextSequence
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else { 
        $("body").addClass("game-over");
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart")
        setTimeout(function() {
            $("body").removeClass("game-over"); 
        }, 200);
        startOver();
     }

     function startOver() {
         level = 0;
         gamePattern = [];
         userClickedPattern = [];
         started = false;
     }
}