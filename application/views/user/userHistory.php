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

	.chart-card {
		margin-bottom: 30px;
		margin-top: 30px;
	}

	#materialbox-overlay {
		position:fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #ffffff;
		z-index: 1000;
		will-change: opacity;
	}

	.materialbox-caption {
		position: fixed;
		display: none;
		color: #0b0b0b;
		line-height: 50px;
		top: 0;
		left: 0;
		width: 100%;
		text-align: center;
		padding: 0% 15%;
		height: 50px;
		z-index: 1000;
		-webkit-font-smoothing: antialiased;
	}
</style>

<body>
	<?php $this->load->view('common/commonTopNav.php'); ?>

	<!-- preloader -->
	<?php $this->load->view('common/roundPreloader.php');?>

	<div class="container firstContent">
		<div class="row">
			<div class="col s12 m6 chart-card materialboxed" data-caption="Baby's Height history">

				<canvas id="babysHeightChart"></canvas>
			</div>
			<div class="col s12 m6 chart-card materialboxed" data-caption="Baby's Weight history">

				<canvas id="babysWeightChart"></canvas>
			</div>
		</div>
		<div class="row">
			<div class="col s12 m6 chart-card materialboxed" data-caption="Baby's Activity Summary">

				<canvas id="babysStatusChart"></canvas>
			</div>
			<div class="col s12 m6 chart-card materialboxed" data-caption="Baby's Sleeping pattern">

				<canvas id="babysSleepChart"></canvas>
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
