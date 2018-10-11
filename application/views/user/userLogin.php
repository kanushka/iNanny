<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
	<!DOCTYPE html>
	<html lang="en">

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>iNanny</title>
		<?php $this->load->view('common/commonHeader');?>
	</head>

	<body style="height: 100vh; overflow: hidden;">


		<style>
			.login-bg-img {
				background-image: url('../img/login.png');
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;
				align-items: center;
				justify-content: center;
				display: flex;
				padding: 25px;
			}

			form p {
				text-align: center;
			}

			.signInBtn {
				margin-left: 30%;
			}

			@media only screen and (max-width: 425px) {
				.signInBtn {
					margin-left: 0;
				}
			}

		</style>

		<div class="row" style="height: 100vh; margin-bottom: 0px;">
			<div class="col s12" style="height: 100vh;">
				<div class="col m12 l10 offset-l1 xl6 offset-xl3" style="height: 100vh; display: flex; align-items: center; justify-content: center;">
					<div class="row">
						<form class="col s12">
							<div class="row">
								<div class="col s12 center">
									<img src="<?php echo base_url(); ?>img/logoGreen.png" style="width: 70px; padding-bottom:20px;">
									<p style="font-size: 24px; color: #4A4A4A; margin-top: 0px; margin-bottom: 15px;">Sign in to iNanny
									</p>
									<p style="font-size: 16px; color: #4A4A4A;  margin-top:0px; margin-bottom: 15px;">Enter your details below.</p>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s12">
									<input placeholder="johndone@example.com" type="text" id="email" class="validate" autofocus>
									<label for="email">Email</label>
								</div>
								<div class="input-field col s12">
									<input id="password" type="password" class="validate">
									<label for="password">Password</label>
								</div>
								<div class="col s12" style="width: 100%; margin-top:20px;">
									<div class="col s12 m8 l5 signInBtn">
										<a class="waves-effect waves-light btn-large primary-btn-color" id="signInBtn" style="display: flex; align-items: center; justify-content: center; margin: auto;">Sign In
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
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<?php $this->load->view('common/commonFooter');?>

		<script type="text/javascript">
			$(document).ready(function () {
				$('#preloader').fadeOut();
				$('.chatbox').hide();
				$(".custom-mobile-nav").sideNav();
				$('.modal').modal();
			});

		</script>


		<script type="text/javascript" src="<?php echo base_url(); ?>js/user/login.js?<?=$this->config->item('js_version');?>"></script>

	</body>

	</html>
