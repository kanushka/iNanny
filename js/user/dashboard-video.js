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

	// alert request que
	p.isSendAlert = false;

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

		// set capture button event
		p.select("#captureBtn").mouseClicked(p.makeCapture);

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

		p.translate(p.width, 0); // move to far corner
		p.scale(-1.0, 1.0); // flip x-axis backwards
		// video data process
		p.image(p.video, 0, 0, p.width, p.height);

		// add filters
		if (IS_NIGHT_VISION_ACTIVE) {
			p.filter('GRAY');
		}

		// draw all key points and the skeletons
		if ($('#poseKeyPointSwitch').prop('checked')) {
			p.drawKeypoints();
		}
		if ($('#skeletonSwitch').prop('checked')) {
			p.drawSkeleton();
		}

		// draw safe zone
		if ($('#safeZoneSwitch').prop('checked')) {
			p.drawRectangle();
		}

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
		// console.log(p.poses);
		if (p.poses.length > 0) {

			if (p.poses[0].hasOwnProperty("pose")) {

				if (p.poses[0].pose.hasOwnProperty("score")) {
					if (p.poses[0].pose.score < 0.2) {
						// no poses
						// no baby
						p.showAlert('no_baby');
						return;
					}
				}

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
						p.sendAlert('danger');
						p.showAlert('danger');
					} else if (isWarning) {
						// console.warn('warning');
						p.rectColor = 'yellow';
						p.sendAlert('warning');
						p.showAlert('warning');
					} else {
						p.rectColor = 'green';
						p.showAlert('safe');
					}
				}
			}
		} else {
			// no poses
			// no baby
			p.showAlert('no_baby');
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

	// set alert message in dashboard
	// types are
	// 		safe
	//		danger
	//		warning
	//		no_baby
	p.showAlert = function (alertType = null) {

		let alertCard = p.select('#alertCard');
		let alertIcon = p.select('#alertIcon');
		let alertMessage = p.select('#alertMessage');

		// remove all class
		// color
		alertCard.removeClass('green-text');
		alertCard.removeClass('orange-text');
		alertCard.removeClass('red-text');
		alertCard.removeClass('blue-text');

		switch (alertType) {
			case 'danger':
				alertIcon.html('error');
				alertMessage.html('DANGER! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
				alertCard.addClass('red-text');
				break;

			case 'warning':
				alertIcon.html('warning');
				alertMessage.html('WARNING! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
				alertCard.addClass('orange-text');
				break;

			case 'no_baby':
				alertIcon.html('blur_circular');
				alertMessage.html('System cannot find baby!');
				alertCard.addClass('blue-text');
				break;

			case 'safe':
			default:
				// safe
				alertIcon.html('local_florist');
				alertMessage.html('SAFE! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
				alertCard.addClass('green-text');
				break;
		}
	};

	// sending alert
	// send types are
	// 		danger
	//		warning
	p.sendAlert = function (alertType = 'danger') {

		if (!($('#smsAlertSwitch').prop('checked') || $('#callAlertSwitch').prop('checked'))) {
			return;
		}

		if (p.isSendAlert) {
			p.print('alert already requested');
			return;
		}

		p.print('sending alert request...');
		Materialize.toast('Sending alert to parents!', 2000);

		p.isSendAlert = true; // block next request

		var url = BASE_URL + "user/send/alert";
		var postData = {
			babyId: BABY_ID,
			alertType: alertType
		};
		p.httpPost(url, 'json', postData, function (result) {
			p.print(result);
			p.isSendAlert = false; // give chance to next request
			Materialize.Toast.removeAll();
		});
	};

	p.makeCapture = function () {
		// hide draw elements

		// save canvas
		p.saveCanvas();
		p.print('save captured image');
		// show elements
	};

};

// detect device
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
	/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {

	// mobile device detected
	$("#roundPreloader").fadeOut();
} else {
	console.log('load video model');
	new p5(video, "videoContainer");
}
