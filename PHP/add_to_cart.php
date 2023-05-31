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

            $sql = "SELECT product_id FROM cart WHERE user_id = '$user_id' 
            AND product_id = '$product_id'";

            $result = $connect -> query($sql);
            if($result -> num_rows > 0){
                $response = "This item is already in your cart";
            }
            else{
                $sql0 = "INSERT INTO cart (user_id, product_id) VALUES ('$user_id', '$product_id')";
            
                $result0 = $connect -> query($sql0);
                if($result){
                    $response = "Success";
                }
                else{
                    $response = "Couldn't insert item into cart";
                }
            }



            echo json_encode(array(
                'response' => $response
            ));
        }
?>