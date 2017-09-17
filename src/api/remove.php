<?php
define('PROJECT_ROOT',str_replace('\api','',dirname(__FILE__)));
    require_once 'db_connect.php';
    $db = new DB_Connect();
    $conn = $db->connect();

    if(isset($_GET)){

        $id = $_GET['id'];

        $sqlImage = "SELECT * FROM blog WHERE id = $id";

        if ($result = $conn->query($sqlImage)){

            $row = $result->fetch_assoc();
            $file = str_replace('/','\\',PROJECT_ROOT . $row['img']);
            unlink($file);
            
        }else{
            
            echo "Errormessage: ". $conn->error;
        }

        $sql = "DELETE FROM blog WHERE id = $id";

        $result = $conn->query($sql);
                
        if ($result === TRUE) {

            if($conn->affected_rows > 0){
         
                echo 'Entrada eliminada con exito!';

            }else{

                echo 'no se encontro registro';
            }
           
           
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        } 
        
        $conn->close();
        
    }
    
?>