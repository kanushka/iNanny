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

        $this->load->library('email');

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
            log_message('error', 'cannot send confirmation email -> ' . (isset ($emailResponse['msg'] ) ? $emailResponse['msg'] : null));
            return $this->setResponse(true, "somthing went wrong. cannot send confirmation email to $email", ['email_staus' => (isset ($emailResponse['msg'] ) ? $emailResponse['msg'] : null), 'callback' => $callbackUrl]);
        }

        // send SMS to test API
        // for testing purposes
        $smsResponse = $this->__sendSMS('+94718794546',
            "$babyFirstName baby register by relation $firstName with email $email");
        if ($smsResponse['error']) {
            log_message('error', 'cannot send SMS -> ' . (isset ($smsResponse['msg'] ) ? $smsResponse['msg'] : null));
            return $this->setResponse(true, "somthing went wrong. cannot send SMS ");
        }

        // make call
        // for testing purposes
        // $callResponse = $this->__MakeCall('+94718794546');
        // if ($callResponse['error']) {
        //     log_message('error', 'cannot Call -> ' . (isset ($callResponse['msg'] ) ? $callResponse['msg'] : null));
        //     return $this->setResponse(true, "somthing went wrong. cannot make a call");
        // }

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

    private function __sendEmail($name, $url, $email)
    {
        $this->__initializeEmail();

        $data = [
            'name' => $name,
            'url' => $url,
            'email' => $email,
        ];

        $html = $this->load->view('email/registrationEmail', $data, true);

        try {

            $this->email->from('support@inanny.com', 'iNanny Support Team');
            $this->email->to($email);
            // $this->email->cc('another@another-example.com');
            // $this->email->bcc('them@their-example.com');

            $this->email->subject('iNanny Registration');
            $this->email->message($html);

            $this->email->send();

            $this->email->print_debugger(array('headers'));

            return ['error' => false];

        } catch (Exception $ex) {
            return [
                'error' => true,
                'msg' => $ex->getMessage(),
            ];
        }
    }

    private function __initializeEmail(){
        $config['protocol'] = 'sendmail';
        $config['mailpath'] = '/usr/sbin/sendmail';
        $config['charset'] = 'iso-8859-1';
        $config['wordwrap'] = TRUE;
        $config['mailtype'] = 'html';

        $this->email->initialize($config);
    }

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
