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
            $total_price = $data['total_price'];

            $sql = "SELECT fullName, phoneNumber, email FROM user 
            WHERE user-id = ".$user_id;

            $result = $connect -> query($sql);


            if($result -> num_rows > 0 AND $result){
                while ($row = $result->fetch_array()) {
                    $user = array(
                        'fullName' => $row['fullName'],
                        'phoneNumber' => $row['phoneNumber'],
                        'email' => $row['email'],
                    );                
                }
            }

            $fullname = explode(" ", $user['fullName']);
            $beforeAT = explode("@", $user['email']);
            
            $random = range(0, 40);
            shuffle($random);

            $tx_ref = $beforeAT + strval($random);

            $curl = curl_init();
    
            curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://api.chapa.co/v1/transaction/initialize',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS =>'{
                    "amount":'.$total_price.',
                    "currency": "ETB",
                    "email": '.$user['email'].',
                    "first_name": '.$fullname[0].',
                    "last_name": '.$fullname[1].',
                    "phone_number": '.$user['phoneNumber'].',
                    "tx_ref": "chewatatest-"'.$tx_ref.',
                    "callback_url": ""https://www.google.com"",
                    "return_url": ""https://www.google.com"",
                    "customization[title]": "",
                    "customization[description]": ""
                }',
                CURLOPT_HTTPHEADER => array(
                'Authorization: Bearer CHASECK_TEST-xeI3gf4xifiUuKKk7Ckot5LVcmLsu4q0',
                'Content-Type: application/json'
                ),
            ));
            
            $response = curl_exec($curl);
            $response['tx_ref_custom'] = "chewatatest-".$txt_ref;

            curl_close($curl);

            echo json_encode($response); // this might not work as $response might be in a json format itself
            // echo $response;
        }
?>