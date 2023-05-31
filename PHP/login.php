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
        $email = $data["email"];
        $password = $data["psword"];

        $stmt = $connect->prepare("CALL login(?, ?, @response, @fullName, @uid)");

        // Bind input parameters
        $stmt->bind_param("ss", $email, $password);
        
        // Execute the stored procedure
        $stmt->execute();
        
        // Retrieve the output parameters
        $select = $connect->query('select @response, @fullName, @uid');
        $result = $select->fetch_assoc();

        $toFrontEnd = array(
            'response' =>  $result["@response"],
            'fullName' =>  $result["@fullName"],
            'uid' => $result['@uid']
        );

        $connect->close();
        echo json_encode($toFrontEnd);

    }
?>