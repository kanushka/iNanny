<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_add_relation_types  extends CI_Migration
{

    public function up()
    {
        $attributes = array('ENGINE' => 'InnoDB');

        // create relation_types table
        $this->dbforge->add_field('  `id` int(11) NOT NULL AUTO_INCREMENT,
          `title` varchar(50) DEFAULT NULL,
          PRIMARY KEY (`id`)');

        $this->dbforge->create_table('relation_types', true, $attributes);

        echo '<br>relation_types table created';

        $this->db->query('ALTER TABLE relation_types AUTO_INCREMENT 201');
        echo '<br>set auto increment value in relation_types table';

        // add seeds
        $data = array(
            array(
                'id' => '201',
                'title' => 'mother'
            ),
            array(
                'id' => '202',
                'title' => 'father'
            ),
            array(
                'id' => '203',
                'title' => 'nanny'
            )
        );

        $this->db->insert_batch('relation_types', $data);

        echo '<br>relation_types feed with seeds';
    }

    public function down()
    {
        $this->dbforge->drop_table('relation_types');
    }
}