<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
	<!DOCTYPE html>
	<html lang="en">

	<head>
		<title>iNanny</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<?php $this->load->view('common/commonHeader');?>
		<link type="text/css" rel="stylesheet" href="<?php echo base_url(); ?>css/cropper.css" />

	</head>

	<style>
		.firstContent {
			margin-top: 150px;
		}

		.card-group-title {
			font-size: 18px;
			padding-top: 20px;
			padding-left: 10px;
		}

		.card-sub-title {
			/* font-weight: bold; */
		}

		.fixed-action-btn {
			z-index: 9;
		}

		.card.medium {
			height: inherit;
		}

		@media (max-width: 768px) {
			.flex-s {
				display: flex;
				flex-direction: column;
				/* Stack on top */
			}

			.box-a {
				order: 2;
				/* Go down, bring Box B up */
			}

			.box-c {
				order: 3;
				/* Go down, bring Box B up */
			}
		}

		.userRelation {
			margin-top: -5px;
			color: #388e3c;
			/* margin-bottom: 5px; */
		}

		span.invited-batch {
			color: white;
			background-color: #388e3c;
			padding: 5px;
			border-radius: 4px;
			font-size: small;
		}

		.hand-cursor {
			cursor: pointer;
		}

		#modelImg {
			max-width: 100%;
		}

	</style>

	<body>
		<?php $this->load->view('common/commonTopNav.php');?>

		<div class="container   firstContent">

			<div class="fixed-action-btn">
				<a class="btn-floating btn-large waves-effect waves-light red">
					<i class="material-icons">add</i>
				</a>
				<ul>
					<li>
						<a id="profileAddBtn" class="btn-floating yellow darken-2 tooltipped" data-position="left" data-tooltip="Add Babys' New Relations">
							<i class="material-icons">person_add</i>
						</a>
					</li>
					<li>
						<a id="heightAddBtn" class="btn-floating green tooltipped" data-position="left" data-tooltip="Add Babys' Height">
							<i class="material-icons">equalizer</i>
						</a>
					</li>
					<li>
						<a id="weightAddBtn" class="btn-floating blue tooltipped" data-position="left" data-tooltip="Add Babys' Weight">
							<i class="material-icons">fitness_center</i>
						</a>
					</li>
				</ul>
			</div>

			<div class="row">
				<div class="col s12 m5 l4 animated fadeIn">
					<div class="card medium">
						<div class="card-image">
							<img id="babyImg" src="<?php echo base_url(); ?>img/profile/sample_img.jpg">
							<!-- <a class="btn-floating halfway-fab waves-effect waves-light green modal-trigger"
                       href="#profileModel"><i class="material-icons">edit</i></a> -->
						</div>
						<div class="card-content">
							<span class="card-title activator grey-text text-darken-4">
								<span id="babyName">Baby Name</span>
								<i class="material-icons right" id="babyEditBtn">more_vert</i>
							</span>
							<div class="row">
								<span class="col s4 card-sub-title">Age</span>
								<span class="col s8" id="babyAge">0</span>
								<div class="card-title-group">
									<span class="col s4 card-sub-title">Height</span>
									<span class="col s8" id="babyHeight">0</span>
								</div>
								<div class="card-title-group">
									<span class="col s4 card-sub-title">Weight</span>
									<span class="col s8" id="babyWeight">0</span>
									<!-- <span class="col s12" id="babySleepStatus">Last sleeped at 2 hours ago</span> -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- relation card template -->
			<div id="userCardTemplate" hidden>
				<div class="col s12 m5 l4 animated fadeIn">
					<div class="card small">
						<div class="card-image">
							<img class="userImg" src="<?php echo base_url(); ?>img/profile/sample_img.jpg">
						</div>
						<div class="card-content">
							<span class="card-title activator grey-text text-darken-4">
								<span class="userName">Profile Name</span>
								<span class="invited-batch">Invited</span>
								<i class="material-icons right userCardEditBtn">more_vert</i>
							</span>
							<div class="row">
								<span class="col s12 userRelation">Father</span>
								<span class="col s4 userContactLable">Contact</span>
								<span class="col s8 userContact">071 879 4546</span>
								<!-- <span class="col s12" id="babySleepStatus">Last sleeped at 2 hours ago</span> -->
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="divider"></div>
			<div class="section card-group-title">
				<p>Family Members' Info</p>
			</div>
			<div class="row family-card-section">
			</div>

			<!-- profile view models -->
			<div id="profileModel" class="modal modal-fixed-footer">
				<div id="profileModelContent" class="modal-content">

					<div class="col s12">
						<p id="profileModalTitle" style="font-size: 24px; color: #4A4A4A; margin-bottom: 15px; text-align: left;">Edit Babys' Info</p>
					</div>

					<form class="col s12" id="profileForm">
						<div class="row flex-s">
							<div class="col s12 m6 l6 box-a">
								<div class="row">
									<!-- hidden variables -->
									<input id="relationId" type="hidden">
									<!-- showing contents -->
									<div class="input-field col s12">
										<select id="relationType">
											<option value="201" selected>Mother</option>
											<option value="202">Father</option>
											<option value="203">Nanny</option>
										</select>
									</div>
									<div class="input-field col s12">
										<input name="firstName" id="firstName" type="text" class="validate" maxlength="50">
										<label for="firstName">First name</label>
									</div>
									<div class="input-field col s12">
										<input name="lastName" id="lastName" type="text" class="validate" maxlength="50">
										<label for="lastName">Last Name</label>
									</div>
									<div class="input-field col s12">
										<select id="gender">
											<option value="" selected disabled>Select Gender</option>
											<option value="0">Girl</option>
											<option value="1">Boy</option>
										</select>
									</div>
								</div>
								<div class="row">
									<div class="input-field col s12">
										<input class="datepicker" name="birthday" id="birthday" type="text" class="validate">
										<label for="birthday">Birthday</label>
									</div>
								</div>
							</div>

							<div class="col s12 m6 l6 box-b">
								<div class="card">
									<div class="card-image">
										<img id="modelImg" src="<?php echo base_url(); ?>img/profile/sample_img.jpg">
										<input id="imgFile" type="file" style="display: none;" />
										<a id="newImageBtn" class="btn-floating halfway-fab waves-effect waves-light green">
											<i class="material-icons">photo_camera</i>
										</a>
									</div>
								</div>
							</div>



							<div class="col s12 box-c">
								<div class="row">
									<div class="input-field col s12 m6 l6">
										<input name="email" id="email" type="text" class="validate" maxlength="250">
										<label for="email">Email Address</label>
									</div>
									<div class="input-field col s12 m6 l6">
										<input name="contact" id="contact" type="text" class="validate" maxlength="14">
										<label for="contact">Contact Number</label>
									</div>
								</div>

								<div class="row">
									<div class="input-field col s12">
										<textarea id="note" class="materialize-textarea" data-length="250" maxlength="250"></textarea>
										<label for="note">Note</label>
									</div>
								</div>
							</div>
						</div>
					</form>

				</div>
				<div class="modal-footer">
					<a class="modal-action modal-close waves-effect btn-flat">Cancel</a>
					<a id="saveBtn" class="modal-action waves-effect waves-green btn-flat">Save</a>
				</div>
			</div>

			<!-- add/edit height modal -->
			<div id="heightModal" class="modal">
				<div class="modal-content">
					<h4>Babys' Height</h4>
					<div class="row">
						<p class="col s12">Last Height</p>
						<div class="input-field col s6">
							<input disabled id="lastday" type="text" class="datepicker">
							<label for="lastday">Date</label>
						</div>
						<div class="input-field col s5">
							<input disabled id="lastdayValue" type="text" class="validate">
							<label for="lastdayValue">Height (cm)</label>
						</div>
						<div class="input-field col s1 hand-cursor">
							<a id="lastHeightEditBtn">
								<i class="material-icons green-text">edit</i>
							</a>
						</div>
					</div>
					<div class="row">
						<p class="col s12">Today Height</p>
						<div class="input-field col s6">
							<input disabled id="today" type="text" class="datepicker">
							<label for="today">Date</label>
						</div>
						<div class="input-field col s6">
							<input id="todayValue" type="text" class="validate" autofocus>
							<label for="todayValue">Height (cm)</label>
						</div>
					</div>

				</div>
				<div class="modal-footer">
					<a href="#!" class="modal-close waves-effect btn-flat">Cancel</a>
					<a href="#!" id="heightModalSaveBtn" class="waves-effect waves-green btn-flat">Save</a>
				</div>
			</div>

			<!-- add/edit weight modal -->
			<div id="weightModal" class="modal">
				<div class="modal-content">
					<h4>Babys' Weight</h4>
					<div class="row">
						<p class="col s12">Last Weight</p>
						<div class="input-field col s6">
							<input disabled id="lastdayWeight" type="text" class="datepicker">
							<label for="lastdayWeight">Date</label>
						</div>
						<div class="input-field col s5">
							<input disabled id="lastdayWeightValue" type="text" class="validate">
							<label for="lastdayWeightValue">Weight (kg)</label>
						</div>
						<div class="input-field col s1 hand-cursor">
							<a id="lastWeightEditBtn">
								<i class="material-icons green-text">edit</i>
							</a>
						</div>
					</div>
					<div class="row">
						<p class="col s12">Today Weight</p>
						<div class="input-field col s6">
							<input disabled id="todayWeight" type="text" class="datepicker">
							<label for="todayWeight">Date</label>
						</div>
						<div class="input-field col s6">
							<input id="todayWeightValue" type="text" class="validate" autofocus>
							<label for="todayWeightValue">Weight (kg)</label>
						</div>
					</div>

				</div>
				<div class="modal-footer">
					<a href="#!" class="modal-close waves-effect btn-flat">Cancel</a>
					<a href="#!" id="weightModalSaveBtn" class="waves-effect waves-green btn-flat">Save</a>
				</div>
			</div>

	</body>

	<?php $this->load->view('common/commonFooter');?>

	<script type="text/javascript">
		$(document).ready(function () {
			$(this).scrollTop(0);
			$('.modal').modal();
			$('select').material_select();

			$('.datepicker').pickadate({
				selectMonths: true, // Creates a dropdown to control month
				selectYears: 99, // Creates a dropdown of 15 years to control year,
				max: true,
				today: 'Today',
				clear: 'Clear',
				close: 'Ok'
			});
		});

	</script>

	<script type="text/javascript" src="<?php echo base_url(); ?>js/libs/cropper/cropper.min.js?<?=$this->config->item('js_version');?>"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>js/libs/cropper/jquery-cropper.min.js?<?=$this->config->item('js_version');?>"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>js/user/profile.js?<?=$this->config->item('js_version');?>"></script>

	</html>
