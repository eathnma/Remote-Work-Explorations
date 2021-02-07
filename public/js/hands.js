var myHand;
var otherHand;

// this may change on resize
var windowWidth;
var windowHeight;

export class Hands{

    constructor(){
        this.socket = io();
         // Create an empty project and a view for the canvas:
         paper.install(window);

         windowWidth = window.innerWidth;
         windowHeight = window.innerHeight;
    }

    // maybe they have to be put into the same function?
    draw(){
        // paper.setup('paperCanvas');

        console.log(this.drawHand());
        this.drawHand();

        // var myTwo = new Path.Circle(new Point(10,10), 50);
        // myTwo.fillColor = 'red';
    }

    drawHand(scale,x,y){
        paper.setup('paperCanvas');
        // returns a mapped min-max of scale
        var mappedX = this.map_range(x, 60, 600, 0, windowWidth);
        var mappedY = this.map_range(y, 70, 440, 0, windowHeight);
        var mappedScale = this.map_range(scale, 8000, 20000, 3, 30);

        // sends to drawCanvas
        var varOne = new Path.Circle(new Point(mappedX, mappedY), mappedScale);
        varOne.fillColor = 'white';
    }

    drawOtherHand(scale,x,y){
        paper.setup('paperCanvas');
        // returns a mapped min-max of variables
        var mappedX = this.map_range(x, 60, 600, 0, windowWidth);
        var mappedY = this.map_range(y, 70, 440, 0, windowHeight);

        // 8000 - 20,000 are the hand-detection scale variables
        var mappedScale = this.map_range(scale, 8000, 20000, 3, 30);
        
        // setup loads an id for the canvas
        var otherCircle = new Path.Circle(new Point(mappedX, mappedY), mappedScale);
        otherCircle.fillColor = 'red';
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