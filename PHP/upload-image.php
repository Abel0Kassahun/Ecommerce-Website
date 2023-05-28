<?php
    // Check if file was uploaded successfully
    if(isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
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
        if (!file_exists('uploads')) {
            mkdir('uploads');
        }

        // Move file to uploads folder
        $newFilePath = './product_images/Electronics' . $filename;
        if(move_uploaded_file($tempFilePath, $newFilePath)) {
            $response = 'Product Upload Successfully, you will be redirected soon';
        } 
        else {
            $response =  'Error: Failed to upload file.';
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
