// grabbing elements from the front-end
const video = document.getElementById("myvideo");
const canvas = document.getElementById("canvasVideo");
const context = canvas.getContext("2d");

let isVideo = false;
let model = null;
let hands;

// set variables for the bounding box of the hand
let area, xMiddle, yMiddle;

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6, // confidence threshold for predictions.
};

// export to main.js
export class HandDetect {
  constructor(manyHands) {
    // manyHands consists of the hit detection for the two hands
    hands = manyHands;
    this.load();
  }

  // Load the handmodel
  load() {
    handTrack.load(modelParams).then((lmodel) => {
      console.log("load model");
      // detect objects in the image.
      model = lmodel;
      this.startVideo();
    });
  }

  startVideo() {
    let that = this;
    // if the handtracking is available, run detection
    handTrack.startVideo(video).then(function (status) {
      document.getElementById("loading").style.display = "none";
      console.log("video started", status);
      if (status) {
        isVideo = true;
        runDetection();
      } else {
        console.log("video didn't load!");
      }
    });
  }
}

function runDetection() {
  if (model !== null) {
    model.detect(video).then((predictions) => {
      // prediction.bbox[0]: x coord of top left
      // prediction.bbox[1]: y coord of top left
      // prediction.bbox[2]: width of bounding box
      // prediction.bbox[3]: height of bounding box

      // calculate the bounding box for eaching hand
      predictions.forEach((prediction) => {
        xMiddle = prediction.bbox[0] + prediction.bbox[2] / 2;
        yMiddle = prediction.bbox[1] + prediction.bbox[3] / 2;

        area = prediction.bbox[2] * prediction.bbox[3];
      });

      // sends values to other client (hand)
      hands.sendToSocket(area, xMiddle, yMiddle);

      // if no values, then update hands
      if (area != null) {
        // takes local values and draws image
        hands.draw(area, xMiddle, yMiddle, "you");
      }

      // console.log(predictions.bbox);
      model.renderPredictions(predictions, canvas, context, video);

      if (isVideo) {
        // constant animation frame between the two hands
        requestAnimationFrame(runDetection);
      }
    });
  } else {
    console.log("model not loaded");
  }
}
