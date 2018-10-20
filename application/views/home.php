<?php
defined('BASEPATH') or exit('No direct script access allowed');
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="<?php echo base_url(); ?>css/materialize.min.css"
	      media="screen,projection" />
	<link type="text/css" rel="stylesheet" href="<?php echo base_url(); ?>css/animate.css"
	      media="screen,projection" />
	<link type="text/css" rel="stylesheet" href="<?php echo base_url(); ?>css/common.css"
	      media="screen,projection" />

	<!-- <link rel="apple-touch-icon" sizes="57x57" href="<?php echo base_url(); ?>img/ico/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="<?php echo base_url(); ?>img/ico/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="<?php echo base_url(); ?>img/ico/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="<?php echo base_url(); ?>img/ico/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="<?php echo base_url(); ?>img/ico/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="<?php echo base_url(); ?>img/ico/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="<?php echo base_url(); ?>img/ico/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="<?php echo base_url(); ?>img/ico/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="<?php echo base_url(); ?>img/ico/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192" href="<?php echo base_url(); ?>img/ico/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="<?php echo base_url(); ?>img/ico/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="<?php echo base_url(); ?>img/ico/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo base_url(); ?>img/ico/favicon-16x16.png">
	<link rel="manifest" href="<?php echo base_url(); ?>img/ico/manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="<?php echo base_url(); ?>img/ico/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff"> -->

	<link rel="manifest" href="manifest.json">

	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="application-name" content="iNanny">
	<meta name="apple-mobile-web-app-title" content="iNanny">
	<meta name="theme-color" content="#2e7d32">
	<meta name="msapplication-navbutton-color" content="#2e7d32">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="msapplication-starturl" content="/user/login">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link rel="icon" type="image/png" sizes="96x96" href="<?php echo base_url(); ?>img/ico/android-icon-96x96.png">
	<link rel="apple-touch-icon" type="image/png" sizes="96x96" href="<?php echo base_url(); ?>img/ico/android-icon-96x96.png">
	<link rel="icon" type="image/png" sizes="192x192" href="<?php echo base_url(); ?>img/ico/android-icon-192x192.png">
	<link rel="apple-touch-icon" type="image/png" sizes="192x192" href="<?php echo base_url(); ?>img/ico/android-icon-192x192.png">

	<title>iNanny</title>

</head>

<style>
	.com-nav {
        background-color: transparent;
        width: 100%;
        position: fixed;
        z-index: 2;
        box-shadow: none;
    }

    .state-nav-scroll {
        background-color: #388e3c;
        width: 100%;
        position: fixed;
        z-index: 2;
    }

    .com-hero {
        background-image: radial-gradient(50% 100%, #4caf50, 50%, #388e3c 69%, #2e7d32 100%);
        height: 600px;
        padding-top: 110px;
    }

    .brand-img {
        height: 45px;
        width: auto;
        padding-left: 15px;
        margin-bottom: -10px;
    }

    .ele-herotag {
        font-size: 48px;
        margin-top: 0px;
        margin-bottom: 25px;
        color: #fff;
        text-align: center;
    }

    .ele-hero-para {
        margin-top: 0px;
        margin-bottom: 0px;
        color: #fff;
        text-align: center;
        font-size: 18px;
    }

    .hero-img {
        width: 100%;
        height: auto;
    }

    .ele-heroImage-wrap {
        margin-top: 50px;
    }

    .ele-com-features-row {
        margin-top: 50px;
    }

    .ele-feature-title {
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 18px;
        color: rgb(89, 99, 119);
        text-align: center;
    }

    .ele-feature-details {
        margin-top: 0px;
        margin-bottom: 0px;
        color: rgba(89, 99, 119, 0.6);
        font-size: 18px;
        text-align: center;
    }

    .ele-download-title {
        margin-top: 0px;
        margin-bottom: 25px;
        font-size: 36px;
        color: rgb(89, 99, 116);
    }

    .ele-download-detail {
        margin-top: 0px;
        margin-bottom: 15px;
        font-size: 18px;
        color: rgba(89, 99, 116, 0.6);
    }

    .ele-download {
        margin-top: 100px;
    }

    .googlePlay-img {
        height: auto;
        width: 200px;
        display: block;
        margin-top: 30px;
    }

    .footerWrap {
        margin-top: 70px;
        height: 70px;
        display: flex;
        background-color: #388e3c;
        margin-bottom: 0px;
    }

    .footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .footerText {
        font-size: 16px;
        margin-top: 0px;
        margin-bottom: 0px;
        color: #fff;
    }

    .social-link {
        display: flex;
        flex-direction: row;
    }

    .socialImage {
        height: 30px;
        width: 30px;
    }

    .fb, .twitter {
        margin-right: 15px;
    }

    .no-mgn-btm {
        margin-bottom: 0px !important;
    }

    @media only screen and (max-width: 600px) {
        .ele-single-feature {
            margin-bottom: 30px;
        }

        .ele-download {
            margin-top: 50px;
        }

        .ele-download-image {
            margin-top: 50px;
        }

        .com-nav {
            background-color: #388e3c !important;
        }
    }

    @media only screen and (max-width: 425px) {
        .ele-herotag {
            font-size: 48px;
            margin: 0px 20px 25px 20px;
            color: #fff;
            text-align: center;
        }

        .com-hero {
            background-image: radial-gradient(50% 100%, #4caf50, 50%, #388e3c 69%, #2e7d32 100%);
            height: 700px;
            padding-top: 110px;
        }
    }

    @media only screen and (max-width: 380px) {
        .ele-herotag {
            font-size: 36px;
            margin: 0px 20px 25px 20px;
            color: #fff;
            text-align: center;
        }

        .com-hero {
            background-image: radial-gradient(50% 100%, #4caf50, 50%, #388e3c 69%, #2e7d32 100%);
            height: 700px;
            padding-top: 110px;
        }
    }

    @media only screen and (max-width: 320px) {
        .ele-herotag {
            font-size: 34px;
            margin-top: 0px;
            margin-bottom: 25px;
            color: #fff;
            text-align: center;
        }

        .ele-hero-para {
            margin-top: 0px;
            margin-bottom: 0px;
            color: #fff;
            text-align: center;
            font-size: 16px;
        }

        .com-hero {
            background-image: radial-gradient(50% 100%, #4caf50, 50%, #388e3c 69%, #2e7d32 100%);
            height: 700px;
            padding-top: 110px;
        }
    }

    #sidenav-overlay {
        z-index: 1 !important;
    }

    .model-prloader {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
        background-color: rgba(255, 255, 255, 0.8);
        text-align: center;
        display: none;
    }

</style>

<body>

	<?php $this->load->view('common/logoPreloader.php'); ?>

	<nav class="com-nav">
		<div class="nav-wrapper">
			<a href="" class="brand-logo">
				<img src="<?php echo base_url(); ?>img/logoNameWhite.png" class="brand-img" />
			</a>
			<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
			<ul id="nav-mobile" class="right hide-on-med-and-down">
				<li><a onclick="openRegistrationModal()">Start Your Free Trial</a></li>
				<li><a href="<?=base_url() . 'user/login' ?>">Login</a></li>
			</ul>
			<ul class="side-nav" id="mobile-demo">
				<li>
					<div class="user-view">
						<a><img src="<?php echo base_url(); ?>img/logoGreen.png" style="width: 60px; margin-left:10px; margin-top:10px;"></a>
					</div>
				</li>
				<li><a class="active waves-effect waves-green" href="">Home</a></li>
				<li><a class="waves-effect waves-green" onclick="openRegistrationModal()">Start Your Free Trial</a></li>
				<li><a class="waves-effect waves-green" href="<?=base_url() . 'user/login' ?>">Login</a></li>
			</ul>
		</div>
	</nav>

	<div class="row com-hero no-mgn-btm">
		<p class="ele-herotag">Best Baby Sitter System for Your Baby</p>
		<!-- <p class="ele-hero-para"><i class="material-icons" style="font-size: 12px; margin-right: 10px;">check_circle</i>No more browsing bank websites. No more boring text messages.</p> -->
		<p class="col s10 m8 offset-s1 offset-m2 ele-hero-para">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
			do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
			exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

		<div class="col m8 offset-m2 ele-heroImage-wrap">
			<img src="<?php echo base_url(); ?>img/heroImage.png" class="hero-img" />
		</div>
	</div>
	<div class="container com-features">
		<div class="row no-mgn-btm"></div>
		<div class="row ele-com-features-row no-mgn-btm wow">
			<div class="col s12 m4 ele-single-feature">
				<h2 class="center green-text"><i class="material-icons" style="font-size:60px;">flash_on</i></h2>
				<p class="ele-feature-title">Lorem ipsum dolor</p>
				<p class="ele-feature-details">Lorem ipsum dolor sit amet, sunt in culpa qui officia deserunt mollit anim id
					est laborum</p>
			</div>
			<div class="col s12 m4 ele-single-feature">
				<h2 class="center green-text"><i class="material-icons" style="font-size:60px;">group</i></h2>
				<p class="ele-feature-title">Lorem ipsum dolor</p>
				<p class="ele-feature-details">Lorem ipsum dolor sit amet, sunt in culpa qui officia deserunt mollit anim id
					est laborum</p>
			</div>
			<div class="col s12 m4 ele-single-feature">
				<h2 class="center green-text"><i class="material-icons" style="font-size:60px;">settings</i></h2>
				<p class="ele-feature-title">Lorem ipsum dolor</p>
				<p class="ele-feature-details">Lorem ipsum dolor sit amet, sunt in culpa qui officia deserunt mollit anim id
					est laborum</p>
			</div>
		</div>
		<div class="row ele-download no-mgn-btm">
			<div class="wow bounceInUp">
				<div class="col s12 m6">
					<p class="ele-download-title">Lorem ipsum dolor!</p>
					<p class="ele-download-detail">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
						ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
						voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
						proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					<p class="ele-download-detail">Download our iNanny app today!</p>
					<img src="<?php echo base_url(); ?>img/googlePlay.png" class="googlePlay-img" />
				</div>
			</div>
		</div>
	</div>
	<div class="row footerWrap no-mgn-btm">
		<div class="container footer">
			<div>
				<a class="footerText" href="">Powered by GayanSoft</a>
			</div>
			<div class="social-link">
				<a href="https://www.facebook.com/INanny-2007973329530251/" target="_blank">
					<img src="<?php echo base_url(); ?>/img/fb.png" class="socialImage fb" />
				</a>
				<a href="https://twitter.com/KanushkaTwi" target="_blank">
					<img src="<?php echo base_url(); ?>/img/twitter.png" class="socialImage twitter" />
				</a>
			</div>
		</div>
	</div>

	<div id="registerModal" class="modal modal-fixed-footer">

		<div id="" class="model-prloader">
			<div class="preloader-wrapper active" style="vertical-align: middle; top: 45%;">
				<div class="spinner-layer spinner-green-only">
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
		</div>

		<div id="registerModelContent" class="modal-content">

			<a href="#!" class="brand-logo" style="display: flex; justify-content: center; align-items: center; height: 70px;">
				<img src="<?php echo base_url(); ?>/img/logoGreen.png" width="80px">
			</a>
			<div class="col s12">
				<p style="font-size: 24px; color: #4A4A4A; margin-bottom: 15px; text-align: center;">Lorem ipsum dolor sit
					amet</p>
				<p style="font-size: 16px; color: #9B9B9B;   margin-bottom: 30px; text-align: center;">Lorem ipsum dolor sit
					amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
					enim.</p>
			</div>

			<form class="col s12" id="registerForm">
				<div class="row">
					<div class="input-field col s12">
						<input name="babyName" id="babyName" type="text" class="validate">
						<label for="babyName">Baby's name</label>
					</div>
				</div>
				<div class="row">
					<p class="input-field col s12">Parent Information</p>

					<div class="input-field col s12 xl2">
						<select id="relationType">
							<option value="201" selected>Mother</option>
							<option value="202">Father</option>
						</select>
						<!-- <label>Relationship Type</label> -->
					</div>
					<div class="input-field col s12 xl5">
						<input name="firstName" id="firstName" type="text" class="validate" maxlength="50">
						<label for="firstName">First name</label>
					</div>
					<div class="input-field col s12 xl5">
						<input name="lastName" id="lastName" type="text" class="validate" maxlength="50">
						<label for="lastName">Last Name</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<input name="email" id="email" type="text" class="validate">
						<label for="email">Email address</label>
					</div>
				</div>
			</form>

		</div>
		<div class="modal-footer">
			<a id="registerBtn" class="modal-action waves-effect waves-green btn-flat">Register</a>
		</div>
	</div>

	<!-- hidden variables -->
	<input type="hidden" id="baseUrl" value="<?php echo base_url(); ?>">

</body>
<script type="text/javascript" src="<?php echo base_url(); ?>/js/libs/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>/js/libs/materialize.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>/js/libs/wow.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>/js/home.js"></script>

<script type="text/javascript">
	$(document).ready(function() {
		$(".button-collapse").sideNav();
		$(this).scrollTop(0);
		$('.modal').modal();
		$('select').material_select();
		// $('#modal1').modal('open');
	});

	$(function() {
		var header = $(".com-nav");
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();

			if (scroll >= 10) {
				header.addClass('state-nav-scroll');
			} else {
				header.removeClass('state-nav-scroll');
			}
		});
	});
</script>

<script>
	//This is the "Offline page" service worker

	//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
	if (navigator.serviceWorker.controller) {
		console.log('active service worker found, no need to register')
	} else {
		//Register the ServiceWorker
		navigator.serviceWorker.register('inanny-sw.js', {
			scope: './'
		}).then(function(reg) {
			console.log('Service worker has been registered for scope:' + reg.scope);
		});
	}
</script>

</html>