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

		@media only screen and (max-width: 600px) {
			/* .s screen in materialise css*/
			.orderStatusWidget-card-header {
				flex-direction: column;
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

	</style>

<body>
	<?php $this->load->view('common/commonTopNav.php');?>

	<!-- preloader -->
	<?php $this->load->view('common/roundPreloader.php');?>


	<div class="container firstContent">

		<div class="row">
			<div class="col m6">
				<div class="z-depth-4 center-align" id='videoContainer'></div>
			</div>
			<!-- </div>
		<div class="row"> -->
			<div class="col m6">
				<div class="row">
					<div class="col s12">
						<div id='whetherContainer'>
							<div class="row">
								<div class="col s12">Kelaniya</div>
								<div class="col s6">
									<img src="<?php echo base_url(); ?>img/weather/icons8-partly-cloudy-day.png">
								</div>
								<div class="col s6">27 &deg;C</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<div id='audioContainer'></div>
					</div>
				</div>
			</div>
		</div>

		<div class="row" id="posesRow">
			<div class="col s12 m4" id="poseTile" hidden>
				<div class="card-panel teal">
					<span class="white-text part-value"> </span>
					<span class="white-text scope-value"> </span>
					<span class="white-text x-value"> </span>
					<span class="white-text y-value"> </span>
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
<script type="text/javascript" src="<?php echo base_url(); ?>js/user/dashboard-video.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>js/user/dashboard-audio.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>js/user/dashboard.js?<?=$this->config->item('js_version');?>"></script>

</html>