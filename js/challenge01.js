let trail = [], trailLength = 100;
let obstacles = [], counter = 0;

function setup(){
    let myWidth = windowWidth/1.3;
    let myHeight = windowHeight/1.3;
    createCanvas(myWidth,myHeight);
    noStroke();
    angleMode(DEGREES);
    rectMode(CENTER);
    for(let i = 0; i<15;i++){
    //creates the first 15 rectangle obstacles
        obstacles[i] = new obstacle();
    }
}
function draw(){
    background(30);
    for(let squares of trail){
    //draws the trail of squares that follow the cursor and checks if they need to be deleted
        squares.show();
        squares.checkDelete();
    }
    for(let obs of obstacles){
        //draws each rectangle and checks if they are touching the  mouse
        obs.move();
        obs.show();
        obs.check();
    }
}

function mouseMoved(){
    //adds to the trail when the mouse is moved, if the trail is longer than the specified length 
    //the last square is deleted to make room
    let newSquare = new particle(mouseX,mouseY);
    if(trail.length<=trailLength){
        trail.push(newSquare);
    }
    else{
        trail.splice(0,1);
    }
}




class obstacle{
    //class for the rectangle obstacles
    //random width with a uniform width:height ratio
    //random speed that increases as more rectangles are created
    constructor(){
        this.width = random(40,200);
        this.height = this.width*.7;
        this.x = width+this.width;
        this.y = random(height-this.height);
        this.speed = random(2,6)+counter/10;
    }
    move(){
        //moves the rectangle based on the speed and then checks if it is out of bounds and deletes if so
        //if 100 rectangles have left the bounds the user wins
        this.x -= this.speed;
        if(this.x < -this.width){
            obstacles.splice(obstacles.indexOf(this),1);
            let temp = new obstacle();
            obstacles.push(temp);
            counter++;
            console.log(counter);
            if(counter>100){
                location.href = "win01.html";
            }
        }
    }
    show(){
        //draws the rectangle with a green border (specifically matrix green) 
        //and a fill that matches the background
        push();
        translate(this.x,this.y);
        fill(30);
        stroke('#03A062');
        rect(0,0,this.width,this.height);
        pop();
    }
    check(){
        //checks if the rectangle is touching the mouse, if so user loses
        push();
        translate(this.x,this.y);
        if(abs(mouseX-this.x) < this.width/2 && abs(mouseY-this.y) < this.height/2){
            location.href = "lose01.html";
        }
        pop();
    }
}


class particle{
    //square particles that make up the trail following the  mouse
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.r = 0;
        this.l = 20;
    }
    show(){
    //draws a square with no fill and a green border
    //the sidelengths decrease as the squares rotate
        this.l = map(this.r,0,360,20,1);
        push();
        translate(this.x,this.y);
        rotate(this.r);
        noFill();
        stroke('#03A062');
        square(0,0,this.l);
        this.r+=8;
        pop();
    }
    checkDelete(){
    //checks if the square has rotated enough to be deleted
        if(this.r>360){
            trail.splice(trail.indexOf(this),1);
        }
    }
}