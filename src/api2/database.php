<?php

class DB {
    
    protected $conn;

    function __construct() {

        require_once 'config.php';
        try{
            $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD,DB_DATABASE);
            $this->conn->set_charset("utf8");

        }catch(mysqli_sql_exception $e){
            http_response_code(500);
            exit;
        }
     
    }
  
    public function close(){
        $this->conn->close();
    }

    public function getError(){
        return $this->conn->error;
    }

    public function getArticles(){     
        $sql = "SELECT * FROM blog";
        $result = $this->conn->query($sql);
        $articles = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
        return $articles;       
                       
    }

    public function getPagerArticles($start, $end){     
        $sql = "SELECT * FROM blog LIMIT $start, $end";
        $result = $this->conn->query($sql);
        $articles = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
        return $articles;       
                       
    }

    public function getArticle($id){     
        $sql = "SELECT * FROM blog WHERE id = $id";
        $result = $this->conn->query($sql);
        $article = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
        return $article;       
                       
    } 
    
    public function getArticlesCount(){     
        $sql = "SELECT COUNT(*) as count FROM blog";
        $result = $this->conn->query($sql);
        $count = $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
        return $count;       
                       
    }

    public function getFindArticles($pattern){ 
        $sql = "SELECT * FROM blog WHERE title LIKE '%$pattern%'";
        $result = $this->conn->query($sql);
        $result->fetch_all(MYSQLI_ASSOC);
        $result->free();
        return $result;
                
    }

    public function newArticle($title,$body,$image){
        $sql = "INSERT INTO blog (img ,title ,content) VALUES ('$image' ,'$title' ,'$body')";
        $result = $this->conn->query($sql);
        return $result;
    }

    public function updateArticle( $id,$title, $body, $image){
        $sqlImg="";
        if(strlen($image) > 0){
            $sqlImg = "img = $image, ";
        }
        $sql = "UPDATE blog SET ".$sqlImg."title = '$title', content= '$body' WHERE id=$id";
        $result = $this->conn->query($sql);
        return $result;
    }
}
?>