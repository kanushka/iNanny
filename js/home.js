var BASE_URL = null;
var VALID_EMAIL = false;
var IS_ONGOING_REQUEST = false;

//
// events
//

$(document).ready(function () {
	BASE_URL = $('#baseUrl').val();

	// hide logo preloader
	setTimeout(function () {
		$('#logoPreloader').fadeOut();
	}, 2000);

	// add console banner
	let mainConsoleFontStyleBlack = "font-size:34px; font-weight:200; letter-spacing:0.02em; line-height:1.4em; font-family:helvetica,arial; color:rgba(0,0,0,0.9);";
	let mainConsoleFontStyleGreen = "font-size:34px; font-weight:200; letter-spacing:0.02em; line-height:1.4em; font-family:helvetica,arial; color:#2e7d32;";
	let subConsoleFontStyleBlack = "font-size:14px; font-weight:200; letter-spacing:0.02em; line-height:1.4em; font-family:helvetica,arial; color:rgba(0,0,0,0.9);";
	console.log("%ci%cNanny", mainConsoleFontStyleBlack, mainConsoleFontStyleGreen);
	console.log("%cThis is a browser feature intended for developers.", subConsoleFontStyleBlack);

});

$("#registerBtn").click(function () {
	validateRegisterForm();
});

$('#email').focusout(function () {
	checkRequestedNewEmail();
});

//
// functions
//

function openRegistrationModal() {
	// reset form
	$('#registerForm')[0].reset();
	Materialize.updateTextFields();
	// open model
	$('#registerModalPreloader').hide();
	$('#registerModal').modal('open');
	// scroll to top
	$('#registerModelContent').scrollTop(0);
}

function checkRequestedNewEmail() {
	var email = $('#email').val().trim();

	if (
		!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		)
	) {
		// invalid email
		return;
	}

	IS_ONGOING_REQUEST = true;
	$("#email").removeClass("valid");

	$.post(BASE_URL + "user/request/email", {
			email: email
		},
		function (data, status) {
			// console.log(data);
			IS_ONGOING_REQUEST = false;

			if (data.error) {
				// something went wrong
				VALID_EMAIL = false;

				$("#email")
					.next("label")
					.attr("data-error", "this email address already used");
				$("#email").removeClass("valid");
				$("#email").addClass("invalid");
			} else {
				VALID_EMAIL = true;

				// $("#email")
				//     .next("label")
				//     .attr("data-success", "valid email address");
				// $("#email").removeClass("invalid");
				// $("#email").addClass("valid");
			}
		});
}

function validateRegisterForm() {
	var error = false;

	babyName = $("#babyName")
		.val()
		.trim();
	if (babyName.replace(/\s/g, "") == "") {
		$("#babyName")
			.next("label")
			.attr("data-error", "baby's name required");
		$("#babyName").removeClass("valid");
		$("#babyName").addClass("invalid");
		error = true;
	} else if (babyName.length < 4) {
		$("#babyName")
			.next("label")
			.attr("data-error", "baby's name should be more than 3 letters");
		$("#babyName").removeClass("valid");
		$("#babyName").addClass("invalid");
		error = true;
	} else {
		$("#babyName").removeClass("invalid");
		$("#babyName").addClass("valid");
	}

	firstName = $("#firstName")
		.val()
		.trim();
	if (firstName.replace(/\s/g, "") == "") {
		$("#firstName")
			.next("label")
			.attr("data-error", "parent name required");
		$("#firstName").removeClass("valid");
		$("#firstName").addClass("invalid");
		error = true;
	} else if (firstName.length < 4) {
		$("#firstName")
			.next("label")
			.attr("data-error", "parent name should be more than 3 letters");
		$("#firstName").removeClass("valid");
		$("#firstName").addClass("invalid");
		error = true;
	} else {
		$("#firstName").removeClass("invalid");
		$("#firstName").addClass("valid");
	}

	lastName = $("#lastName")
		.val()
		.trim();
	if (
		lastName.replace(/\s/g, "") != "" &&
		lastName.replace(/\s/g, "") == firstName.replace(/\s/g, "")
	) {
		$("#lastName")
			.next("label")
			.attr("data-error", "parent first name and last name cannot be same");
		$("#lastName").removeClass("valid");
		$("#lastName").addClass("invalid");
		error = true;
	} else if (lastName.replace(/\s/g, "") != "" && lastName.length < 4) {
		$("#lastName")
			.next("label")
			.attr("data-error", "parent name should be more than 3 letters");
		$("#lastName").removeClass("valid");
		$("#lastName").addClass("invalid");
		error = true;
	} else {
		$("#lastName").removeClass("invalid");
		$("#lastName").addClass("valid");
	}


	email = $("#email")
		.val()
		.trim();
	if (email.replace(/\s/g, "") == "") {
		$("#email")
			.next("label")
			.attr("data-error", "email required");
		$("#email").removeClass("valid");
		$("#email").addClass("invalid");
		error = true;
	} else if (
		!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		)
	) {
		$("#email")
			.next("label")
			.attr("data-error", "invalid email address");
		$("#email").removeClass("valid");
		$("#email").addClass("invalid");
		error = true;
	} else if (!VALID_EMAIL) {
		$("#email")
			.next("label")
			.attr("data-error", "this email already used");
		$("#email").removeClass("valid");
		$("#email").addClass("invalid");
		error = true;
	} else {
		$("#email").removeClass("invalid");
		$("#email").addClass("valid");
	}

	if (error) {
		// some fields have errors
		return false;
	} else {
		// register user
		registerUser();
	}
}

function registerUser() {
	var babyName = $("#babyName")
		.val()
		.trim();
	var relationType = $("#relationType").val();
	var firstName = $("#firstName")
		.val()
		.trim();
	var lastName = $("#lastName")
		.val()
		.trim();
	var email = $("#email")
		.val()
		.trim();

	var data = {
		babyName: babyName,
		relationType: relationType,
		firstName: firstName,
		lastName: lastName,
		email: email
	};

	// console.log(data);
	$('#registerModalPreloader').fadeIn();

	$.post(BASE_URL + "user/request",
		data,
		function (data, status) {
			// console.log(data);
			$('#registerModalPreloader').hide();
			if (data.error) {
				// something went wrong

				if (data.hasOwnProperty('error_email')) {
					$("#email")
						.next("label")
						.attr("data-error", "this email already used");
					$("#email").removeClass("valid");
					$("#email").addClass("invalid");
					return;
				}

				Materialize.toast(data.msg, 4000);
			} else {
				// Materialize.toast(data.msg, 4000); //server has warning when sending email
				Materialize.toast(`user successfully registered and confirmation email send to ${email}`, 4000);
				$('#registerModal').modal('close');
			}
		});
}
