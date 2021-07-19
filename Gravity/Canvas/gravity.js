canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables And Constants..
var c = canvas.getContext('2d');
var x = window.innerWidth/2;
var y = canvas.height/2;
//dx and dy is the increase in speed after every animation frame
var dx = 4;
var dy = 9;
var r = 30;
//gravity means how much dy will increase after every animation frame
//since all balls will falling down in y direction.
var gravity = 1;
//EnergyLoss is the factor that will determin how huch energy Every Ball 
//Will loss as it hits the ground.
var EnergyLoss = 0.68;
var CircleArray = [];
var NumberOfCircles = (window.innerHeight + window.innerWidth)/3;
//Colors is the color array since we want random colors for every Ball.
//We Can Choose Random colors from Here https://color.adobe.com/explore
var Colors = [
    '#FFF587',
    '#FF8C64',
    '#FF665A',
    '#7D6B7D',
    '#A3A1A8'
];

//some Function That wll be used widely

//this function will return a random integer in the Given Range.
function generatRandomeNumberInGivenRange(SI,EI){
    return SI + Math.random()*(EI-SI);
}


//This Function will return random element of the array
function generatRandomeColorInGivenRange(color){
    return color[Math.floor(Math.random()*color.length)];
}



function Circle(x,y,dx,xy,r){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.color =  generatRandomeColorInGivenRange(Colors);
    
    //draw function will draw our circle.
    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.r,0,360,false);
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    };

    //update circle will run after every animation frame
    this.update = function(){
        //Corner Cases when Ball collide with boundries.
        if(this.r + this.y + this.dy >= canvas.height||this.y-this.r + this.dy <= 0){
            this.dy = (-this.dy)*EnergyLoss;
        }else{
            //Increasing 'dy' by 'gravity' for adding real gravity in our code.
            //we can imagine it like(we through a stone towards the ground,since
            //due to gravity it's speed will increase by g=9.8m/s2 after every second
            //according to v = u + gt.)
            this.dy += gravity;
        }

        if(this.r + this.x + this.dx>= canvas.width||this.x - this.r + this.dx <= 0){
            
            this.dx = -(this.dx);
        }
        
        // console.log(this.dy);
        
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
        this.draw();
    }
}


//Here i created random circles at random position and of random radius

for(var i = 0 ; i < NumberOfCircles ; i++){
    var DX = generatRandomeNumberInGivenRange(-1.5,1.5);
    var DY = generatRandomeNumberInGivenRange(-1.5,1.5);
    var R = generatRandomeNumberInGivenRange(5,30);
    var X = generatRandomeNumberInGivenRange(R,canvas.width-R);
    var Y = generatRandomeNumberInGivenRange(R,canvas.height-R);
    CircleArray.push(new Circle(X,Y,DX,DY,R));
}


//This function will be called repeatedly
function animate(){
    window.requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    for(i = 0 ; i < CircleArray.length ; i++){
        CircleArray[i].update();
    }
}


//init function is used whenever we resize or click the screen
//it will reset the height and width(resizing) and generate random
//Balls
function init(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    CircleArray = [];
    for(var i = 0 ; i < NumberOfCircles ; i++){
        var DX = generatRandomeNumberInGivenRange(-3.5,3.5);
        var DY = generatRandomeNumberInGivenRange(-3.5,3.5);
        var R = generatRandomeNumberInGivenRange(5,30);
        var X = generatRandomeNumberInGivenRange(R,canvas.width-R);
        var Y = generatRandomeNumberInGivenRange(R,canvas.height-R);
        CircleArray.push(new Circle(X,Y,DX,DY,R));
    }
}

window.addEventListener('click',init);
window.addEventListener('resize',init);

animate();