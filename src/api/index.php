<?php
require "database.php"; 
$bestAPI = new BestAPI();
$bestAPI->API();

class BestAPI {    

    function __construct() {

    }

    public function API(){
        header('Content-Type: application/JSON');                
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'GET'://consulta
                $this->getArticles();
                break;     
            case 'POST'://inserta
                echo 'POST';
                break;                
            case 'PUT'://actualiza
                echo 'PUT';
                break;      
            case 'DELETE'://elimina
                echo 'DELETE';
                break;
            default://metodo NO soportado
                echo 'METODO NO SOPORTADO';
                break;
        }
    }

    function getArticles(){
            $db = new DB();
        
            if($_GET['action'] == 'articles'){
                
                if(isset($_GET['start'])){
                     
                    $response = $db->getPagerArticles($_GET['start'],$_GET['end']);
                    echo json_encode($response,JSON_PRETTY_PRINT);  
                    
                 }else{ //muestra todos los registros                   
                    $response = $db->getArticles(); 
                    echo json_encode($response,JSON_PRETTY_PRINT); 
                    
                 } 
                 exit;
            }

            if ($_GET['action'] == 'article'){
                
                if(isset($_GET['id'])){
                    $response = $db->getArticle($_GET['id']);
                    echo json_encode($response,JSON_PRETTY_PRINT); 
                }
                exit;
            } 

            if ($_GET['action'] == 'count'){
                             
                $response = $db->getArticlesCount();
                echo json_encode($response,JSON_PRETTY_PRINT); 
                
                exit;
            } 
            if ($_GET['action'] == 'find'){
                
                $response = $db->getFindArticles();
                echo json_encode($response,JSON_PRETTY_PRINT); 
   
                exit;
            } 
            $this->response(400);
            
            $db->close();

    }


    function response($code=200, $status="", $message="") {
        http_response_code($code);
        if( !empty($status) && !empty($message) ){
            $response = array("status" => $status ,"message"=>$message);  
            echo json_encode($response,JSON_PRETTY_PRINT);    
        }            
     } 
    
}//end class
?>