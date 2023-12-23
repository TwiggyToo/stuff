let portal = [], counter = 0;
function setup(){
    let myWidth = windowWidth/1.3;
    let myHeight = windowHeight/1.3;
    createCanvas(myWidth,myHeight);
    noStroke();
    angleMode(DEGREES);
    rectMode(CENTER);
    for(let i = 0; i<=100;i++){
    //creates squares that make up the portal
            portal[i] = new particle(myWidth/2,myHeight/2,i*15);
    }
}
function draw(){
    background('#1c1c1c');
    if(counter<600){
        for(let squares of portal){
            squares.show();
        }
    }else{
        //after around 600 frames the portal should grow enough to be completely off the canvas
        //at which point the user is directed to the ending page
        location.href = "end02.html";
    }
    counter++;
}

//class for squares following mouse
class particle{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.l = 20;
    }
    show(){
        //length of the sides shrinks as the rotation angle increases
        //Not exactly sure why this makes the squares grow after they completely shrink but it looks cool
        this.l = map(this.r,0,180,100,1);
        //draws a square with a green outline rotated this.r degrees and then increases this.r
        push();
        translate(this.x,this.y);
        rotate(this.r);
        noFill();
        stroke('#03A062');
        square(0,0,this.l);
        this.r+=counter/50;
        pop();
    }
}