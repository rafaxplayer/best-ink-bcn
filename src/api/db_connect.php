<?php
 
class DB_Connect {
 
    // constructor
    function __construct() {
 
    }
 
    // destructor
    function __destruct() {
        // $this->close();
    }
 
    // Connecting to database
    public function connect() {
        require_once 'config.php';
        // connecting to mysql
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD,DB_DATABASE);
       
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
            exit();
        }
       
        $conn->set_charset("utf8");
        // return database handler
        return $conn;
    }
 
     
} 
?>