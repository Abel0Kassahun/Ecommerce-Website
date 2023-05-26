<?php
    include('./connect.php');
    $conn = new Connect;
    $connect = $conn -> getConnection();

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: application/json');

    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        // Create an array of numbers from 1 to 17
        $numbers = range(1, 2); // 1 to 17 both inclusive

        // Shuffle the array to randomize the order
        shuffle($numbers);

        // Take the first 5 numbers from the shuffled array
        $category_ids = array_slice($numbers, 0, 5);        

        // Construct the SQL query string with a parameterized query
        $sql = "SELECT category_name FROM category WHERE category_id IN (" . implode(",", $category_ids) . ")";

        // Execute the query and store the result in $result
        $result = $connect->query($sql);
        $c_name = array();
        if ($result->num_rows > 0) {
            // Loop through each row in the result set and store the pids in an array
            while ($row = $result->fetch_array()) {
                $c_name[] = $row[0];
            }
        }
        else {
            // echo "No results found.";
        }


        $toFrontEnd = array();
        for($i = 0; $i < 2; $i++){

            // $sql = "SELECT DISTINCT products.pr_id FROM products
            // INNER JOIN likes ON products.pr_id = likes.pr_id
            // WHERE products.category_id = 1
            // AND products.is_deleted = 0
            // ORDER BY likes.like_count DESC LIMIT 5";
            
            $sql = "SELECT DISTINCT products.pr_id FROM products
            INNER JOIN likes ON products.pr_id = likes.pr_id
            WHERE products.category_id = ".$category_ids[$i]."
            AND products.is_deleted = 0
            ORDER BY likes.like_count DESC LIMIT 5";

            $result = $connect -> query($sql);
            $pr_id = array();
            if($result -> num_rows  > 0){
                while ($row = $result->fetch_array()) {
                    $pr_id[] = intval($row[0]);
                }
            }
            
            $sql = "SELECT pr_image FROM products INNER JOIN likes ON products.pr_id = likes.pr_id
            WHERE products.pr_id IN (". implode(",", $pr_id).")
            AND is_deleted = 0 ORDER BY likes.like_count DESC";
            
            $result = $connect -> query($sql);
            $pr_img = array();
            if($result -> num_rows  > 0){
                while ($row = $result->fetch_array()) {
                    $pr_img[] = $row[0];
                }
            } 

            $toFrontEnd[$c_name[$i]] = array(
                'pr_id' => $pr_id,
                'pr_img' => $pr_img
            );
        }
        $connect->close();
        echo json_encode($toFrontEnd);

    }
?>  