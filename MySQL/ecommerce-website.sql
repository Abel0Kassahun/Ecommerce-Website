-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2023 at 05:36 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce-website`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `eml` VARCHAR(50), IN `psword` VARCHAR(30), OUT `response` VARCHAR(100), OUT `fullName` VARCHAR(255), OUT `uid` INT)   BEGIN
DECLARE email_found VARCHAR(50);
DECLARE password_found VARCHAR(30); 
SET email_found = (SELECT email FROM user
                    WHERE email = eml );
IF(IFNULL(email_found, '') = '') THEN
  SET response = 'Email not found, try signing up';
  SET fullName = NULL;
  SET uid = NULL;
ELSE
	SET password_found = (SELECT password FROM user
                           WHERE email = eml);
	IF(password_found != psword) THEN
    	SET response = 'Incorrect Password, Try again';
        SET fullName = NULL;
        SET uid = NULL;
	ELSE
    	SET response = 'Email has been found, password is correct';
    	SET fullName = (SELECT user.fullName FROM user
                        WHERE email = eml);
		SET uid = (SELECT `user-id` FROM user WHERE email = eml);
	END IF;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `signup` (IN `eml` VARCHAR(50), IN `fName` VARCHAR(255), IN `pNumber` VARCHAR(10), IN `psword` VARCHAR(30), OUT `uid` INT)   BEGIN
    INSERT INTO user (fullName, phoneNumber, email, password)
    VALUES (fName, pNumber, eml, psword);
    SET uid = (SELECT `user-id` FROM user WHERE email = eml);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `upload_product` (IN `product_name` VARCHAR(50), IN `product_price` INT, IN `product_image` VARCHAR(300), IN `product_posted_by` INT, IN `product_description` VARCHAR(350), IN `category` VARCHAR(100))   BEGIN
	SET @cat_id = (SELECT category.category_id FROM category WHERE category.category_name = category);
	INSERT INTO products (pr_name, pr_price, pr_image, pr_posted_by, pr_description, category_id) VALUES
	(product_name, product_price, product_image, product_posted_by, product_description, @cat_id);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `bought_items`
--

CREATE TABLE `bought_items` (
  `user_id` int(11) NOT NULL,
  `pr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bought_items`
--

INSERT INTO `bought_items` (`user_id`, `pr_id`) VALUES
(1, 6),
(1, 3),
(1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`user_id`, `product_id`) VALUES
(1, 3),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(10, 'Cosmetics'),
(1, 'Electronics'),
(2, 'Electronics Accessories'),
(9, 'Female\'s Cloth'),
(12, 'Furnitures'),
(3, 'Home Appliances'),
(6, 'Jewellries'),
(8, 'Men\'s Cloth'),
(13, 'Other'),
(11, 'Shoes '),
(4, 'Toys '),
(5, 'Travel Equipments'),
(7, 'Watches ');

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `chat_id` int(11) NOT NULL,
  `user1` int(11) NOT NULL,
  `user2` int(11) NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `liked_items`
--

CREATE TABLE `liked_items` (
  `user_id` int(11) NOT NULL,
  `pr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `liked_items`
--

INSERT INTO `liked_items` (`user_id`, `pr_id`) VALUES
(1, 10),
(1, 8),
(1, 3),
(1, 5),
(1, 9),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `pr_id` int(11) NOT NULL,
  `like_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`pr_id`, `like_count`) VALUES
(1, 157),
(2, 111),
(3, 95),
(4, 221),
(5, 83),
(6, 332),
(7, 55),
(8, 254),
(9, 350),
(10, 95),
(11, 81),
(29, 54),
(30, 31),
(31, 15),
(32, 45),
(33, 64),
(34, 89),
(35, 46),
(36, 36),
(37, 444),
(38, 41),
(39, 39),
(40, 40),
(41, 78),
(43, 42),
(44, 111),
(45, 851),
(46, 125),
(47, 1215),
(48, 11),
(49, 45),
(50, 84),
(51, 41),
(52, 414),
(53, 23),
(54, 54),
(55, 55),
(56, 56),
(57, 57),
(58, 58),
(59, 59),
(60, 60),
(61, 61),
(62, 62),
(63, 63),
(64, 64),
(65, 65),
(66, 66),
(67, 67),
(68, 681),
(69, 69);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `chat_id` int(11) NOT NULL,
  `msg_id` int(11) NOT NULL,
  `message` varchar(400) NOT NULL,
  `sender` int(11) NOT NULL,
  `recipient` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `pr_id` int(11) NOT NULL,
  `pr_name` varchar(50) NOT NULL,
  `pr_price` int(11) NOT NULL,
  `pr_image` varchar(300) NOT NULL,
  `pr_posted_by` int(11) NOT NULL,
  `pr_description` varchar(350) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `is_deleted` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`pr_id`, `pr_name`, `pr_price`, `pr_image`, `pr_posted_by`, `pr_description`, `category_id`, `is_deleted`) VALUES
(1, 'Amazon Alexa', 45000, '../PHP/product_images/Electronics/amazon_alexa.jpg', 1, 'Used but in good condition\r\ncharger and manual included\r\nprice is non-negotiable\r\n', 1, 0),
(2, 'Apple airpod pro', 30000, '../PHP/product_images/Electronics/apple_airpods.jpg', 1, 'Brand new\r\nWarranty included ', 1, 0),
(3, 'Apple Watch', 25000, '../PHP/product_images/Electronics/apple_watch.jpg', 1, 'Slightly used\r\nMetal Collar', 1, 0),
(4, 'Asus Rogue', 120000, '../PHP/product_images/Electronics/asus_rogue.jpg', 1, 'Brand new \r\ncore i7 12th gen\r\n32gb ram \r\nrgb keyboard \r\nPrice is non-negotiable', 1, 0),
(5, 'I phone 14', 70000, '../PHP/product_images/Electronics/iphone_14.jpg', 2, 'dm for details ', 1, 0),
(6, 'Nintendo Switch ', 48000, '../PHP/product_images/Electronics/nintendo_switch.jpg', 2, 'Slightly used\r\nComes with 4 games \r\n', 1, 0),
(7, 'Play Station 5', 60000, '../PHP/product_images/Electronics/ps5.jpg', 2, '500 GB HDD\r\n1 controller only\r\ndm for other details', 1, 0),
(8, 'RTX 3090', 55000, '../PHP/product_images/Electronics/rtx_3090.jpg', 2, NULL, 2, 1),
(9, 'Samsung Galaxy S23', 62000, '../PHP/product_images/Electronics/samsung_galaxy_s23.jpg', 3, 'Also available in black\r\nbrand new', 1, 0),
(10, 'Samsung OLED TV', 80000, '../PHP/product_images/Electronics/samsung_tv.jpg', 3, 'For extra fee we can install it for you \r\nDm for further contact', 1, 0),
(11, 'Sony Headphones ', 30000, '../PHP/product_images/Electronics/sony_headphones.jpg', 3, 'this is the 2022 version \r\nbrand new ', 1, 0),
(29, 'Limited Edition hoody', 600, '../PHP/product_images/MensCloth/hoody.jpg', 1, NULL, 8, 0),
(30, 'Blue black jacket', 300, '../PHP/product_images/MensCloth/blueblack_jacket.jpg', 2, 'also available in black', 8, 0),
(31, 'Grey blazer', 500, '../PHP/product_images/MensCloth/grey_blazer.jpg', 2, 'Brand new \r\nsoon will be available in black', 8, 0),
(32, 'Grey Shirt', 200, '../PHP/product_images/MensCloth/grey_shirt.jpg', 2, NULL, 8, 0),
(33, 'Milan jersey shirt', 150, '../PHP/product_images/MensCloth/milan_shirt.jpg', 1, 'away jit is also available', 8, 0),
(34, 'Onesie blue', 200, '../PHP/product_images/MensCloth/onesies.jpg', 1, NULL, 8, 0),
(35, 'Light blue scarf', 150, '../PHP/product_images/MensCloth/scarf.jpg', 9, 'the scarf is longer than the image', 8, 0),
(36, 'Blue Tie', 80, '../PHP/product_images/MensCloth/tie.jpg', 1, NULL, 8, 0),
(37, 'Blue tight jeans', 250, '../PHP/product_images/MensCloth/tight_jeans', 9, 'Is tighter than the image', 8, 0),
(38, 'Upper body suit', 8500, '../PHP/product_images/MensCloth/upper_suit.jpg', 2, NULL, 8, 0),
(39, 'Air force one 2021', 3500, '../PHP/product_images/Shoes/airforce_one.jpg', 1, 'available in black', 11, 0),
(40, 'Airforce one 2023', 5000, '../PHP/product_images/Shoes/airforce_one_shoes.jpg', 3, NULL, 11, 0),
(41, 'Balenciaga 2022 shoe', 7400, '../PHP/product_images/Shoes/balanciaga_shoes.jpg', 3, 'available till june 14', 11, 0),
(43, 'Leather Shoe', 6000, '../PHP/product_images/Shoes/leather_shoe.jpg', 3, 'Organic leather shoe', 11, 0),
(44, 'Light Blue Jordans', 5000, '../PHP/product_images/Shoes/light_blue_jordans.jpg', 1, NULL, 11, 0),
(45, 'Mercurial Cleats', 2500, '../PHP/product_images/Shoes/mercurial_cleats.jpg', 9, NULL, 11, 0),
(46, 'Rock Climbing Shoes', 2600, '../PHP/product_images/Shoes/rockClimibing_shoes.jpg', 2, NULL, 11, 0),
(47, 'Roll blades', 6000, '../PHP/product_images/Shoes/rollblades.jpg', 3, NULL, 11, 0),
(48, 'Sandals', 1000, '../PHP/product_images/Shoes/sandal.jpg', 1, 'available in grey', 11, 0),
(49, 'Vans Shoes', 4500, '../PHP/product_images/Shoes/vans_shoes.jpg', 1, NULL, 11, 0),
(50, 'Abacus', 500, '../PHP/product_images/Toys/abacus.jpg', 3, NULL, 4, 0),
(51, 'Doll house', 1500, '../PHP/product_images/Toys/doll_house.jpg', 3, NULL, 4, 0),
(52, 'Ice Cream Cart', 2500, '../PHP/product_images/Toys/ice_cream_cart.jpg', 3, NULL, 4, 0),
(53, 'Jenga for kids', 1500, '../PHP/product_images/Toys/jengaforkids.jpg', 3, NULL, 4, 0),
(54, 'Mcqueen', 1200, '../PHP/product_images/Toys/mcqueen.jpg', 3, NULL, 4, 0),
(55, 'Remote Controlled Car', 2800, '../PHP/product_images/Toys/remote_controll_car.jpg', 3, NULL, 4, 0),
(56, 'Rubiks Cube', 250, '../PHP/product_images/Toys/rubiks_cube.jpg', 3, NULL, 4, 0),
(57, 'Toys and Puzzles', 3000, '../PHP/product_images/Toys/toys_and_puzzles_set.jpg', 3, NULL, 4, 0),
(58, 'Walkie Talkies', 2500, '../PHP/product_images/Toys/walkie_talkies.jpg', 3, NULL, 4, 0),
(59, 'Woody', 1000, '../PHP/product_images/Toys/woody.jpg', 1, NULL, 4, 0),
(60, 'Flaire Gun', 500, '../PHP/product_images/TravelEquipments/flare_gun.jpg', 9, NULL, 5, 0),
(61, 'Hiking Ropes', 50, '../PHP/product_images/TravelEquipments/hiking ropes.jpg', 2, NULL, 5, 0),
(62, 'Luggage', 3000, '../PHP/product_images/TravelEquipments/luggage.jpg', 3, NULL, 5, 0),
(63, 'Polaroid Camera', 5000, '../PHP/product_images/TravelEquipments/polaroid_camera.jpg', 9, NULL, 5, 0),
(64, 'Sleeping Bags', 500, '../PHP/product_images/TravelEquipments/sleeping_bags.jpg', 1, NULL, 5, 0),
(65, 'Solar Charger', 2641, '../PHP/product_images/TravelEquipments/solar_charger.jpg', 9, NULL, 5, 0),
(66, 'Swiss army knife', 400, '../PHP/product_images/TravelEquipments/swiss_army_knife.jspg', 1, NULL, 5, 0),
(67, 'Travel Tent', 600, '../PHP/product_images/TravelEquipments/travel_tent.jpg', 3, NULL, 5, 0),
(68, 'Travel Water filter', 250, '../PHP/product_images/TravelEquipments/travel_water_filter.jpg', 9, NULL, 5, 0),
(69, 'Walkie Talkie', 3200, '../PHP/product_images/TravelEquipments/walkie_talkie.jpg', 9, NULL, 5, 0),
(70, 'Book', 50, '../PHP/product_images/Other/bullets.PNG', 1, '', 13, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user-id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `phoneNumber` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL,
  `profile-picture` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user-id`, `fullName`, `phoneNumber`, `email`, `password`, `profile-picture`) VALUES
(1, 'Abel Kassahun', '0923463663', 'abelanon101@gmail.com', '1125126624', ''),
(2, 'Amen Kassahun', '0923569841', 'amenanon101@gmail.com', '66248524', ''),
(3, 'Sara Besha', '0911071868', 'saraiop@gmail.com', 'poiuytrewq', ''),
(9, 'Michael Berhan', '0945621457', 'michaelberhan333@gmail.com', 'michaelberhan', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bought_items`
--
ALTER TABLE `bought_items`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pr_id` (`pr_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD KEY `fk_user` (`user_id`),
  ADD KEY `fk_product` (`product_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`chat_id`),
  ADD KEY `u1_fk` (`user1`),
  ADD KEY `u2_fk` (`user2`);

--
-- Indexes for table `liked_items`
--
ALTER TABLE `liked_items`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pr_id` (`pr_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD UNIQUE KEY `pr_id` (`pr_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`msg_id`),
  ADD KEY `fk` (`chat_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`pr_id`),
  ADD KEY `user_foreign_key` (`pr_posted_by`),
  ADD KEY `category_fkey` (`category_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user-id`),
  ADD UNIQUE KEY `phoneNumber` (`phoneNumber`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `msg_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `pr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user-id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bought_items`
--
ALTER TABLE `bought_items`
  ADD CONSTRAINT `bought_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user-id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bought_items_ibfk_2` FOREIGN KEY (`pr_id`) REFERENCES `products` (`pr_id`) ON DELETE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`pr_id`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user-id`);

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `u1_fk` FOREIGN KEY (`user1`) REFERENCES `user` (`user-id`) ON DELETE CASCADE,
  ADD CONSTRAINT `u2_fk` FOREIGN KEY (`user2`) REFERENCES `user` (`user-id`);

--
-- Constraints for table `liked_items`
--
ALTER TABLE `liked_items`
  ADD CONSTRAINT `liked_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user-id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `liked_items_ibfk_2` FOREIGN KEY (`pr_id`) REFERENCES `products` (`pr_id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `foreign_key` FOREIGN KEY (`pr_id`) REFERENCES `products` (`pr_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`chat_id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `category_fkey` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_foreign_key` FOREIGN KEY (`pr_posted_by`) REFERENCES `user` (`user-id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
