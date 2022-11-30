<?php

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    
    if(isset($_POST)) {
        $article = $_POST["article"];

        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $mysqli = mysqli_connect("localhost","thetrash","","my_thetrash");

        // Check connection
        if ($mysqli -> connect_errno) {
          echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
          exit();
        }
        
        // Perform query
        $query = "UPDATE `feedback` SET `articolo`= ? ,`value`=`value`+1 WHERE 1";

        $stmt = $mysqli->prepare($query);
        $stmt->bind_param("s", $article);
    
        if($stmt->execute()){
            http_response_code(200);
            echo json_encode(array("message" => "Feedback Aggiunto"));
        }
        else{
            http_response_code(500);
            echo json_encode(array("message" => "Query Error"));
        }
    }

    else{
        http_response_code(505);
        echo json_encode(array("message" => "Request Error"));
    }
?>