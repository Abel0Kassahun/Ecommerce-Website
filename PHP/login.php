<?php
    include('./connect.php');
    $conn = new Connect;
    $connect = $conn -> getConnection();

    header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        // header('Content-Type: application/json');
    
        // $raw = file_get_contents("php://input");
        // $data = json_decode($raw);

        // $email = $data["email"];
        // $password = $data["psword"];
        $email = $_POST["email"];
        $password = $_POST["psword"];

        $stmt = $connect->prepare("CALL login(?, ?, @response, @fullName)");

        // Bind input parameters
        // mysqli_stmt_bind_param($stmt, "ii", $email, $password);
        $stmt->bind_param("ss", $email, $password);
        
        // Execute the stored procedure
        // mysqli_stmt_execute($stmt);
        $stmt->execute();
        
        // Retrieve the output parameters
        // $stmt->close();
        $select = $connect->query('select @response, @fullName');
        $result = $select->fetch_assoc();

        $toFrontEnd = array(
            'response' =>  $result["@response"],
            'fullName' =>  $result["@fullName"]
        );

        // $connect->close();
        echo json_encode($toFrontEnd);


    }
?>