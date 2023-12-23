window.onload = function(){
    if(localStorage.getItem("stageChance") === null){
        localStorage.setItem("stageChance",0.15);
    }
    if(localStorage.getItem("stage") === null){
        localStorage.setItem("stage",0);
    }
}

//this function checks if the user will advance to the next stage based or have to keep moving through the maze
//the stageChance is increased with every failure to ensure the player doesnt take too long to advance
//the maze is randomized to ensure the player cannot simply memorize a path, each playthrough is different
function advanceCheck(){
    let temp = parseFloat(localStorage.stageChance) * 100;
    let check = Math.random() * 100;
    console.log(check);
    if(check <= temp){
        localStorage.stage = parseFloat(localStorage.stage) + 1;
        nextStage(parseFloat(localStorage.stage));
    }
    else{
        localStorage.stageChance = parseFloat(localStorage.stageChance) + .1;
        location.href = "maze.html";
    }
}
//this function resets stageChance and then based on the variable stage picks the next stage in the story
function nextStage(x){
    localStorage.stageChance = 0.15;
    switch(x){
        case 1:
            location.href = "three.html";
            break;
        case 2:
            location.href = "four.html";
            break;
        case 3:
            location.href = "five.html";
            break;
    }
}

//dialogue functions
function aboutChallenge01(){
    let answer = document.getElementById("answer");
    answer.innerHTML = '"To pass my challenge you must avoid one hundred rectangles. If you touch any one of them you will be destroyed."';
}

function aboutOthers(){
    let answer = document.getElementById("answer");
    answer.innerHTML = '"I do not know who the other administrators are. I only know that there are two more of them."';
}
function aboutChallenge02(){
    let answer = document.getElementById("answer");
    answer.innerHTML = '"For our challenge you must navigate our double trouble bubbles! Fail and you will PERISHHHHHHHH"';
}
function aboutFinal(){
    let answer = document.getElementById("answer");
    answer.innerHTML = '"We don\'t know... but we hear they are fearsome and unbeatable. Not that you\'ll ever get to see them. No one has beaten us either!"';
}
function aboutChallenge03(){
    let answer = document.getElementById("answer");
    answer.innerHTML = '"I am the only administrator who can use objects from the third dimension. For my challenge you must survive an onslaught of spheres, though since you are only two dimensional they will appear as circles growing and then shrinking in size."'
}
function aboutEnd(){
    let answer = document.getElementById("answer");
    answer.innerHTML = '"At the end of this maze is a portal. Enter it and you will transform."'
}