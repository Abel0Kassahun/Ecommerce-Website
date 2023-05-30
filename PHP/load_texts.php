// get all the texts with that chat id ordered by thier timestamp
// if the user id matches the sender id create an elt with class outgoing-texts
// if the user id matches the recipient id create an elt with class incoming-texts

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
    
        $chat_id = $data['chat_id']; 
        $sql = "SELECT * FROM messages WHERE chat_id = '$chat_id' ORDER BY timestamp DESC";
        
        $result = $connect -> query($sql);

        if ($result-> num_rows > 0) {
            // Loop through each row in the result set and store the pids in an array
            $i = 0;
            while($row = $result->fetch_array()) {
                
                $texts[$i] = array(
                    'msg_id' => intval($row['msg_id']),
                    'message' => $row['message'],
                    'sender' => intval($row['sender']),
                    'recipient' => intval($row['recipient']),
                    'timestamp' => $row['timestamp'],
                );

                $i++;
            }
            
            $response = 'All good'; 
            echo json_encode(array(
                'response' => $response,
                'texts' => $texts
            ));
        }
        else{
            $response = 'Couldn\'t load texts'; 
            echo json_encode(array(
                'response' => $response
            ));
        }
    }
?>