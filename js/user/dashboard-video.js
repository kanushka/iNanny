var video = function (p) {
	// video variables
	p.video;
	p.poseNet;
	p.poses = [];

	// feature identification variables
	p.featureExtractor;
	p.classifier;
	p.loss;
	p.dogImages = 0;
	p.catImages = 0;

	// rectangle variables
	p.rectX = 50;
	p.rectY = 50;
	p.rectHeight = 100;
	p.rectWidth = 100;
	p.isClickedInside = false;
	p.rectColor = 'green';

	p.setup = function () {
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

		// // Extract the already learned features from MobileNet
		// p.featureExtractor = ml5.featureExtractor('MobileNet', p.imageModelReady);
		// // Create a new classifier using those features and give the video we want to use
		// p.classifier = p.featureExtractor.classification(p.video, p.videoReady);
		// // Create the UI buttons
		// p.setupButtons();

		// Create a new poseNet method with a single detection
		p.poseNet = ml5.poseNet(p.video, "single", p.videoModelReady);
		// This sets up an event that fills the global variable "poses"
		// with an array every time new poses are detected
		p.poseNet.on("pose", function (results) {
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

	p.videoModelReady = function () {
		p.print('video model loaded');
		$("#roundPreloader").fadeOut();
	};

	p.imageModelReady = function () {
		p.print('image model loaded');
		$("#roundPreloader").fadeOut();
	};

	p.draw = function () {
		// framerate
		// p.print(p.frameRate());

		// video data process
		p.image(p.video, 0, 0, p.width, p.height);

		// We can call both functions to draw all keypoints and the skeletons
		p.drawSkeleton();
		p.drawKeypoints();
		p.drawRectangle();

		// show poses
		p.checkPose();
	};

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
	};

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
	p.drawRectangle = function () {
		p.fill(50, 150, 50, 50);
		p.stroke(p.rectColor);
		p.strokeWeight(4);
		// A rectangle
		p.rect(p.rectX, p.rectY, p.rectWidth, p.rectHeight);
	};

	p.isMouseInRectangle = function (pointX = p.mouseX, pointY = p.mouseY) {
		return (
			pointX - p.rectX > 0 &&
			pointX - p.rectX < p.rectWidth &&
			pointY - p.rectY > 0 &&
			pointY - p.rectY < p.rectHeight
		);
	};

	// check pose parts
	// identify where pose pars are
	p.checkPose = function () {
		if (p.poses.length > 0) {
			// console.log(p.poses);

			if (p.poses[0].hasOwnProperty("pose")) {
				if (p.poses[0].pose.hasOwnProperty("keypoints")) {

					isDanger = false;
					isWarning = false;

					for (const key in p.poses[0].pose.keypoints) {
						p.part = p.poses[0].pose.keypoints[key];
						if (p.poses[0].pose.keypoints.hasOwnProperty(key)) {
							if (p.part.score > 0.7) {
								if (
									p.isMouseInRectangle(p.part.position.x, p.part.position.y)
								) {
									// part in rectangle
								} else {
									// console.log(`${p.part.part} - ${p.part.score}`);
									// part outside of the rectangle

									// TAKE ACTION

									// if part is eye, nose, ear, solder, leg
									// then  make danger alert
									dangerParts = ['leftEye', 'rightEye', 'nose', 'leftEar', 'rightEar', 'leftShoulder', 'rightShoulder', 'Leg']
									if (dangerParts.includes(p.part.part)) {
										// console.error('danger');
										isDanger = true;
									} else {
										// or else
										// make warning
										// console.warn('warning');
										isWarning = true;
									}

								}
							}
						}
					}

					if (isDanger) {
						// console.error('danger');
						p.rectColor = 'red';
					} else if (isWarning) {
						// console.warn('warning');
						p.rectColor = 'yellow';
					} else {
						p.rectColor = 'green';
					}
				}
			}
		}
	};

	// A function to be called when the video has loaded
	p.videoReady = function () {
		p.print('video ready!');
	}

	// Classify the current frame.
	p.classify = function () {
		p.classifier.classify(p.gotResults);
	}

	// A util function to create UI buttons
	p.setupButtons = function () {
		// When the Cat button is pressed, add the current frame
		// from the video with a label of "cat" to the classifier
		buttonA = p.select('#catButton');
		buttonA.mousePressed(function () {
			p.classifier.addImage('cat');
			p.select('#amountOfCatImages').html(p.catImages++);
		});

		// When the Dog button is pressed, add the current frame
		// from the video with a label of "dog" to the classifier
		buttonB = p.select('#dogButton');
		buttonB.mousePressed(function () {
			p.classifier.addImage('dog');
			p.select('#amountOfDogImages').html(p.dogImages++);
		});

		// Train Button
		train = p.select('#train');
		train.mousePressed(function () {
			p.classifier.train(function (lossValue) {
				if (lossValue) {
					p.loss = lossValue;
					p.select('#loss').html('Loss: ' + p.loss);
				} else {
					p.select('#loss').html('Done Training! Final Loss: ' + p.loss);
				}
			});
		});

		// Predict Button
		buttonPredict = p.select('#buttonPredict');
		buttonPredict.mousePressed(p.classify);
	}

	// When we get a result
	p.gotResult = function (err, results) {
		// The results are in an array ordered by probability.
		p.print(results);
		p.print(err);

		p.classify();
		// setTimeout(p.classifyVideo, 60 * 1000);
	}

};

new p5(video, "videoContainer");
