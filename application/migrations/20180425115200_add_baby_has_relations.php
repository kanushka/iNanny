<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_add_baby_has_relations extends CI_Migration
{

    public function up()
    {
        $attributes = array('ENGINE' => 'InnoDB');

        // create baby table
        $this->dbforge->add_field('`id` int(11) NOT NULL AUTO_INCREMENT,
          `first_name` varchar(200) NOT NULL,
          `last_name` varchar(200) DEFAULT NULL,
          `email` varchar(250) NOT NULL,
          `contact` varchar(14) DEFAULT NULL,
          `baby_id` int(11) NOT NULL,
          `relation_types_id` int(11) NOT NULL,
          `registered_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
          `status` int(1) DEFAULT \'1\' COMMENT \'0 - removed\n1 - created\n2 - invited\n3 - registered\',
          `password` varchar(250) DEFAULT NULL,
          `image_url` varchar(250) DEFAULT NULL,
          `note` varchar(250) DEFAULT NULL,
          PRIMARY KEY (`id`,`baby_id`,`relation_types_id`),
          FOREIGN KEY (`baby_id`) REFERENCES `baby` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
          FOREIGN KEY (`relation_types_id`) REFERENCES `relation_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');

        $this->dbforge->create_table('baby_has_relations', true, $attributes);

        echo '<br>baby_has_relations table created';

        $this->db->query('ALTER TABLE baby_has_relations AUTO_INCREMENT 4001');
        echo '<br>set auto increment value in baby_has_relations table';
    }

    public function down()
    {
        $this->dbforge->drop_table('baby_has_relations');
    }
}