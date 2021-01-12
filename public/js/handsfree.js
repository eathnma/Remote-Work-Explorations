const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

let isVideo = false;
let model = null;

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
            runDetection()
        } else {
        }
    });
}

function runDetection() {
    if(model !== null){
        model.detect(video).then(predictions => {
            // console.log("Predictions: ", predictions);

            // 0: bottom right x
            // 1: bottom right y
            // 2: top left x
            // 3: top left y
            let width, length, area;

            predictions.forEach(prediction => 
                // console.log(prediction.bbox)
                area = prediction.bbox[2] * prediction.bbox[3]
            )  
            
            console.log(area);
            
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
});
