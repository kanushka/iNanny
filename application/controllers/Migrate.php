<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migrate extends CI_Controller
{

    public function run()
    {
        $this->load->library('migration');
        echo '<br>migration start<br>';

        if ($this->migration->current() === FALSE)
        {
            show_error($this->migration->error_string());
        }else{
            echo '<br><br>migration completed';
        }
    }

}