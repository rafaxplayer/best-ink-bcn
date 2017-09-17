<?php
    require_once 'db_connect.php';
    $db = new DB_Connect();
    $conn = $db->connect();
    
    $sql = "SELECT * FROM blog";
    
    if ($result = $conn->query($sql)) {

        $emparray = array();
        while($row = $result->fetch_assoc())
        {
           
            $emparray[]= $row;
          
        }
        
        echo json_encode($emparray);
        
    }else{

        echo "Errormessage: ". $conn->error;
    }
    $result->free();
    $conn->close();
?>