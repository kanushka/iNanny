<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
	<!DOCTYPE html>
	<html lang="en">

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>iNanny</title>
		<?php $this->load->view('common/commonHeader'); ?>
	</head>

	<body style="height: 100vh; overflow: hidden;">


		<style>
			.primaryblue-links ul a {
				color: #0084FF;
			}

			.primary-btn-color {
				background-color: green !important;
			}

			.secondary-btn-color {
				background-color: #fff !important;
				color: #0084FF;
			}

			.secondary-btn-color:hover {
				background-color: #fff;
				color: #0084FF;
			}

			.primary-btn-color:hover {
				background-color: #66bb6a;
			}

			.no-shadow {
				box-shadow: none;
			}

			.hero-image {
				width: 100%;
				height: auto;
			}

			#msg_inputfield {
				background-color: #fff;
			}

			.custom-nav ul a:hover {
				background-color: transparent;

			}

			.login-bg-img {
				background-image: url('../../img/login.png');
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;
				align-items: center;
				justify-content: center;
				display: flex;
				padding: 25px;
			}

			#sidenav-overlay {
				z-index: 996 !important;
			}

			.btn-large {
				text-transform: capitalize !important;
			}

			.modal-action {
				text-transform: capitalize;
			}

			.WarningToast {
				padding-top: 25px;
				padding-bottom: 25px;
			}

			.toastContentCenter {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.toatstIconMgnRght {
				margin-right: 15px;
			}

			.toast-container .toast {
				display: none;
			}

			.toast-container .toast {
				display: none;
			}

			@media only screen and (max-width: 993px) {
				.custom-mobile-nav {
					display: flex;
					align-items: center;
					height: 80px;
				}
			}

			@media only screen and (max-width: 993px) {
				.brand-mobile {
					display: flex !important;
					justify-content: center;
					align-items: center;
					height: 80px;
				}

				.custom-nav {
					background-color: #fff !important;
					box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2) !important;
				}
			}

			@media only screen and (max-width: 1200px) and (min-width: 600px) {
				.hero-wrapper {
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.hero-image {
					width: 70%;
					height: auto;
				}
			}

		</style>

		<div class="row" style="height: 100vh; margin-bottom: 0px;">

			<div class="col s12" style="height: 100vh;">
				<div class="col m12 l10 offset-l1 xl6 offset-xl3" style="height: 100vh; display: flex; align-items: center; justify-content: center;">
					<div class="row">
						<form class="col s12">
							<div class="row">
								<div class="col s12">
									<p style="font-size: 24px; color: #4A4A4A; margin-top: 0px; margin-bottom: 15px;">
										Hi
										<?php echo $first_name; ?>
									</p>
									<p style="font-size: 16px; color: #4A4A4A;  margin-top:0px; margin-bottom: 15px;">Enter your iNanny password below.</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12">
									<input type="password" id="password" class="validate" maxlength=20 autofocus>
									<label for="password">Password</label>
								</div>
								<div class="input-field col s12">
									<input id="confirmPassword" type="password" class="validate" maxlength=20>
									<label for="confirmPassword">Confirm Password</label>
								</div>
								<div class="col s12 m6 l5">
									<br/>
									<a class="waves-effect waves-light btn-large primary-btn-color" id="submitBtn" style="display: flex; align-items: center; justify-content: center;">Save
										<div class="preloader-wrapper small active" style="margin-left:10px; display: none;" id="signInSprinner">
											<div class="spinner-layer" style="border-color: #fff;">
												<div class="circle-clipper left">
													<div class="circle"></div>
												</div>
												<div class="gap-patch">
													<div class="circle"></div>
												</div>
												<div class="circle-clipper right">
													<div class="circle"></div>
												</div>
											</div>
										</div>
									</a>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<!-- hidden variables -->
		<input type="hidden" id="baseUrl" value="<?php echo base_url(); ?>">
		<input id="relationId" type="hidden" value="<?php echo $id; ?>">

		<script src="<?php echo base_url(); ?>js/libs/jquery-3.2.1.min.js"></script>
		<script src="<?php echo base_url(); ?>js/libs/materialize.js"></script>


		<script type="text/javascript">
			$(document).ready(function () {
				$('#preloader').fadeOut();
				$('.chatbox').hide();
				$(".custom-mobile-nav").sideNav();
				$('.modal').modal();
			});

		</script>

		<script type="text/javascript" src="<?php echo base_url(); ?>js/common.js?<?= $this->config->item('js_version'); ?>"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>js/user/initialSetup.js?<?= $this->config->item('js_version'); ?>"></script>

	</body>

	</html>
