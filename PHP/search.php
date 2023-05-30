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
        $search_input = $data['pr_name'];
        $category_name = $data['c_name'];
        $min_price = $data['min_pr'];
        $max_price = $data['max_pr'];

        // empty() an laternative to is_null()
        // echo $search_input . '   ' .$category_name. '   '. $min_price.'   '.$max_price;


        
        if(is_null($min_price)){
            if(is_null($max_price)){
                $sql = "SELECT pr_id, pr_name, pr_price, pr_image, category_name FROM products INNER JOIN category ON 
                products.category_id = category.category_id WHERE category_name = '$category_name' AND is_deleted = 0";
            }
            else{
                $sql = "SELECT pr_id, pr_name, pr_price, pr_image, category_name FROM products INNER JOIN category ON 
                products.category_id = category.category_id WHERE catecategory_name = '$category_name' AND pr_price <= '$max_price' AND is_deleted = 0";
            }
        }
        else{
            if(is_null($max_price)){
                $sql = "SELECT pr_id, pr_name, pr_price, pr_image, category_name FROM products INNER JOIN category ON 
                products.category_id = category.category_id WHERE category.category_name = '$category_name' AND pr_price >= '$min_price' AND is_deleted = 0";                        
            }
            else{
                $sql = "SELECT pr_id, pr_name, pr_price, pr_image, category_name FROM products INNER JOIN category ON 
                products.category_id = category.category_id WHERE category_name = '$category_name' AND pr_price >= '$min_price' AND pr_price <= '$max_price' AND is_deleted = 0";                        
            }
        }
        
        $result = $connect->query($sql);
        if ($result-> num_rows > 0) {
            // Loop through each row in the result set and store the pids in an array
            $i = 0;
            while ($row = $result->fetch_array()) {
                $filtered_results[$i] = array(
                    'product_id' => intval($row['pr_id']),
                    'product_name' => $row['pr_name'],
                    'product_cat' => $row['category_name'],
                    'product_price' => intval($row['pr_price']),
                    'product_img' => $row['pr_image']
                );
                $i++;                
            }
        }
        else{
            $sql = "SELECT pr_id, pr_name, pr_price, pr_image, category_name FROM products INNER JOIN category ON 
            products.category_id = category.category_id WHERE category.category_name = '$category_name' AND is_deleted = 0";
            $result = $connect->query($sql);
            if($result -> num_rows > 0 AND $result){
                $i = 0;
                while ($row = $result->fetch_array()) {
                    $filtered_results[$i] = array(
                        'product_id' => intval($row['pr_id']),
                        'product_name' => $row['pr_name'],
                        'product_cat' => $row['category_name'],
                        'product_price' => intval($row['pr_price']),
                        'product_img' => $row['pr_image']
                    );
                    $i++;                
                }
            }
        }
        // for($i = 0; $i < count($filtered_results); $i++){
        //     echo $filtered_results[$i]['product_name'].', ';
        // }
        $exact_result = array();
        $close_result = array();
        $barely_close = array();
        $not_found = array();
        $e = $c = $b = $n = 0;

        for($i = 0; $i < count($filtered_results); $i++){
            $exploded_input = explode(" ", $search_input);
            $exploded_result = explode(" ", $filtered_results[$i]['product_name']);
            $f = 0;
            for($j = 0; $j < count($exploded_input); $j++){
                for($k = 0; $k < count($exploded_result); $k++){
                    $distance[$f]= shteinleven(strtolower($exploded_input[$j]), strtolower($exploded_result[$k]));
                    // echo $distance[$f].' ';
                    $f++;

                }
            }
            // echo '\n ';
            $exact = $close = $barely = false;
            for($d = 0; $d < count($distance); $d++){
                if($distance[$d] === 0){
                    $exact = true;
                    break;
                }
            }
            for($d = 0; $d < count($distance); $d++){
                if(!$exact){
                    if($distance[$d] > 0 AND $distance[$d] <= 2){
                        $close = true;
                        break;
                    }
                }
            }
            for($d = 0; $d < count($distance); $d++){
                if(!$close AND !$exact){
                    if($distance[$d] > 2 AND $distance[$d] <= 4){
                        $barely = true;
                        break;
                    }
                }
            }

            if($exact){
                $exact_result[$e] = array(
                    'product_id' => $filtered_results[$i]['product_id'],
                    'product_name' => $filtered_results[$i]['product_name'],
                    'product_cat' => $filtered_results[$i]['product_cat'],
                    'product_price' => $filtered_results[$i]['product_price'],
                    'product_image' => $filtered_results[$i]['product_img']
                );
                $e++;
            }
            else if($close){
                $close_result[$c] = array(
                    'product_name' => $filtered_results[$i]['product_name'],
                    'product_id' => $filtered_results[$i]['product_id'],
                    'product_cat' => $filtered_results[$i]['product_cat'],
                    'product_price' => $filtered_results[$i]['product_price'],
                    'product_image' => $filtered_results[$i]['product_img']
                );             
                $c++;
            }
            else if($barely){
                $barely_close[$b] = array(
                    'product_id' => $filtered_results[$i]['product_id'],
                    'product_name' => $filtered_results[$i]['product_name'],
                    'product_cat' => $filtered_results[$i]['product_cat'],
                    'product_price' => $filtered_results[$i]['product_price'],
                    'product_image' => $filtered_results[$i]['product_img']
                );  
                $b++;
            }
            else{
                $not_found[$n] = array(
                    'product_id' => $filtered_results[$i]['product_id'],
                    'product_name' => $filtered_results[$i]['product_name'],
                    'product_cat' => $filtered_results[$i]['product_cat'],
                    'product_price' => $filtered_results[$i]['product_price'],
                    'product_image' => $filtered_results[$i]['product_img']
                );  
                $n++;
            }
        }
        $search_result = array();
        $search_result = array_merge($search_result,$exact_result);
        $search_result = array_merge($search_result,$close_result);
        $search_result = array_merge($search_result,$barely_close);
        $search_result = array_merge($search_result,$not_found);


        $connect->close();
        echo json_encode($search_result);

    }
    
    function shteinleven($first, $second){
        return levenshtein($first, $second); 
    }
?>