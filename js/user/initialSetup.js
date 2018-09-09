//
// events
//

$(document).ready(function() {
	
});

$("#submitBtn").click(function() {
	validatePasswordSetupForm();
});

$("#password").keypress(function(e) {
	if (e.which == 13) {
		// 13 - ENTER key
		if ($("#password").val() != "") {
			if ($("#confirmPassword").val() != "") {
				$("#submitBtn").click();
				$("#submitBtn").focus();
			} else {
				$("#password").focus();
			}
		}
	}
});

$("#confirmPassword").keypress(function(e) {
	if (e.which == 13) {
		// 13 - ENTER key
		if ($("#confirmPassword").val() != "") {
			$("#submitBtn").click();
			$("#submitBtn").focus();
		}
	}
});

//
// functions
//

var validatePasswordSetupForm = function() {
	var password = $("#password");
	var confirmPassword = $("#confirmPassword");

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
	} else if (password.val().length < 8) {
		password
			.next("label")
			.attr("data-error", "passwords must be at least 8 characters");
		password.removeClass("valid");
		password.addClass("invalid");
		password.focus();
		return false;
	} else if (!/[0-9]/.test(password.val())) {
		password
			.next("label")
			.attr("data-error", "password must contain at least one number");
		password.removeClass("valid");
		password.addClass("invalid");
		password.focus();
		return false;
	} else if (!/[a-z]/.test(password.val())) {
		password
			.next("label")
			.attr(
				"data-error",
				"password must contain at least one lowercase letter"
			);
		password.removeClass("valid");
		password.addClass("invalid");
		password.focus();
		return false;
	} else if (!/[A-Z]/.test(password.val())) {
		password
			.next("label")
			.attr(
				"data-error",
				"password must contain at least one uppercase letter"
			);
		password.removeClass("valid");
		password.addClass("invalid");
		password.focus();
		return false;
	} else {
		password.removeClass("invalid");
		password.addClass("valid");
	}

	if (
		confirmPassword
			.val()
			.replace(/^\s+|\s+$/gm, "")
			.replace(/\s/g, "") == ""
	) {
		confirmPassword
			.next("label")
			.attr("data-error", "conifrm password is required");
		confirmPassword.removeClass("valid");
		confirmPassword.addClass("invalid");
		confirmPassword.focus();
		return false;
	} else if (password.val() !== confirmPassword.val()) {
		confirmPassword
			.next("label")
			.attr("data-error", "confirm password does not match the password");
		confirmPassword.removeClass("valid");
		confirmPassword.addClass("invalid");
		confirmPassword.focus();
		return false;
	} else {
		confirmPassword.removeClass("invalid");
		confirmPassword.addClass("valid");
	}

	// check current partner id
	let relationId = $("#relationId").val();

	if (relationId == null || relationId == "") {
		Materialize.toast("Something went wrong. cannot setup your password", 3000);
		return false;
	}

	// set partner password
	setUserPassword(relationId, password.val());
};

var setUserPassword = function(relationId, password) {
	console.log("request, set new password");

	// show sprinner
	$("#signInSprinner").show();

	$.post(
		BASE_URL + `user/${relationId}/password`,
		{
			password: password
		},
		function(data, status) {
			console.log(data);
			if (!data.error) {
				// password setup successfully
				window.location.href = BASE_URL + "user/dashboard";
			} else {
				// invalid user
				Materialize.toast(data.msg, 3000);

				// hide sprinner
				$("#signInSprinner").hide();
			}
		}
	);
};
