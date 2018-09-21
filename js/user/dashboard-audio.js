var audio = function (p) {
	// audio variables
	p.mic;
	p.fft;

	p.isCry = p.select('#isBabyCry');
	p.coolDownCount = 100;

	p.setup = function () {
		p.createCanvas(360, 200);
		p.noFill();

		p.mic = new p5.AudioIn();
		p.mic.start();
		p.fft = new p5.FFT();
		p.fft.setInput(p.mic);

		p.isCry.value(false);

		p.print("sound model loaded");
	};

	p.draw = function () {
		p.background(255);

		// Get the overall volume (between 0 and 1.0)
		var volume = p.mic.getLevel();
		var shapeColor = "green";

		// The louder the volume, the color of the spectrum will change
		var threshold = 0.05;
		if (volume > threshold) {
			shapeColor = "red";
		}

		var spectrum = p.fft.analyze();

		p.beginShape();
		for (i = 0; i < spectrum.length; i++) {
			let vertexHeight = p.map(spectrum[i], 0, 255, p.height, 0);

			p.stroke(shapeColor);
			p.vertex(i, vertexHeight);

			if (i > 1020) {
				// p.print(p.map(spectrum[i], 0, 255, p.height, 0));
				if (vertexHeight < 180) {
					p.print("baby is crying");
					// baby should cry
					p.isCry.value(true);
					p.coolDownCount = 100;
					// show baby cry in message card
					p.showAlert('cry');
				}
			}
		}
		p.endShape();

		// check cry status
		if (p.isCry.value() == 'true') {
			p.coolDownCount--;
			if (p.coolDownCount < 1) {
				p.isCry.value(false);
				p.showAlert('neutral');
			} else if (p.coolDownCount < 40) {
				p.showAlert('cool');
			}
		}
	};

	// alert types are
	//	neutral
	//	cool
	// 	cry
	p.showAlert = function (alertType = 'neutral') {

		let alertCard = p.select('#faceCard');
		let alertIcon = p.select('#faceIcon');
		let alertMessage = p.select('#faceMessage');

		// remove all class
		// color
		alertCard.removeClass('green-text');
		alertCard.removeClass('orange-text');
		alertCard.removeClass('red-text');
		alertCard.removeClass('blue-text');

		switch (alertType) {
			case 'neutral':
				alertIcon.html('sentiment_satisfied');
				alertMessage.html('baby is in neural mode. You can activate music using below player.');
				alertCard.addClass('green-text');
				break;

			case 'cool':
				alertIcon.html('sentiment_dissatisfied');
				alertMessage.html('baby is in SAD mode. System is playing music to make your baby happy.');
				alertCard.addClass('orange-text');
				break;

			case 'cry':
				alertIcon.html('sentiment_very_dissatisfied');
				alertMessage.html('baby is in SAD mode. System is playing music to make your baby happy.');
				alertCard.addClass('red-text');
				break;
		}
	};
};

new p5(audio, "audioContainer");

var player = function (p) {
	p.songList = [
		"twinkle.mp3",
		"rockabyebaby.mp3",
		"hushlittlebaby.mp3",
		"rockabyebaby.mp3",
		"lullabygoodnight.mp3",
	];

	p.loadedSongIndex = 0;
	p.songForCry;

	p.setup = function () {
		p.noCanvas();
		p.playNextSong();

		p.print("audio player loaded");
		// $("#roundPreloader").fadeOut();

		// load song play when baby is crying
		p.songForCry = p.loadSound('../audio/songs/johnsonsbabybathtimesong.mp3');
	};

	p.draw = function () {

		// p.print(p.select('#isBabyCry').value());

		if (p.select('#isBabyCry').value() == 'false') {
			// stop music
			// p.print('system pause music because baby is now cooling down');

			if (p.songForCry.isPlaying()) {
				p.songForCry.pause();
			}

		} else {
			// play music
			// p.print('system play music because baby is crying');

			if (!p.songForCry.isPlaying()) {
				p.songForCry.play();
			}

		}
	};

	p.playNextSong = function () {
		p.print("playing next song");
		// hide prev player
		if (p.loadedSongIndex != 0) {
			p.song.hideControls();
		}

		// load next song
		p.song = p.createAudio("../audio/songs/" + p.songList[p.loadedSongIndex++]);
		p.song.showControls();

		// skip first song for autoplay
		if (p.loadedSongIndex != 1) {
			p.song.play();
		}

		p.song.onended(p.playNextSong);
	};
};

new p5(player, "audioPlayerContainer");
