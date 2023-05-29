<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    // header('Content-Type: application/json');
    // $data = json_decode(file_get_contents("php://input"), true);
    // Check if file was uploaded successfully
    if(isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $category = $_POST['category'];
        
        $filename = $_FILES['image']['name'];
        $tempFilePath = $_FILES['image']['tmp_name'];
        $fileType = $_FILES['image']['type'];

        $response;
        // Check if file type is allowed
        $allowedTypes = array('image/jpeg', 'image/png');
        if(!in_array($fileType, $allowedTypes)) {
            $response = 'Error: Only JPG and PNG files are allowed.';
            exit();
        }

        // Create folder if it doesn't exist
        if (!file_exists("./product_images/$category")) {
            mkdir("./product_images/$category");
        }
        else{
            // Check if file already exists
            if (file_exists("./product_images/$category/$filename")) {
                $i = 1;
                while (file_exists("./product_images/$category/" . $i . "_" . $filename)) {
                    $i++;
                }
                $filename = $i . "_" . basename($_FILES['image']['name']);
            }
            // Move file to uploads folder
            $newFilePath = "./product_images/$category/" . $filename;
            if(move_uploaded_file($tempFilePath, $newFilePath)) {
                $response = 'Image Uploaded Successfully, you will be redirected soon';
            } 
            else {
                $response = 'Error: Failed to upload file.';
            }
        }
    } 
    else {
        $response = 'Error: No file uploaded.';
    }
    
    echo json_encode(array(
        'filename' => $filename,
        'response' => $response
    ));
?>
