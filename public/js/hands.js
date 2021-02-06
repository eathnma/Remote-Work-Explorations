var myHand;
var otherHand;

export class Hands{

    constructor(){
        this.socket = io();
         // Create an empty project and a view for the canvas:
         paper.install(window);
    }

    drawHand(x,y,scale){
        // returns a mapped min-max of scale
        var mappedX = this.map_range(x, 60, 600, 0, 700);
        var mappedY = this.map_range(y, 70, 440, 0, 700);
        var mappedScale = this.map_range(scale, 8000, 20000, 3, 30);
   
        // console.log("window loaded");
        // var myCircle = new Path.Circle(new Point(200, 70), 20);
        var myCircle = new Path.Circle(new Point(mappedX, mappedY), mappedScale);
        myCircle.fillColor = 'black';
    }

    drawOtherHand(x,y,scale){
        console.log("this runs");
        // returns a mapped min-max of variables
        var mappedX = this.map_range(x, 60, 600, 0, 700);
        var mappedY = this.map_range(y, 70, 440, 0, 700);
        var mappedScale = this.map_range(scale, 8000, 20000, 3, 30);
   
        paper.setup('paperCanvas');

        // setup loads an id for the canvas
        var otherCircle = new Path.Circle(new Point(x, y), scale);
        // var otherCircle = new Path.Circle(new Point(mappedX, mappedY), mappedScale);

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