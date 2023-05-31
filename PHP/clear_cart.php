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
            $from_buy = $data['from_buy'];

            if(!$from_buy){
                // get the product id od cart items of the user that checked out
                $sql = "SELECT product_id FROM cart WHERE cart.user_id = ".$user_id;
                $result = $connect -> query($sql);

                $product_id = array();

                if($result -> num_rows > 0 AND $result){
                    $i = 0;
                    while ($row = $result->fetch_array()) {
                        $product_id[$i] = $row['product_id'];
                        $i++;                
                    }
                    
                    // clear the cart
                    $sql0 = "DELETE FROM cart WHERE product_id IN (".implode(",",$product_id).")";
                    $result0 = $connect -> query($sql0);
                    if($result0){
                        // insert the checked out items into the bought items table
                        $error = false;
                        for($i = 0; $i < count($product_id); $i++){
                            $sql1 = "INSERT INTO bought_items (user_id, pr_id) VALUES ('$user_id', '$product_id[$i]')";
                            $result1 = $connect -> query($sql1);
                            if(!$result1){
                                $error = true;
                            }
                        }
                        if(!$error){
                            // if this doesnt work you can use a loop to append individual product id into the query 
                            $sql2 = "UPDATE products SET is_deleted = 1 WHERE pr_id IN (".implode(",",$product_id).")";
                            $result2 = $connect -> query($sql2);

                            if($result2){
                                $response = "Success";
                            }
                            else{
                                $response = "Couldn\'t delete checked out items from the products table";
                            }
                        }
                        else{
                            $response = "Couldn\'t insert items into bought items table";
                        }
                    }
                    else{
                        $response = "Couldn\'t delete items from cart";
                    }
                }
                else{
                    $response = "Couldn\'t load product_id from cart";
                }
            }
            // the big else
            else{
                $product_id = $data['product_id'];
                // clear the cart
                $sql3 = "DELETE FROM cart WHERE product_id = ".$product_id;
                $result3 = $connect -> query($sql3);
                if($result3){
                    // insert the checked out items into the bought items table
                    $sql4 = "INSERT INTO bought_items (user_id, pr_id) VALUES ('$user_id', '$product_id')";
                    $result4 = $connect -> query($sql4);
                    
                    if($result4){
                        // if this doesnt work you can use a loop to append individual product id into the query 
                        $sql5 = "UPDATE products SET is_deleted = 1 WHERE pr_id = ".$product_id;
                        $result5 = $connect -> query($sql5);

                        if($result5){
                            $response = "Success";
                        }
                        else{
                            $response = "Couldn\'t delete bought item from the products table";
                        }
                    }
                    else{
                        $response = "Couldn\'t insert item into bought items table";
                    }
                }
                else{
                    $response = "Couldn\'t delete item from cart";
                }
            }
            

            echo json_encode(array(
                'resposne' => $response
            ));
        }
?>