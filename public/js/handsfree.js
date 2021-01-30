import{ Hands } from './hands.js'; 

// create new Hands Object
var hands = new Hands(0,0,0);

const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvasVideo");
const context = canvas.getContext("2d");

let isVideo = false;
let model = null;

let area, xMiddle, yMiddle;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            isVideo = true
            runDetection();
        } else {
        }
    });
}

function runDetection() {
    // console.log(xMiddle, yMiddle, area);
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

            hands.sendToSocket(area, xMiddle, yMiddle);
                        
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

// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel;
    startVideo();
    hands.draw();
});

// AUDREY WRITE HERE
export function updateValues(){
    if(status){
        console.log(area, xMiddle, yMiddle);
        // return area, xMiddle, yMiddle;
    }
}

updateValues();