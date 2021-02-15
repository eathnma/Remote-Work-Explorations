var myHand;
var otherHand;

// this may change on resize
var windowWidth;
var windowHeight;

var circleOne;
var circleTwo;

var prevMappedScale = 10;
var circleScale = 1;

// const {Howl, Howler} = require('howler');

export class Hands{

    constructor(){
        this.socket = io();
         // Create an empty project and a view for the canvas:
         windowWidth = window.innerWidth;
         windowHeight = window.innerHeight;
         paper.install(window);

        paper.setup('paperCanvas');
        
        this.circleOne = circleOne;
        this.circleTwo = circleTwo;
        this.prevMappedScale = prevMappedScale;
        this.circleScale = circleScale;
         
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

    // maybe they have to be put into the same function?
    draw(scale, x, y, type){
        var mappedX = this.map_range(x, 60, 600, 0, windowWidth);
        var mappedY = this.map_range(y, 70, 440, 0, windowHeight);
        var mappedScale = this.map_range(scale, 8000, 200000, 10, 100);
        
        // might run into scaling errors when you import the hand
        if(type == 'you'){
            console.log(mappedScale,prevMappedScale);
            if(mappedScale === prevMappedScale){
                circleScale = 1;
            } else {
                circleScale = mappedScale / prevMappedScale;
                prevMappedScale = mappedScale;
            }
                
            circleOne.position = new Point(mappedX, mappedY);

            circleOne.scale(circleScale, circleScale);
        }

        if(type == 'them'){
            circleTwo.position = new Point(mappedX, mappedY);
        }
    }

    // resizeShape(scale, x, y){
    //     console.log(mappedScale,prevCircleScale);
    //     // scaling logic
    //     if(mappedScale == prevCircleScale){
    //         console.log("the values are the same!");
    //         // Value stays the same. Return the scale.
    //         circleScale = 1;
    //     } 
    //         else if(mappedScale > prevCircleScale) {
    //                 console.log("mappedScale more than prevScale");
    //                 circleScale = mappedScale / prevCircleScale;

    //                 // set mappedScale to the next prevScale
    //                 mappedScale = prevCircleScale;
    //             } else if(mappedScale < prevCircleScale){
    //                 console.log("mappedScale less than prevScale");
    //                 circleScale = prevCircleScale / mappedScale;

    //                 // set mappedScale to the next prevScale
    //                 mappedScale = prevCircleScale;
    //             }
    
    // }

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