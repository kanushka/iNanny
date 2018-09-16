let featureExtractor;
let classifier;
let video;
let loss;
let dogImages = 0;
let catImages = 0;

function setup() {
	noCanvas();
	// Create a video element
	video = createCapture(VIDEO);
	// Append it to the videoContainer DOM element
	video.parent('videoContainer');
	// Extract the already learned features from MobileNet
	featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
	// Create a new classifier using those features and give the video we want to use
	classifier = featureExtractor.classification(video, videoReady);
	// Set up the UI buttons
	setupButtons();
}

// A function to be called when the model has been loaded
function modelReady() {
	console.log('Base Model (MobileNet) loaded!');
	$("#roundPreloader").fadeOut();
}

// A function to be called when the video has loaded
function videoReady() {
	console.log('Video ready!');
}


// Classify the current frame.
function classify() {
	classifier.classify(gotResults);
}

// A util function to create UI buttons
function setupButtons() {
	// When the Cat button is pressed, add the current frame
	// from the video with a label of "cat" to the classifier
	buttonA = select('#catButton');
	buttonA.mousePressed(function () {
		classifier.addImage('cat');
		select('#amountOfCatImages').html(catImages++);
	});

	// When the Dog button is pressed, add the current frame
	// from the video with a label of "dog" to the classifier
	buttonB = select('#dogButton');
	buttonB.mousePressed(function () {
		classifier.addImage('dog');
		select('#amountOfDogImages').html(dogImages++);
	});

	// Train Button
	train = select('#train');
	train.mousePressed(function () {
		classifier.train(function (lossValue) {
			console.log('saving classifier');
			console.log(classifier);

			localStorage.setItem("classifier", JSON.stringify(classifier));
			if (lossValue) {
				loss = lossValue;
				select('#loss').html('Loss: ' + loss);
			} else {
				select('#loss').html('Done Training! Final Loss: ' + loss);
			}
		});
	});

	// Predict Button
	buttonPredict = select('#buttonPredict');
	buttonPredict.mousePressed(classify);


	// Classify Button
	buttonClassify = select('#setClasifier');
	buttonClassify.mousePressed(function () {
		console.log('loading classifier');
		classifier = JSON.parse(localStorage.getItem("classifier"));
		console.log(classifier);
	});
}

// Show the results
function gotResults(err, result) {
	// Display any error
	if (err) {
		console.error(err);
	}
	select('#result').html(result);
	classify();
}
