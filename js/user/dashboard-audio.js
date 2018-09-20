var audio = function (p) {
	// audio variables
	p.mic;
	p.fft;

	p.setup = function () {
		p.createCanvas(360, 200);
		p.noFill();

		p.mic = new p5.AudioIn();
		p.mic.start();
		p.fft = new p5.FFT();
		p.fft.setInput(p.mic);

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

				}
			}
		}
		p.endShape();
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

	p.setup = function () {
		p.noCanvas();
		p.playNextSong();

		p.print("audio player loaded");
		// $("#roundPreloader").fadeOut();
	};

	p.draw = function () {};

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
