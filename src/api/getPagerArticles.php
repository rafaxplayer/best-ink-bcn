<?php
    require_once 'db_connect.php';
    $db = new DB_Connect();
    $conn = $db->connect();
    $start = $_GET['start'];
    $end = $_GET['end'];
    
    $sql = "SELECT * FROM blog LIMIT $start, $end";
    
    if ($result = $conn->query($sql)) {

        $emparray = array();
        while($row = $result->fetch_assoc())
        {
           
            $emparray[]= $row;
          
        }
        
        echo json_encode($emparray);
        
        
    }else{
        
       echo "Error : ".$conn->error;
        
    }
    
    $result->free();
    $conn->close();
?>