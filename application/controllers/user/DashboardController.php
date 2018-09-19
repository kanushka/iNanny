<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once 'application/debug/ChromePhp.php';
require 'vendor/autoload.php';

use Twilio\Rest\Client;

class DashboardController extends CI_Controller {

	public function index()
	{
        $sessionData = $this->session->userdata();

        if(!$this->session->babyId){
            show_error('Your are not logged or session expired. please login again', 
            401, // unauthorized
            $heading = 'An Error Was Encountered');			
		}

        ChromePhp::log($sessionData);
        $this->load->view('user/userDashboard', $sessionData);
    }

    public function sendAlert(){
        $sessionData = $this->session->userdata();

        // check session
        if(!$sessionData){
            return $this->setResponse(true, "unauthorized access", null, true);
        }

        // validate baby
        $babyId = $this->input->post('babyId');        
        if (is_null($babyId)) {
            return $this->setResponse(true, "baby id cannot be empty");
        }
        
        if($babyId != $sessionData->babyId){
            return $this->setResponse(true, "invalid baby id");
        }
        
        // check alert type
        // danger
        // warning
        $alertType = $this->input->post('alertType');      
        if(!($alertType == 'danger' || $alertType == 'warning')){
            return $this->setResponse(true, "invalid alert type");
        }
        
    }
    
    private function __sendSMS($sendNum, $msg)
    {
        $sid = $this->config->item('twilio_sid');
        $token = $this->config->item('twilio_token');

        try {

            $client = new Client($sid, $token);

            $messageInstance = $client->messages->create(
                // message send to
                 $sendNum,
                array(
                     'from' => $this->config->item('twilio_number'),
                     'body' => $msg,
                )
            );

            return ['error' => false];

        } catch (Exception $ex) {  
            return [
                'error' => true,
                'msg' => $ex->getMessage(),
            ];
        }
    }

    private function __MakeCall($toNumber)
    {
        $sid = $this->config->item('twilio_sid');
        $token = $this->config->item('twilio_token');
        $twilioNumber = $this->config->item('twilio_number');

        try {

            $client = new Client($sid, $token);
            $client->account->calls->create(  
                $toNumber,
                $twilioNumber,
                array(
                    "url" => "http://demo.twilio.com/docs/voice.xml"
                )
            );

            return ['error' => false];

        } catch (Exception $ex) {  
            return [
                'error' => true,
                'msg' => $ex->getMessage(),
            ];
        }
    }
}
