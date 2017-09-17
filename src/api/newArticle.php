<?php
define('PROJECT_ROOT',str_replace('api','',dirname(__FILE__)));

 if(isset($_POST)){

    require_once 'db_connect.php';
    $db = new DB_Connect();
    $conn = $db->connect();
    $upload = 1;
    $title = $conn->real_escape_string($_POST['title']);
    $article = $conn->real_escape_string($_POST['articulo']);

    $target_dir = PROJECT_ROOT . "assets/img-uploads/";

    $target_save = "";
    $target_file = "";
    $message = "";
    if(isset($_FILES['imagen'])){
        $fileInfo = pathinfo($_FILES["imagen"]["name"]);
        $name = uniqid() .  "." . $fileInfo['extension'];
        $target_save = "/assets/img-uploads/".$name;
        $target_save = $conn->real_escape_string($target_save);
        $target_file = str_replace('/','\\', $target_dir . $name);
    }
    
                
    $imageup = false;
    $sql = "INSERT INTO blog (img ,title ,content) VALUES ('$target_save' ,'$title' ,'$article')";

    $result = $conn->query($sql);
        
    if ($result === TRUE) {

        if(!file_exists($target_file) && isset($_FILES['imagen']) && $target_file != ""){
            if (move_uploaded_file($_FILES['imagen']['tmp_name'], $target_file)) {
                    $imageup = true;
            } else {
                    $imageup = false;
            }
        }else{
            
            $message='El archivo de imagen ya se encuentra en el servidor, ';
        }
        
        $imgmessage = $imageup ? 'y la imagen se subio al servidor' : ' pero ocurrio un error al subir la imagen';
        echo 'ok datos guardados ,'. $imgmessage;
    
    } else {
        echo $message. $sql . "<br>" . $conn->error;
        
        
    }
   
    $conn->close();
    
    
        
} 
?>