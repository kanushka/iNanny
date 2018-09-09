<?php
defined('BASEPATH') or exit('No direct script access allowed');

class LoginController extends CI_Controller
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
		// check user session
		if($this->session->loggedIn){
			redirect($this->config->item('base_url') . 'user/dashboard');
		}

        $this->load->view('user/userLogin');
    }

    public function checkCredentials()
    {

        $email = $this->input->post('email');
        $password = $this->input->post('password');
        if (is_null($email)) {
            return $this->setResponse(true, "email cannot be empty");
        }
        if (is_null($password)) {
            return $this->setResponse(true, "password cannot be empty");
        }

        $relation = $this->Relation->getRelationByEmail($email);
        if (!$relation) {
            return $this->setResponse(true, "the email that you've entered doesn't match any account", ['isUser' => false]);
        }

        if (!$this->Crypt->checkEncrypt($password, $relation->password)) {
            return $this->setResponse(true, "the password that you've entered is incorrect", ['isUser' => true, 'canLogin' => false]);
        } else {
            // valid credentials

            // set session
            if(!$this->__setSession($relation)){
				// something went wrong when setting user session
				return $this->setResponse(true, "something went wrong. please contact our assistant");
			}

            return $this->setResponse(false, "$relation->first_name logged successfully");
        }
    }

    private function __setSession($relation)
    {
		// get baby
		$baby = $this->Baby->getBabyByRelationId($relation->id);
		if(!$baby){
			return false;
		}

        // set user data to session
        $userData = array(
            'relationId' => $relation->id,
            'relationName' => [$relation->first_name, $relation->last_name],
            'relationEmail' => $relation->email,
            'babyId' => $baby->id,
            'babyName' => [$baby->first_name, $baby->last_name],
            'loggedIn' => true,
        );

		$this->session->set_userdata($userData);
		return true;
	}
	
	public function userLogout(){
		$this->session->sess_destroy();
		return $this->setResponse(false, "user logout successfully");
	}

}
