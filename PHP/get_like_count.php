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

        $sql0 = "SELECT like_count FROM likes WHERE pr_id = '$pr_id'";
        $result0 = $connect -> query($sql0);
        
        while($row = $result0->fetch_array()){
            $like_count = $row['like_count'];
        }
        
        // $item_in_cart = false;
        // if($result0 -> num_rows > 0){
        //     $item_in_cart = true;
        // }


        $sql = "SELECT * FROM liked_items where pr_id = '$pr_id' AND user_id = '$user_id'";
        $result = $connect -> query($sql);
        if($result -> num_rows > 0){
            $like_status = true;
        }
        else{
            $like_status = false;
        }
        
        $connect->close();
        echo json_encode(array(
            'like_count' => $like_count,
            'like_status' => $like_status
        ));
    }
?>