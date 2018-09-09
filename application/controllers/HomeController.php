<?php
defined('BASEPATH') or exit('No direct script access allowed');

require 'vendor/autoload.php';

// use Mailgun\Mailgun;
use Twilio\Rest\Client;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

class HomeController extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();

        $this->load->model('Baby');
        $this->load->model('Relation');
        $this->load->model('Crypt');
    }

    public function index()
    {
        $this->load->view('home');
    }

    public function registerUser()
    {
        $babyName = $this->input->post('babyName');
        $relationType = $this->input->post('relationType');
        $firstName = $this->input->post('firstName');
        $lastName = $this->input->post('lastName');
        $email = $this->input->post('email');

        if (is_null($babyName)) {
            return $this->setResponse(true, "baby's name cannot be empty");
        }
        if (is_null($relationType)) {
            return $this->setResponse(true, "relationship type cannot be empty");
        }
        if (is_null($firstName)) {
            return $this->setResponse(true, "parent name cannot be empty");
        }
        if (is_null($email)) {
            return $this->setResponse(true, "email cannot be empty");
        }

        // check email validity
        $relation = $this->Relation->getRelationByEmail($email);
        if ($relation) {
            return $this->setResponse(true, "this email already used", ['error_email' => true]);
        }

        // set baby names
        $babyNameSet = explode(' ', $babyName);
        $babyFirstName = $babyNameSet[0];
        $babyLastName = null;
        // remove first name from array
        array_shift($babyNameSet);

        if (sizeof($babyNameSet) > 0) {
            $babyLastName = implode(' ', $babyNameSet);
        }

        $this->db->trans_start();

        // add new baby
        $babyId = $this->Baby->addBaby($babyFirstName, $babyLastName);
        if (!$babyId) {
            return $this->setResponse(true, "somthing went wrong. cannot register new baby");
        }

        // add baby's relations
        $relationId = $this->Relation->addBabysRelation($babyId, $relationType, $firstName, $lastName, $email);
        if (!$relationId) {
            return $this->setResponse(true, "somthing went wrong. cannot register new relationship");
        }

        $this->db->trans_complete();

        // send email
        $callbackUrl = $this->config->item('base_url') . 'user/' . $this->Crypt->urlEncode($relationId) . '/register';
        $emailResponse = $this->__sendEmailByPhpMailer($firstName, $callbackUrl, $email);
        if ($emailResponse['error']) {
            log_message('error', 'cannot send confirmation email -> ' . $emailResponse['msg']);
            return $this->setResponse(true, "somthing went wrong. cannot send confirmation email to $email", ['email_staus' => $emailResponse['msg'], 'callback' => $callbackUrl]);
        }

        // send SMS to test API
        // for testing purposes
        $smsResponse = $this->__sendSMS('+94718794546',
            "$firstName is register baby $babyFirstName with $email address now!");
        if ($smsResponse['error']) {
            return $this->setResponse(true, "somthing went wrong. cannot send SMS ");
        }

        // change realation status to 'invited'
        $isStatusChanged = $this->Relation->changeRelationStatus($relationId, 2);
        if (!$isStatusChanged) {
            return $this->setResponse(true, "somthing went wrong. cannot change relation status");
        }

        return $this->setResponse(false, "user successfully registered and confirmation email send to $email", ['_callback' => $callbackUrl]);
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

    // private function __sendEmail($name, $url, $email)
    // {
    //     $data = [
    //         'name' => $name,
    //         'url' => $url,
    //         'email' => $email,
    //     ];

    //     $html = $this->load->view('email/registrationEmail', $data, true);

    //     try {

    //         // instantiate the SDK with your API credentials
    //         $mg = Mailgun::create($this->config->item('mailgun_key'));

    //         $mg->messages()->send('inanny.000webhostapp.com', [
    //             'from' => 'support@inanny.com',
    //             'to' => $email,
    //             'subject' => 'iNanny Registration',
    //             'html' => $html,
    //         ]);

    //         return ['error' => false];

    //     } catch (Exception $ex) {
    //         return [
    //             'error' => true,
    //             'msg' => $ex->getMessage(),
    //         ];
    //     }
    // }

    public function checkUserEmail()
    {
        $email = $this->input->post('email');

        if (is_null($email)) {
            return $this->setResponse(true, "email cannot be empty");
        }

        $relation = $this->Relation->getRelationByEmail($email);
        if (!$relation) {
            return $this->setResponse(false, "valid new email");
        }

        // check selected user already registerd or not
        if ($relation->status > 1) {
            return $this->setResponse(true, "this email already used");
        }

        return $this->setResponse(false, "valid new email");
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
