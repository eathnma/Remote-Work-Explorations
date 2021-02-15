const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvasVideo");
const context = canvas.getContext("2d");

let isVideo = false;
let model = null;

let area, xMiddle, yMiddle;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

let hands;
let previousHandArea, previousHandX, previousHandY;

export class HandDetect{

    constructor(manyHands){
        hands = manyHands;
        this.load();
    }

load(){
    // Load the model.
    handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel;
    this.startVideo();
});
}

startVideo() {
    let that = this;
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            isVideo = true;
            runDetection();
        } else {

        }   
    });
}
}

function runDetection() {
    if(model !== null){
        model.detect(video).then(predictions => {

            // prediction.bbox[0]: x coord of top left
            // prediction.bbox[1]: y coord of top left
            // prediction.bbox[2]: width of bounding box
            // prediction.bbox[3]: height of bounding box

            predictions.forEach(prediction => {
                xMiddle = prediction.bbox[0] + (prediction.bbox[2] / 2);
                yMiddle = prediction.bbox[1] + (prediction.bbox[3] / 2);

                area = prediction.bbox[2] * prediction.bbox[3];
            });  

            // sends values to other client
            hands.sendToSocket(area, xMiddle, yMiddle);
        
            // if no values, then update hands
            if(area != null){
                // takes local values and draws image
                hands.draw(area, xMiddle, yMiddle, "you");
            }
                                   
            // console.log(predictions.bbox);
            model.renderPredictions(predictions, canvas, context, video);
            if (isVideo) {
                requestAnimationFrame(runDetection);
            }
        });
    } else {
        console.log("model not loaded");
    }
}