<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Migration_add_baby extends CI_Migration
{

    public function up()
    {
        $attributes = array('ENGINE' => 'InnoDB');

        // create baby table
        $this->dbforge->add_field('`id` int(11) NOT NULL AUTO_INCREMENT,
          `first_name` varchar(200) NOT NULL,
          `last_name` varchar(200) DEFAULT NULL,
          `birthday` datetime DEFAULT NULL,
          `gender` int(1) DEFAULT NULL COMMENT \'0 - female\n1 - male\',
          `image_url` varchar(250) DEFAULT NULL,
          `note` varchar(250) DEFAULT NULL,
          `registered_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (`id`)');

        $this->dbforge->create_table('baby', true, $attributes);

        echo '<br>baby table created';

        $this->db->query('ALTER TABLE baby AUTO_INCREMENT 3001');
        echo '<br>set auto increment value in baby table';
    }

    public function down()
    {
        $this->dbforge->drop_table('baby');
    }
}
