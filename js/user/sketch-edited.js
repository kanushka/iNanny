let video;
let poseNet;
let poses = [];
let skeletons = [];

let videoCanvas;

// poses object
let poseDetails = {
	nose: null,
	leftEye: null,
	rightEye: null,
	leftEar: null,
	rightEar: null,
	leftShoulder: null,
	rightShoulder: null,
	leftElbow: null,
	rightElbow: null,
	leftWrist: null,
	rightWrist: null,
	leftHip: null,
	rightHip: null,
	leftKnee: null,
	rightKnee: null,
	leftAnkle: null,
	rightAnkle: null
};

function setup() {
	videoCanvas = createCanvas(640, 480);
	videoCanvas.parent('videoContainer');

	video = createCapture(VIDEO);
	video.size(width, height);

	// Create a new poseNet method with a single detection
	poseNet = ml5.poseNet(video, 'single', gotPoses);

	// Hide the video element, and just show the canvas
	video.hide();
}

function draw() {
	image(video, 0, 0, width, height);
	// filter(GRAY);
	// We can call both functions to draw all keypoints and the skeletons
	drawKeypoints();
	drawSkeleton();
}

// function mouseClicked(){
// 	saveCanvas(videoCanvas, 'capture', 'png');
// 	console.log('save my canvas');
// 	return false;
//   }

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
	// Loop through all the poses detected
	for (let i = 0; i < poses.length; i++) {
		// For each pose detected, loop through all the keypoints
		for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
			// A keypoint is an object describing a body part (like rightArm or leftShoulder)
			let keypoint = poses[i].pose.keypoints[j];
			// Only draw an ellipse is the pose probability is bigger than 0.2
			if (keypoint.score > 0.2) {
				fill(0, 255, 0);
				noStroke();
				ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
			}
		}
	}
}

// A function to draw the skeletons
function drawSkeleton() {
	// Loop through all the skeletons detected
	for (let i = 0; i < poses.length; i++) {
		// For every skeleton, loop through all body connections
		for (let j = 0; j < poses[i].skeleton.length; j++) {
			let partA = poses[i].skeleton[j][0];
			let partB = poses[i].skeleton[j][1];
			stroke(0, 255, 0);
			line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
		}
	}
}

// The callback that gets called every time there's an update from the model
function gotPoses(results) {
	poses = results;
//   console.log(JSON.stringify(poses, null, 4));
  
  // convert result to poses object
  showDetails(poses[0].pose.keypoints);
}

// show pose details
function showDetails(keypoints) {
	for (const keypoint of keypoints) {
		poseDetails[keypoint.part] = {
			score: keypoint.score,
			x: keypoint.position.x,
			y: keypoint.position.y
    }
    
    
  }
}

// add pose tile to div
function addTile(name, keypoint){
  let tile = $('#poseTile').clone();
  tile.find('part-value').html(name);
  tile.find('scope-value').html(keypoint.score);
  tile.find('x-value').html(keypoint.x);
  tile.find('y-value').html(keypoint.y);

  tile.removeAttr('hidden');
  $('#posesRow').append(tile);
}
