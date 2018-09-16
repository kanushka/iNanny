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

		p.print('sound model loaded');
	}

	p.draw = function () {
		p.background(255);

		// Get the overall volume (between 0 and 1.0)
		var volume = p.mic.getLevel();
		var shapeColor = 'green';

		// The louder the volume, the color of the spectrum will change
		var threshold = 0.01;
		if (volume > threshold) {
			shapeColor = 'red';
		}

		var spectrum = p.fft.analyze();

		p.beginShape();
		for (i = 0; i < spectrum.length; i++) {
			p.stroke(shapeColor);
			p.vertex(i, p.map(spectrum[i], 0, 255, p.height, 0));
		}
		p.endShape();
	}

};

new p5(audio, 'audioContainer');
