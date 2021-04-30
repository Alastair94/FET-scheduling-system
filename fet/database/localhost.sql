-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 30, 2021 at 09:28 PM
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
(72, '1', NULL, 0, 18, 29, 192, NULL, 100),
(74, '1', NULL, 0, 20, 29, 192, NULL, 300),
(75, '1', NULL, 0, 18, 29, 192, NULL, -1),
(76, '1', NULL, 0, 20, 32, 192, NULL, -1),
(78, '3', NULL, 0, 18, 29, 192, NULL, 6);

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
(15, 3, 91, NULL, NULL, 192),
(16, 2, 100, NULL, NULL, 192);

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
(13, 72, 43, 'Nyelvész'),
(14, 73, 43, 'Nyelvész'),
(15, 75, 44, 'Matematikus'),
(16, 79, 45, 'Informatikus'),
(17, 81, 43, 'Nyelvész');

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
(16, 'A', 192),
(17, 'B', 192),
(18, 'C', 192);

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
(25, 15, 76),
(26, 15, 74),
(27, 15, 72),
(28, 16, 72),
(29, 16, 74);

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
(18, 16, 17, 34),
(19, 16, 17, 37);

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
(16, 100, NULL, 113, 2, NULL, NULL, 192);

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
(114, 106, 111, 18),
(118, 109, 110, 18),
(119, 109, 111, 18),
(129, 116, 110, 18),
(130, 116, 111, 18),
(132, 118, 113, 16),
(133, 119, 113, 16),
(134, 120, 113, 16),
(135, 121, 110, 18);

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
(36, 31, 19, 36),
(37, 31, 19, 38),
(38, 32, 17, 36),
(39, 33, 17, 34),
(40, 34, 17, 38);

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
(109, '100', 30, 18, 192),
(110, '101', 30, 18, 192),
(111, '102', 30, 18, 192),
(112, '124', 200, 18, 192),
(113, '001', 200, 16, 192);

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
(106, '100', 2, NULL, NULL, 192, NULL, 32, NULL),
(109, '100', 2, NULL, NULL, 192, 74, NULL, 'false'),
(116, '100', 2, NULL, NULL, 192, 75, NULL, 'false'),
(118, '100', 1, NULL, NULL, 192, NULL, 30, NULL),
(119, '100', 1, NULL, NULL, 192, NULL, 29, NULL),
(120, '100', 1, NULL, NULL, 192, NULL, 31, NULL),
(121, '100', 1, NULL, NULL, 192, 78, NULL, 'false');

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
(49, '2018', 1000, 192),
(50, '2019', 1000, 192),
(51, '2020', 1500, 192),
(52, '2017', 500, 192),
(53, '2016', 200, 192);

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
(18, 'Teszt Elek', 192),
(19, 'Wincs Eszter', 192),
(20, 'Kukor Ica', 192),
(21, 'Fá Zoltán', 192);

-- --------------------------------------------------------

--
-- Table structure for table `teachers_max_hours`
--

CREATE TABLE `teachers_max_hours` (
  `teachers_mh_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `weight_percentage` int(3) NOT NULL,
  `max_hours` int(2) NOT NULL,
  `active` varchar(5) COLLATE utf8_hungarian_ci DEFAULT 'true',
  `comments` longtext COLLATE utf8_hungarian_ci DEFAULT NULL,
  `user_table_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `teachers_max_hours`
--

INSERT INTO `teachers_max_hours` (`teachers_mh_id`, `teacher_id`, `weight_percentage`, `max_hours`, `active`, `comments`, `user_table_id`) VALUES
(10, 18, 100, 5, NULL, NULL, 192),
(11, 21, 97, 3, NULL, NULL, 192);

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
(31, 100, 2, NULL, NULL, 192, 75, NULL, 'false'),
(32, 100, 1, NULL, NULL, 192, 78, NULL, 'false'),
(33, 100, 1, NULL, NULL, 192, 72, NULL, 'false'),
(34, 100, 1, NULL, NULL, 192, 74, NULL, 'false');

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
-- Indexes for table `buildings`
--
ALTER TABLE `buildings`
  ADD PRIMARY KEY (`building_id`),
  ADD KEY `fk_buildings_user_tables1` (`user_table_id`);

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
-- Indexes for table `teachers_max_hours`
--
ALTER TABLE `teachers_max_hours`
  ADD PRIMARY KEY (`teachers_mh_id`),
  ADD UNIQUE KEY `unique_teacher_id` (`teacher_id`);

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
  MODIFY `activities_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `activities_not_overlapping_con`
--
ALTER TABLE `activities_not_overlapping_con`
  MODIFY `anoc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `activity_groups`
--
ALTER TABLE `activity_groups`
  MODIFY `activity_groups_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
-- AUTO_INCREMENT for table `buildings`
--
ALTER TABLE `buildings`
  MODIFY `building_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
  MODIFY `list_anoc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `list_of_nat`
--
ALTER TABLE `list_of_nat`
  MODIFY `list_nat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `not_available_times`
--
ALTER TABLE `not_available_times`
  MODIFY `nat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `preferred_rooms`
--
ALTER TABLE `preferred_rooms`
  MODIFY `pref_rooms_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `preferred_times`
--
ALTER TABLE `preferred_times`
  MODIFY `pref_times_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `space_constraints`
--
ALTER TABLE `space_constraints`
  MODIFY `space_cons_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

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
-- AUTO_INCREMENT for table `teachers_max_hours`
--
ALTER TABLE `teachers_max_hours`
  MODIFY `teachers_mh_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `time_constraints`
--
ALTER TABLE `time_constraints`
  MODIFY `time_cons_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `user_tables`
--
ALTER TABLE `user_tables`
  MODIFY `user_table_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
