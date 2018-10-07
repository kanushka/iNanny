<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Baby extends CI_Model
{

    public function addBaby($firstName, $lastName)
    {
        $data = array(
            'first_name' => $firstName,
            'last_name' => $lastName,
            'registered_at' => date('Y-m-d H:i:s', time()),
        );

        $this->db->insert('baby', $data);

        return $this->db->insert_id();
    }

    public function getBabyByRelationId($relationId)
    {
        $baseUrl = $this->config->item('base_url');

        $this->db->select("baby.*, CONCAT('$baseUrl', baby.`image_url`) AS image_url");
        $this->db->from('baby_has_relations');
        $this->db->join('baby', 'baby.id = baby_has_relations.baby_id');
        $this->db->where('baby_has_relations.id', $relationId);
        $this->db->limit(1);
        $query = $this->db->get();

        $result = $query->result();
        return $result ? $result[0] : false;
    }

    public function getBabyHeightByBabyId($babyId)
    {
        $this->db->select('*');
        $this->db->from('baby_has_height');
        $this->db->where('baby_id', $babyId);
        $this->db->order_by('added_at', 'DESC');
        $this->db->limit(1);
        $query = $this->db->get();

        $result = $query->result();
        return $result ? $result[0] : false;
    }

    public function addBabyHeight($babyId, $height)
    {
        $data = array(
            'baby_id' => $babyId,
            'height' => $height,
            'added_at' => date('Y-m-d H:i:s', time()),
        );

        $this->db->insert('baby_has_height', $data);

        return $this->db->insert_id();
    }

    public function updateBabyHeight($babyId, $height)
    {
        // get last height Id
        $heightData = $this->getBabyHeightByBabyId($babyId);
        if(!$heightData){
            return false;
        }

        $heightId = $heightData->id;

        // update last height with new value
        $data = array(            
            'height' => $height,
            'added_at' => date('Y-m-d H:i:s', time()),
        );

        $this->db->where('id', $heightId);
        $this->db->update('baby_has_height', $data);

        return $this->db->affected_rows() > 0;
    }

    public function getBabyWeightByBabyId($babyId)
    {
        $this->db->select('*');
        $this->db->from('baby_has_weight');
        $this->db->where('baby_id', $babyId);
        $this->db->order_by('added_at', 'DESC');
        $this->db->limit(1);
        $query = $this->db->get();

        $result = $query->result();
        return $result ? $result[0] : false;
    }

    public function addBabyWeight($babyId, $weight)
    {
        $data = array(
            'baby_id' => $babyId,
            'weight' => $weight,
            'added_at' => date('Y-m-d H:i:s', time()),
        );

        $this->db->insert('baby_has_weight', $data);

        return $this->db->insert_id();
    }

    public function updateBabyWeight($babyId, $weight)
    {
        // get last height Id
        $weightData = $this->getBabyWeightByBabyId($babyId);
        if(!$weightData){
            return false;
        }

        $weightId = $weightData->id;

        // update last height with new value
        $data = array(            
            'weight' => $weight,
            'added_at' => date('Y-m-d H:i:s', time()),
        );

        $this->db->where('id', $weightId);
        $this->db->update('baby_has_weight', $data);

        return $this->db->affected_rows() > 0;
    }

    public function updateBaby($id, $firstName, $lastName, $birthday, $gender, $note)
    {
        $data = array(
            'first_name' => $firstName,
            'last_name' => $lastName,
            'birthday' => $birthday,
            'gender' => $gender,
            'note' => $note
        );

        $this->db->where('id', $id);
        $this->db->update('baby', $data);

        return $this->db->affected_rows() > 0;
    }
    
    public function updateBabyImage($id, $imageUrl)
    {
        $data = array(
            'image_url' => $imageUrl
        );

        $this->db->where('id', $id);
        $this->db->update('baby', $data);

        return $this->db->affected_rows() > 0;
    }

    public function getBabyHeightHistoryByBabyId($babyId)
    {
        $this->db->select('`height`, `added_at`');
        $this->db->from('baby_has_height');
        $this->db->where('baby_id', $babyId);
        $this->db->limit(10);
        $query = $this->db->get();

        $result = $query->result();
        return $result ? $result : false;
    }

    public function getBabyWeightHistoryByBabyId($babyId)
    {
        $this->db->select('`weight`, `added_at`');
        $this->db->from('baby_has_weight');
        $this->db->where('baby_id', $babyId);
        $this->db->limit(10);
        $query = $this->db->get();

        $result = $query->result();
        return $result ? $result : false;
    }

    public function getBabySleepingStatusByBabyId($babyId, $limit = 20)
    {
        $this->db->select('*');
        $this->db->from('babys_activity_status');
        $this->db->where('baby_id', $babyId);
        $this->db->order_by('added_at', 'DESC');
        $this->db->limit($limit);
        $query = $this->db->get();

        $result = $query->result();
        return $result ? $result : false;
    }

    public function getBabyActivitiesByBabyId($babyId, $startDate, $endDate)
    {
        $this->db->select('babys_activity_status.status AS status_id, baby_status.status, COUNT(babys_activity_status.status) AS count');
        $this->db->from('babys_activity_status');
        $this->db->where('baby_id', $babyId);
        // $this->db->where('added_at > ', $startDate); for testing
        // $this->db->where('added_at < ', $endDate);
        $this->db->join('baby_status', 'baby_status.id = babys_activity_status.status');
        $this->db->group_by('babys_activity_status.status');
        $this->db->order_by('babys_activity_status.status', 'ASC');
        $query = $this->db->get();

        $result = $query->result();
        return $result ? $result : false;
    }

    // add baby's activity status
    //  1 - sleep
    //  2 - awake
    //  3.. - other

    public function addBabyActivityStatus($babyId, $status = 2)
    {
        $data = array(
            'baby_id' => $babyId,
            'status' => $status,
            'added_at' => date('Y-m-d H:i:s', time()),
        );

        $this->db->insert('babys_activity_status', $data);

        return $this->db->insert_id();
    }
}
