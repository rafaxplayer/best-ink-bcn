<?php
include '../api/headers.php';
require "vendor/autoload.php";
require "database.php";



$c = new \Slim\Container(); //Create Your container

$c['upload_directory'] = str_replace(basename(__DIR__),"",__DIR__ )."assets\img-uploads";

$app = new Slim\App($c);

$app->get('/articles', function ($request, $response, $args) {
    try{
        $db = new DB();
        $articles = $db->getArticles();
        $db->close();
        return $response->withJson($articles);
    }catch(mysqli_sql_exception $e){
        $data = array('error' => true, 'message' => $e->getMessage());
        return $response->withStatus(500)->withJson($data);
    }
   
});

$app->get('/articles/[{start}/{end}]', function ($request, $response, $args) {
    try{
        $db = new DB();
        $articles = $db->getPagerArticles($args['start'],$args['end']);
        $db->close();
        return $response->withJson($articles);
    }catch(mysqli_sql_exception $e){
        $data = array('error' => true, 'message' => $e->getMessage());
        return $response->withStatus(500)->withJson($data);
    }
    
});

$app->get('/articles/count', function ($request, $response, $args) {
    try{
        $db = new DB();
        $count = $db->getArticlesCount();
        $db->close();
        return $response->withJson($count);
    }catch(mysqli_sql_exception $e){
        $data = array('error' => true, 'message' => $e->getMessage());
        return $response->withStatus(500)->withJson($data);
    }
    
});

$app->get('/articlesfind/{pattern}', function ($request, $response, $args) {
    try{
        $db = new DB();
        $articles = $db->getFindArticles($args['pattern']);
        $db->close();
        return $response->withJson($articles);
    }catch(mysqli_sql_exception $e){
        $data = array('error' => true, 'message' => $e->getMessage());
        return $response->withStatus(500)->withJson($data);
    }
    
         
});

$app->get('/article/{id}', function ($request, $response, $args) {
    try{
        $db = new DB();
        $article = $db->getArticle($args['id']);
        $db->close();
        return $response->withJson($article);
    }catch(mysqli_sql_exception $e){
        $data = array('error' => true, 'message' => $e->getMessage());
        return $response->withStatus(500)->withJson($data);
    }
    
});

//update 
$app->put('/article/{id}', function ($request, $response, $args) {
    
    $directory = $this->get('upload_directory');
    
    $data = $request->getParsedBody();

    $title = filter_var($data['title'], FILTER_SANITIZE_STRING);
    $article = filter_var($data['articulo'], FILTER_SANITIZE_STRING);

    $uploadedFiles = $request->getUploadedFiles();
    $target_save="";
    if($uploadedFiles){
        $uploadedFile = $uploadedFiles['imagen'];
        
        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            $target_save = moveUploadedFile($directory, $uploadedFile);
            
        }  
    }

    $db = new DB();

    if($db->updateArticle($args['id'], $title, $article, $target_save)){
            

        return $response->withStatus(200)->withJson('Ok , Articulo actualizado');

    }else{
        $data = array('error' => true, 'message' => $db->getError());
        return $response->withStatus(500)->withJson($data);
    } 
    
    $db->close();
    
});
// new article
$app->post('/article', function ($request, $response) {
    
    $directory = $this->get('upload_directory');

    $data= $request->getParsedBody();
    $title = filter_var($data['title'], FILTER_SANITIZE_STRING);
    $article = filter_var($data['articulo'], FILTER_SANITIZE_STRING);

    $uploadedFiles = $request->getUploadedFiles();
    $target_save="";
    if($uploadedFiles){
        $uploadedFile = $uploadedFiles['imagen'];
        
         if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            $target_save = moveUploadedFile($directory, $uploadedFile);
            
        }  
    }

    $db = new DB();

    if($db->newArticle($title,$article,$target_save)){
            

        return $response->withStatus(200)->withJson('Ok , Articulo creado');

    }else{
        $data = array('error' => true, 'message' => $db->getError());
         return $response->withStatus(500)->withJson($data);
    } 
      
    $db->close();
    
});

function moveUploadedFile($directory, $uploadedFile)
{
    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $basename = uniqid(); 
    $filename = sprintf('%s.%0.8s', $basename, $extension);
    $target_save="/assets/img-uploads/".$filename;
    $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

    return $target_save;
}


$app->run();
?>