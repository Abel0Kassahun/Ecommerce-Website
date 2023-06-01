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

            $sql = "SELECT pr_id, pr_name, pr_price, pr_image FROM products WHERE pr_posted_by = '$user_id'";
            $result = $connect -> query($sql);

            if($result){
                if($result -> num_rows > 0){
                    $i = 0;
                    while($row = $result->fetch_array()){
                        $product[$i] = array(
                            'pr_id' => $row['pr_id'],
                            'pr_name' => $row['pr_name'],
                            'pr_price' => $row['pr_price'],
                            'pr_image' => $row['pr_image']
                        );
                        $i++;
                    }
                    $response = "Success";
                }
                else{
                    $response = "You haven\'t posted any items";
                }
            }
            else{
                $response = "Failed to fetch posted items";
            }

            echo json_encode(array(
                "product" => $product,
                'response' => $response
            ));
        }
?>