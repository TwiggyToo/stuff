let trail = [], trailLength = 100;
let sideLength = 20, rotateSpeed = 5;
//edit these to change the look and behavior of the trail^^^
function setup(){
    let myWidth = windowWidth/1.3;
    let myHeight = windowHeight/1.3;
    createCanvas(myWidth,myHeight);
    noStroke();
    angleMode(DEGREES);
    rectMode(CENTER);
}
function draw(){
    background(30);
    for(let squares of trail){
    //draws the trail of squares that follow the cursor and checks if they need to be deleted
        squares.show();
        squares.move();
        squares.checkDelete();
        //comment out this line ^^^ to see something cool
    }
}

function mouseMoved(){
    //adds to the trail when the mouse is moved
    let newSquare = new particle(mouseX,mouseY);
    trail.push(newSquare);
}

class particle{
    //square particles that make up the trail following the  mouse
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.origX = this.x;
        this.origY = this.y;
        this.a = 255;
        this.r = 0;
        this.l = sideLength;
        this.p = random(10000);
    }
    move(){
        //moves the squares based on a perlin noise function
        this.x += -3+noise(this.p)*6;
        this.y += -3+noise(this.p+100000)*6;
        this.p += 0.01
    }
    show(){
    //draws a square with no fill and a green border
    //the sidelengths decrease as the squares rotate
    //maps the alpha value to the distance from the current location to starting location
        this.l = map(this.r,0,360,sideLength,1);
        this.a = map(dist(this.x,this.y,this.origX,this.origY),0,200,255,0);
        push();
        translate(this.x,this.y);
        rotate(this.r);
        noFill();
        stroke(3,160,98,this.a);
        square(0,0,this.l);
        this.r+=rotateSpeed;
        pop();
    }
    checkDelete(){
    //checks if the square has rotated enough to be deleted
        if(this.r>360){
            trail.splice(trail.indexOf(this),1);
        }
    }
}