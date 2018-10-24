var BABY = null;
var RELATIONS = null;
var RELATION_TYPES = null;

// open profile model types
// BABY, OTHER
var OPENED_PROFILE_MODEL_TYPE = 'BABY';

// check relations
var HAS_MOM = false;
var HAS_DAD = false;

// check height/weight model type
var HEIGHT_MODAL_NEW = true;
var WEIGHT_MODAL_NEW = true;

// check image uploading or not
var IS_IMAGE_UPLOADING = false;

//
// events
//

$(document).ready(function () {
	getBabyInfo();
	getRelationsInfo();
});

// baby card edit button click
$('#babyEditBtn').click(function () {
	clearProfileModel('BABY');
	setBabyDetailsToModel(BABY);
	$('#profileModel').modal('open');
});

// new profile add button click
$('#profileAddBtn').click(function () {
	clearProfileModel('OTHER');
	$('#profileModel').modal('open');
});

// handle form change event
$("form :input").change(function () {
	$(this).closest('form').data('changed', true);
	console.log($(this).closest('form'));
});

// new image button click in profile modal
$('#newImageBtn').click(function () {
	$('#imgFile').trigger("click");
});

// when file change then show image file in model image
$('#imgFile').change(function (event) {
	readImageURL(this);
});

// profile save button
$('#saveBtn').click(function () {
	if (OPENED_PROFILE_MODEL_TYPE == 'BABY') {
		// baby data in the profile model
		// save baby data
		if (validateBabyModel()) {
			saveBabyInfo();

			// upload image
			uploadImage('BABY');
		}
	} else {
		// save relation data
		if (validateRelationModel()) {
			saveRelationInfo();

			// upload image
			let relationId = $('#relationId').val().trim();
			uploadImage('RELATION', relationId);
		}
	}
});

// floating button clicks
$('#heightAddBtn').click(function () {
	fillHeightModal();
	HEIGHT_MODAL_NEW = true;
	$('#lastHeightEditBtn').show();
	$('#heightModal').modal('open');
});

$('#heightModalSaveBtn').click(function () {
	if (HEIGHT_MODAL_NEW) {
		// validate baby height
		if (validateBabyHeight('NEW')) {
			// add baby height
			addBabysNewHeight();
		}
	} else {
		// validate baby height
		if (validateBabyHeight('UPDATE')) {
			// update baby height
			updateBabysHeight();
		}

	}
});

$('#lastHeightEditBtn').click(function () {
	$("#lastdayValue").removeAttr('disabled');
	// hide today height section
	HEIGHT_MODAL_NEW = false;
	$("#today").parent().parent().hide();
	$("#todayValue").val('');
	$(this).hide();
});

$('#weightAddBtn').click(function () {
	fillWeightModal();
	WEIGHT_MODAL_NEW = true;
	$('#lastWeightEditBtn').show();
	$('#weightModal').modal('open');
});

$('#weightModalSaveBtn').click(function () {
	if (WEIGHT_MODAL_NEW) {
		// validate baby weight
		if (validateBabyWeight('NEW')) {
			// add baby height
			addBabysNewWeight();
		}
	} else {
		// validate baby weight
		if (validateBabyWeight('UPDATE')) {
			// update baby weight
			updateBabysWeight();
		}
	}
});

$('#lastWeightEditBtn').click(function () {
	$("#lastdayWeightValue").removeAttr('disabled');
	// hide today weight section
	WEIGHT_MODAL_NEW = false;
	$("#todayWeight").parent().parent().hide();
	$("#todayWeightValue").val('');
	$(this).hide();
});



//
// functions
//

function getBabyInfo() {
	console.log('request baby info');
	$.get(BASE_URL + "user/ProfileController/getBabyInfo",
		function (data, status) {
			console.log(data);
			if (data.error) {
				// something went wrong
				return;
			}
			setBabyTitle(data.baby);
			BABY = data.baby;

			// remove pre loader
			$('#roundPreloader').fadeOut();
		});
}

function getRelationsInfo() {
	console.log('request relations info');
	$.get(BASE_URL + "user/ProfileController/getRelationsInfo",
		function (data, status) {
			console.log(data);
			if (data.error) {
				// something went wrong
				return;
			}
			// save relation types
			RELATION_TYPES = relationTypesToObject(data.types);

			// save relations
			RELATIONS = relationsToObject(data.relations);

			// clear card row
			$('.family-card-section').empty();

			// add relation cards to view
			for (let key in data.relations) {
				if (data.relations.hasOwnProperty(key)) {
					addRelationCard(data.relations[key]);
				}
			}
		});
}

function relationTypesToObject(types) {
	let object = {};
	for (const key in types) {
		if (types.hasOwnProperty(key)) {
			object[types[key].id] = types[key].title;
		}
	}
	return object;
}

function relationsToObject(relations) {
	let object = {};
	for (const key in relations) {
		if (relations.hasOwnProperty(key)) {
			object[relations[key].id] = relations[key];

			// check baby relation has mother and dad
			// hard code way
			// have implement dynamic way
			// 201 - mother
			// 202 - father
			if (!HAS_MOM && relations[key].relation_types_id == 201) {
				HAS_MOM = true;
			}
			if (!HAS_DAD && relations[key].relation_types_id == 202) {
				HAS_DAD = true;
			}
		}
	}
	return object;
}

function readImageURL(input) {
	if (input.files && input.files[0]) {
		let reader = new FileReader();

		reader.onload = function (e) {
			$('#modelImg').attr('src', e.target.result);
		}

		reader.readAsDataURL(input.files[0]);
	}
}

function setBabyTitle(baby) {
	let babyName = $('#babyName');
	let babyAge = $('#babyAge');
	let babyHeight = $('#babyHeight');
	let babyWeight = $('#babyWeight');
	let babyImg = $('#babyImg');

	if (baby.first_name != null) {
		babyName.html(`${capitalizeWord(baby.first_name)}`);
	}

	if (baby.birthday != null) {
		babyAge.html(`${getAge(baby.birthday)}`);
	} else {
		babyAge.empty();
	}

	if (baby.height != null) {
		babyHeight.html(`${baby.height} cm`);
		babyHeight.parent('.card-title-group').show();
	} else {
		babyHeight.empty();
		babyHeight.parent('.card-title-group').hide();
	}

	if (baby.weight != null) {
		babyWeight.html(`${baby.weight} kg`);
		babyWeight.parent('.card-title-group').show();
	} else {
		babyWeight.empty();
		babyWeight.parent('.card-title-group').hide();
	}

	if (baby.image_url != null) {
		babyImg.attr("src", baby.image_url);
	} else {
		babyImg.attr("src", DEFAULT_IMG_URL);
	}

}

function clearProfileModel(mode) {
	$('#profileForm')[0].reset();
	$('#modelImg').attr("src", DEFAULT_IMG_URL);
	$('#relationId').val(''); // remove loaded relation id
	Materialize.updateTextFields();

	switch (mode) {
		case 'BABY':
			$('#relationType').parent().parent().hide();
			$('#gender').parent().parent().show();
			$('#birthday').parent().parent().show();
			$('#email').parent().parent().hide();
			break;
		default:
			$('#relationType').parent().parent().show();
			$('#gender').parent().parent().hide();
			$('#birthday').parent().parent().hide();
			$('#email').parent().parent().show();
			$('#profileModalTitle').html(`Add New Relations' info.`);
	}

	$('#profileModelContent').scrollTop();

	$('#profileModelPreloader').fadeOut();
	IS_IMAGE_UPLOADING = false;

	OPENED_PROFILE_MODEL_TYPE = mode;
}

function setBabyDetailsToModel(baby) {
	let babyFirstName = $('#firstName');
	let babyLastName = $('#lastName');
	let babyBirthday = $('#birthday');
	let babyGender = $('#gender');
	let babyNote = $('#note');
	let babyImg = $('#modelImg');

	// set title
	if (baby.first_name != null) {
		$('#profileModalTitle').html(`Edit Baby ${capitalizeWord(baby.first_name)} info.`);
	}
	// set fields
	if (baby.first_name != null) {
		babyFirstName.val(`${capitalizeWord(baby.first_name)}`);
	}
	if (baby.last_name != null) {
		babyLastName.val(`${capitalizeWord(baby.last_name)}`);
	}
	if (baby.gender != null) {
		babyGender.val(baby.gender);
	}
	if (baby.birthday != null) {
		babyBirthday.pickadate('picker').set('select', new Date(baby.birthday))
	}
	if (baby.note != null) {
		babyNote.val(`${baby.note}`);
	}
	if (baby.image_url != null) {
		babyImg.attr("src", baby.image_url);
	} else {
		babyImg.attr("src", DEFAULT_IMG_URL);
	}

	Materialize.updateTextFields();
	babyNote.trigger('autoresize');
	$('select').material_select();
}

function getAge(dateString) {
	let today = new Date();
	let birthday = new Date(dateString);

	let years = today.getFullYear() - birthday.getFullYear();
	let months = today.getMonth() - birthday.getMonth();
	let dates = today.getDate() - birthday.getDate();

	if (months === 0 && today.getDate() < birthday.getDate()) {
		years--;
	} else if (months < 0) {
		years--;
		months = 12 + months;
	}

	if (dates < 0) {
		months--;
		dates = 30 + dates;
	}

	// create age string
	let returnStr = '';

	if (years != 0) {
		returnStr += `${years} years`;
	}

	if (months != 0) {
		returnStr += ` ${months} months`;
	}

	if (years == 0 || months == 0) {
		returnStr += ` ${dates} dates`;
	}

	return returnStr;
}

function validateBabyModel() {
	let error = false;
	let firstName = $("#firstName")
		.val()
		.trim();
	if (firstName.replace(/\s/g, "") == "") {
		$("#firstName")
			.next("label")
			.attr("data-error", "baby name required");
		$("#firstName").removeClass("valid");
		$("#firstName").addClass("invalid");
		error = true;
	} else if (firstName.length < 4) {
		$("#firstName")
			.next("label")
			.attr("data-error", "baby name should be more than 3 letters");
		$("#firstName").removeClass("valid");
		$("#firstName").addClass("invalid");
		error = true;
	} else {
		$("#firstName").removeClass("invalid");
		$("#firstName").addClass("valid");
	}

	let lastName = $("#lastName")
		.val()
		.trim();
	if (
		lastName.replace(/\s/g, "") != "" &&
		lastName.replace(/\s/g, "") == firstName.replace(/\s/g, "")
	) {
		$("#lastName")
			.next("label")
			.attr("data-error", "baby first name and last name cannot be same");
		$("#lastName").removeClass("valid");
		$("#lastName").addClass("invalid");
		error = true;
	} else if (lastName.replace(/\s/g, "") != "" && lastName.length < 4) {
		$("#lastName")
			.next("label")
			.attr("data-error", "baby name should be more than 3 letters");
		$("#lastName").removeClass("valid");
		$("#lastName").addClass("invalid");
		error = true;
	} else {
		$("#lastName").removeClass("invalid");
		$("#lastName").addClass("valid");
	}

	let birthday = $('#birthday').val();
	if (birthday == null || birthday == '') {
		Materialize.toast('Baby\'s birthday required', 4000);
		error = true;
	}

	return !error;
}

function saveBabyInfo() {
	console.log('saving baby info');
	$('#profileModelPreloader').fadeIn();

	let babyFirstName = $('#firstName').val().trim();
	let babyLastName = $('#lastName').val().trim();
	let babyBirthday = $('#birthday').pickadate('picker').get('select', 'yyyy-mm-dd');
	let babyGender = $('#gender').val();
	let babyNote = $('#note').val().trim();

	$.post(BASE_URL + "user/ProfileController/updateBabyInfo", {
			firstName: babyFirstName,
			lastName: babyLastName,
			birthday: babyBirthday,
			gender: babyGender,
			note: babyNote,
		},
		function (data, status) {
			console.log(data);
			if (!IS_IMAGE_UPLOADING) {
				$('#profileModelPreloader').fadeOut();
			}

			if (data.error) {
				Materialize.toast(data.msg, 4000);
				return;
			}

			// close modal and update tile
			Materialize.toast(data.msg, 4000);
			$('#profileModel').modal('close');
			getBabyInfo();
		});
}

/**
 * upload image for profile
 * 
 * @param type type can be BABY or RELATION
 * @param relationId if type is RELATION this field should be relationId
 */
function uploadImage(type = 'BABY', profileId = null) {

	let file_data = $('#imgFile').prop('files')[0];

	if (!file_data) {
		console.log('no image to upload');
		IS_IMAGE_UPLOADING = false;
		return false;
	}

	IS_IMAGE_UPLOADING = true;

	let form_data = new FormData();

	form_data.append('file', file_data);
	form_data.append('path', '/images/profiles');

	form_data.append('imageType', type);
	form_data.append('profileId', profileId);

	console.log('uploading profile image..');

	$.ajax({
		url: BASE_URL + 'user/profile/upload/image', // point to server-side controller method
		dataType: 'text', // what to expect back from the server
		cache: false,
		contentType: false,
		processData: false,
		data: form_data,
		type: 'post',
		success: function (response) {
			try {
				response = JSON.parse(response);
				console.log(response);
				Materialize.toast(response.msg, 4000);

			} catch (e) {
				Materialize.toast(response.msg, 4000);
			}

			IS_IMAGE_UPLOADING = false;
			$('#profileModelPreloader').fadeOut();
		},
		error: function (response) {
			console.log(response);

			IS_IMAGE_UPLOADING = false;
			$('#profileModelPreloader').fadeOut();
		}
	});

};

function addRelationCard(user) {
	let card = $('#userCardTemplate').clone(true).prop('id', `userCard_${user.id}`);

	let img = card.find('.userImg');
	if (user.image_url != null) {
		img.attr("src", user.image_url);
	} else {
		img.attr("src", DEFAULT_IMG_URL);
	}

	card.find('.userName').html(capitalizeWord(user.first_name));
	card.find('.userRelation').html(capitalizeWord(RELATION_TYPES[user.relation_types_id]));

	if (user.contact == null || user.contact == '') {
		// no contact
		// show email
		card.find('.userContactLable').hide();
		card.find('.userContact').hide();
	} else {
		card.find('.userContactLable').html('Contact');
		card.find('.userContact').html(user.contact);
	}

	if (user.status != 2) {
		card.find('.invited-batch').hide();
	}

	card.find('.userCardEditBtn').attr("onclick", `editRelation(${user.id})`);

	card.removeAttr('hidden');
	$('.family-card-section').append(card);
}


function editRelation(relationId) {
	let relation = RELATIONS[relationId];
	if (relation == undefined) {
		return;
	}

	// clear and fill profile modal
	clearProfileModel('OTHER');

	let firstName = $('#firstName');
	let lastName = $('#lastName');
	let email = $('#email');
	let contact = $('#contact');
	let note = $('#note');
	let img = $('#modelImg');

	$('#relationId').val(relationId);

	// set title
	if (relation.first_name != null) {
		$('#profileModalTitle').html(`Edit ${capitalizeWord(relation.first_name)} info.`);
	}

	if (relation.first_name != null) {
		firstName.val(`${capitalizeWord(relation.first_name)}`);
	}
	if (relation.last_name != null) {
		lastName.val(`${capitalizeWord(relation.last_name)}`);
	}
	if (relation.email != null) {
		email.val(`${relation.email}`);
	}
	if (relation.contact != null) {
		contact.val(`${relation.contact}`);
	}
	if (relation.note != null) {
		note.val(`${relation.note}`);
	}
	if (relation.image_url != null) {
		img.attr("src", relation.image_url);
	} else {
		img.attr("src", DEFAULT_IMG_URL);
	}

	$("#relationType").val(`${relation.relation_types_id}`);

	Materialize.updateTextFields();
	note.trigger('autoresize');
	$('select').material_select();

	// show profile modal
	$('#profileModel').modal('open');
}

function validateRelationModel() {
	let error = false;
	let firstName = $("#firstName")
		.val()
		.trim();
	if (firstName.replace(/\s/g, "") == "") {
		$("#firstName")
			.next("label")
			.attr("data-error", "name required");
		$("#firstName").removeClass("valid");
		$("#firstName").addClass("invalid");
		error = true;
	} else if (firstName.length < 4) {
		$("#firstName")
			.next("label")
			.attr("data-error", "name should be more than 3 letters");
		$("#firstName").removeClass("valid");
		$("#firstName").addClass("invalid");
		error = true;
	} else {
		$("#firstName").removeClass("invalid");
		$("#firstName").addClass("valid");
	}

	let lastName = $("#lastName")
		.val()
		.trim();
	if (
		lastName.replace(/\s/g, "") != "" &&
		lastName.replace(/\s/g, "") == firstName.replace(/\s/g, "")
	) {
		$("#lastName")
			.next("label")
			.attr("data-error", "first name and last name cannot be same");
		$("#lastName").removeClass("valid");
		$("#lastName").addClass("invalid");
		error = true;
	} else if (lastName.replace(/\s/g, "") != "" && lastName.length < 4) {
		$("#lastName")
			.next("label")
			.attr("data-error", "name should be more than 3 letters");
		$("#lastName").removeClass("valid");
		$("#lastName").addClass("invalid");
		error = true;
	} else {
		$("#lastName").removeClass("invalid");
		$("#lastName").addClass("valid");
	}


	let email = $("#email")
		.val()
		.trim();
	if (email.replace(/\s/g, "") == "") {
		$("#email")
			.next("label")
			.attr("data-error", "email required");
		$("#email").removeClass("valid");
		$("#email").addClass("invalid");
		error = true;
	} else if (!validateEmail(email)) {
		$("#email")
			.next("label")
			.attr("data-error", "invalid email address");
		$("#email").removeClass("valid");
		$("#email").addClass("invalid");
		error = true;
	} else {
		$("#email").removeClass("invalid");
		$("#email").addClass("valid");
	}


	let contact = $("#contact")
		.val()
		.trim();
	if (contact.replace(/\s/g, "") == "") {
		$("#contact")
			.next("label")
			.attr("data-error", "contact number required");
		$("#contact").removeClass("valid");
		$("#contact").addClass("invalid");
		error = true;
	} else if (!validContactNum(contact)) {
		$("#contact")
			.next("label")
			.attr("data-error", "invalid contact number");
		$("#contact").removeClass("valid");
		$("#contact").addClass("invalid");
		error = true;
	} else {
		$("#contact").removeClass("invalid");
		$("#contact").addClass("valid");
	}

	return !error;
}

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function validContactNum(num) {
	var re = /^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
	return re.test(num);
}

function saveRelationInfo() {
	console.log('saving relation info');
	$('#profileModelPreloader').fadeIn();

	let relationId = $('#relationId').val().trim();
	let firstName = $('#firstName').val().trim();
	let lastName = $('#lastName').val().trim();
	let email = $('#email').val().trim();
	let contact = $('#contact').val().trim();
	let Note = $('#note').val().trim();
	let relationType = $('#relationType').find(":selected").val();

	// url for update relation
	let requestUrl = `${BASE_URL}user/ProfileController/updateRelationInfo/${relationId}`;
	if (relationId == '') {
		// new relation
		// url for new relation
		requestUrl = `${BASE_URL}user/ProfileController/addBabysRelation`;
	}

	$.post(requestUrl, {
			firstName: firstName,
			lastName: lastName,
			email: email,
			contact: contact,
			note: Note,
			relationType: relationType
		},
		function (data, status) {
			console.log(data);
			if (!IS_IMAGE_UPLOADING) {
				$('#profileModelPreloader').fadeOut();
			}

			if (data.error) {
				Materialize.toast(data.msg, 4000);
				return;
			}

			// close modal and update tile
			Materialize.toast(data.msg, 4000);
			$('#profileModel').modal('close');
			getRelationsInfo();
		});
}

function fillHeightModal() {
	let baby = BABY;
	let lastdate = $('#lastday');
	let lastHeight = $('#lastdayValue');
	let today = $('#today');
	let todayHeight = $('#todayValue');

	// set last day fields
	if (baby.height != null) {
		lastHeight.val(baby.height);
		lastdate.parent().parent().show();
	} else {
		// no last date
		// hide last date div
		lastdate.parent().parent().hide();
	}
	if (baby.height_date != null) {
		lastdate.pickadate('picker').set('select', new Date(baby.height_date));
	}

	// set today fields
	today.parent().parent().show();
	todayHeight.val('');
	today.pickadate('picker').set('select', new Date());

	Materialize.updateTextFields();
}

function validateBabyHeight(mode) {
	let error = false;
	let height = null;

	switch (mode) {
		case 'UPDATE':
			height = $("#lastdayValue");
			break;
		case 'NEW':
			height = $("#todayValue");
			break;
		default:
			return false;
	}

	if (height.val().trim().replace(/\s/g, "") == "") {
		height
			.next("label")
			.attr("data-error", "height required");
		height.removeClass("valid");
		height.addClass("invalid");
		error = true;
	} else if (isNaN(height.val().trim())) {
		height
			.next("label")
			.attr("data-error", "invalid height value");
		height.removeClass("valid");
		height.addClass("invalid");
		error = true;
	} else if (height.val().trim() < 20 && height.val().trim() > 70) {
		height
			.next("label")
			.attr("data-error", "this is imposible value for height");
		height.removeClass("valid");
		height.addClass("invalid");
		error = true;
	} else {
		height.removeClass("invalid");
		height.addClass("valid");
	}

	return !error;
}


function addBabysNewHeight() {

	let height = $('#todayValue').val().trim();
	$('#heightModelPreloader').fadeIn();

	$.post(`${BASE_URL}user/ProfileController/addBabyHeight`, {
			height: height
		},
		function (data, status) {
			console.log(data);

			$('#heightModelPreloader').fadeOut();

			if (data.error) {
				Materialize.toast(data.msg, 4000);
				return;
			}

			// close modal and update tile
			Materialize.toast(data.msg, 4000);
			$('#heightModal').modal('close');
			getBabyInfo();
		});
}

function updateBabysHeight() {

	let height = $('#lastdayValue').val().trim();

	$('#heightModelPreloader').fadeIn();

	$.post(`${BASE_URL}user/ProfileController/updateBabyHeight`, {
			height: height
		},
		function (data, status) {
			console.log(data);
			$('#heightModelPreloader').fadeOut();

			if (data.error) {
				Materialize.toast(data.msg, 4000);
				return;
			}

			// close modal and update tile
			Materialize.toast(data.msg, 4000);
			$('#heightModal').modal('close');
			getBabyInfo();
		});
}

function fillWeightModal() {
	let baby = BABY;
	let lastdate = $('#lastdayWeight');
	let lastWeight = $('#lastdayWeightValue');
	let today = $('#todayWeight');
	let todayWeight = $('#todayWeightValue');

	// set last day fields
	if (baby.weight != null) {
		lastWeight.val(baby.weight);
		lastdate.parent().parent().show();
	} else {
		// no last date
		// hide last date div
		lastdate.parent().parent().hide();
	}
	if (baby.weight_date != null) {
		lastdate.pickadate('picker').set('select', new Date(baby.weight_date));
	}

	// set today fields
	today.parent().parent().show();
	todayWeight.val('');
	today.pickadate('picker').set('select', new Date());

	Materialize.updateTextFields();
}

function validateBabyWeight(mode) {
	let error = false;
	let weight = null;

	switch (mode) {
		case 'UPDATE':
			weight = $("#lastdayWeightValue");
			break;
		case 'NEW':
			weight = $("#todayWeightValue");
			break;
		default:
			return false;
	}

	if (weight.val().trim().replace(/\s/g, "") == "") {
		weight
			.next("label")
			.attr("data-error", "weight required");
		weight.removeClass("valid");
		weight.addClass("invalid");
		error = true;
	} else if (isNaN(weight.val().trim())) {
		weight
			.next("label")
			.attr("data-error", "invalid weight value");
		weight.removeClass("valid");
		weight.addClass("invalid");
		error = true;
	} else if (weight.val().trim() < 1 && weight.val().trim() > 10) {
		weight
			.next("label")
			.attr("data-error", "this is imposible value for weight");
		weight.removeClass("valid");
		weight.addClass("invalid");
		error = true;
	} else {
		weight.removeClass("invalid");
		weight.addClass("valid");
	}

	return !error;
}


function addBabysNewWeight() {

	let weight = $('#todayWeightValue').val().trim();

	$('#weightModelPreloader').fadeIn();

	$.post(`${BASE_URL}user/ProfileController/addBabyWeight`, {
			weight: weight
		},
		function (data, status) {
			console.log(data);
			$('#weightModelPreloader').fadeOut();

			if (data.error) {
				Materialize.toast(data.msg, 4000);
				return;
			}

			// close modal and update tile
			Materialize.toast(data.msg, 4000);
			$('#weightModal').modal('close');
			getBabyInfo();
		});
}

function updateBabysWeight() {

	let weight = $('#lastdayWeightValue').val().trim();

	$('#weightModelPreloader').fadeIn();

	$.post(`${BASE_URL}user/ProfileController/updateBabyWeight`, {
			weight: weight
		},
		function (data, status) {
			console.log(data);
			$('#weightModelPreloader').fadeOut();

			if (data.error) {
				Materialize.toast(data.msg, 4000);
				return;
			}

			// close modal and update tile
			Materialize.toast(data.msg, 4000);
			$('#weightModal').modal('close');
			getBabyInfo();
		});
}
