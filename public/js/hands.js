paper.install(window);

var values = {
	friction: 0.99,
	timeStep: 0.001,
	amount: 10,
	mass: 2,
	count: 0
};

values.invMass = 1 / values.mass;

var path, springs;
// var size = view.size * 0.5;

// var lastMousePosition = view.center;

// this may change on resize
var windowWidth;
var windowHeight;

// draw two paper.js objects
var circleOne;
var circleTwo;

// inital sizing for each circle
var pScaleYou = 10;
var pScaleThem = 10;

// easing for shpaes
var xEase = 0; 
var yEase = 0;
var easing = 0.05;
var slap = 0;

// in intervals of 1 second.
// var myVar = setInterval(myTimer, 1000);

// const {Howl, Howler} = require('howler');

export class Hands{

    constructor(){
        // connect socket 
        this.socket = io();
        paper.install(window);

         // Create an empty project and a view for the canvas:
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        paper.setup('paperCanvas');

        // load intial styles for the hands
        // this.handStyling();
        
        this.circleOne = circleOne;
        this.circleTwo = circleTwo;
        this.pScaleYou = pScaleYou;
        this.pScaleThem= pScaleThem;
        this.slap = slap;

        circleOne = new Path.Circle({
            center: new Point(200, 200),
            radius: 10,
            fillColor: 'white'
        });

        circleTwo = new Path.Circle({
            center: new Point(100, 100),
            radius: 10,
            fillColor: 'red'
        });  

        // start playing Celebration
        // var sound = new Howl({
        //     src: ['celebrate.mp3'],
        // });

        // sound.play();
    }

    draw(scale, x, y, type){
        var mappedX = this.map_range(x, 60, 600, 0, windowWidth);
        var mappedY = this.map_range(y, 70, 440, 0, windowHeight);
        var mappedScale = this.map_range(scale, 8000, 200000, 10, 100);
    
        // calculates percentage change between the hands
        var percChange = this.percIncrease(mappedScale,pScaleYou);

        if(percChange > 45){
            // move the shape forward
            console.log("slap ass");
            slap = 150;
        }

        console.log(slap);

        this.updateObject(mappedScale, mappedX, mappedY, type, slap); 
    
        slap = 0;
    }

    updateObject(mScale, x, y, type, slap){
        // create new scale
        var scaleObject = 1; 
        var oldScale;
        var circleObject;

        if(type === "you") {
            oldScale = pScaleYou;
            circleObject = circleOne;
        } else if(type === "them") {
            oldScale = pScaleThem;
            circleObject = circleTwo;
        }

        // if newScale 
        if(mScale === oldScale){
            scaleObject = 1;
        } else {
            if(type === "you"){
                scaleObject = mScale / pScaleYou;

                // scaleObject to a new variable
                pScaleYou = mScale;

            } else if(type === "them"){
                scaleObject = mScale / pScaleThem;
                // scaleObject to a new variable
                pScaleThem = mScale;
            }
        }

        // translates the position of the circle
        // apply easing to the shapes

        // easing for x
        var targetX = x;
        var dx = targetX - xEase;
        xEase += dx * easing;

        // easing for y
        var targetY = y;
        var dy = targetY - yEase;
        yEase += dy * easing;

        if(slap > 1){
            circleObject.position = new Point(xEase + slap, yEase);    
        } else {
            circleObject.position = new Point(xEase, yEase);
            // console.log("no-slap");
        }
        
        // console.log(xEase, slap);
        
        // scales the circle compared to how close the hand is to the camera
        // might run into scaling errors when you import the hand
        circleObject.scale(scaleObject, scaleObject);
    }

    sendToSocket(area, xMiddle, yMiddle){
        var cameraValues = {};
        cameraValues.area = area;
        cameraValues.xMiddle = xMiddle;
        cameraValues.yMiddle = yMiddle;
        
        // sends values to server
        this.socket.emit('camera-values', cameraValues);
    }


    // util functions
    percIncrease(a, b) {
        var percent;
        if(b !== 0) {
            if(a !== 0) {
                percent = (b - a) / a * 100;
            } else {
                percent = b * 100;
            }
        } else {
            percent = - a * 100;            
        }       
        return Math.floor(percent);
    }

    // value, camera low, camera high, paper low, paper high
    map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }
}
var Spring = function(a, b, strength, restLength) {
    this.a = a;
    this.b = b;
    this.restLength = restLength || 80;
    this.strength = strength ? strength : 0.55;
    this.mamb = values.invMass * values.invMass;
};

Spring.prototype.update = function() {
    var delta = this.b - this.a;
    var dist = delta.length;
    var normDistStrength = (dist - this.restLength) /
            (dist * this.mamb) * this.strength;
    delta.y *= normDistStrength * values.invMass * 0.2;
    if (!this.a.fixed)
        this.a.y += delta.y;
    if (!this.b.fixed)
        this.b.y -= delta.y;
};