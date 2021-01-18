export class Hands{
    constructor(area, xMiddle, yMiddle){
        this.area = area;
        this.xMiddle = xMiddle;
        this.yMiddle = yMiddle;

        this.socket = io("http://localhost:1500");
    }

    update(){
        // drawMethod()
    }

    sendToSocket(area, xMiddle, yMiddle){
        var cameraValues = {};
        cameraValues.area = area;
        cameraValues.xMiddle = xMiddle;
        cameraValues.yMiddle = yMiddle;
    
        this.socket.emit('camera-values', cameraValues);
    }
}