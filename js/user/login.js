//
// events
//

$(document).ready(function () {});

// hide logo preloader

if (deviceDetection()) {
	setTimeout(function () {
		$('#logoPreloader').fadeOut();
	}, 2000);
} else {
	$('#logoPreloader').fadeOut();
}


$("#signInBtn").click(function () {
	validateSignInForm();
});

$("#password").keypress(function (e) {
	if (e.which == 13) {
		// 13 - ENTER key
		if ($("#password").val() != "") {
			if ($("#email").val() != "") {
				$("#submitBtn").click();
				$("#submitBtn").focus();
			} else {
				$("#password").focus();
			}
		}
	}
});

$("#email").keypress(function (e) {
	if (e.which == 13) {
		// 13 - ENTER key
		if ($("#email").val() != "") {
			$("#submitBtn").click();
			$("#submitBtn").focus();
		}
	}
});

//
// functions
//

var validateSignInForm = function () {
	let email = $("#email");
	let password = $("#password");

	if (
		email
		.val()
		.replace(/^\s+|\s+$/gm, "")
		.replace(/\s/g, "") == ""
	) {
		email.next("label").attr("data-error", "email is required");
		email.removeClass("valid");
		email.addClass("invalid");
		email.focus();
		return false;
	} else if (!validateEmail(email.val())) {
		email.next("label").attr("data-error", "invalid email addresss");
		email.removeClass("valid");
		email.addClass("invalid");
		email.focus();
		return false;
	} else {
		email.removeClass("invalid");
		email.addClass("valid");
	}

	if (
		password
		.val()
		.replace(/^\s+|\s+$/gm, "")
		.replace(/\s/g, "") == ""
	) {
		password.next("label").attr("data-error", "password is required");
		password.removeClass("valid");
		password.addClass("invalid");
		password.focus();
		return false;
	}

	// check user credentials
	checkUserCredentials(email.val(), password.val());
};

var checkUserCredentials = function (email, password) {
	console.log("request, user credentials");

	// show sprinner
	$("#signInSprinner").show();

	$.post(
		BASE_URL + "user/credentials", {
			email: email,
			password: password
		},
		function (data, status) {
			console.log(data);
			if (!data.error) {
				// password setup successfully
				window.location.href = BASE_URL + "user/dashboard";
			} else {
				// Materialize.toast(data.msg, 3000);

				// hide sprinner
				$("#signInSprinner").hide();
				if (data.isUser) {
					if (!data.canLogin) {
						// invalid password
						let password = $("#password");
						password.next("label").attr("data-error", data.msg);
						password.removeClass("valid");
						password.addClass("invalid");
						password.focus();
					}
				} else {
					// invalid user
					let email = $("#email");
					email.next("label").attr("data-error", data.msg);
					email.removeClass("valid");
					email.addClass("invalid");
					email.focus();
				}
			}
		}
	);
};
