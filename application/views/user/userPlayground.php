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

	<!-- <?php $this->load->view('common/logoPreloader.php'); ?> -->

	<div class="container   firstContent">
		<div class="row">
			<div class="col s12">
				<blockquote>
					still under development
				</blockquote>
			</div>
		</div>

		<canvas id="c"></canvas>

	</div>

</body>

<?php $this->load->view('common/commonFooter'); ?>

<script type="text/javascript">
	$(document).ready(function () {

	});

</script>

<script type="text/javascript" src="<?php echo base_url(); ?>js/libs/fabric/fabric.min.js"></script>


<script type="text/javascript" src="<?php echo base_url(); ?>js/user/playground.js?<?= $this->config->item('js_version'); ?>"></script>

</html>
