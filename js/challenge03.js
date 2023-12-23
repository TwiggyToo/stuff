let trail = [], trailLength = 100;
let balls = [], counter = 0;
function setup(){
    let myWidth = windowWidth/1.3;
    let myHeight = windowHeight/1.3;
    createCanvas(myWidth,myHeight);
    noStroke();
    angleMode(DEGREES);
    rectMode(CENTER);
    for(let i = 0; i<=20;i++){
        //creates 20 initial ball obstacles
        balls[i] = new ball();
    }
}
function draw(){
    background(30);
    for(let squares of trail){
        //draws trail
        squares.show();
        squares.checkDelete();
    }
    for(let b of balls){
        //moves, grows, and draws each ball
        b.check();
        b.move();
        b.grow();
        b.show();
    }
    if(counter >= 200){
        //if 200 balls are deleted the user wins
        location.href = "win03.html";
    }
}

//adds new square when mouse is moved and deletes last square in trail
function mouseMoved(){
    let newSquare = new particle(mouseX,mouseY);
    if(trail.length<=trailLength){
        trail.push(newSquare);
    }
    else{
        trail.splice(0,1);
    }
}

class ball{
    constructor(){
        //creates ball object with a random maximum diameter, a random growing speed, and a random y speed
        this.maxR = random(50,200);
        this.s = random(2,4);
        this.ys = random(3,6)
        this.r = 5;
        this.x = random(width);
        this.y = -this.maxR;
    }
    move(){
        //moves the ball down the canvas
        //if the ball fully moves past the canvas it is deleted, a new one is created, and counter is increased
        this.y += this.ys+counter/20;
        if(this.y > height+this.r){
            balls.splice(balls.indexOf(this),1);
            let temp = new ball();
            balls.push(temp);
            counter++;
            console.log(counter);
        }
    }
    grow(){
        //makes the ball grow or shrink, if it reaches a maximum or minimum size it switches
        //from growing to shrinking or vice versa
        if(this.r >= this.maxR || this.r <= 1){
            this.s *= -1;
        }
        this.r += this.s/2;
    }
    show(){
        //draws each ball, for every one that is deleted they all get slightly redder
        //a point is drawn in the center of the ball to make the motion look cleaner
        let temp = map(counter,0,200,255,0)
        stroke(255,temp,temp);
        fill(30);
        circle(this.x,this.y,this.r);
        point(this.x,this.y);
    }
    check(){
        //checks if ball is touching mouse, if so direct to lose page
        if(dist(mouseX,mouseY,this.x,this.y)<this.r/2){
            location.href = "lose03.html";
        }
    }
}

//class for squares following mouse
class particle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.r = 0;
        this.l = 20;
    }
    show(){
        //length of the sides shrinks as the rotation angle increases
        this.l = map(this.r,0,360,20,1);
        //draws a square with a green outline rotated this.r degrees and then increases this.r
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
        if(this.r>360){
            trail.splice(trail.indexOf(this),1);
        }
    }
}