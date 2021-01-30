export class Hands{
    constructor(area, xMiddle, yMiddle){
        this.area = area;
        this.xMiddle = xMiddle;
        this.yMiddle = yMiddle;

        this.socket = io("http://localhost:1500");
    }

    update(){
    }

    draw(){
        // console.log("drawing is working");
        
        // Get a reference to the canvas object
        var canvas = document.getElementById('paperCanvas');
        // Create an empty project and a view for the canvas:
        paper.install(window);

        console.log("window loaded");
        // setup loads an id for the canvas
        paper.setup('paperCanvas');
        var myCircle = new Path.Circle(new Point(200, 70), 20);
        myCircle.fillColor = 'black';

    }
    
    sendToSocket(area, xMiddle, yMiddle){
        var cameraValues = {};
        cameraValues.area = area;
        cameraValues.xMiddle = xMiddle;
        cameraValues.yMiddle = yMiddle;
        
        // sends values to server
        this.socket.emit('camera-values', cameraValues);
    }
}