-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2023 at 06:30 PM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `eml` VARCHAR(50), IN `psword` VARCHAR(30), OUT `response` VARCHAR(100), OUT `fullName` VARCHAR(255))   BEGIN
DECLARE email_found VARCHAR(50);
DECLARE password_found VARCHAR(30); 
SET email_found = (SELECT email FROM user
                    WHERE email = eml );
IF(IFNULL(email_found, '') = '') THEN
  SET response = 'Email not found, try signing up';
  SET fullName = NULL;
ELSE
	SET password_found = (SELECT password FROM user
                           WHERE email = eml);
	IF(password_found != psword) THEN
    	SET response = 'Incorrect Password, Try again';
        SET fullName = NULL;
	ELSE
    	SET response = 'Email has been found, password is correct';
    	SET fullName = (SELECT user.fullName FROM user
                        WHERE email = eml);
	END IF;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `signup` (IN `eml` VARCHAR(50), IN `fName` VARCHAR(255), IN `pNumber` VARCHAR(10), IN `psword` VARCHAR(30))   INSERT INTO user (fullName, phoneNumber, email, password)
VALUES (fName, pNumber, eml, psword)$$

DELIMITER ;

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
(14, 'Apartments'),
(12, 'Cosmetics'),
(1, 'Electronics'),
(2, 'Electronics Accessories'),
(11, 'Female\'s Cloth'),
(16, 'Furnitures'),
(3, 'Home Appliances'),
(15, 'Houses'),
(8, 'Jewellries'),
(10, 'Men\'s Cloth'),
(17, 'Other'),
(13, 'Shoes '),
(6, 'Toys '),
(7, 'Travel Equipments'),
(5, 'Vehicle Accessories'),
(4, 'Vehicles'),
(9, 'Watches ');

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
(2, 110),
(3, 94),
(4, 221),
(5, 82),
(6, 332),
(7, 55),
(8, 253),
(9, 359),
(10, 94),
(11, 81);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `pr_id` int(11) NOT NULL,
  `pr_name` varchar(50) NOT NULL,
  `pr_price` varchar(15) NOT NULL,
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
(1, 'Amazon Alexa', '45,000', '../PHP/product_images/Electronics/amazon_alexa.jpg', 1, 'Used but in good condition\r\ncharger and manual included\r\nprice is non-negotiable\r\n', 1, 0),
(2, 'Apple airpod pro', '30,000', '../PHP/product_images/Electronics/apple_airpods.jpg', 1, 'Brand new\r\nWarranty included ', 1, 0),
(3, 'Apple Watch', '25,000', '../PHP/product_images/Electronics/apple_watch.jpg', 1, 'Slightly used\r\nMetal Collar', 1, 0),
(4, 'Asus Rogue', '120,000', '../PHP/product_images/Electronics/asus_rogue.jpg', 1, 'Brand new \r\ncore i7 12th gen\r\n32gb ram \r\nrgb keyboard \r\nPrice is non-negotiable', 1, 0),
(5, 'I phone 14', '70,000 ', '../PHP/product_images/Electronics/iphone_14.jpg', 2, 'dm for details ', 1, 0),
(6, 'Nintendo Switch ', '48,000', '../PHP/product_images/Electronics/nintendo_switch.jpg', 2, 'Slightly used\r\nComes with 4 games \r\n', 1, 0),
(7, 'Play Station 5', '60,000', '../PHP/product_images/Electronics/ps5.jpg', 2, '500 GB HDD\r\n1 controller only\r\ndm for other details', 1, 0),
(8, 'RTX 3090', '55,000', '../PHP/product_images/Electronics/rtx_3090.jpg', 2, NULL, 2, 0),
(9, 'Samsung Galaxy S23', '62,000', '../PHP/product_images/Electronics/samsung_galaxy_s23.jpg', 3, 'Also available in black\r\nbrand new', 1, 1),
(10, 'Samsung OLED TV', '80,000', '../PHP/product_images/Electronics/samsung_tv.jpg', 3, 'For extra fee we can install it for you \r\nDm for further contact', 1, 0),
(11, 'Sony Headphones ', '30,000', '../PHP/product_images/Electronics/sony_headphones.jpg', 3, 'this is the 2022 version \r\nbrand new ', 1, 0);

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
(3, 'Sara Besha', '0911071868', 'saraiop@gmail.com', 'poiuytrewq', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD UNIQUE KEY `pr_id` (`pr_id`);

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
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `pr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user-id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `foreign_key` FOREIGN KEY (`pr_id`) REFERENCES `products` (`pr_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

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
