<?php
    if(isset($_GET['pattern'])){
        
        $pattern = $_GET['pattern'];
        require_once 'db_connect.php';
        $db = new DB_Connect();
        $conn = $db->connect();

        $sql = "SELECT * FROM blog WHERE title LIKE '%$pattern%'";

        if ($result = $conn->query($sql)) {
            
            $emparray = array();
            while($row = $result->fetch_assoc())
            {
                
                $emparray[] = $row;
                
            }
            
            echo json_encode($emparray);
            
        }else{
    
            echo "Errormessage: ". $conn->error;
        }
        $result->free();
        $conn->close();
    }
    
?>