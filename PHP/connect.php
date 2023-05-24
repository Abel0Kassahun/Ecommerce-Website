<?php


class Connect{
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'ecommerce-website';

    function getConnection(){
        $conn = new mysqli($this -> host, $this -> username, $this -> password, $this -> database);
        if(!$conn){
            die('error occured'.mysqli_connect_error());
        }
        return $conn;
    }

}



?>