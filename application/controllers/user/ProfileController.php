<?php
defined('BASEPATH') or exit('No direct script access allowed');

require 'application/debug/ChromePhp.php';

// use Mailgun\Mailgun;
use Twilio\Rest\Client;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;


class ProfileController extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();

        $this->load->model('Crypt');

        $this->load->model('Baby');
        $this->load->model('Relation');
    }

    public function index()
    {
        $sessionData = $this->session->userdata();
        ChromePhp::log($sessionData);
        $this->load->view('user/userProfile', $sessionData);
    }

    public function getBabyInfo()
    {
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];
        $relationId = $sessionData['relationId'];

        // get baby
        $baby = $this->Baby->getBabyByRelationId($relationId);
        if (!$baby) {
            return $this->setResponse(true, "something went wrong. cannot find baby informations");
        }

        // get baby height
        $babyHeight = $this->Baby->getBabyHeightByBabyId($babyId);
        $baby->height = $babyHeight ? $babyHeight->height : null;
        $baby->height_date = $babyHeight ? $babyHeight->added_at : null;

        // get baby weight
        $babyWeight = $this->Baby->getBabyWeightByBabyId($babyId);
        $baby->weight = $babyWeight ? $babyWeight->weight : null;
        $baby->weight_date = $babyWeight ? $babyWeight->added_at : null;

        return $this->setResponse(false, null, ['baby' => $baby]);
    }


    public function updateBabyInfo(){
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];
        $relationId = $sessionData['relationId'];

        $babyFirstName = $this->input->post('firstName');
        $babyLastName = $this->input->post('lastName');
        $babyBirthday = $this->input->post('birthday');
        $babyGender = $this->input->post('gender');
        $babyNote = $this->input->post('note');
        $babyImageUrl = $this->input->post('imageUrl');

        // validate inputs
        $updateResponse = $this->Baby->updateBaby($babyId, $babyFirstName, $babyLastName, $babyBirthday, $babyGender, $babyNote);
        if(!$updateResponse){
            return $this->setResponse(true, "something went wrong. cannot update $babyFirstName baby details");
        }

        return $this->setResponse(false, "baby details successfully updated");
    }


    public function getRelationsInfo(){
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];
        $relationId = $sessionData['relationId'];

        // get list of relations
        $relations = $this->Relation->getRelationsByBabyId($babyId);
        if(!$relations){
            return $this->setResponse(true, "something went wrong. cannot find babies relations");
        }

        // get list of relation types
        $relationTypes = $this->Relation->getRelationTypes();
        if(!$relationTypes){
            return $this->setResponse(true, "something went wrong. cannot find relation types");
        }

        $responseData = [
            'relations' => $relations,
            'types' => $relationTypes
        ];

        return $this->setResponse(false, null, $responseData);
    }

    public function addBabysRelation(){
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];
        $loggedRelationId = $sessionData['relationId'];      

        // collect relation info
        $firstName = $this->input->post('firstName');
        $lastName = $this->input->post('lastName');
        $email = $this->input->post('email');
        $contact = $this->input->post('contact');
        $note = $this->input->post('note');
        $relationType = $this->input->post('relationType');
        $imageUrl = $this->input->post('imageUrl');

        // validate inputs
        /**
         * have to implement
         */

        $this->db->trans_start();

        // update relation data
        $newRelationId = $this->Relation->addBabysRelation($babyId, $relationType, $firstName, $lastName, $email, $contact, $note);
        if(!$newRelationId){
            return $this->setResponse(true, "something went wrong. cannot add new relation");
        }

        // invite user to the inanny
        // send email
        $callbackUrl = $this->config->item('base_url') . 'user/' . $this->Crypt->urlEncode($newRelationId) . '/register';
        $emailResponse = $this->__sendEmailByPhpMailer($firstName, $callbackUrl, $email);
        if ($emailResponse['error']) {
            log_message('error', 'cannot send confirmation email -> ' . $emailResponse['msg']);
            return $this->setResponse(true, "somthing went wrong. cannot send confirmation email to $email", ['email_staus' => $emailResponse['msg']]);
        }

        // send SMS to test API
        // for testing purposes
        $smsResponse = $this->__sendSMS('+94718794546',
            "$firstName is added to the baby $babyId with $email address now!");
        if ($smsResponse['error']) {
            return $this->setResponse(true, "somthing went wrong. cannot send SMS ");
        }

        // change realation status to 'invited'
        $isStatusChanged = $this->Relation->changeRelationStatus($newRelationId, 2);
        if (!$isStatusChanged) {
            return $this->setResponse(true, "somthing went wrong. cannot change relation status");
        }

        $this->db->trans_complete();

        return $this->setResponse(false, "user successfully registered and confirmation email send to $email", ['_callback' => $callbackUrl]);
    }

    public function updateRelationInfo($relationId){
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];
        $loggedRelationId = $sessionData['relationId'];

        // check relation Id realated to the baby
        $relation = $this->Relation->getRelationById($relationId);
        if(!$relation){
            return $this->setResponse(true, "invalid relation request");
        }

        if($relation->baby_id != $babyId){
            return $this->setResponse(true, "unauthorized relation request");
        }

        // collect relation info
        $firstName = $this->input->post('firstName');
        $lastName = $this->input->post('lastName');
        $email = $this->input->post('email');
        $contact = $this->input->post('contact');
        $note = $this->input->post('note');
        $relationType = $this->input->post('relationType');
        $imageUrl = $this->input->post('imageUrl');

        // validate inputs
        /**
         * have to implement
         */

        // update relation data
        $updateResponse = $this->Relation->updateRelation($relationId, $relationType, $firstName, $lastName, $email, $contact, $note);
        if(!$updateResponse){
            return $this->setResponse(true, "something went wrong. cannot update $relationId relation details");
        }

        return $this->setResponse(false, "relation details successfully updated");
    }

    public function addBabyHeight(){
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];
        $height = $this->input->post('height');

        // add baby new height
        $heightId = $this->Baby->addBabyHeight($babyId, $height);
        if(!$heightId){
            return $this->setResponse(true, "something went wrong. cannot add babys' height");
        }

        return $this->setResponse(false, "new height added successfully");
    }

    public function updateBabyHeight(){
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];
        $height = $this->input->post('height');

        // update babys' last height
        $heightId = $this->Baby->updateBabyHeight($babyId, $height);
        if(!$heightId){
            return $this->setResponse(true, "something went wrong. cannot update babys' height");
        }

        return $this->setResponse(false, "baby height updated");
    }

    public function addBabyWeight(){
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];
        $weight = $this->input->post('weight');

        // add baby new weight
        $weightId = $this->Baby->addBabyWeight($babyId, $weight);
        if(!$weightId){
            return $this->setResponse(true, "something went wrong. cannot add babys' weight");
        }

        return $this->setResponse(false, "new weight added successfully");
    }

    public function updateBabyWeight(){
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];
        $weight = $this->input->post('weight');

        // update babys' last weight
        $weightId = $this->Baby->updateBabyWeight($babyId, $weight);
        if(!$weightId){
            return $this->setResponse(true, "something went wrong. cannot update babys' weight");
        }

        return $this->setResponse(false, "baby weight updated");
    }

    private function __sendEmailByPhpMailer($name, $url, $email)
    {
        $data = [
            'name' => $name,
            'url' => $url,
            'email' => $email,
        ];

        $html = $this->load->view('email/registrationEmail', $data, true);

        try {
            $mail = new PHPMailer;

            $mail->setFrom('support@inanny.com');
            $mail->addAddress($email, $name);

            $mail->Subject = 'iNanny Registration';
            $mail->isHTML(true);
            $mail->Body = $html;

            if (!$mail->send()) {
                return [
                    'error' => true,
                    'msg' => 'Mailer error: ' . $mail->ErrorInfo,
                ];
            }
        } catch (Exception $ex) {
            return [
                'error' => true,
                'msg' => 'Exception: ' . $ex->getMessage(),
            ];
        }

        $data = array(
            'error' => false,
        );

        return $data;
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
}
