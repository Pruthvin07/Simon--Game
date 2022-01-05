buttonColour = ["red","blue","green","yellow"];
gamePattern =[];
userClickPattern=[];
var level = 0;
var started  = false;

$(document).keydown(function(){
    if(!started){
    $("h1").text("Level " +level);
    nextSequence();
    started=true;
}})

$(document).click(function(){
    if(!started){
    $("h1").text("Level " +level);
    nextSequence();
    started=true;
}})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length-1);
});



function nextSequence(){
    userClickPattern = [];
    level++;
    $("h1").text("Level " +level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
   
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3") 
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickPattern[currentLevel])
    {
    console.log("success");

        if (userClickPattern.length === gamePattern.length)
        {
         setTimeout(function () 
         {
             nextSequence();
         }, 1000);
        }


    }

    else{
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3") 
         audio.play();
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

          $("h1").text("Game-Over,Press key to Restart")
          startOver();
    }

}

function startOver(){
    level=0;
    gamePattern=[];
    started=0;
}