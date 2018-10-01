<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once 'application/debug/ChromePhp.php';
require 'vendor/autoload.php';

use Twilio\Rest\Client;

class DashboardController extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->load->library('email');

        $this->load->model('Baby');
        $this->load->model('Relation');
        $this->load->model('Crypt');        
    }

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

        $requestBody = json_decode($this->input->raw_input_stream, true);
        // check request
        if(!$requestBody){
            return $this->setResponse(true, "bad request");
        }

        // validate baby
        if (array_key_exists('babyId', $requestBody)) {
            $babyId = $requestBody['babyId'];      
        }else{
            return $this->setResponse(true, "baby id cannot be empty");
        }
        
        if($babyId != $sessionData['babyId']){
            return $this->setResponse(true, "invalid baby id");
        }
        
        // check alert type
        // danger
        // warning 

        if (array_key_exists('alertType', $requestBody)) {
            $alertType = $requestBody['alertType'];      
        }else{
            return $this->setResponse(true, "alert type cannot be empty");
        }

        if(!($alertType == 'danger' || $alertType == 'warning')){
            return $this->setResponse(true, "invalid alert type");
        }

        // get baby relation phone numbers
        $relations = $this->Relation->getRelationsByBabyId($babyId);
        if(!$relations){
            return $this->setResponse(true, "something went wrong. baby doesn't have relations");
        }

        // variables for make response
        $response = [
            'successSMS' => 0,
            'failedSMS' => 0,
            'successCalls' => 0,
            'failedCalls' => 0
        ];

        foreach ($relations as $key => $relation) {

            $contact = $this->strReplaceFirst('0', '+94', $relation->contact);
            
            // if warning
            // send SMS
            if($alertType == 'warning'){
                if($this->__sendSMS($contact,
                    "Your baby ". $sessionData['babyName'][0] ." is trying to reach danger zone. Please react ASAP"
                )){
                    // no errors
                    // successfully send SMS
                    $response['successSMS']++;
                }else{
                    $response['failedSMS']++;
                }
            }
            
            // if danger
            // make a call and send SMS
            if($alertType == 'danger'){
                if($this->__sendSMS($contact,
                    "Your baby ". $sessionData['babyName'][0] ." is in danger zone. Please react ASAP"
                )){
                    // no errors
                    // successfully send SMS
                    $response['successSMS']++;
                }else{
                    $response['failedSMS']++;
                }

                if($this->__MakeCall($contact)){
                    // no errors
                    // successfully make Call
                    $response['successCalls']++;
                }else{
                    $response['failedCalls']++;
                }
            }
    
        }

        return $this->setResponse(false, null, $response);        
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

            return true;

        } catch (Exception $ex) {              
            log_message('error', 'cannot send SMS to -> ' . $sendNum . ' -> ' . $ex->getMessage());
            return false;
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

            return true;

        } catch (Exception $ex) {              
            log_message('error', 'cannot make call -> ' . $toNumber . ' -> ' . $ex->getMessage());
            return false;
        }
    }

    private function strReplaceFirst($from, $to, $content)    
    {
        $from = '/'.preg_quote($from, '/').'/';

        return preg_replace($from, $to, $content, 1);
    }

    public function addBabysActivityStatus(){
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];
        $status = $this->input->post('status');

        // add baby new activity
        $activityId = $this->Baby->addBabyActivityStatus($babyId, $status);
        if(!$activityId){
            return $this->setResponse(true, "something went wrong. cannot add baby's status");
        }

        return $this->setResponse(false, "activity status added successfully");
    }

    public function getBabysActivityStatus($limit = 20){
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];

        // get babies all activities with group
        // get babies last activities
        $activities = $this->Baby->getBabySleepingStatusByBabyId($babyId, $limit);
        if(!$activities){
            return $this->setResponse(true, "something went wrong. cannot add baby's last activities");
        }

        return $this->setResponse(false, null, ['activities' => $activities]);
    }

    public function getBabysActivityStatusGroupByDay($numberOfDates = 1){
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];
        
        // create dates for filter
        $today = new DateTime();
        $todayNow = $today->format("Y-m-d H:i:s");
        $today->modify("-{$numberOfDates} day");
        $lastDate = $today->format("Y-m-d H:i:s");

        // get babies all activities with group

        $activities = $this->Baby->getBabyActivitiesByBabyId($babyId, $lastDate, $todayNow);
        if(!$activities){
            return $this->setResponse(true, "something went wrong. cannot add baby's last activities");
        }

        return $this->setResponse(false, null, ['status' => $activities]);
    }


    public function getStreamUrl(){
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];        
        // create stream URL
        $url = "inanny-" . $babyId . "-" . date("Y/m/d");        
        // encrypt url
        $cryptUrl = $this->Crypt->urlEncode($url);

        return $this->setResponse(false, null, ['url' => 'https://appr.tc/r/', 'key' => $cryptUrl]);
    }


}
