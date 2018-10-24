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
		p.showAlert('neutral');
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

// detect device
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
	/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {

	// mobile device detected
	$("#roundPreloader").fadeOut();
} else {
	console.log('load sound level model');
	new p5(audio, "audioContainer");
}

var player = function (p) {
	p.songList = [
		"Twinkle.mp3",
		"RockabyeBaby.mp3",
		"PrettyLittleHorses.mp3",
		"LullabyGoodnight.mp3",
	];

	p.loadedSongIndex = 0;
	p.songForCry;

	p.setup = function () {
		p.noCanvas();
		p.playNextSong();

		p.print("audio player loaded");
		// $("#roundPreloader").fadeOut();

		// load song play when baby is crying
		p.songForCry = p.loadSound('../audio/songs/JohnsonsBabyBathTimeSong.mp3');
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
