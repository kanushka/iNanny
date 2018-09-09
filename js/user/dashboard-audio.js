var audio = function (p) {

	// audio variables
	p.mic;
	p.fft;

	p.setup = function () {
		p.createCanvas(400, 300);
		p.noFill();

		p.mic = new p5.AudioIn();
		p.mic.start();
		p.fft = new p5.FFT();
		p.fft.setInput(p.mic);
	}

	p.draw = function () {
		p.background(250);

		var spectrum = p.fft.analyze();

		p.beginShape();
		for (i = 0; i < spectrum.length; i++) {
			p.stroke(0, 200, 0);
			p.vertex(i, p.map(spectrum[i], 0, 255, p.height, 0));
		}
		p.endShape();
	}

};

// new p5(audio, 'audioContainer');
