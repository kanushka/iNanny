<style>
	@media only screen and (max-width: 600px) {
		/* .s screen in materialise css*/
		.secondaryNav {
			height: 10px;
		}
	}

	#sidenav-overlay {
		z-index: 10;
	}

	.primaryNav ul a.active {
		color: green;
	}

	.switch label {
		cursor: pointer;
		font-size: 1rem;
	}
</style>

<div class="navFixedTop">
	<nav class="primaryNav">
		<div class="nav-wrapper">
			<a class="brandImage">
				<img src="<?php echo base_url(); ?>img/logoNameGreen.png" class="brandLogo" />
			</a>

			<a href="#" data-activates="mobile-demo" class="button-collapse">
				<i class="material-icons">menu</i>
			</a>

			<ul class="right hide-on-med-and-down">
				<li>
					<a>
						<i class="material-icons">notifications_none</i>
					</a>
				</li>
				<li>
					<a class="dropdown-button topnavUsername" data-activates="dropdown1">
						<?php echo isset($relationName[0]) ? ucwords($relationName[0]) : 'user'; ?>
						<i class="material-icons right">arrow_drop_down</i>
					</a>
				</li>
			</ul>

			<ul class="side-nav" id="mobile-demo">
				<li>
					<div class="user-view">
						<div class="background">
							<img src="<?php echo base_url(); ?>img/login.png" style="width:100%">
						</div>
						<div style="padding-left:5px;">
							<a href="#!user">
								<img class="circle" src="<?php echo base_url(); ?>img/profile/sample_profile_img.jpg">
							</a>
							<a href="#!name">
								<span class="white-text name">
									<?php echo isset($relationName[0]) ? ucwords($relationName[0]) : 'user'; ?>
									<?php echo isset($relationName[1]) ? ucwords($relationName[1]) : ''; ?>
								</span>
							</a>
							<a href="#!email">
								<span class="white-text email">
									<?php echo isset($relationEmail) ? ucwords($relationEmail) : 'email@example.com'; ?>
								</span>
							</a>
						</div>
					</div>
				</li>
				<li>
					<a class="waves-effect waves-green sideNavBtn userDashboard" href="<?php echo base_url(); ?>user/dashboard">Dashboard</a>
				</li>
				<li>
					<a class="waves-effect waves-green sideNavBtn userPlayground" href="<?php echo base_url(); ?>user/playground">Playground</a>
				</li>
				<li>
					<a class="waves-effect waves-green sideNavBtn userHistory" href="<?php echo base_url(); ?>user/history">Baby
						History
					</a>
				</li>
				<li>
					<a class="waves-effect waves-green sideNavBtn userProfiles" href="<?php echo base_url(); ?>user/profile">Profiles</a>
				</li>
				<li>
					<div class="divider"></div>
				</li>
				<li>
					<a class="waves-effect" href="">Settings</a>
				</li>
				<li>
					<a class="waves-effect logoutBtn" href="">Logout</a>
				</li>
			</ul>

		</div>
	</nav>
	<nav class="secondaryNav">
		<div class="nav-wrapper hide-on-small-only">
			<ul class="left">
				<li>
					<a class="secondaryNavLink userDashboard" href="<?php echo base_url(); ?>user/dashboard">Dashboard</a>
				</li>
				<li>
					<a class="secondaryNavLink userPlayground" href="<?php echo base_url(); ?>user/playground">Playground</a>
				</li>
				<li>
					<a class="secondaryNavLink userHistory" href="<?php echo base_url(); ?>user/history">Baby History
					</a>
				</li>
				<li>
					<a class="secondaryNavLink userProfiles" href="<?php echo base_url(); ?>user/profile">Profiles</a>
				</li>
			</ul>
		</div>
	</nav>
</div>
<ul id="dropdown1" class="dropdown-content">
	<li>
		<a class="waves-effect modal-trigger" href="#settingModal">Settings</a>
	</li>
	<li class="logoutBtn">
		<a>Logout</a>
	</li>
</ul>

<!-- setting modal -->
<div id="settingModal" class="modal modal-fixed-footer">
	<div class="modal-content">
		<h4>Settings</h4>

		<div class="row" style="margin-bottom:0;">
			<div class="col s12">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
					magna aliqua.
				</p>
			</div>
		</div>

		<div class="row">
			<div class="col s12" style="margin-top:10px; margin-bottom:0;">
				<div class="row">
					<p>Visual Element Settings</p>
				</div>

				<div class="row">
					<div class="col s12 m4">
						<!-- safe zone switch -->
						<div class="switch">
							<label>
								Show safe zone
								<input id="safeZoneSwitch" type="checkbox" checked>
								<span class="lever"></span>
							</label>
						</div>
					</div>
					<div class="col s12 m4">
						<!-- face key point switch -->
						<div class="switch">
							<label>
								Show pose key points
								<input id="poseKeyPointSwitch" type="checkbox" checked>
								<span class="lever"></span>
							</label>
						</div>
					</div>
					<div class="col s12 m4">
						<!-- skeleton switch -->
						<div class="switch">
							<label>
								Show skeleton
								<input id="skeletonSwitch" type="checkbox" checked>
								<span class="lever"></span>
							</label>
						</div>

					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col s12" style="margin-top:10px; margin-bottom:0;">
				<div class="row">
					<p>Notification Settings</p>
				</div>

				<div class="row">
					<div class="col s12 m4">
						<!-- safe zone switch -->
						<div class="switch">
							<label>
								Send SMS alert
								<input id="smsAlertSwitch" type="checkbox" checked>
								<span class="lever"></span>
							</label>
						</div>
					</div>
					<div class="col s12 m4">
						<!-- face key point switch -->
						<div class="switch">
							<label>
								Send call alert
								<input id="callAlertSwitch" type="checkbox" checked>
								<span class="lever"></span>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<a href="#!" class="modal-close waves-effect waves-green btn-flat">Save</a>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function () {
		$(".button-collapse").sideNav();
		$(".dropdown-button").dropdown();

		$(function () {

			var loc = window.location.href; // returns the full URL

			if (loc.search('dashboard') > 0) {
				$('.secondaryNavLink').each(function () {
					$(".userDashboard").addClass('active');
				});
			} else if (loc.search('playground') > 0) {
				$('.secondaryNavLink').each(function () {
					$(".userPlayground").addClass('active');
				});
			} else if (loc.search('history') > 0) {
				$('.secondaryNavLink').each(function () {
					$(".userHistory").addClass('active');
				});
			} else if (loc.search('profile') > 0) {
				$('.secondaryNavLink').each(function () {
					$(".userProfiles").addClass('active');
				});
			}

		});

	});

</script>
