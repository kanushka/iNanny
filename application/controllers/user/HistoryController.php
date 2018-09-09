<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once 'application/debug/ChromePhp.php';

class HistoryController extends CI_Controller {

	public function __construct(){
        parent::__construct();

        $this->load->model('Baby');
        $this->load->model('Relation');
    }

	public function index()	{
		$sessionData = $this->session->userdata();
        ChromePhp::log($sessionData);
        $this->load->view('user/userHistory', $sessionData);
    }
		
	public function getBabysHeightHistory(){
		$sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

		$babyId = $sessionData['babyId'];
		
		$history = $this->Baby->getBabyHeightHistoryByBabyId($babyId);
		if(!$history){
			return $this->setResponse(true, "there are no history");
		}

		return $this->setResponse(false, null, ['height' => $history]);
	}

	public function getBabysWeightHistory(){
		$sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

		$babyId = $sessionData['babyId'];
		
		$history = $this->Baby->getBabyWeightHistoryByBabyId($babyId);
		if(!$history){
			return $this->setResponse(true, "there are no history");
		}

		return $this->setResponse(false, null, ['weight' => $history]);
	}
}
