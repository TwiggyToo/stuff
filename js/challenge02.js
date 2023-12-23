let trail = [], trailLength = 100;
let wave = [], counter = 0;

function setup(){
    let myWidth = windowWidth/1.3;
    let myHeight = windowHeight/1.3;
    createCanvas(myWidth,myHeight);
    noStroke();
    angleMode(DEGREES);
    rectMode(CENTER);
    for(let i = 0; i<=15;i++){
        //creates 15 initial bubbles
        wave[i] = new circ();
    }
}
function draw(){
    background(30);
    for(let squares of trail){
    //draws trail
        squares.show();
        squares.checkDelete();
    }
    for(let ball of wave){
        ball.move();
        ball.show();
        ball.check();
    }
}

//adds new square when mouse is moved and deletes last square in trail if necessary
function mouseMoved(){
    let newSquare = new particle(mouseX,mouseY);
    if(trail.length<=trailLength){
        trail.push(newSquare);
    }
    else{
        trail.splice(0,1);
    }
}


//class for bubbles
class circ{
    constructor(){
        //creates a circ object with random diameter, random speed, and random angle
        //the angle is not used for rotating the circle, 
        //rather it determines where it is on the sine or cosine function
        //each circ object is randomly assigned to cosine or sine
        this.r = random(20,75);
        this.s = random(3,7);
        this.x = width+this.r;
        this.a = random(100);;
        this.funk = Math.random() >= 0.5;
        if(this.funk==true){
            this.y = sin(this.a)*(height/2)+height;
        }
        else{
            this.y = cos(this.a)*(height/2)+height;
        }
    }
    move(){
        //moves the circ objects according to their sine or cosine function
        //if they are out of bounds they are deleted and a new one is made
        //if 200 are deleted the user wins
        this.x -= this.s+counter/10;
        this.a+=2;
        if(this.funk==true){
            this.y = sin(this.a)*(height/2)+height/2;
        }
        else{
            this.y = cos(this.a)*(height/2)+height/2;
        }
        if(this.x < -this.r){
            wave.splice(wave.indexOf(this),1);
            let temp = new circ();
            wave.push(temp);
            counter++;
            console.log(counter);
            if(counter>200){
                location.href = "win02.html";
            }
        }
    }
    show(){
        //displays the bubbles as circles with the same fill as background color and a green or blue outline
        //depending on if they are following a sine or cosine function
        fill(30);
        stroke('#03A062');
        if(this.funk == true){
            stroke(30,150,250);
        }
        push();
        translate(this.x,this.y);
        circle(0,0,this.r);
        pop();
    }
    check(){
        //checks if bubbles are touching mouse, if so direct to lose page
        if(dist(mouseX,mouseY,this.x,this.y)<this.r/2){
            location.href = "lose02.html";
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