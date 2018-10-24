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
</head>

<style>
	.orderStatusWidget-iconWrapper i {
			margin: 0px;
			color: #4A90E2;
		}

		.picker--opened .picker__holder {
			top: 100px !important;
		}		

		.custom-card .card-content .card-title {
			line-height: 18px;
			font-size: 18px;
		}

		.custom-card .card-action a {
			color: #0084FF !important;
		}

		.firstContent {
			margin-top: 150px;
		}

		#videoContainer {
			max-width: 100%;
			height: auto;
		}

		.switch label input[type=checkbox]:checked + .lever:after {
			background-color: #388e3c;
		}

		.switch label input[type=checkbox]:checked + .lever {
			background-color: #9acf9d;
		}

		@media only screen and (max-width: 600px) {
			/* .s screen in materialise css*/
			.orderStatusWidget-card-header {
				flex-direction: column;
			}

			.firstContent{
				margin-top: 100px;
			}
		}

		@media only screen and (min-width: 600px) and (max-width: 992px) {
			/* .m screen in materialise css*/
			.orderStatusWidget-card-header {
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
			}

			.orderStatusWidget-timepicker {
				width: 350px;
			}
		}

		@media only screen and (min-width: 992px) and (max-width: 1200px) {
			/* .l screen in materialise css*/
			.orderStatusWidget-card-header {
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
			}

			.orderStatusWidget-timepicker {
				width: 250px;
			}

		}

		@media only screen and (min-width: 1200px) {
			/* .xl screen in materialise css*/
			.orderStatusWidget-card-header {
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
			}

			.orderStatusWidget-timepicker {
				width: 350px;
			}

			.orderStatusWidget-card-content {
				display: flex;
			}

		}

	</style>

<body>
	<?php $this->load->view('common/commonTopNav.php');?>

	<!-- preloader -->
	<?php $this->load->view('common/roundPreloader.php');?>


	<div class="container firstContent">

		<div class="row" style="margin-bottom: 10px;">

			<div class="col s12 m8 hide-on-med-and-down">
				<div class="z-depth-4 center-align" id='videoContainer'></div>
			</div>

			<div class="col s12 m6 hide-on-large-only">
				<div class="card">
					<div class="card-image">
						<img src="<?= isset($babyDefaultImageUrl) ? $babyDefaultImageUrl : base_url().'img/profile/sample_img.jpg' ?>">
						<span class="card-title">
							<?= isset($babyName) ? $babyName[0] : 'Baby' ?></span>
						<a id='streamBtn' class="btn-floating btn-large halfway-fab waves-effect waves-light green"><i class="material-icons">videocam</i></a>
					</div>
					<div class="card-content">
						<p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require
							little markup to use effectively.</p>
					</div>
				</div>
			</div>

			<div class="col s12 m4">
				<div class="row">
					<!-- baby face card -->
					<div class="col s12 hide-on-med-and-down">
						<div class="card-panel grey lighten-5 z-depth-1">
							<div id="faceCard" class="row valign-wrapper" style="margin-bottom:0; min-height:50px;">
								<!-- hidden variable -->
								<input id="isBabyCry" value="false" type="hidden">
								<div class="col s2">
									<!-- icon for message card -->
									<i id="faceIcon" class="small material-icons">sentiment_very_satisfied</i>
								</div>
								<div class="col s10 ">
									<span id="faceMessage">
										baby is in neural mode. You can activate music using below player.
									</span>
								</div>
							</div>
						</div>
					</div>

					<!-- message card -->
					<div class="col s12 hide-on-med-and-down">
						<div class="card-panel grey lighten-5 z-depth-1">
							<div id="alertCard" class="row valign-wrapper text-darken-1" style="margin-bottom:0; min-height:100px;">
								<div class="col s2">
									<i id="alertIcon" class="small material-icons">local_florist</i>
								</div>
								<div class="col s10">
									<span id="alertMessage" class="">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
										magna aliqua.
									</span>
								</div>
							</div>
						</div>
					</div>

					<!-- spectrum card -->
					<div class="col s12 hide-on-med-and-down">
						<div class="row valign-wrapper">
							<div id='audioContainer'></div>

						</div>
					</div>

				</div>
			</div>

		</div>

		<div class="row">
			<div class="col s12 m8 hide-on-med-and-down">
				<div class="card-panel grey lighten-5 z-depth-1">
					<div class="row valign-wrapper" style="margin-bottom:0;">
						<div class="col s3 m2 center-align">
							<a id="captureBtn" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">camera_alt</i></a>
						</div>
						<div class="col s9 m10">
							<span class="black-text">
								Capturing the babies images which express the whole feeling of the moment. Document your babies journey quietly
								and unobtrusively.
							</span>
						</div>
					</div>
				</div>
			</div>

			<div class="col s12 m4">
				<div class="card-panel grey lighten-5 z-depth-1">
					<div class="row" style="margin-bottom:0;">
						<div class="col s12">
							<div id='audioPlayerContainer'></div>

						</div>
					</div>
				</div>
			</div>

		</div>

	</div>

</body>


<?php $this->load->view('common/commonFooter');?>

<script type="text/javascript">
	$(document).ready(function () {

	});

</script>

<!-- libraries for view skeleton adn identify face -->
<script type="text/javascript" src="<?php echo base_url(); ?>js/libs/p5/p5.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>js/libs/p5/addons/p5.dom.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>js/libs/p5/addons/p5.sound.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>js/libs/ml5/ml5.min.js"></script>


<script type="text/javascript" src="<?php echo base_url(); ?>js/libs/fabric/fabric.min.js"></script>

<!-- customized files for dashboard view -->
<script id="dashboardVideoScript" type="text/javascript" src="<?php echo base_url(); ?>js/user/dashboard-video.js?<?=$this->config->item('js_version');?>"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>js/user/dashboard-audio.js?<?=$this->config->item('js_version');?>"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>js/user/dashboard.js?<?=$this->config->item('js_version');?>"></script>

</html>