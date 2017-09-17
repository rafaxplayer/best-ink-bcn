<?php
define('PROJECT_ROOT',str_replace('api','',dirname(__FILE__)));

 if(isset($_POST)){

    require_once 'db_connect.php';
    $db = new DB_Connect();
    $conn = $db->connect();

    $upload = 1;
    $id = $_POST['id'];
    $title = $conn->real_escape_string($_POST['title']);
    $article = $conn->real_escape_string($_POST['articulo']);

    $target_dir = PROJECT_ROOT . "assets/img-uploads/";

    $target_save = "";
    $target_file = "";
    $sqlImg="";
    
    if(isset($_FILES['imagen'])){
        $fileInfo = pathinfo($_FILES["imagen"]["name"]);
        $name = uniqid() .  "." . $fileInfo['extension'];
        $target_save = "/assets/img-uploads/".$name;
        $target_save = $conn->real_escape_string($target_save);
        $target_file = str_replace('/','\\', $target_dir . $name);
        $sqlImg="img ='$target_save' ,";
    }
    
                
    $imageup = false;

    $sql = "UPDATE blog SET ".$sqlImg."title = '$title' ,content = '$article' WHERE id = $id";

    $result = $conn->query($sql);
    $msgImage="";  
    if ($result === TRUE) {

        if(!file_exists($target_file) && isset($_FILES['imagen']) && $target_file != ""){
            if (move_uploaded_file($_FILES['imagen']['tmp_name'], $target_file)) {
                    $imageup = true;
            } else {
                    $imageup = false;
            }
        }else{
                
            $msgImage = ' El archivo de imagen ya se encuentra en el servidor, ';
        }
            
        $imgmessage = $imageup ? ' y la imagen se subio al servidor' : ' no se actualizo imagen';
        echo ' ok datos actualizados ,'. $msgImage . $imgmessage ;
           
    } else {
        
        echo "Error: " . $sql . "<br>" . $conn->error;
    }  
    $conn->close();
        
} 
?>