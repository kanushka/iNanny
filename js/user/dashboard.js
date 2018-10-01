var STREAM_URL = null

//
// events
//

$(document).ready(function () {
	// $("#roundPreloader").fadeOut();

	// set babies status
	setTimeout(setBabysActivity, 1000);

	getBabyStream();

	if (IS_MOBILE) {
		//  remove video element
		$('#dashboardVideoScript').remove();
	}
});

$('#streamBtn').click((e) => {
	if (IS_MOBILE) {
		// open stream page
		console.log('opening stream page');
		var win = window.open(STREAM_URL, '_blank');
		if (win) {
			//Browser has allowed it to be opened
			win.focus();
		} else {
			//Browser has blocked it
			alert('Please allow popups for this website');
		}					
	}
});

// 
// functions
//


function setBabysActivity() {
	// get baby's current status

	// set baby status
	console.log('setting baby status...');
	$.post(`${BASE_URL}babies/activities`, {
			status: status
		},
		function (data, status) {
			console.log(data);

		});
}

function getBabyStream() {
	// get baby's current status

	// set baby status
	console.log('getting baby stream...');
	$.get(`${BASE_URL}babies/stream`,
		function (data, status) {
			if (!data.error) {
				STREAM_URL = data.url + data.key;
				console.log('stream url', STREAM_URL);

				if (!IS_MOBILE) {					
					// open stream page
					console.log('opening stream page');
					var win = window.open(STREAM_URL, '_blank');
					if (win) {
						//Browser has allowed it to be opened
						win.focus();
					} else {
						//Browser has blocked it
						alert('Please allow popups for this website');
					}					
				}
			}
		});
}
