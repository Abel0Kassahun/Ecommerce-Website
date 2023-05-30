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
        $sql = "SELECT * FROM chats WHERE user1 = '$user_id' OR user2 = '$user_id' ORDER BY timestamp ASC";
        
        $result = $connect -> query($sql);

        if ($result-> num_rows > 0) {
            // Loop through each row in the result set and store the pids in an array
            $i = 0;
            while ($row = $result->fetch_array()) {
                if($row['user1'] === $user_id){
                    $the_others[$i] = array(
                        'other_user' => $row['user2'],
                        'chat_id' => $row['chat_id']
                    );
                    
                    $i++;
                }
                
                else{
                    $the_others[$i] = array(
                        'other_user' => $row['user1'],
                        'chat_id' => $row['chat_id']
                    );
                    $i++;
                }
            }
            for($i = 0; $i < count($the_others); $i++){
                $sql = "SELECT fullName, `profile-picture` FROM user WHERE user-id =". $the_others[$i]['other_user'];
                $result = $connect -> query($sql);
                
                while ($row = $result->fetch_array()){
                    $chats[$i] = array(
                        'chat_id' => $the_others[$i]['chat_id'],
                        'fullName' => $row['fullName'],
                        'profile_picture' => $row['profile-picture']
                    );
                }
                
            }

            $response = 'All good'; 
            echo json_encode(array(
                'response' => $response,
                'chats' => $chats
            ));
        }
        else{
            $response = 'You haven\'t started a chat with anyone'; 
            echo json_encode(array(
                'response' => $response
            ));
        }
    }


?>