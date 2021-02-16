paper.install(window);

var pathData1 = 'M833.5,670.5c0,0,0-8,0-28c0-24,6-47,6-47 M819.5,608.5c14-7,33.7-24.3,45-35c17-16,25-28,31-47s26-57,25-81s0-33,2-49s-4-23-15-21s-29,32-33,44s-1,29-1,29s-11.9,10.1-18,21c-9,16-9,31-9,31 M877.5,411.5c-5-49.6-5-50.8-6-83c-1-32-4-45-4-74s-2-60-22-59s-21,36-21,46s2,11,2,15s-4,21-2,34s0,17-1,23s-3,21-2,39s2,24-5,23 M829.5,210.5c0,0,2-25-13-30s-22.5,11.1-27,36c-4,22,0,29,0,34s-8,23-8,56c0,22-5,24-5,42s6,27-14,27 M790.8,209.8c0,0-0.3-17.3-14.3-17.3c-15,0-22,26-25,41s3,26.3,0,33c-4,9-9.9,23-9,41c1,21-5,12.9-5,39c0,24,2.7,32.4-10,38c-9,4-12,5-12,5 M750.9,247.9c0,0-13.4-2.4-20.4,5.6s-19,33-21,45c-1.7,9.9,0,19-5,26s-18,39-19,55s1.8,9.4-6,25c-6,12-21,51-25,95s-4.8,86.5,12,102c13,12,17,13,17,13 M677.5,670.5c0,0,0-3,0-22c0-23-3-37-12.6-48.6 M717.5,311.5c6,3,14,3,14,3 M773.6,268.8c0,0-5.4-3.5-14.2-1.5 M810.6,250.8c0,0-5.4-3.5-14.2-1.5 M850.5,263.5c0,0-7-5-17.1-1.7 M850.5,319.5c0,0-9-3-17-1 M830.5,328.4c6.3,3.6,13.5,4.5,18.9,3.6c3.1-0.5,5.4-1.8,5.4-1.8 M790.5,317.5c4.4,2.2,12.9,2.8,20,1 M766.5,315.5c0,0-8-2-16-1 M748.5,322.5c9.4,5.3,22.2,1.8,20.5,1.8M873.5,448.5c2,10,8,13,8,13 M849.7,482.9c0,0-15.2-0.4-26.2,10.6 M840.5,464.5c6,5,14.1,6.7,14.1,6.7 M694.5,452.5c27-4,46.9-0.4,85-9c31-7,41-24,41-24 M814.5,455.5c-48.4,13.1-60,48-68,80 M855,736.5c0,0,0.5-36,0-44.7c-0.7-12.5,0.7-21.2-8.3-21.2c-5.2,0-55.5,4-101.7,4c-33.8,0-65.9-4-74.1-4c-19.5,0-16.7,5-16.7,15s0,32.3,0,51';

// compound path of hand
var yourhand;

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

        // new CompoundPath for the hand
        yourhand = new CompoundPath(pathData1);
            yourhand.strokeColor = 'black';
            yourhand.fillColor = null;
            yourhand.strokeWidth = 2;
            yourhand.strokeCap = 'round';
            yourhand.position = view.center;
            yourhand.scale(0.6);
            yourhand.rotate(-110);

        // circleOne = new Path.Circle({
        //     center: new Point(200, 200),
        //     radius: 10,
        //     fillColor: 'white'
        // });

        // circleTwo = new Path.Circle({
        //     center: new Point(100, 100),
        //     radius: 10,
        //     fillColor: 'red'
        // });  

        // start playing Celebration
        // var sound = new Howl({
        //     src: ['celebrate.mp3'],
        // });

        // sound.play();
    }

    draw(scale, x, y, type){
        var mappedX = this.map_range(x, 60, 600, 0, windowWidth);
        var mappedY = this.map_range(y, 70, 440, 0, windowHeight);
        var mappedScale = this.map_range(scale, 8000, 200000, 5, 20);
    
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
            // circleObject = circleOne;
        } else if(type === "them") {
            oldScale = pScaleThem;
            // circleObject = circleTwo;
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
            // circleObject.position = new Point(xEase + slap, yEase);    
            yourhand.position = new Point(xEase + slap, yEase);   
        } else {
            // circleObject.position = new Point(xEase, yEase);
            // console.log("no-slap");
            yourhand.position = new Point(xEase, yEase); 
        }
        
        // console.log(xEase, slap);
        
        // scales the circle compared to how close the hand is to the camera
        // might run into scaling errors when you import the hand
        // circleObject.scale(scaleObject, scaleObject);
         yourhand.scale(scaleObject,scaleObject);
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