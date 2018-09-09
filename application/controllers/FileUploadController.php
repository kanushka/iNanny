<?php
defined('BASEPATH') or exit('No direct script access allowed');

require 'vendor/autoload.php';

class FileUploadController extends CI_Controller
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
        show_404();
    }    

    public function uploadImage(){
        $path = $this->input->post('path');
        $path = 'uploads' . $path;
        
        $imageType = $this->input->post('imageType');
        $profileId = $this->input->post('profileId');

        // create folder if not exist
        if (!file_exists($path)) {
            if (!mkdir($path, 0777, true)) {
                return $this->setResponse(true, "cannot create path");
            }
        }

        // upload file
        $config['upload_path'] = $path;
        $config['allowed_types'] = '*';
        $config['max_filename'] = '255';
        $config['encrypt_name'] = TRUE;
        $config['max_size'] = '1024*10'; //10 MB max

        if (isset($_FILES['file']['name'])) {
            if (0 < $_FILES['file']['error']) {
                return $this->setResponse(true, 'error during file upload' . $_FILES['file']['error']);
            } else {
                if (file_exists('uploads/' . $_FILES['file']['name'])) {
                    return $this->setResponse(true, 'file already exists : uploads/' . $_FILES['file']['name']);
                } else {
                    $this->load->library('upload', $config);
                    if (!$this->upload->do_upload('file')) {
                        return $this->setResponse(true, $this->upload->display_errors());
                    } else {
                        $data = array(
                            'data' => $this->upload->data(),
                            'path' => $path . '/' . $this->upload->data('file_name')
                        );

                        // upload success
                        // update recodes
                        if($this->updateImageInRecodes($imageType, $profileId, $data['path'])){
                            return $this->setResponse(false, "profile image successfully uploaded", $data);
                        }
                        return $this->setResponse(true, "something went wrong. cannot upload profile image");
                    }
                }
            }
        } else {
            return $this->setResponse(true, 'please choose a file');
        }
    }

    private function updateImageInRecodes($imageType, $profileId, $imageUrl){
        $sessionData = $this->session->userdata();
        if (!$sessionData) {
            return $this->setResponse(true, "unauthorized access");
        }

        $babyId = $sessionData['babyId'];
        // if babys' image
        // update babys' image
        // otherwise update relation update

        if($imageType == 'BABY'){
            // update babys' image
            $updateResult = $this->Baby->updateBabyImage($babyId, $imageUrl);
        }else{
            // update relations' image
            $updateResult = $this->Relation->updateRelationImage($profileId, $imageUrl);            
        }

        return $updateResult;
    }    



}
