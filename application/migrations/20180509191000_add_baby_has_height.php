<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_add_baby_has_height extends CI_Migration
{

    public function up()
    {
        $attributes = array('ENGINE' => 'InnoDB');

        // create baby table
        $this->dbforge->add_field('`id` int(11) NOT NULL AUTO_INCREMENT,
        `baby_id` int(11) NOT NULL,
        `height` float NOT NULL,
        `added_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),         
        FOREIGN KEY (`baby_id`) REFERENCES `baby` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

        $this->dbforge->create_table('baby_has_height', true, $attributes);

        echo '<br>baby_has_height table created';

        $this->db->query('ALTER TABLE baby_has_height AUTO_INCREMENT 60001');
        echo '<br>set auto increment value in baby_has_height table';
    }

    public function down()
    {
        $this->dbforge->drop_table('baby_has_height');
    }
}