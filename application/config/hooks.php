<?php
defined('BASEPATH') or exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| Hooks
| -------------------------------------------------------------------------
| This file lets you define "hooks" to extend CI without hacking the core
| files.  Please see the user guide for info:
|
|	https://codeigniter.com/user_guide/general/hooks.html
|
*/

$hook['pre_controller'] = array(
    'class'    => 'AuthController',
    'function' => 'checkSession',
    'filename' => 'AuthController.php',
    'filepath' => 'controllers',
    'params'   => array('beer', 'wine', 'snacks')
);
