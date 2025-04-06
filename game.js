let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    $("body").addClass("dark-mode").removeClass("light-mode");
    $("#themeToggle").text("☀️ Light Mode");
} else {
    $("body").addClass("light-mode").removeClass("dark-mode");
    $("#themeToggle").text("🌙 Dark Mode");
}


buttoncolors=["red","green","blue","yellow"];
userClickedPattern=[]
gamepattern=[];
var level=0;
let started=false;
$("#themeToggle").click(function () {
    $("body").toggleClass("dark-mode light-mode");

    if ($("body").hasClass("dark-mode")) {
        $("#themeToggle").text("☀️ Light Mode");
        localStorage.setItem("theme", "dark"); // ✅ Corrected here
    } else {
        $("#themeToggle").text("🌙 Dark Mode");
        localStorage.setItem("theme", "light"); // ✅ Corrected here
    }
});


function startover(){
    level=0;
    gamepattern=[];
    started=false;
}
function playSound(r){
    var audio=new Audio("./sounds/"+r+".mp3");
audio.play();
}
function animationplay(a){
    $("."+a).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}
function checkans(current_level){
    if(userClickedPattern[current_level]===gamepattern[current_level]){
        console.log("success");
        if(userClickedPattern.length==gamepattern.length){
            setTimeout(nextsequence,1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){ $("body").removeClass("game-over");},2000);
        $("h1").text("Game Over, Press Any Key to Restart.")
        startover();
        console.log("wrong");
    }
}
$(".btn").click((t)=>{
    let id=$(t.target).attr("id");
    userClickedPattern.push(id);
    $("#"+id).addClass("pressed");
    setTimeout(function(){$("#"+id).removeClass("pressed"); },100);
    playSound(id);
    checkans(userClickedPattern.length-1);
    console.log(userClickedPattern);
})
function nextsequence(){
    userClickedPattern=[];
    level++;
    var randomNumber=Math.floor(Math.random()*4);
$("h1").text("level:"+ level);
var randomChosenColor=buttoncolors[randomNumber]
gamepattern.push(randomChosenColor);
animationplay(randomChosenColor)
playSound(randomChosenColor);
}
$(document).keydown((event)=>{
    if(!started){
nextsequence();
started=true;
}
});
