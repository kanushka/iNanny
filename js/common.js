var BASE_URL = null;
var DEFAULT_IMG_URL = null;
var BABY_ID = null;
var IS_MOBILE = false; //initiate as false
var IS_STREAM = false;
var IS_NIGHT_VISION_ACTIVE = false; // for development test

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

	deviceDetection();
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

$('#streamVideoSwitch').change(() => {
	IS_STREAM = $('#streamVideoSwitch').prop('checked');
	localStorage.setItem("streamVideoSwitch", IS_STREAM);
});

$('#nightVisionSwitch').change(() => {
	IS_NIGHT_VISION_ACTIVE = $('#nightVisionSwitch').prop('checked');
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

	$('#streamVideoSwitch').prop('checked', (localStorage.getItem("streamVideoSwitch") == "true"));
	IS_STREAM = localStorage.getItem("streamVideoSwitch") == "true";
}

function deviceDetection() {
	// device detection
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
		/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
		IS_MOBILE = true;
		console.log('mobile device detected');
		return true;
	}

	return false;
}
