var BASE_URL = null;
var DEFAULT_IMG_URL = null;
var BABY_ID = null;

//
// events
//

$(document).ready(function () {
	BASE_URL = $("#baseUrl").val();
	BABY_ID = $("#babyId").val();
	DEFAULT_IMG_URL = `${BASE_URL}img/profile/sample_img.jpg`;

	// initialize material elements
	$('.modal').modal();

	// add console banner
	let mainConsoleFontStyleBlack = "font-size:34px; font-weight:200; letter-spacing:0.02em; line-height:1.4em; font-family:helvetica,arial; color:rgba(0,0,0,0.9);";
	let mainConsoleFontStyleGreen = "font-size:34px; font-weight:200; letter-spacing:0.02em; line-height:1.4em; font-family:helvetica,arial; color:#2e7d32;";
	let subConsoleFontStyleBlack = "font-size:14px; font-weight:200; letter-spacing:0.02em; line-height:1.4em; font-family:helvetica,arial; color:rgba(0,0,0,0.9);";
	console.log("%ci%cNanny", mainConsoleFontStyleBlack, mainConsoleFontStyleGreen);
	console.log("%cThis is a browser feature intended for developers.", subConsoleFontStyleBlack);

	// initialize settings
	initializeSettings();
});


// logout user
$('.logoutBtn').click(function () {
	$.post(BASE_URL + "user/logout", {},
		function (data, status) {
			if (status) {
				if (data.error) {
					Materialize.toast(`Something went wrong. cannot logout user now.`, 4000);
				} else {
					window.location.href = BASE_URL + "user/login";
				}
			}
		});
});

$('#safeZoneSwitch').change(() => {
	localStorage.setItem("safeZoneSwitch", $('#safeZoneSwitch').prop('checked'));
});

$('#poseKeyPointSwitch').change(() => {
	localStorage.setItem("poseKeyPointSwitch", $('#poseKeyPointSwitch').prop('checked'));
});

$('#skeletonSwitch').change(() => {
	localStorage.setItem("skeletonSwitch", $('#skeletonSwitch').prop('checked'));
});

$('#smsAlertSwitch').change(() => {
	localStorage.setItem("smsAlertSwitch", $('#smsAlertSwitch').prop('checked'));
});

$('#callAlertSwitch').change(() => {
	localStorage.setItem("callAlertSwitch", $('#callAlertSwitch').prop('checked'));
});

//
// functions
//

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function capitalizeWord(string) {
	if (string == null || string == '') {
		return '';
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function titleCase(str) {
	if (str == null || str == '') {
		return '';
	}
	return str.toLowerCase().split(' ').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
}

function initializeSettings() {
	$('#safeZoneSwitch').prop('checked', (localStorage.getItem("safeZoneSwitch") == "true"));
	$('#poseKeyPointSwitch').prop('checked', (localStorage.getItem("poseKeyPointSwitch") == "true"));
	$('#skeletonSwitch').prop('checked', (localStorage.getItem("skeletonSwitch") == "true"));

	$('#smsAlertSwitch').prop('checked', (localStorage.getItem("smsAlertSwitch") == "true"));
	$('#callAlertSwitch').prop('checked', (localStorage.getItem("callAlertSwitch") == "true"));
}
