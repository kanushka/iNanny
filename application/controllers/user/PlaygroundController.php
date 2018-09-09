<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once 'application/debug/ChromePhp.php';

class PlaygroundController extends CI_Controller {

	public function index()
	{
		$sessionData = $this->session->userdata();
        ChromePhp::log($sessionData);
        $this->load->view('user/userPlayground', $sessionData);
    }
    
}
