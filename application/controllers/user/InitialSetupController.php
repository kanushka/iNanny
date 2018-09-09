<?php
defined('BASEPATH') or exit('No direct script access allowed');

require_once 'application/debug/ChromePhp.php';

class InitialSetupController extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();

        $this->load->model('Baby');
        $this->load->model('Relation');
        $this->load->model('Crypt');
    }

    public function index($id)
    {
        $relationId = $this->Crypt->urlDecode($id);
        if (!$relationId) {
            ChromePhp::log('invalid url');
            show_404();
            return;
        }

        $relation = $this->Relation->getRelationById($relationId);
        if (!$relation) {
            ChromePhp::log('cannot find relation on id ' . $relationId);
            show_404();
            return;
        }

        if ($relation->status != 2) {
            ChromePhp::log('not invited for relation id ' . $relationId);
            show_404();
            return;
        }

        // clear previous session
        // $this->session->sess_destroy();

        // init new user session
        $this->__initUserSession($relation->id, $relation->first_name, $relation->last_name, $relation->email, false);

        // load password setup view
        ChromePhp::log($this->session->userdata());
        $this->load->view('user/userInitialSetup', $relation);
    }

    public function setPassword($requestRelationId)
    {
        $relationId = $this->session->relationId;
        if (!$relationId) {
            log_message('error', 'ther is no relationId in session while setting new password to user');
            return $this->setResponse(true, "something went wrong with configurations");
        }

        // $requestRelationId = $this->input->post('relationId');
        $password = $this->input->post('password');

        if (is_null($requestRelationId)) {
            return $this->setResponse(true, "relationId cannot be empty");
        } elseif ($relationId != $requestRelationId) {
            return $this->setResponse(true, "method not allowed for this session");
        }
        if (is_null($password)) {
            return $this->setResponse(true, "password cannot be empty");
        }

        $isPasswordSet = $this->Relation->setRelationPassword($relationId, $this->Crypt->encrypt($password));
        if (!$isPasswordSet) {
            return $this->setResponse(true, "something went wrong. cannot set user password");
        }

        // update session for login
        $this->session->set_userdata('logged_in', true);
        return $this->setResponse(false, "password setup successfully.");
    }

    private function __initUserSession($relationId, $firstName, $lastName, $email, $isLogged = true)
    {
        // get baby
		$baby = $this->Baby->getBabyByRelationId($relationId);
		if(!$baby){
			return false;
		}

        $user = array(
            'relationId' => $relationId,
            'relationName' => ['first_name' => $firstName, 'last_name' => $lastName],
            'relationEmail' => $email,
            'babyId' => $baby->id,
            'babyName' => [$baby->first_name, $baby->last_name],
            'loggedIn' => $isLogged,
        );

        $this->session->set_userdata($user);
    }

}
