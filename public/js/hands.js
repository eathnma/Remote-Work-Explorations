export class Hands{
    constructor(area, xMiddle, yMiddle){
        this.area = area;
        this.xMiddle = xMiddle;
        this.yMiddle = yMiddle;

        this.socket = io("http://localhost:1500");
    }

    update(){
    }

    draw(scale){
        // returns a mapped min-max of scale
        var mappedScale = this.map_range(scale, 8000, 20000, 3, 30);
   
        // Get a reference to the canvas object
        var canvas = document.getElementById('paperCanvas');
        // Create an empty project and a view for the canvas:
        paper.install(window);

        // console.log("window loaded");
        // setup loads an id for the canvas
        paper.setup('paperCanvas');
        // var myCircle = new Path.Circle(new Point(200, 70), 20);
        var myCircle = new Path.Circle(new Point(200, 70), mappedScale);
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

    map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

}