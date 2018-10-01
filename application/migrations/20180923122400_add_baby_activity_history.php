<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_add_baby_activity_history extends CI_Migration
{

    public function up()
    {
        $attributes = array('ENGINE' => 'InnoDB');

        // create baby table
        $this->dbforge->add_field('`id` int(11) NOT NULL AUTO_INCREMENT,
          `baby_id` int(11) NOT NULL,
          `status` int(11) NOT NULL,
          `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (`id`),
          FOREIGN KEY (`baby_id`) REFERENCES `baby` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
          FOREIGN KEY (`status`) REFERENCES `baby_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

        $this->dbforge->create_table('babys_activity_status', true, $attributes);

        echo '<br>babys_activity_status table created';

        $this->db->query('ALTER TABLE babys_activity_status AUTO_INCREMENT 70001');
        echo '<br>set auto increment value in babys_activity_status table';
    }

    public function down()
    {
        $this->dbforge->drop_table('babys_activity_status');
    }
}
