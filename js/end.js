let head, angle=0;

function preload(){
    //loads the model, can't tell if the smile is creepy or not
    head = loadModel('../images/head.obj');
}


function setup(){
    let myWidth = windowWidth/1.3;
    let myHeight = windowHeight/1;
    createCanvas(myWidth,myHeight, WEBGL);
    //enters WEBGL mode which is required to display anything 3D
    rectMode(CENTER);
}
function draw(){
    clear();
    scale(5.5);
    //scales the model up
    directionalLight(255,255,255,0,0,1);
    //not exactly sure what this does but without it the model's surface is bright white
    translate(0,-50,0)
    //moves model to center
    rotateY(angle*1.3);
    //rotates model based on the angle
    stroke('#03A062')
    //sets stroke to green
    model(head);
    //draws model with green wireframe
    angle += 0.004;
    //increases angle so the model appears to rotate
}
