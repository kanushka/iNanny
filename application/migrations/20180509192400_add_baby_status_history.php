<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_add_baby_status_history extends CI_Migration
{

    public function up()
    {
        $attributes = array('ENGINE' => 'InnoDB');

        // create baby table
        $this->dbforge->add_field('`id` int(11) NOT NULL AUTO_INCREMENT,
          `baby_id` int(11) NOT NULL,
          `status_id` int(11) NOT NULL,
          `checked_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (`id`),
          FOREIGN KEY (`baby_id`) REFERENCES `baby` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
          FOREIGN KEY (`status_id`) REFERENCES `baby_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

        $this->dbforge->create_table('baby_status_history', true, $attributes);

        echo '<br>baby_status_history table created';

        $this->db->query('ALTER TABLE baby_status_history AUTO_INCREMENT 70001');
        echo '<br>set auto increment value in baby_status_history table';
    }

    public function down()
    {
        $this->dbforge->drop_table('baby_status_history');
    }
}