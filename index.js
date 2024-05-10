class Rain {
    constructor(width, height, direction, posX, posY, speed, color){
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        this.color = color;
    }

    move(){
        this.posX += Math.sin((this.direction * Math.PI) / 2) * this.speed;
        this.posY += Math.cos((this.direction * Math.PI) / 2) * this.speed;
    }

    draw(){
        canvasContext.rotate(-this.direction);
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.posX, this.posY, this.width, this.height);
        canvasContext.rotate(+this.direction);
    }
}

let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");

let createRect = (x, y, width , height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

let allRains = [];
let defaultRainWidth = 2;
let defaultRainHeight = 15;
let maximumRainCount = 500;


let maximumRainInitilionInOneFram = 5;

let fps = 60;
let gameLoop = () =>{
    setInterval(show, 1000/fps);
}


let color = '#c537E6';
let backgroundColor = '#000000';
let show = () =>{
    update();
    draw();
}

let speedMultiplier = 10;
let update = () =>{
    canvasContext.clearRect(0,0,canvas.width, canvas.height);
    let rainInitilionInThisFram = 0;
    while (
        allRains.length < maximumRainCount &&
        maximumRainInitilionInOneFram > rainInitilionInThisFram
    ) {
        let distanceFromCam = Math.random();
        let c = 
        "rgba("+
        parseInt(color.substring(1,3),16) +
        ","+
        parseInt(color.substring(3,5),16)+
        "," +
        parseInt(color.substring(5,7), 16) +
        "," +
        (1 - distanceFromCam) +
        ")";
        let rain = new Rain(
            defaultRainWidth * (2 - distanceFromCam),
            defaultRainHeight * (2 - distanceFromCam),
            Math.random() / 20,
            Math.random() * canvas.width,
            -100,
            ((2-distanceFromCam) * 8 * speedMultiplier) / 10,
            c
        );
        allRains.push(rain);
        rainInitilionInThisFram++;
    }
    for(let i = 0; i< allRains.length; i ++){
        allRains[i].move();
        if(allRains[i].posY > canvas.height || allRains[i].posX > canvas.width){
            allRains.splice(i, 1);
        }
    }
}

let draw = () =>{
    allRains.forEach((rain) => {
        rain.draw();
    });
}


gameLoop();

let setCanvasSizeAndVar = () => {
    canvas.width = window.visualViewport.width;
    canvas.height = window.visualViewport.height;
}
window.addEventListener("resize", setCanvasSizeAndVar);

setCanvasSizeAndVar();
let changeCount = (e) =>{
    maximumRainCount = e;
}

let changeDropWidth = (e) =>{
    defaultRainWidth = e;
}

let changeDropHeight = (e) =>{
    defaultRainHeight = e;
}

let changeGravityv = (e) => {
    speedMultiplier = e;
}

document.getElementById("color").addEventListener("input", ()=>{
    color = document.getElementById("color").value;
    let tds = document.querySelectorAll("td");
    tds.forEach((el)=>{
        el.style.cssText += "color:" + color + " !important";
    });
    let footer = document.querySelectorAll("footer");
    footer.forEach((el) =>{
        el.style.cssText += "color:" + color + " !important";
    });
    document.getElementById("name").style.cssText += "color:" + color + " !important";

});


document.getElementById('backgroundColor').addEventListener("input", ()=>{
    backgroundColor = document.getElementById("backgroundColor").value;
    document.body.style.backgroundColor = backgroundColor;

})