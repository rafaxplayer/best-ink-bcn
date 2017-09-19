<?php
require 'headers.php';
echo 'llega';
if(isset($_POST)){

    $to = 'rafaxplayer72@gmail.com';
    $subject = "Envido por : ".$_POST['name']. " Email : " .$_POST['email'];
    $body = $_POST['message'];
    echo var_dump($_POST);
    if (mail($to, $subject, $body)) {
        echo("<p>Email successfully sent!</p>");
     } else {
        echo("<p>Email delivery failed…</p>");
     }
}

?>