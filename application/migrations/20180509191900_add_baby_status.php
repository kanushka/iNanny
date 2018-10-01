<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_add_baby_status  extends CI_Migration
{

    public function up()
    {
        $attributes = array('ENGINE' => 'InnoDB');

        // create baby_status table
        $this->dbforge->add_field('  `id` int(11) NOT NULL AUTO_INCREMENT,
          `status` varchar(50) DEFAULT NULL,
          PRIMARY KEY (`id`)');

        $this->dbforge->create_table('baby_status', true, $attributes);

        echo '<br>baby_status table created';

        $this->db->query('ALTER TABLE baby_status AUTO_INCREMENT 301');
        echo '<br>set auto increment value in baby_status table';

        // add seeds
        $data = array(
            array(
                'id' => '1',
                'status' => 'sleep'
            ),
            array(
                'id' => '2',
                'status' => 'happy'
            ),
            array(
                'id' => '3',
                'status' => 'angry'
            ),
            array(
                'id' => '4',
                'status' => 'cry'
            ),
            array(
                'id' => '5',
                'status' => 'sad'
            ),
            array(
                'id' => '6',
                'status' => 'suprise'
            )
        );

        $this->db->insert_batch('baby_status', $data);

        echo '<br>baby_status feed with seeds';
    }

    public function down()
    {
        $this->dbforge->drop_table('baby_status');
    }
}
