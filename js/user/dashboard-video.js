var video = function (p) {

	// video variables
	p.video;
	p.poseNet;
	p.poses = [];

	p.setup = function () {

		// get screen width
		if ($(window).width() < 640) {
			p.windowWidth = $(window).width() - ($(window).width() / 18);
			p.windowHeight = p.windowWidth * (3 / 4);
		} else {
			p.windowWidth = 640;
			p.windowHeight = 480;
		}

		p.createCanvas(p.windowWidth, p.windowHeight);



		// create video input
		p.video = p.createCapture(p.VIDEO);
		p.video.size(p.width, p.height);

		// Create a new poseNet method with a single detection
		p.poseNet = ml5.poseNet(p.video, 'single', p.modelReady);
		// This sets up an event that fills the global variable "poses"
		// with an array every time new poses are detected
		p.poseNet.on('pose', function (results) {
			p.poses = results;
		});
		// Hide the video element, and just show the canvas
		p.video.hide();

		// set target div size to canvas size
		$("#videoContainer").width(p.width);
		$("#videoContainer").height(p.height);

	}

	p.modelReady = function () {
		console.log('video model ready');
		$('#roundPreloader').fadeOut();
	}

	p.draw = function () {

		// video data process
		p.image(p.video, 0, 0, p.width, p.height);

		// We can call both functions to draw all keypoints and the skeletons
		p.drawKeypoints();
		p.drawSkeleton();
	}

	// A function to draw ellipses over the detected keypoints
	p.drawKeypoints = function () {
		// Loop through all the poses detected
		for (let i = 0; i < p.poses.length; i++) {
			// For each pose detected, loop through all the keypoints
			let pose = p.poses[i].pose;
			for (let j = 0; j < pose.keypoints.length; j++) {
				// A keypoint is an object describing a body part (like rightArm or leftShoulder)
				let keypoint = pose.keypoints[j];
				// Only draw an ellipse is the pose probability is bigger than 0.2
				if (keypoint.score > 0.2) {
					p.fill(0, 200, 0);
					p.noStroke();
					p.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
				}
			}
		}
	}

	// A function to draw the skeletons
	p.drawSkeleton = function () {
		// Loop through all the skeletons detected
		for (let i = 0; i < p.poses.length; i++) {
			let skeleton = p.poses[i].skeleton;
			// For every skeleton, loop through all body connections
			for (let j = 0; j < skeleton.length; j++) {
				let partA = skeleton[j][0];
				let partB = skeleton[j][1];
				p.stroke(0, 153, 0);
				p.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
			}
		}
	}
};

new p5(video, 'videoContainer');
