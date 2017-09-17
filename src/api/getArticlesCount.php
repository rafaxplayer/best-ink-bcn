<?php
    require_once 'db_connect.php';
    $db = new DB_Connect();
    $conn = $db->connect();
    
    $sql = "SELECT COUNT(*) as count FROM blog";
    
    if ($result = $conn->query($sql)) {
        $data = $result->fetch_assoc();
        echo $data['count'];      
           
    }else{

        echo "Errormessage: ". $conn->error;
    }
    $result->free();
    $conn->close();
?>