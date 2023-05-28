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
        $email = $data['email'];
        $sql = "select email from user where email = '$email'";
        $result = $connect -> query($sql);
        if($result->num_rows == 1){            
            $response = 'Email already exists, try signing in';
        }
        else{
            
            $stmt = $connect->prepare("CALL signup(?, ?, ?, ?, @uid)");
            $stmt->bind_param("ssss", $data['email'], $data['fullName'], $data['phoneNo'], $data['psword']);
            if($stmt->execute()){
                $response = 'Signup Successful';
            }
            else{
                $response = 'Error Signing up, try again later';
            }

            $select = $connect->query('select @uid');
            $result = $select->fetch_assoc();
        }
        $toFrontEnd = array(
            'response' => $response,
            'uid' => $result['@uid']
        );
        $connect->close();
        echo json_encode($toFrontEnd);
    }
?>