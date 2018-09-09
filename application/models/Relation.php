<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Relation extends CI_Model
{

    public function addBabysRelation($babyId, $relationTypeId, $firstName, $lastName, $email, $contact = null, $note = null)
    {
        $data = array(
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'baby_id' => $babyId,
            'relation_types_id' => $relationTypeId,
            'contact' => $contact,
            'note' => $note,
            'registered_at' => date('Y-m-d H:i:s', time()),
        );

        $this->db->insert('baby_has_relations', $data);

        return $this->db->insert_id();
    }

    public function updateRelation($relationId, $relationTypeId, $firstName, $lastName, $email, $contact, $note = null)
    {
        $data = array(
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'contact' => $contact,
            'relation_types_id' => $relationTypeId,
            'note' => $note,
        );

        $this->db->where('id', $relationId);
        $this->db->update('baby_has_relations', $data);

        return $this->db->affected_rows() > 0;
    }

    public function updateRelationImage($relationId, $imageUrl)
    {
        $data = array(
            'image_url' => $imageUrl
        );

        $this->db->where('id', $relationId);
        $this->db->update('baby_has_relations', $data);

        return $this->db->affected_rows() > 0;
    }

    /**
     * status
     * 0 - removed
     * 1 - created
     * 2 - invited with email
     * 3 - registered
     */
    public function changeRelationStatus($relationId, $status)
    {

        if (!is_numeric($status) || $status < 0 || $status > 3) {
            // invalid status value
            return false;
        }

        $this->db->set('status', $status);
        $this->db->where('id', $relationId);
        $this->db->update('baby_has_relations');

        return $this->db->affected_rows() > 0;
    }

    public function setRelationPassword($relationId, $password)
    {
        $this->db->set('password', $password);
        $this->db->set('status', 3); // set relation status to 'registered'
        $this->db->where('id', $relationId);
        $this->db->where('status', 2); // add password for invited user
        $this->db->update('baby_has_relations');

        return $this->db->affected_rows() > 0;
    }

    public function getRelationById($relationId)
    {
        $baseUrl = $this->config->item('base_url');

        $this->db->select("baby_has_relations.*, CONCAT('$baseUrl', baby_has_relations.`image_url`) AS image_url");
        $this->db->from('baby_has_relations');
        $this->db->where('id', $relationId);        
        $this->db->limit(1);
        $query = $this->db->get();

        $result = $query->result();
        return $result ? $result[0] : false;
    }

    public function getRelationByEmail($email)
    {
        $this->db->select('*');
        $this->db->from('baby_has_relations');
        $this->db->where('email', $email); 
        $this->db->where('status', 3);       
        $this->db->limit(1);
        $query = $this->db->get();

        $result = $query->result();
        return $result ? $result[0] : false;
    }

    public function getRelationsByBabyId($babyId)
    {
        $baseUrl = $this->config->item('base_url');

        $this->db->select("`id`, `first_name`, `last_name`, `email`, `contact`, `baby_id`, `relation_types_id`, `registered_at`, CONCAT('$baseUrl', baby_has_relations.`image_url`) AS image_url, `note`, `status`");
        $this->db->from('baby_has_relations');
        $this->db->where('baby_id', $babyId); 
        $this->db->where_not_in('status', 0);       
        $query = $this->db->get();

        $result = $query->result();
        return $result ? $result : false;
    }

    public function getRelationTypes()
    {
        $this->db->select('*');
        $this->db->from('relation_types');       
        $query = $this->db->get();

        $result = $query->result();
        return $result ? $result : false;
    }

}
