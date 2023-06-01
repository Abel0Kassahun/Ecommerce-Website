<?php
        include('./connect.php');
        $conn = new Connect;
        $connect = $conn -> getConnection();
    
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        header('Content-Type: application/json');
        $data = json_decode(file_get_contents("php://input"), true);
    
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $user_id = $data['user_id'];
            $product_id = $data['product_id'];

            $sql = "DELETE FROM cart WHERE product_id = '$product_id' AND user_id = '$user_id'";
            $result = $connect -> query($sql);

            if($result){
                $response = "Success";
            }
            else{
                $response = "Failed to remove item from cart";
            }

            echo json_encode($response);

            // this might not work as $response might be in a json format itself
            // echo $response;
        }
?>