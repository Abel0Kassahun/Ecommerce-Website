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
        $increment = $data['increment'];

        if($increment == 1){
            $sql1 = "SELECT like_count FROM likes WHERE pr_id = '$pr_id'";
            $result1 = $connect -> query($sql1);

            while($row = $result1->fetch_array()){
                $like_count = intval($row['like_count']);
            }
            $like_count++;
            
            $sql2 = "UPDATE likes SET like_count = '$like_count' WHERE pr_id = '$pr_id'";
            $result2 = $connect -> query($sql2);
            if($result2){
                $sql0 = "INSERT INTO liked_items VALUES ('$user_id', '$pr_id')";
                $result0 = $connect -> query($sql0);
                if($result0){
                    $response = "Success";
                }
                else{
                    $response = "Couldnt store item in liked_items table";
                }
            }
        }
        else{
            $sql1 = "SELECT like_count FROM likes WHERE pr_id = '$pr_id'";
            $result1 = $connect -> query($sql1);

            while($row = $result1->fetch_array()){
                $like_count = intval($row['like_count']);
            }
            $like_count--;
            
            $sql2 = "UPDATE likes SET like_count = '$like_count' WHERE pr_id = '$pr_id'";
            $result2 = $connect -> query($sql2);

            if($result2){
                $sql0 = "DELETE FROM liked_items WHERE pr_id = '$pr_id' AND user_id = '$user_id'";
                $result0 = $connect -> query($sql0);

                if($result0){
                    $response = "Success";
                }
                else{
                    $response = "Couldnt delete item in liked_items table";
                }
            }
        }

        $connect->close();
        echo json_encode(array(
            'like_count' => $like_count,
            'response' => $response
        ));
    }
?>