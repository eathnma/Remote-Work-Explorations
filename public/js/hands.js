var myHand;
var otherHand;

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

// in intervals of 1 second.
var myVar = setInterval(myTimer, 1000);

// const {Howl, Howler} = require('howler');

export class Hands{

    constructor(){

        // connect socket 
        this.socket = io();
         // Create an empty project and a view for the canvas:
         windowWidth = window.innerWidth;
         windowHeight = window.innerHeight;
         paper.install(window);

        paper.setup('paperCanvas');
        
        this.circleOne = circleOne;
        this.circleTwo = circleTwo;
        this.pScaleYou = pScaleYou;
        this.pScaleThem= pScaleThem;

        // draw paper objects
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
        console.log(this.percIncrease(mappedScale, pScaleYou)); 
        var percChange = this.percIncrease(mappedScale,pScaleYou);

        if(percChange > 10){
            // move the shape forward
            console.log("slap ass");
        }

        this.updateObject(mappedScale, mappedX, mappedY, type);     

    }

    updateObject(mScale, x, y, type){
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

        circleObject.position = new Point(xEase, yEase);
        
        // scales the circle compared to how close the hand is to the camera
        // might run into scaling errors when you import the hand
        circleObject.scale(scaleObject, scaleObject);
    }

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

    sendToSocket(area, xMiddle, yMiddle){
        var cameraValues = {};
        cameraValues.area = area;
        cameraValues.xMiddle = xMiddle;
        cameraValues.yMiddle = yMiddle;
        
        // sends values to server
        this.socket.emit('camera-values', cameraValues);
    }

    // value, camera low, camera high, paper low, paper high
    map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

}