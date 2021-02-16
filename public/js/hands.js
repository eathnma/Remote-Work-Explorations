paper.install(window);

// hand path data
var pathData1 = 'M447.5,714.5c0-12,0-66,0-66c-5.2,0-64.8,0-111,0c-33.8,0-90,0-90,0s0,37,0,66 M269.5,647.5c0,0,1-17.8,0-35c-1-18,3-19-16-53s-25-34-28-69s-10-52-14-68s-3-19-3-26s-1.5-4.1-6-22c-6-24,6-33.4,32-10c20,18,21,28,21,45c0,2,5,8,8,17l0.1-7.7c0.4-17,0.7-35.7,4.9-49.3c8.8-28.3,10-38,17-75c5.5-29.1,12-45,19-74s11-35,22-35c7.6,0,11.3,6.1,13.9,17.4c2.3,10.3,2.6,21,1.1,31.5l-0.5,3.4c2.9-15.5,5.1-27.5,9.5-44.3c5.2-19.9,6-40,25-39c16,0.8,18,32,16,51c-1.9,18.1-2.3,9.8-1.2,25.5c0.1,1.7,0.1,3.4-0.1,5v0c1.5-9,3.2-17,6.2-26.5c6-19,11-36,21-36s16,8,17,28s1,21-2,34s-1,2.9-1,21c0,18-2,30-4,41c-1.1,6-1,4,0.3,29.9l0.3-2.9c0.9-8.7,2.2-17.9,4.4-28c2.9-13,4-12,8-30s7-35,17-34s16,9,17,32c0.8,19-1,27-3,39c-1,6,2,20,2,44c0,27.1-6,51-6,57s1,5,4,30s1,56-10,109s-34,51-34,104 M428.1,335.5c-0.7,6.8-1.1,13.4-1.6,20c-1,15-3,23-12,26M388.5,247.5c-1.5,9-2,10.5-4,24c-4,27-7,21-8,52s1,32-9,44 M341,237.8c-1,5.6-2.2,11.7-3.5,18.7c-5,26-5,15-9,50s-3,55-13,60M263.5,435.5c0,10-1,15.5-6,22 M218.5,361.5c0,0,3.6,4.2,8,13c3,6-3,14-13,14 M331.5,198.5c0,0,0.7,6.9-1,12c-1.8,5.4-12,6-18,2M379.5,168.5c0,0,0.7,6.9-1,12c-1.8,5.4-12,7-19,2 M426.4,187.7c0,0,0,2.8-1,8.2c-1.5,8-13.5,7.7-19,4 M463.6,245.5c0,0,1.2,7.3-0.8,11c-1.7,3-7.5,5-13.3,2 M439.5,313.5c7-2,11,2,11,2 M389.5,285.5c4-1.8,10-0.2,11.1,1 M342.5,278.5c4-3,11.8-1.2,14,1 M296.5,278.5c7-4,14,1,14,1 M234.5,427.5c0,0-5,5-13,5 M332.5,363.5c7-2,14-1,18,2 M379.5,371.5c8-2,15,0,18,3M427.5,386.5c6-1,10,0,14,3 M283.7,365.3c6.9-2.3,11.8-2.2,17-0.1';

var pathData2 = 'M663.9,596.9c9.6,11.6,12.6,25.5,12.6,48.6c0,19,0,22,0,22h156c0,0,0-8,0-28c0-24,7-48,7-48l-21,14c6.3-3.2,13.8-8.4,21.1-14.2c8.9-7.1,17.7-14.9,23.9-20.8c17-16,25-28,31-47s26-57,25-81s0-33,2-49s-4-23-15-21c-8.4,1.5-21.8,21.3-29,35v-2c-5-49.6-6-47.8-7-80c-1-32-4-45-4-74s-2-60-22-59c-10.2,0.5-14.3,8.6-17,19l0.4-2.3c0.8-4.6,0.9-9.2,0.1-13.8c-1.1-6.8-4.2-15.1-12.5-17.9c-12.6-4.2-19.8,6.4-24.5,24.6l-1.1,4.7c0,0-0.3-17.3-14.3-17.3c-15,0-22,26-25,41c-1.9,9.7-0.1,17.8,0.6,24.2l-1.6-4.2c-4.3-6.7-13.7-6.3-19.3-0.7c-0.2,0.2-0.4,0.5-0.7,0.7c-7,8-19,33-21,45c-1.7,9.9,0,19-5,26s-18,39-19,55s1.8,9.4-6,25c-6,12-21,51-25,95s-4.8,86.5,12,102c13,12,17,13,17,13 M749.9,264.9c-4,9-9.2,22.5-8.4,39.6c1,21-7,26-10,45s-1,32-1,32 M788.5,215.5c-0.9,3.5-1.3,4.9-2,9c-4,22,0,29,0,34s-9,18-8,56c0.6,22-3.3,19.8-5,38c-1,11,1,26,1,26 M825.5,218.5c-2,10-2,15.1-2,20c0,10,2,11,2,15s-4,21-2,34s0,17-1,23s-5,21-5,41s1,30,1,30M874.5,414.5c-5,11-5,20-3,29c2,10,10,14,10,14 M875.5,412.5 M716.5,308.5c6,3,14,3,14,3 M772.6,265.8c0,0-5.4-3.5-14.2-1.5M809.6,247.8c0,0-5.4-3.5-14.2-1.5 M849.5,260.5c0,0-7-5-17.1-1.7 M850.5,316.5c0,0-9-3-17-1 M829.5,325.4c6.3,3.6,13.5,4.5,18.9,3.6c3.1-0.5,5.4-1.8,5.4-1.8 M789.5,314.5c4.4,2.2,12.9,2.8,20,1 M764.5,310.5c0,0-5-2-13-1 M747.5,319.5c7,5,18,3,20.5,1.8 M694.5,444.5c27,2,45.9,4.6,84-4c31-7,41-24,41-24 M822.5,450.5c-46.2,12.5-68.5,47.9-77,82 M854.5,733.5c0,0,0-36.2,0-45c0-12,0-21,0-21c-5.2,0-64.8,0-111,0c-33.8,0-90,0-90,0c0,1,0,10,0,20s0,27.3,0,46 M794.5,380.5c-27-3-62-1-83,6M809.5,381.5c21,1,29,5,29,5 M872.5,447.5c0,0-34,15-49,57';

var path, springs;

var size = 500;

var values = {
	friction: 0.99,
	timeStep: 0.001,
	amount: 2,
	mass: 2,
	count: 0
};

// compound path of hand
var yourhand;
var theirhand;

// this may change on resize
var windowWidth;
var windowHeight;

// inital sizing for each circle
var pScaleYou = 10;
var pScaleThem = 10;

// easing for shpaes
var xEase = 0; 
var yEase = 0;
var easing = 0.05;
var slap = 0;

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
	delta.x *= normDistStrength * values.invMass * 0.2;
	if (!this.a.fixed)
		this.a.x += delta.x;
	if (!this.b.fixed)
		this.b.x -= delta.x;
};

//array to store all gifs
var gifs = [];

//variable to store current gif
var randomGif;

//celebration
var audio = document.getElementById("myAudio");

export class Hands{

    constructor(){
        // connect socket 
        this.socket = io();
        paper.install(window);

         // Create an empty project and a view for the canvas:
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        paper.setup('paperCanvas');
        
        this.pScaleYou = pScaleYou;
        this.pScaleThem= pScaleThem;
        this.slap = slap;
        
        //load GIFs
        for (var i = 0; i < 10; i++) {
            gifs.push("url(../../assets/" + i + ".gif)");
        }
        
        //initialize current gif
        randomGif =  gifs[Math.floor(Math.random()*gifs.length)];

        // new CompoundPath for the hand
        theirhand = new CompoundPath(pathData2);
            theirhand.strokeColor = 'white';
            theirhand.fillColor = 'black';
            theirhand.strokeWidth = 2;
            theirhand.strokeCap = 'round';
            theirhand.position = view.center;
            theirhand.scale(0.6);
        
        yourhand = new CompoundPath(pathData1);
            yourhand.strokeColor = 'white';
            yourhand.fillColor = 'black';
            yourhand.strokeWidth = 2;
            yourhand.strokeCap = 'round';
            yourhand.position = view.center;
            yourhand.scale(0.6);
    }
    
    checkHit(path1, path2) {
        //compare sizes of hands
        var area1 = path1.bounds.width * path1.bounds.height;
        var area2 = path2.bounds.width * path2.bounds.height;
        var relativeScale = area1 / area2;
        
        //calculate # of intersecting points between hands
        var intersections = path1.getIntersections(path2);
        
        //if the hands are a similar location and size...
        if (relativeScale > 0.5 && relativeScale < 1.5 && intersections.length > 10) {
            audio.play();
            document.getElementById('htmlLayout').style.backgroundImage = randomGif;
        } else {
            audio.pause();
            document.getElementById('htmlLayout').style.backgroundImage = null;
            //only change gif while hands aren't touching
            randomGif =  gifs[Math.floor(Math.random()*gifs.length)];
        }
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
        this.checkHit(yourhand, theirhand);
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
            yourhand.position = new Point(xEase + slap, yEase);   
        } else {
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