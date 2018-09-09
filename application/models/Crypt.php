<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Crypt extends CI_Model
{
    
    public function encrypt($val)
    {
        $encryptVal = base64_encode($val);
        
        $revEncryptVal = strrev($encryptVal);
        $encryptRevVal = base64_encode($revEncryptVal);
        
        $combineVal = $encryptRevVal . $encryptRevVal;
        $encryptCombineVal = base64_encode($combineVal);
        
        return $encryptCombineVal;
    }
    
    
    public function checkEncrypt($val, $encryptVal)
    {
        if(!($val && $encryptVal)){
            return false;
        }

        return $this->__valDecrypt($encryptVal) == $val;
    }


    private function __valDecrypt($val)
    {
        $decryptVal = base64_decode($val);

        // invalid value for decript
        if (!$decryptVal) {
            return false;
        }

        $stringLength = strlen($decryptVal);
        $halfVal = substr($decryptVal, $stringLength / 2);
        $decryptRevVal = base64_decode($halfVal);

        $revRevVal = strrev($decryptRevVal);
        $originalVal = base64_decode($revRevVal);

        return $originalVal;
    }


    public function urlEncode($val)
    {
        $encryptVal = base64_encode($val);

        $revEncryptVal = strrev($encryptVal);
        $encryptRevVal = base64_encode($revEncryptVal);

        $alpaNumVal = bin2hex($encryptRevVal);

        return $alpaNumVal;
    }


    public function urlDecode($val)
    {

        if (!ctype_alnum($val)) {
            return false;
        }
        
        if (!ctype_xdigit($val)) {
            return false;
        }
        
        $mixVal = pack("H*", $val);

        $decryptVal = base64_decode($mixVal);

        // invalid value for decript
        if (!$decryptVal) {
            return false;
        }

        $revRevVal = strrev($decryptVal);
        $originalVal = base64_decode($revRevVal);

        return $originalVal;
    }

}
