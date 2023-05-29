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
            
        // let sell_data = {
        //     pr_name: product_name.value,
        //     pr_price: product_price.value,
        //     pr_image: `../PHP/product_images/${drp_down}/${data.filename}`,
        //     posted_by: user_id,
        //     pr_description: desc.value,
        //     category: drp_down
        // }
        
        $stmt = $connect->prepare("CALL upload_product(?, ?, ?, ?, ?, ?)");
        
        $stmt->bind_param("sisiss", $data['pr_name'], $data['pr_price'], $data['pr_image'],  
        $data['posted_by'], $data['pr_description'], $data['category']);

        if($stmt->execute()){
            $response = 1;
        }
        else{
            $response = 'Error Signing up, try again later';
        }

        $stmt->close();
        
        $connect->close();

        echo json_encode(array(
            'response' => $response,
        ));
    }
?>