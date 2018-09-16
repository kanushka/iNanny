var video = function(p) {
	// video variables
	p.video;
	p.poseNet;
	p.poses = [];

	// rectangle variables
	p.rectX = 50;
	p.rectY = 50;
	p.rectHeight = 100;
	p.rectWidth = 100;
	p.isClickedInside = false;

	// if mouse clicked in side of the rectangle
	// point gaps between mouse and rectangle first corner
	p.rectPointGapX = 0;
	p.rectPointGapY = 0;

	p.setup = function() {
		// get screen width
		if ($(window).width() < 640) {
			p.windowWidth = $(window).width() - $(window).width() / 18;
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
		p.poseNet = ml5.poseNet(p.video, "single", p.modelReady);
		// This sets up an event that fills the global variable "poses"
		// with an array every time new poses are detected
		p.poseNet.on("pose", function(results) {
			p.poses = results;
		});
		// Hide the video element, and just show the canvas
		p.video.hide();

		// set target div size to canvas size
		$("#videoContainer").width(p.width);
		$("#videoContainer").height(p.height);

		// get local storage data and initialize
		p.rectX = localStorage.getItem("rectX") || 10;
		p.rectY = localStorage.getItem("rectY") || 10;
		p.rectWidth = localStorage.getItem("rectWidth") || 50;
		p.rectHeight = localStorage.getItem("rectHeight") || 50;
	};

	p.modelReady = function() {
		console.log("video model ready");
		$("#roundPreloader").fadeOut();
	};

	p.draw = function() {
		// video data process
		p.image(p.video, 0, 0, p.width, p.height);

		// We can call both functions to draw all keypoints and the skeletons
		p.drawSkeleton();
		p.drawKeypoints();
		p.drawRectangle();

		// show poses
		// p.checkPose();
	};

	// A function to draw ellipses over the detected keypoints
	p.drawKeypoints = function() {
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
	};

	// A function to draw the skeletons
	p.drawSkeleton = function() {
		// Loop through all the skeletons detected
		for (let i = 0; i < p.poses.length; i++) {
			let skeleton = p.poses[i].skeleton;
			// For every skeleton, loop through all body connections
			for (let j = 0; j < skeleton.length; j++) {
				let partA = skeleton[j][0];
				let partB = skeleton[j][1];
				p.stroke(0, 153, 0);
				p.strokeWeight(2);
				p.line(
					partA.position.x,
					partA.position.y,
					partB.position.x,
					partB.position.y,
				);
			}
		}
	};

	// A function to draw rectangle
	p.drawRectangle = function() {
		p.fill(50, 150, 50, 50);
		p.stroke("green");
		p.strokeWeight(4);
		// A rectangle
		p.rect(p.rectX, p.rectY, p.rectWidth, p.rectHeight);
	};

	p.mouseDragged = function() {
		// console.log(`${p.mouseX}, ${p.mouseY}`);

		if (p.isMouseInVideoBox()) {
			if (p.isClickedInside) {
				// inside the box
				// move rectangle
				p.rectX = p.mouseX - p.rectPointGapX;
				p.rectY = p.mouseY - p.rectPointGapY;

				// store data in local storage
				localStorage.setItem("rectX", p.rectX);
				localStorage.setItem("rectY", p.rectY);
			} else {
				// outside the box
				// resize rectangle
				p.rectWidth = p.mouseX - p.rectX;
				p.rectHeight = p.mouseY - p.rectY;

				// store data in local storage
				localStorage.setItem("rectWidth", p.rectWidth);
				localStorage.setItem("rectHeight", p.rectHeight);
			}
		}
	};

	p.mousePressed = function() {
		console.log("mouse clicked");

		if (p.isMouseInVideoBox()) {
			console.log("mouse in video box");
			// inside video box
			if (p.isMouseInRectangle()) {
				console.log("mouse in rectangle");
				// inside the box
				// console.log('inside the rectangle');
				p.isClickedInside = true;

				// gap
				p.rectPointGapX = p.mouseX - p.rectX;
				p.rectPointGapY = p.mouseY - p.rectY;
			} else {
				// outside the box
				// console.log('outside the rectangle');
				p.isClickedInside = false;
			}
		} else {
			// mouse outside the video box
			p.isClickedInside = false;
		}
	};

	p.isMouseInRectangle = function(pointX = p.mouseX, pointY = p.mouseY) {
		return (
			pointX - p.rectX > 0 &&
			pointX - p.rectX < p.rectWidth &&
			pointY - p.rectY > 0 &&
			pointY - p.rectY < p.rectHeight
		);
	};

	p.isMouseInVideoBox = function(pointX = p.mouseX, pointY = p.mouseY) {
		return pointX > 0 && pointX < p.width && pointY > 0 && pointY < p.height;
	};

	// check pose parts
	// identify where pose pars are
	p.checkPose = function() {
		if (p.poses.length > 0) {
			// console.log(p.poses);

			if (p.poses[0].hasOwnProperty("pose")) {
				if (p.poses[0].pose.hasOwnProperty("keypoints")) {
					for (const key in p.poses[0].pose.keypoints) {
						p.part = p.poses[0].pose.keypoints[key];
						if (p.poses[0].pose.keypoints.hasOwnProperty(key)) {
							if (p.part.score > 0.7) {
								if (
									p.isMouseInRectangle(p.part.position.x, p.part.position.y)
								) {
									// part in rectangle
								} else {
									console.log(`${p.part.part} - ${p.part.score}`);
									// part outside of the rectangle

									// TAKE ACTION
								}
							}
						}
					}
				}
			}
		}
	};
};

new p5(video, "videoContainer");
