const videoElement = document.getElementsByClassName('input-video')[0];
const camera = new Camera(videoElement, {
    onFrame: async () => {
        // handpose.send({image: videoElement});
    },
    width: 1280,
    height: 720
    });
          
camera.start();

async function main() {

    var vid = document.getElementsByClassName("input-video")[0];
    vid.onloadeddata = async function() {
        alert("Browser has loaded the current frame");
         // Load the MediaPipe handpose model.

    const model = await handpose.load();
    // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain a
    // hand prediction from the MediaPipe graph.
    const predictions = await model.estimateHands(videoElement);
    if (predictions.length > 0) {
      /*
      `predictions` is an array of objects describing each detected hand, for example:
      [
        {
          handInViewConfidence: 1, // The probability of a hand being present.
          boundingBox: { // The bounding box surrounding the hand.
            topLeft: [162.91, -17.42],
            bottomRight: [548.56, 368.23],
          },
          landmarks: [ // The 3D coordinates of each hand landmark.
            [472.52, 298.59, 0.00],
            [412.80, 315.64, -6.18],
            ...
          ],
          annotations: { // Semantic groupings of the `landmarks` coordinates.
            thumb: [
              [412.80, 315.64, -6.18]
              [350.02, 298.38, -7.14],
              ...
            ],
            ...
          }
        }
      ]
      */
  
      for (let i = 0; i < predictions.length; i++) {
        const keypoints = predictions[i].landmarks;
  
        // Log hand keypoints.
        for (let i = 0; i < keypoints.length; i++) {
          const [x, y, z] = keypoints[i];
          console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
        }
      }
    }
    };

  }

  main();