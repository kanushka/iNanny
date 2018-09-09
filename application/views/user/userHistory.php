<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>
	<!DOCTYPE html>
	<html lang="en">

	<head>
		<title>iNanny</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<?php $this->load->view('common/commonHeader'); ?>
	</head>

	<style>
		.firstContent {
			margin-top: 150px;
		}

	</style>

	<body>
		<?php $this->load->view('common/commonTopNav.php'); ?>

		<div class="firstContent">
			<div class="row">
				<div class="col s12 m6 l6">

					<canvas id="babysHeightChart"></canvas>
				</div>
				<div class="col s12 m6 l6">

					<canvas id="babysWeightChart"></canvas>
				</div>

				<div class="col s12 m6 l6">

					<canvas id="babysStatusChart"></canvas>
				</div>
			</div>
		</div>

	</body>

	<script type="text/javascript">
		$(document).ready(function () {

		});

	</script>


	<?php $this->load->view('common/commonFooter'); ?>

	<script type="text/javascript" src="<?php echo base_url(); ?>js/libs/chartjs/Chart.bundle.min.js?<?= $this->config->item('js_version'); ?>"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>js/user/history.js?<?= $this->config->item('js_version'); ?>"></script>

	</html>
