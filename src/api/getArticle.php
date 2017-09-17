<?php
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        require_once 'db_connect.php';
        $db = new DB_Connect();
        $conn = $db->connect();

        $sql = "SELECT * FROM blog WHERE id = $id";
        if ($result = $conn->query($sql)){
            $row = $result->fetch_assoc();
            echo json_encode($row);
        }else{
            
            echo "Errormessage: ". $conn->error;
        }
        $result->free();
        $conn->close();
    }
    
?>