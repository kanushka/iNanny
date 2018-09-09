// video variables
let video;
let poseNet;
let poses = [];

// audio variables
let mic;
let periodicVolumes = [];

function setup() {
	videoCanvas = createCanvas(640, 480);
	videoCanvas.parent('videoContainer');

	// create video input
	video = createCapture(VIDEO);
	video.size(width, height);

	// Create a new poseNet method with a single detection
	poseNet = ml5.poseNet(video, 'single', modelReady);
	// This sets up an event that fills the global variable "poses"
	// with an array every time new poses are detected
	poseNet.on('pose', function (results) {
		poses = results;
	});
	// Hide the video element, and just show the canvas
	video.hide();


	// Create an Audio input
	mic = new p5.AudioIn();
	// start the Audio Input.
	mic.start();
}

function modelReady() {
	$('#roundPreloader').fadeOut();
}

function draw() {

	// video data process
	image(video, 0, 0, width, height);

	// We can call both functions to draw all keypoints and the skeletons
	drawKeypoints();
	drawSkeleton();


	// audio data process
	// Get the overall volume (between 0 and 1.0)
	let volume = mic.getLevel();

	// If the volume > 0.1	
	var threshold = 0.05;
	if (volume > threshold) {

	}

	// Graph the overall potential volume, w/ a line at the threshold
	var y = map(volume, 0, 1, height, 0);
	var yThreshold = map(threshold, 0, 1, height, 0);

	noStroke();
	fill(250);
	rect(0, 0, 20, height);

	// Then draw a rectangle on the graph, sized according to volume
	if (volume > threshold) {
		fill(200, 0, 0);
	} else {
		fill(0, 200, 0);
	}

	rect(0, y, 20, y);
	stroke(0);
	line(0, yThreshold, 19, yThreshold);
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
	// Loop through all the poses detected
	for (let i = 0; i < poses.length; i++) {
		// For each pose detected, loop through all the keypoints
		let pose = poses[i].pose;
		for (let j = 0; j < pose.keypoints.length; j++) {
			// A keypoint is an object describing a body part (like rightArm or leftShoulder)
			let keypoint = pose.keypoints[j];
			// Only draw an ellipse is the pose probability is bigger than 0.2
			if (keypoint.score > 0.2) {
				fill(0, 200, 0);
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
		let skeleton = poses[i].skeleton;
		// For every skeleton, loop through all body connections
		for (let j = 0; j < skeleton.length; j++) {
			let partA = skeleton[j][0];
			let partB = skeleton[j][1];
			stroke(0, 153, 0);
			line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
		}
	}
}
