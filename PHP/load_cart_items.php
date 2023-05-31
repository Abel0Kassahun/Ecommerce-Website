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

        $sql = "SELECT SUM(CAST(pr_price AS INT)) AS p_price FROM products INNER JOIN cart
            ON products.pr_id = cart.product_id WHERE is_deleted = 0 AND cart.user_id = ".$user_id;
        
        $result = $connect -> query($sql);

        if($result -> num_rows > 0){
            if($result){
                while ($row = $result->fetch_array()) {
                    $total_price = $row['p_price'];                
                }
    
                $sql0 = "SELECT pr_id, pr_name, pr_price, pr_image FROM products INNER JOIN cart
                    ON products.pr_id = cart.product_id WHERE is_deleted = 0 AND cart.user_id = ".$user_id;
                $result0 = $connect -> query($sql0);
    
                if($result0 -> num_rows > 0 AND $result0){
                    $i = 0;
                    while ($row = $result->fetch_array()) {
                        $cart_items[$i] = $row['pr_id'];
                        $cart_items[$i] = $row['pr_name'];
                        $cart_items[$i] = $row['pr_price'];
                        $cart_items[$i] = $row['pr_image'];
                        
                        $i++;                
                    }
                    $response = 'Success';
                }
                else{
                    $response = 'Error getting items in cart';
                }
            }
            else{
                $response = 'Error getting the total price of items in the cart';
            }
        }
        else{
            $response = 'No items in your cart';
        }

        echo json_encode(array(
            'total_price' => $total_price,
            'cart_items' => $cart_items,
            'response' => $response
        ));
    }
?>