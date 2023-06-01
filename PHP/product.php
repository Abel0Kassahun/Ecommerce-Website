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
        $pr_id = $data['product_id'];

        $sql0 = "SELECT * FROM cart WHERE user_id = '$user_id' AND product_id = '$pr_id'";
        $result0 = $connect -> query($sql0);

        $item_in_cart = false;
        if($result0 -> num_rows > 0){
            $item_in_cart = true;
        }


        $sql = "select pr_name, pr_price, pr_image, pr_description, pr_posted_by from products where pr_id = '$pr_id'";
        $result = $connect -> query($sql);
        
        while($row = $result->fetch_array()){
            $product = array(
                'pr_name' => $row['pr_name'],
                'pr_price' => $row['pr_price'],
                'pr_image' => $row['pr_image'],
                'pr_description' => $row['pr_description'],
                'pr_posted_by' => $row['pr_posted_by'],
                'item_in_cart' => $item_in_cart
            );
        }




        $connect->close();
        echo json_encode($product);
    }
?>