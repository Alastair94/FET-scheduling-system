-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 30, 2021 at 01:29 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fet`
--
CREATE DATABASE IF NOT EXISTS `fet` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `fet`;

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `activities_id` int(11) NOT NULL,
  `duration` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `total_duration` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `teacher_id` int(11) NOT NULL,
  `subj_id` int(11) NOT NULL,
  `user_table_id` int(11) NOT NULL,
  `activity_group_id` int(11) DEFAULT NULL,
  `number_of_students` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`activities_id`, `duration`, `total_duration`, `active`, `teacher_id`, `subj_id`, `user_table_id`, `activity_group_id`, `number_of_students`) VALUES
(43, '1', NULL, 0, 10, 12, 183, NULL, -1),
(44, '1', NULL, 0, 10, 12, 183, NULL, 200),
(62, '1', NULL, 0, 16, 24, 191, NULL, 20),
(63, '1', NULL, 0, 17, 23, 191, NULL, -1),
(64, '1', NULL, 0, 16, 25, 191, NULL, 400),
(65, '1', NULL, 0, 16, 25, 191, NULL, 200),
(66, '1', NULL, 0, 17, 25, 191, NULL, 80),
(67, '1', NULL, 0, 17, 28, 191, NULL, -1),
(68, '1', NULL, 1, 16, 24, 191, NULL, -1),
(69, '1', NULL, 0, 17, 24, 191, NULL, 50),
(70, '1', NULL, 0, 17, 23, 191, NULL, 100),
(71, '1', NULL, 0, 17, 25, 191, NULL, 666),
(72, '1', NULL, 0, 18, 29, 192, NULL, 100),
(74, '1', NULL, 0, 20, 29, 192, NULL, 300),
(75, '1', NULL, 0, 18, 29, 192, NULL, -1),
(76, '1', NULL, 0, 20, 32, 192, NULL, -1),
(77, '1', NULL, 0, 18, 32, 192, NULL, -1),
(78, '3', NULL, 0, 18, 29, 192, NULL, 6),
(79, '1', NULL, 0, 19, 30, 192, NULL, -1),
(80, '1', NULL, 0, 19, 32, 192, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `activities_not_overlapping_con`
--

CREATE TABLE `activities_not_overlapping_con` (
  `anoc_id` int(11) NOT NULL,
  `num_of_activities` int(11) NOT NULL,
  `weight_percentage` int(3) NOT NULL,
  `active` varchar(5) COLLATE utf8_hungarian_ci DEFAULT 'true',
  `comments` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `activities_not_overlapping_con`
--

INSERT INTO `activities_not_overlapping_con` (`anoc_id`, `num_of_activities`, `weight_percentage`, `active`, `comments`, `user_table_id`) VALUES
(4, 2, 96, NULL, NULL, 191),
(5, 2, 96, NULL, NULL, 191),
(6, 2, 100, NULL, NULL, 191),
(12, 3, 100, NULL, NULL, 191),
(15, 3, 91, NULL, NULL, 192);

-- --------------------------------------------------------

--
-- Table structure for table `activities_same_start`
--

CREATE TABLE `activities_same_start` (
  `id` int(11) NOT NULL,
  `same_start_cons_id` int(11) NOT NULL,
  `actvites_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `activity_groups`
--

CREATE TABLE `activity_groups` (
  `activity_groups_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `group_name` varchar(45) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `activity_groups`
--

INSERT INTO `activity_groups` (`activity_groups_id`, `activity_id`, `group_id`, `group_name`) VALUES
(5, 62, 41, '007'),
(6, 62, 40, 'informatikus'),
(7, 64, 40, 'informatikus'),
(8, 65, 40, 'informatikus'),
(9, 66, 40, 'informatikus'),
(10, 71, 39, 'matematikus'),
(11, 71, 40, 'informatikus'),
(12, 71, 41, '007'),
(13, 72, 43, 'Nyelvész'),
(14, 73, 43, 'Nyelvész'),
(15, 75, 44, 'Matematikus'),
(16, 79, 45, 'Informatikus');

-- --------------------------------------------------------

--
-- Table structure for table `activity_subgroups`
--

CREATE TABLE `activity_subgroups` (
  `activity_subgroups_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `subgroup_id` int(11) NOT NULL,
  `subgroup_name` varchar(45) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `activity_subgroups`
--

INSERT INTO `activity_subgroups` (`activity_subgroups_id`, `activity_id`, `subgroup_id`, `subgroup_name`) VALUES
(3, 62, 19, 'jók'),
(4, 64, 20, 'rosszak'),
(5, 65, 20, 'rosszak'),
(6, 66, 20, 'rosszak'),
(7, 69, 21, 'A csoport'),
(8, 69, 22, 'B csoport'),
(9, 69, 23, 'C csoport'),
(10, 69, 24, 'D csoport'),
(11, 69, 25, 'E csoport'),
(12, 70, 21, 'A csoport'),
(13, 70, 22, 'B csoport'),
(14, 70, 23, 'C csoport'),
(15, 70, 24, 'D csoport'),
(16, 70, 25, 'E csoport'),
(17, 71, 19, 'jók'),
(18, 71, 20, 'rosszak'),
(19, 72, 26, 'Szoftvertesztelő'),
(20, 73, 26, 'Szoftvertesztelő'),
(21, 73, 27, 'Szoftverfejlesztő'),
(22, 78, 27, 'Szoftverfejlesztők');

-- --------------------------------------------------------

--
-- Table structure for table `activity_years`
--

CREATE TABLE `activity_years` (
  `activity_years_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `year_id` int(11) NOT NULL,
  `year_name` varchar(45) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `activity_years`
--

INSERT INTO `activity_years` (`activity_years_id`, `activity_id`, `year_id`, `year_name`) VALUES
(10, 62, 43, '2019'),
(11, 62, 44, '2018'),
(12, 63, 42, '2020'),
(13, 63, 43, '2019'),
(14, 67, 44, '2018'),
(15, 68, 44, '2018'),
(16, 70, 42, '2020'),
(17, 70, 43, '2019'),
(18, 70, 44, '2018'),
(19, 70, 45, '2017'),
(20, 70, 46, '2016'),
(21, 70, 47, '2015'),
(22, 70, 48, '2014'),
(23, 71, 48, '2014'),
(24, 71, 47, '2015'),
(25, 71, 46, '2016'),
(26, 71, 45, '2017'),
(27, 71, 44, '2018'),
(28, 71, 43, '2019'),
(29, 71, 42, '2020'),
(30, 72, 51, '2020'),
(31, 73, 49, '2018'),
(32, 73, 50, '2019'),
(33, 73, 51, '2020'),
(34, 74, 49, '2018'),
(35, 74, 50, '2019'),
(36, 74, 51, '2020'),
(37, 74, 52, '2017'),
(38, 74, 53, '2016'),
(39, 76, 51, '2020'),
(40, 77, 50, '2019'),
(41, 77, 53, '2016'),
(42, 80, 53, '2016');

-- --------------------------------------------------------

--
-- Table structure for table `basic_compulsory_constraints`
--

CREATE TABLE `basic_compulsory_constraints` (
  `basic_cons_id` int(11) NOT NULL,
  `weight_percentage` varchar(5) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `active` varchar(5) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `comments` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `cons_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `buildings`
--

CREATE TABLE `buildings` (
  `building_id` int(11) NOT NULL,
  `build_name` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `buildings`
--

INSERT INTO `buildings` (`building_id`, `build_name`, `user_table_id`) VALUES
(8, 'C', 183),
(11, 'B', 183),
(13, 'C', 191),
(14, 'B', 191),
(15, 'A', 191),
(16, 'A', 192),
(17, 'B', 192),
(18, 'C', 192);

-- --------------------------------------------------------

--
-- Table structure for table `constraints`
--

CREATE TABLE `constraints` (
  `cons_id` int(11) NOT NULL,
  `type` varchar(6) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `days`
--

CREATE TABLE `days` (
  `days_id` int(11) NOT NULL,
  `day_name` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `days`
--

INSERT INTO `days` (`days_id`, `day_name`, `user_table_id`) VALUES
(1, 'Hétfő', 183),
(7, 'Kedd', 183),
(8, 'Szerda', 183),
(9, 'Csütörtök', 183),
(10, 'Péntek', 183),
(11, 'Hétfő', 191),
(12, 'Kedd', 191),
(13, 'Szerda', 191),
(14, 'Csütörtök', 191),
(16, 'Péntek', 191),
(17, 'Hétfő', 192),
(18, 'Kedd', 192),
(19, 'Szerda', 192),
(20, 'Csütörtök', 192),
(21, 'Péntek', 192);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL,
  `group_name` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `num_of_students` int(11) DEFAULT NULL,
  `student_id` int(11) NOT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `group_name`, `num_of_students`, `student_id`, `user_table_id`) VALUES
(15, '2019', 200, 19, 183),
(17, '2020', 200, 19, 183),
(24, 'mégse', 2, 22, 183),
(26, '2018', 100, 19, 183),
(27, 'fordítók', 1, 28, 183),
(28, 'tolmácsok', 1, 28, 183),
(39, 'matematikus', 500, 42, 191),
(40, 'informatikus', 500, 42, 191),
(41, '007', 1, 42, 191),
(42, 'programtervező informatikus', 500, 43, 191),
(43, 'Nyelvész', 300, 49, 192),
(44, 'Matematikus', 200, 49, 192),
(45, 'Informatikus', 456, 49, 192);

-- --------------------------------------------------------

--
-- Table structure for table `hours`
--

CREATE TABLE `hours` (
  `hours_id` int(11) NOT NULL,
  `hour_name` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `hours`
--

INSERT INTO `hours` (`hours_id`, `hour_name`, `user_table_id`) VALUES
(7, '8:00', 183),
(8, '10:00', 183),
(10, '12:00', 183),
(11, '14:00', 183),
(12, '16:00', 183),
(14, '08:00', 191),
(16, '10:00', 191),
(17, '11:00', 191),
(18, '12:00', 191),
(19, '13:00', 191),
(20, '14:00', 191),
(21, '15:00', 191),
(23, '16:00', 191),
(33, '08:00-09:30', 192),
(34, '10:00-11:30', 192),
(35, '11:50-13:20', 192),
(36, '13:40-15:10', 192),
(37, '15:30-17:00', 192),
(38, '17:20-18:50', 192);

-- --------------------------------------------------------

--
-- Table structure for table `list_of_anoc`
--

CREATE TABLE `list_of_anoc` (
  `list_anoc_id` int(11) NOT NULL,
  `anoc_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `list_of_anoc`
--

INSERT INTO `list_of_anoc` (`list_anoc_id`, `anoc_id`, `activity_id`) VALUES
(4, 4, 64),
(5, 4, 69),
(6, 5, 66),
(7, 5, 68),
(8, 6, 70),
(9, 6, 69),
(18, 12, 68),
(19, 12, 66),
(20, 12, 65),
(25, 15, 76),
(26, 15, 74),
(27, 15, 72);

-- --------------------------------------------------------

--
-- Table structure for table `list_of_nat`
--

CREATE TABLE `list_of_nat` (
  `list_nat_id` int(11) NOT NULL,
  `nat_id` int(11) NOT NULL,
  `day_id` int(11) NOT NULL,
  `hour_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `list_of_nat`
--

INSERT INTO `list_of_nat` (`list_nat_id`, `nat_id`, `day_id`, `hour_id`) VALUES
(1, 4, 17, 35),
(2, 4, 17, 36),
(3, 5, 17, 34),
(4, 5, 17, 36),
(5, 5, 17, 35),
(12, 14, 17, 34),
(13, 14, 17, 36),
(14, 14, 17, 38),
(18, 16, 17, 34),
(19, 16, 17, 37),
(20, 17, 21, 37);

-- --------------------------------------------------------

--
-- Table structure for table `list_of_rnat`
--

CREATE TABLE `list_of_rnat` (
  `list_rnat_id` int(11) NOT NULL,
  `rnat_id` int(11) NOT NULL,
  `day_id` int(11) NOT NULL,
  `hour_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `min_days_constraints`
--

CREATE TABLE `min_days_constraints` (
  `min_days_cons_id` int(11) NOT NULL,
  `weight_percentage` varchar(5) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `consecutive_if_same_day` tinyint(4) DEFAULT NULL,
  `num_of_activities` int(11) DEFAULT NULL,
  `min_days` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `active` varchar(5) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `comments` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `time_cons_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `min_days_for_activities`
--

CREATE TABLE `min_days_for_activities` (
  `id` int(11) NOT NULL,
  `min_days_cons_id` int(11) NOT NULL,
  `activities_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `not_available_times`
--

CREATE TABLE `not_available_times` (
  `nat_id` int(11) NOT NULL,
  `weight_percentage` int(3) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `num_of_times` int(5) NOT NULL,
  `active` varchar(5) COLLATE utf8_hungarian_ci DEFAULT 'true',
  `comments` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `not_available_times`
--

INSERT INTO `not_available_times` (`nat_id`, `weight_percentage`, `teacher_id`, `room_id`, `num_of_times`, `active`, `comments`, `user_table_id`) VALUES
(4, 100, 18, NULL, 2, NULL, NULL, 192),
(5, 100, 19, NULL, 3, NULL, NULL, 192),
(14, 100, 21, NULL, 3, NULL, NULL, 192),
(16, 100, NULL, 113, 2, NULL, NULL, 192),
(17, 100, NULL, 112, 1, NULL, NULL, 192);

-- --------------------------------------------------------

--
-- Table structure for table `preferred_rooms`
--

CREATE TABLE `preferred_rooms` (
  `pref_rooms_id` int(11) NOT NULL,
  `space_cons_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `building_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `preferred_rooms`
--

INSERT INTO `preferred_rooms` (`pref_rooms_id`, `space_cons_id`, `room_id`, `building_id`) VALUES
(28, 58, 10, 0),
(29, 58, 11, 0),
(30, 58, 12, 0),
(54, 78, 102, 0),
(55, 78, 103, 0),
(56, 78, 104, 0),
(57, 78, 105, 0),
(70, 83, 102, 0),
(71, 83, 103, 0),
(72, 83, 104, 0),
(73, 83, 105, 0),
(74, 83, 106, 0),
(80, 85, 108, 0),
(81, 85, 106, 0),
(82, 85, 105, 0),
(83, 85, 104, 0),
(84, 85, 103, 0),
(85, 85, 102, 0),
(86, 86, 108, 0),
(112, 105, 108, 15),
(113, 106, 110, 18),
(114, 106, 111, 18),
(115, 107, 111, 18),
(116, 107, 109, 18),
(117, 108, 110, 18);

-- --------------------------------------------------------

--
-- Table structure for table `preferred_times`
--

CREATE TABLE `preferred_times` (
  `pref_times_id` int(11) NOT NULL,
  `time_cons_id` int(11) NOT NULL,
  `day_id` int(11) NOT NULL,
  `hour_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `preferred_times`
--

INSERT INTO `preferred_times` (`pref_times_id`, `time_cons_id`, `day_id`, `hour_id`) VALUES
(32, 29, 17, 35);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `room_id` int(11) NOT NULL,
  `room_name` varchar(10) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `building_id` int(11) NOT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_id`, `room_name`, `capacity`, `building_id`, `user_table_id`) VALUES
(10, '100', 20, 11, 183),
(11, '124', 200, 8, 183),
(12, '123', 100, 8, 183),
(13, '122', 50, 8, 183),
(14, '121', 25, 8, 183),
(102, '100', 200, 13, 191),
(103, '101', 300, 13, 191),
(104, '102', 100, 13, 191),
(105, '103', 40, 13, 191),
(106, 'Nagyterem', 1000, 14, 191),
(108, 'xaxaxaxaxa', 10000, 15, 191),
(109, '100', 30, 18, 192),
(110, '101', 30, 18, 192),
(111, '102', 30, 18, 192),
(112, '124', 200, 18, 192),
(113, '001', 200, 16, 192);

-- --------------------------------------------------------

--
-- Table structure for table `rooms_not_available_times`
--

CREATE TABLE `rooms_not_available_times` (
  `rnat_id` int(11) NOT NULL,
  `weight_percentage` int(3) NOT NULL,
  `room_id` int(11) NOT NULL,
  `num_of_times` int(5) NOT NULL,
  `active` varchar(5) COLLATE utf8_hungarian_ci DEFAULT 'true',
  `comments` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `same_start_hr_constraints`
--

CREATE TABLE `same_start_hr_constraints` (
  `same_start_cons_id` int(11) NOT NULL,
  `weight_percentage` varchar(5) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `num_of_activities` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `active` varchar(5) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `comments` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `time_cons_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `semesters`
--

CREATE TABLE `semesters` (
  `sem_id` int(11) NOT NULL,
  `user_table_id` int(11) NOT NULL,
  `sem_name` varchar(10) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `space_constraints`
--

CREATE TABLE `space_constraints` (
  `space_cons_id` int(11) NOT NULL,
  `weight_percentage` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `num_of_pref_rooms` int(11) DEFAULT NULL,
  `active` varchar(5) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `comments` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_table_id` int(11) NOT NULL,
  `activity_id` int(11) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `permanently_locked` varchar(5) COLLATE utf8_hungarian_ci DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `space_constraints`
--

INSERT INTO `space_constraints` (`space_cons_id`, `weight_percentage`, `num_of_pref_rooms`, `active`, `comments`, `user_table_id`, `activity_id`, `subject_id`, `permanently_locked`) VALUES
(58, '100', 3, NULL, NULL, 183, NULL, 11, NULL),
(68, '100', 3, NULL, NULL, 183, NULL, 15, NULL),
(78, '100', 4, NULL, NULL, 191, NULL, 24, NULL),
(83, '100', 5, NULL, NULL, 191, NULL, 28, NULL),
(85, '100', 6, NULL, NULL, 191, NULL, 23, NULL),
(86, '100', 1, NULL, NULL, 191, NULL, 26, NULL),
(105, '100', 1, NULL, NULL, 191, NULL, 25, NULL),
(106, '100', 2, NULL, NULL, 192, NULL, 32, NULL),
(107, '100', 2, NULL, NULL, 192, NULL, 29, NULL),
(108, '100', 1, NULL, NULL, 192, NULL, 30, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `year_name` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `num_students` int(11) DEFAULT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `year_name`, `num_students`, `user_table_id`) VALUES
(19, 'programtervező informatikus', 10000, 183),
(26, 'programtervező matematikus', 5000, 183),
(28, 'fordítólmács', 2, 183),
(41, '2020', 10000, 183),
(42, '2020', 1000, 191),
(43, '2019', 1000, 191),
(44, '2018', 1000, 191),
(49, '2018', 1000, 192),
(50, '2019', 1000, 192),
(51, '2020', 1500, 192),
(52, '2017', 500, 192),
(53, '2016', 200, 192);

-- --------------------------------------------------------

--
-- Table structure for table `students_in_activity`
--

CREATE TABLE `students_in_activity` (
  `stud_activity_id` int(11) NOT NULL,
  `activities_id` int(11) NOT NULL,
  `student_name` varchar(45) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `students_in_activity`
--

INSERT INTO `students_in_activity` (`stud_activity_id`, `activities_id`, `student_name`) VALUES
(1, 43, 'programtevező informatikus'),
(2, 44, 'programtervező matematikus');

-- --------------------------------------------------------

--
-- Table structure for table `subgroups`
--

CREATE TABLE `subgroups` (
  `subgroup_id` int(11) NOT NULL,
  `subgroup_name` varchar(45) COLLATE utf8_hungarian_ci NOT NULL,
  `num_of_students` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_table_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `subgroups`
--

INSERT INTO `subgroups` (`subgroup_id`, `subgroup_name`, `num_of_students`, `group_id`, `user_table_id`, `student_id`) VALUES
(4, 'A szakirány', 100, 15, 183, 19),
(5, 'B szakirány', 100, 15, 183, 19),
(7, 'angol', 1, 27, 183, 28),
(19, 'jók', 200, 39, 191, 42),
(20, 'rosszak', 300, 39, 191, 42),
(21, 'A csoport', 100, 42, 191, 43),
(22, 'B csoport', 100, 42, 191, 43),
(23, 'C csoport', 100, 42, 191, 43),
(24, 'D csoport', 1000, 42, 191, 43),
(25, 'E csoport', 100, 42, 191, 43),
(26, 'Szoftvertesztelő', 400, 45, 192, 49),
(27, 'Szoftverfejlesztők', 56, 45, 192, 49);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subj_id` int(11) NOT NULL,
  `subj_name` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subj_id`, `subj_name`, `user_table_id`) VALUES
(5, 'TesztTárgy', 179),
(6, 'T2', 181),
(11, 'Kalkulus I. ea.', 183),
(12, 'Kalkulus I. gy.', 183),
(13, 'A hatékony kommunikáció', 183),
(14, 'A programozás módszertani alapjai gy.', 183),
(15, 'Az informatika logikai alapjai ea.', 183),
(16, 'Az informatika logikai alapjai gy.', 183),
(17, 'Bevezetés az informatikába ea.', 183),
(18, 'Bevezetés az informatikába gy.', 183),
(19, 'Formális nyelvek és automaták ea.', 183),
(20, 'Magasszintű programozási nyelvek I. ea.', 183),
(21, 'Magasszintű programozási nyelvek I. gy.', 183),
(22, 'Számítógép architektúrák', 183),
(23, 'Matematika', 191),
(24, 'Informatika', 191),
(25, 'Biológia', 191),
(26, 'Ének', 191),
(27, 'Rajz', 191),
(28, 'Történelem', 191),
(29, 'Matematika', 192),
(30, 'Informatika gy.', 192),
(31, 'Informatika ea.', 192),
(32, 'Kommunikáció', 192);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `teach_name` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `teach_name`, `user_table_id`) VALUES
(6, 'TesztTanár', 179),
(7, 'T1', 181),
(10, 'Dr. Kovásznai Gergely', 183),
(11, 'Dr. Kusper Gábor', 183),
(12, 'Dr. Király Roland', 183),
(13, 'Keresztes Péter', 183),
(14, 'Troll Ede', 183),
(16, 'Geda Gábor', 191),
(17, 'Király Roland', 191),
(18, 'Teszt Elek', 192),
(19, 'Wincs Eszter', 192),
(20, 'Kukor Ica', 192),
(21, 'Fá Zoltán', 192);

-- --------------------------------------------------------

--
-- Table structure for table `time_constraints`
--

CREATE TABLE `time_constraints` (
  `time_cons_id` int(11) NOT NULL,
  `weight_percentage` int(11) NOT NULL,
  `num_of_pref_times` int(11) NOT NULL,
  `active` varchar(5) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `comments` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_table_id` int(11) NOT NULL,
  `activity_id` int(11) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `permanently_locked` varchar(5) COLLATE utf8_hungarian_ci DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `time_constraints`
--

INSERT INTO `time_constraints` (`time_cons_id`, `weight_percentage`, `num_of_pref_times`, `active`, `comments`, `user_table_id`, `activity_id`, `subject_id`, `permanently_locked`) VALUES
(29, 94, 1, NULL, NULL, 192, 74, NULL, 'false');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_name` varchar(10) COLLATE utf8_hungarian_ci NOT NULL,
  `password` char(32) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_name`, `password`) VALUES
('alma', 'alma');

-- --------------------------------------------------------

--
-- Table structure for table `user_files`
--

CREATE TABLE `user_files` (
  `user_files_id` int(11) NOT NULL,
  `file_type` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `file size` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `file_content` text COLLATE utf8_hungarian_ci DEFAULT NULL,
  `file_name` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_tables`
--

CREATE TABLE `user_tables` (
  `user_table_id` int(11) NOT NULL,
  `semester` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `institution_name` varchar(45) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `comments` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_name` varchar(10) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `user_tables`
--

INSERT INTO `user_tables` (`user_table_id`, `semester`, `institution_name`, `comments`, `user_name`) VALUES
(183, 'Uj1', 'Uj', '', 'alma'),
(184, 'e', NULL, NULL, 'alma'),
(185, 'r', NULL, NULL, 'alma'),
(186, 'q', NULL, NULL, 'alma'),
(187, 'ww', NULL, NULL, 'alma'),
(188, 'ee', NULL, NULL, 'alma'),
(189, 'ee', NULL, NULL, 'alma'),
(190, 'qq', NULL, NULL, 'alma'),
(191, 'Levelező', 'EKE', '', 'alma'),
(192, '2020_21', 'EKE', 'komment', 'alma');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`activities_id`),
  ADD KEY `fk_actvites_teachers1` (`teacher_id`),
  ADD KEY `fk_actvites_subjects1` (`subj_id`),
  ADD KEY `fk_activities_user_tables1` (`user_table_id`);

--
-- Indexes for table `activities_not_overlapping_con`
--
ALTER TABLE `activities_not_overlapping_con`
  ADD PRIMARY KEY (`anoc_id`);

--
-- Indexes for table `activities_same_start`
--
ALTER TABLE `activities_same_start`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_activites_same_start_same_start_hr_constraint1` (`same_start_cons_id`),
  ADD KEY `fk_activites_same_start_actvites1` (`actvites_id`);

--
-- Indexes for table `activity_groups`
--
ALTER TABLE `activity_groups`
  ADD PRIMARY KEY (`activity_groups_id`);

--
-- Indexes for table `activity_subgroups`
--
ALTER TABLE `activity_subgroups`
  ADD PRIMARY KEY (`activity_subgroups_id`);

--
-- Indexes for table `activity_years`
--
ALTER TABLE `activity_years`
  ADD PRIMARY KEY (`activity_years_id`);

--
-- Indexes for table `basic_compulsory_constraints`
--
ALTER TABLE `basic_compulsory_constraints`
  ADD PRIMARY KEY (`basic_cons_id`),
  ADD KEY `fk_basic_compulsory_constraint_constriants1` (`cons_id`);

--
-- Indexes for table `buildings`
--
ALTER TABLE `buildings`
  ADD PRIMARY KEY (`building_id`),
  ADD KEY `fk_buildings_user_tables1` (`user_table_id`);

--
-- Indexes for table `constraints`
--
ALTER TABLE `constraints`
  ADD PRIMARY KEY (`cons_id`),
  ADD KEY `fk_constriants_user_tables1` (`user_table_id`);

--
-- Indexes for table `days`
--
ALTER TABLE `days`
  ADD PRIMARY KEY (`days_id`),
  ADD KEY `fk_days_user_tables1` (`user_table_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `fk_group_students1` (`student_id`),
  ADD KEY `fk_group_user_tables1` (`user_table_id`);

--
-- Indexes for table `hours`
--
ALTER TABLE `hours`
  ADD PRIMARY KEY (`hours_id`),
  ADD KEY `fk_hours_user_tables1` (`user_table_id`);

--
-- Indexes for table `list_of_anoc`
--
ALTER TABLE `list_of_anoc`
  ADD PRIMARY KEY (`list_anoc_id`);

--
-- Indexes for table `list_of_nat`
--
ALTER TABLE `list_of_nat`
  ADD PRIMARY KEY (`list_nat_id`);

--
-- Indexes for table `list_of_rnat`
--
ALTER TABLE `list_of_rnat`
  ADD PRIMARY KEY (`list_rnat_id`);

--
-- Indexes for table `min_days_constraints`
--
ALTER TABLE `min_days_constraints`
  ADD PRIMARY KEY (`min_days_cons_id`),
  ADD KEY `fk_min_days_constraint_time_constraints_for_activites1` (`time_cons_id`);

--
-- Indexes for table `min_days_for_activities`
--
ALTER TABLE `min_days_for_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_min_days_for_activities_min_days_constraint1` (`min_days_cons_id`),
  ADD KEY `fk_min_days_for_activities_actvites1` (`activities_id`);

--
-- Indexes for table `not_available_times`
--
ALTER TABLE `not_available_times`
  ADD PRIMARY KEY (`nat_id`);

--
-- Indexes for table `preferred_rooms`
--
ALTER TABLE `preferred_rooms`
  ADD PRIMARY KEY (`pref_rooms_id`),
  ADD KEY `fk_preferred_rooms_space_constraints1` (`space_cons_id`),
  ADD KEY `fk_preferred_rooms_rooms1` (`room_id`);

--
-- Indexes for table `preferred_times`
--
ALTER TABLE `preferred_times`
  ADD PRIMARY KEY (`pref_times_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `fk_rooms_building1` (`building_id`),
  ADD KEY `fk_rooms_user_tables1` (`user_table_id`);

--
-- Indexes for table `rooms_not_available_times`
--
ALTER TABLE `rooms_not_available_times`
  ADD PRIMARY KEY (`rnat_id`);

--
-- Indexes for table `same_start_hr_constraints`
--
ALTER TABLE `same_start_hr_constraints`
  ADD PRIMARY KEY (`same_start_cons_id`),
  ADD KEY `fk_same_start_hr_constraint_time_constraints_for_activites1` (`time_cons_id`);

--
-- Indexes for table `semesters`
--
ALTER TABLE `semesters`
  ADD PRIMARY KEY (`sem_id`),
  ADD KEY `fk_semesters_user_tables1` (`user_table_id`);

--
-- Indexes for table `space_constraints`
--
ALTER TABLE `space_constraints`
  ADD PRIMARY KEY (`space_cons_id`),
  ADD KEY `fk_space_constraints_constriants1` (`user_table_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `fk_students_user_tables1` (`user_table_id`);

--
-- Indexes for table `students_in_activity`
--
ALTER TABLE `students_in_activity`
  ADD PRIMARY KEY (`stud_activity_id`),
  ADD KEY `fk_stud_activity_activities` (`activities_id`);

--
-- Indexes for table `subgroups`
--
ALTER TABLE `subgroups`
  ADD PRIMARY KEY (`subgroup_id`),
  ADD KEY `fk_subgroup_group1` (`group_id`),
  ADD KEY `fk_subgroup_user_tables_1` (`user_table_id`),
  ADD KEY `fk_subgroups_students` (`student_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subj_id`),
  ADD KEY `fk_subjects_user_tables1` (`user_table_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`),
  ADD KEY `fk_teachers_user_tables1` (`user_table_id`);

--
-- Indexes for table `time_constraints`
--
ALTER TABLE `time_constraints`
  ADD PRIMARY KEY (`time_cons_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_name`),
  ADD UNIQUE KEY `user_name_UNIQUE` (`user_name`);

--
-- Indexes for table `user_files`
--
ALTER TABLE `user_files`
  ADD PRIMARY KEY (`user_files_id`),
  ADD KEY `fk_user_tables` (`user_table_id`);

--
-- Indexes for table `user_tables`
--
ALTER TABLE `user_tables`
  ADD PRIMARY KEY (`user_table_id`),
  ADD KEY `fk_user_tables_users1` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `activities_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `activities_not_overlapping_con`
--
ALTER TABLE `activities_not_overlapping_con`
  MODIFY `anoc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `activities_same_start`
--
ALTER TABLE `activities_same_start`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `activity_groups`
--
ALTER TABLE `activity_groups`
  MODIFY `activity_groups_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `activity_subgroups`
--
ALTER TABLE `activity_subgroups`
  MODIFY `activity_subgroups_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `activity_years`
--
ALTER TABLE `activity_years`
  MODIFY `activity_years_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `basic_compulsory_constraints`
--
ALTER TABLE `basic_compulsory_constraints`
  MODIFY `basic_cons_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `buildings`
--
ALTER TABLE `buildings`
  MODIFY `building_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `constraints`
--
ALTER TABLE `constraints`
  MODIFY `cons_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `days`
--
ALTER TABLE `days`
  MODIFY `days_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `hours`
--
ALTER TABLE `hours`
  MODIFY `hours_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `list_of_anoc`
--
ALTER TABLE `list_of_anoc`
  MODIFY `list_anoc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `list_of_nat`
--
ALTER TABLE `list_of_nat`
  MODIFY `list_nat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `list_of_rnat`
--
ALTER TABLE `list_of_rnat`
  MODIFY `list_rnat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `min_days_constraints`
--
ALTER TABLE `min_days_constraints`
  MODIFY `min_days_cons_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `min_days_for_activities`
--
ALTER TABLE `min_days_for_activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `not_available_times`
--
ALTER TABLE `not_available_times`
  MODIFY `nat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `preferred_rooms`
--
ALTER TABLE `preferred_rooms`
  MODIFY `pref_rooms_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `preferred_times`
--
ALTER TABLE `preferred_times`
  MODIFY `pref_times_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `rooms_not_available_times`
--
ALTER TABLE `rooms_not_available_times`
  MODIFY `rnat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `semesters`
--
ALTER TABLE `semesters`
  MODIFY `sem_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `space_constraints`
--
ALTER TABLE `space_constraints`
  MODIFY `space_cons_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `students_in_activity`
--
ALTER TABLE `students_in_activity`
  MODIFY `stud_activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subgroups`
--
ALTER TABLE `subgroups`
  MODIFY `subgroup_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subj_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `time_constraints`
--
ALTER TABLE `time_constraints`
  MODIFY `time_cons_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `user_files`
--
ALTER TABLE `user_files`
  MODIFY `user_files_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_tables`
--
ALTER TABLE `user_tables`
  MODIFY `user_table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activities_same_start`
--
ALTER TABLE `activities_same_start`
  ADD CONSTRAINT `fk_activites_same_start_actvites1` FOREIGN KEY (`actvites_id`) REFERENCES `activities` (`activities_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_activites_same_start_same_start_hr_constraint1` FOREIGN KEY (`same_start_cons_id`) REFERENCES `same_start_hr_constraints` (`same_start_cons_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
