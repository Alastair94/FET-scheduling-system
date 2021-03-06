<?php
	include 'db_connect.php';
#-------------------------------------------------------------------------------------------------
#builds a node with text
	function buildNode(&$fet, $parent, $element, $value){
		$node = $fet->createElement($element);
		$node = $parent->appendChild($node);
		
		$nodeVal = $fet->createTextNode($value);
		$nodeVal = $node->appendChild($nodeVal);
	}

#-------------------------------------------------------------------------------------------------
#querys the database to retrieve the row count from $table	
	function getCount(&$fet, $table, $mysqli, $join, $name){ 
		$qCount = "SELECT count(*) AS \"count\" ".$join;
		$qCountRes = $mysqli->query($qCount);
		$tupleC = $qCountRes->fetch_assoc();
		
		buildNode($fet, $table, $name, $tupleC['count']);
	}

#-------------------------------------------------------------------------------------------------
#querys the database to retrieve several Activity_ID's from activities table according to the value passed 
	function activityIDNode(&$fet, $parent, $tableName, $columnName, $value, $mysqli){
		$query = "SELECT activities_id FROM ".$tableName." WHERE ".$columnName." = ".$value;
		$queryResult = $mysqli->query($query);
		
		while($tuple = $queryResult->fetch_assoc()){
			buildNode($fet, $parent, 'Activity_Id', $tuple['activities_id']);
		}
	}
	
#-------------------------------------------------------------------------------------------------	
#querys the database to retrieve Institution_Name from userTables table
	function getInstituition(&$fet, $root, $mysqli, $userTableID){
		$query = "SELECT institution_name FROM user_tables WHERE user_table_id = ".$userTableID;
		$queryResult = $mysqli->query($query);
		$tuple = $queryResult->fetch_assoc();
		
		buildNode($fet, $root, 'Institution_Name', $tuple['institution_name']);	
	}

#-------------------------------------------------------------------------------------------------
#querys the database to retrieve Comments from user_tables table
	function getComments(&$fet, $root, $mysqli, $userTableID){
		$query = "SELECT comments FROM user_tables WHERE user_table_id = ".$userTableID;
		$queryResult = $mysqli->query($query);
		$tuple = $queryResult->fetch_assoc();
		
		if($tuple['comments'] !== NULL){
			buildNode($fet, $root, 'Comments',  $tuple['comments']);
		}
		else{
			buildNode($fet, $root, 'Comments',  'Default comments');
		}
	}
	
#-------------------------------------------------------------------------------------------------
#querys the database to retrieve Hours_List from hours table
	function getHours(&$fet, $root, $mysqli, $userTableID){
		#main query to retrieve each hour_name from hours table
		$hrsJoin = "FROM user_tables, hours WHERE user_tables.user_table_id = hours.user_table_id AND hours.user_table_id = ".$userTableID;
		$query = "SELECT hour_name ".$hrsJoin;
		$queryResult = $mysqli->query($query);
		
		$hours = $fet->createElement('Hours_List');
		$hours = $root->appendChild($hours);
		
		getCount($fet, $hours, $mysqli, $hrsJoin, 'Number_of_Hours');
		
		while($tuple = $queryResult->fetch_assoc()){
			$hour = $fet->createElement('Hour');
			$hour = $hours->appendChild($hour);
			buildNode($fet, $hour, 'Name', $tuple['hour_name']);
		}
	}

#-------------------------------------------------------------------------------------------------
#querys the database to retrieve Days_List from days table
	function getDays(&$fet, $root, $mysqli, $userTableID){
		#main query to retrieve each days_name from days table
		$daysJoin = "FROM user_tables, days WHERE user_tables.user_table_id = days.user_table_id AND days.user_table_id = ".$userTableID;
		$query = "SELECT day_name ".$daysJoin;
		$queryResult = $mysqli->query($query);
		
		$days = $fet->createElement('Days_List');
		$days = $root->appendChild($days);
		
		getCount($fet, $days, $mysqli, $daysJoin, 'Number_of_Days');
		
		while($tuple = $queryResult->fetch_assoc()){
			$day = $fet->createElement('Day');
			$day = $days->appendChild($day);
			buildNode($fet, $day, 'Name', $tuple['day_name']);
		}
	}

#-------------------------------------------------------------------------------------------------
#querys the database to retrieve Students_List from students table
	function getStudents(&$fet, $root, $mysqli, $userTableID){
		$query = "SELECT year_name, num_students, student_id FROM user_tables, students WHERE user_tables.user_table_id = students.user_table_id ";
		$query .= "AND students.user_table_id = ".$userTableID;
		$queryResult = $mysqli->query($query);
		
		$students = $fet->createElement('Students_List');
		$students = $root->appendChild($students);
		
		while($tuple = $queryResult->fetch_assoc()){
			$year = $fet->createElement('Year');
			$year = $students->appendChild($year);
			
			buildNode($fet, $year, 'Name', $tuple['year_name']);
			buildNode($fet, $year, 'Number_of_Students', $tuple['num_students']);

			$query2 = "SELECT group_id, group_name, num_of_students FROM groups WHERE groups.student_id = ".$tuple['student_id'];
			$queryResult2 = $mysqli->query($query2);
			while($tuple2 = $queryResult2->fetch_assoc()){
				$group = $fet->createElement('Group');
				$group = $year->appendChild($group);

				buildNode($fet, $group, 'Name', $tuple2['group_name']);
				buildNode($fet, $group, 'Number_of_Students', $tuple2['num_of_students']);

				$query3 = "SELECT subgroup_name, num_of_students FROM subgroups WHERE subgroups.group_id = ".$tuple2['group_id'];
				$queryResult3 = $mysqli->query($query3);
				while($tuple3 = $queryResult3->fetch_assoc()){
					$subgroup = $fet->createElement('Subgroup');
					$subgroup = $group->appendChild($subgroup);

					buildNode($fet, $subgroup, 'Name', $tuple3['subgroup_name']);
					buildNode($fet, $subgroup, 'Number_of_Students', $tuple3['num_of_students']);				
				}
			}
		}
	}

#-------------------------------------------------------------------------------------------------
#querys the database to retrieve Teachers_List from teachers table
	function getTeachers(&$fet, $root, $mysqli, $userTableID){
		$query = "SELECT teach_name FROM user_tables, teachers WHERE user_tables.user_table_id = teachers.user_table_id ";
		$query .= "AND teachers.user_table_id = ".$userTableID;
		$queryResult = $mysqli->query($query);
				
		$teachers = $fet->createElement('Teachers_List');
		$teachers = $root->appendChild($teachers);
		
		while($tuple = $queryResult->fetch_assoc()){
			$teacher = $fet->createElement('Teacher');
			$teacher = $teachers->appendChild($teacher);
			
			buildNode($fet, $teacher, 'Name', $tuple['teach_name']);
		}
	}

#-------------------------------------------------------------------------------------------------
#querys the database to retrieve Subjects_List from subjects table
	function getSubjects(&$fet, $root, $mysqli, $userTableID){
		$query = "SELECT subj_name FROM user_tables, subjects WHERE user_tables.user_table_id = subjects.user_table_id ";
		$query .= "AND subjects.user_table_id = ".$userTableID;
		$queryResult = $mysqli->query($query);
		
		$subjects = $fet->createElement('Subjects_List');
		$subjects = $root->appendChild($subjects);
		
		while($tuple = $queryResult->fetch_assoc()){
			$subject = $fet->createElement('Subject');
			$subject = $subjects->appendChild($subject);
			
			buildNode($fet, $subject, 'Name', $tuple['subj_name']);
		}
	}

#-------------------------------------------------------------------------------------------------
#querys the database to retrieve Activites_List from activities table
	function getActivities(&$fet, $root, $mysqli, $userTableID){
		$query = "SELECT activities_id, teach_name, subj_name, duration, total_duration, activity_group_id, active, activities.number_of_students ";
		$query .= "FROM user_tables, activities, teachers, subjects WHERE  user_tables.user_table_id = activities.user_table_id ";
		$query .= "AND activities.teacher_id = teachers.teacher_id AND activities.subj_id = subjects.subj_id ";
		$query .= "AND activities.user_table_id = ".$userTableID;
		$queryResult = $mysqli->query($query);

		$activities = $fet->createElement('Activities_List');
		$activities = $root->appendChild($activities);
		
		while($tuple = $queryResult->fetch_assoc()){
			$activity = $fet->createElement('Activity');
			$activity = $activities->appendChild($activity);
			
			buildNode($fet, $activity, 'Teacher', $tuple['teach_name']);
			buildNode($fet, $activity, 'Subject', $tuple['subj_name']);

			$query2 = "SELECT year_name FROM activity_years WHERE activity_id = ".$tuple['activities_id'];
			$queryResult2 = $mysqli->query($query2);
			while($tuple2 = $queryResult2->fetch_assoc()){
				buildNode($fet, $activity, 'Students', $tuple2['year_name']);
			}
			$query2 = "SELECT group_name FROM activity_groups WHERE activity_id = ".$tuple['activities_id'];
			$queryResult2 = $mysqli->query($query2);
			while($tuple2 = $queryResult2->fetch_assoc()){
				buildNode($fet, $activity, 'Students', $tuple2['group_name']);
			}
			$query2 = "SELECT subgroup_name FROM activity_subgroups WHERE activity_id = ".$tuple['activities_id'];
			$queryResult2 = $mysqli->query($query2);
			while($tuple2 = $queryResult2->fetch_assoc()){
				buildNode($fet, $activity, 'Students', $tuple2['subgroup_name']);
			}

			buildNode($fet, $activity, 'Duration', $tuple['duration']);
			buildNode($fet, $activity, 'Total_Duration', $tuple['total_duration']);
			buildNode($fet, $activity, 'Id', $tuple['activities_id']);
			buildNode($fet, $activity, 'Activity_Group_Id', $tuple['activity_group_id']);
			if($tuple['number_of_students'] != -1){
				buildNode($fet, $activity, 'Number_Of_Students', $tuple['number_of_students']);
			}
			buildNode($fet, $activity, 'Active',  $tuple['active']==0?"true":"false");
			buildNode($fet, $activity, 'Comments',  "");	
		}
	}	

#-------------------------------------------------------------------------------------------------
#querys the database to retrieve Buildings_List from buildings table
	function getBuildings(&$fet, $root, $mysqli, $userTableID){
		$query = "SELECT build_name FROM user_tables, buildings WHERE user_tables.user_table_id = buildings.user_table_id ";
		$query .= "AND buildings.user_table_id = ".$userTableID;
		$queryResult = $mysqli->query($query);
		
		$buildings = $fet->createElement('Buildings_List');
		$buildings = $root->appendChild($buildings);
		
		while($tuple = $queryResult->fetch_assoc()){
			$building = $fet->createElement('Building');
			$building = $buildings->appendChild($building);
			
			buildNode($fet, $building, 'Name', $tuple['build_name']);
		}
	}

#-------------------------------------------------------------------------------------------------
#querys the database to retrieve Rooms_List from rooms table
	function getRooms(&$fet, $root, $mysqli, $userTableID){
		$query = "SELECT room_name, build_name, capacity FROM user_tables, rooms, buildings WHERE user_tables.user_table_id = buildings.user_table_id ";
		$query .= "AND buildings.building_id = rooms.building_id  AND buildings.user_table_id = ".$userTableID;
		$queryResult = $mysqli->query($query);
		
		$rooms = $fet->createElement('Rooms_List');
		$rooms = $root->appendChild($rooms);
		
		while($tuple = $queryResult->fetch_assoc()){
			$room = $fet->createElement('Room');
			$room = $rooms->appendChild($room);
			
			buildNode($fet, $room, 'Name', $tuple['room_name']);
			buildNode($fet, $room, 'Building', $tuple['build_name']);
			buildNode($fet, $room, 'Capacity', $tuple['capacity']);
			buildNode($fet, $room, 'Virtual', 'false');
		}
	}

#-------------------------------------------------------------------------------------------------
#querys the database to retrieve Time_Constraints_List from constraints, time_constraints, and min_days_constraints tables
	function getTimeConstraints(&$fet, $root, $mysqli, $userTableID){
		$timeCons = $fet->createElement('Time_Constraints_List');
		$timeCons = $root->appendChild($timeCons);
		
		$basic = $fet->createElement('ConstraintBasicCompulsoryTime');
		$basic = $timeCons->appendChild($basic);
		
		buildNode($fet, $basic, 'Weight_Percentage', '100');
		buildNode($fet, $basic, 'Active', 'True');				
		buildNode($fet, $basic, 'Comments',  '');
		
		getNOverlapActivities($fet, $timeCons, $mysqli, $userTableID);
		getTeachersNAT($fet, $timeCons, $mysqli, $userTableID);
		getTeachersMaxHours($fet, $timeCons, $mysqli, $userTableID);
		getActivitiesPreferredStartingTime($fet, $timeCons, $mysqli, $userTableID);
	}

#-------------------------------------------------------------------------------------------------
#querys the database to retrieve Space_Constraints_List from constraints and space_constraints tables	
	function getSpaceConstraints(&$fet, $root, $mysqli, $userTableID){
		$spaceCons = $fet->createElement('Space_Constraints_List');
		$spaceCons = $root->appendChild($spaceCons);		

		$basic = $fet->createElement('ConstraintBasicCompulsorySpace');
		$basic = $spaceCons->appendChild($basic);
		
		buildNode($fet, $basic, 'Weight_Percentage', '100');
		buildNode($fet, $basic, 'Active', 'True');				
		buildNode($fet, $basic, 'Comments',  '');

		$query = "SELECT *FROM space_constraints ";
		$query .= "WHERE space_constraints.user_table_id = ".$userTableID." ";
		$queryResult = $mysqli->query($query);

		while($tuple = $queryResult->fetch_assoc()){
			if($tuple['activity_id'] == NULL){
				if($tuple['num_of_pref_rooms'] == 1){
					$actPrefRooms = $fet->createElement('ConstraintSubjectPreferredRoom');
					$actPrefRooms = $spaceCons->appendChild($actPrefRooms);

				} else {
					$actPrefRooms = $fet->createElement('ConstraintSubjectPreferredRooms');
					$actPrefRooms = $spaceCons->appendChild($actPrefRooms);					
				}
				getPrefRooms($fet, $actPrefRooms, $mysqli, $tuple['space_cons_id']);
				buildNode($fet, $actPrefRooms, 'Weight_Percentage', $tuple['weight_percentage']);
				buildNode($fet, $actPrefRooms, 'Active', 'true');
				buildNode($fet, $actPrefRooms, 'Comments', $tuple['comments']);
			} 
			else if ($tuple['subject_id'] == NULL){
				if($tuple['num_of_pref_rooms'] == 1){
					$actPrefRooms = $fet->createElement('ConstraintActivityPreferredRoom');
					$actPrefRooms = $spaceCons->appendChild($actPrefRooms);
					buildNode($fet, $actPrefRooms, 'Permanently_Locked', $tuple['permanently_locked']);

				} else {
					$actPrefRooms = $fet->createElement('ConstraintActivityPreferredRooms');
					$actPrefRooms = $spaceCons->appendChild($actPrefRooms);					
				}
				getPrefRooms($fet, $actPrefRooms, $mysqli, $tuple['space_cons_id']);
				buildNode($fet, $actPrefRooms, 'Activity_Id', $tuple['activity_id']);
				buildNode($fet, $actPrefRooms, 'Weight_Percentage', $tuple['weight_percentage']);
				buildNode($fet, $actPrefRooms, 'Active', $tuple['active']);
				buildNode($fet, $actPrefRooms, 'Comments', $tuple['comments']);
				
			}
		}

		getRoomsNAT($fet, $spaceCons, $mysqli, $userTableID);
	}

#-------------------------------------------------------------------------------------------------
#querys the database to retrieve Preferred_Rooms according to space_cons_id from space_constraints and preferred_rooms tables
	function getPrefRooms(&$fet, $actPrefRooms, $mysqli, $space_cons_id){
		$qTables = "FROM space_constraints, preferred_rooms, rooms ";
		$qJoins = "WHERE space_constraints.space_cons_id = preferred_rooms.space_cons_id AND preferred_rooms.room_id = rooms.room_id ";
		$qSearch = "AND preferred_rooms.space_cons_id = ".$space_cons_id;

		$query = "SELECT room_name ".$qTables.$qJoins.$qSearch;
		$queryResult = $mysqli->query($query);

		$qCount = "SELECT count(*) AS \"count\" ".$qTables.$qJoins.$qSearch;
		$qCountRes = $mysqli->query($qCount);
		
		$count =$qCountRes ->fetch_assoc();

		if($count['count'] == 1){
			$tuple = $queryResult->fetch_assoc();
			buildNode($fet, $actPrefRooms, 'Room', $tuple['room_name']);
		}else {
			buildNode($fet, $actPrefRooms, 'Number_of_Preferred_Rooms', $count['count']);

			while($tuple = $queryResult->fetch_assoc()){
				buildNode($fet, $actPrefRooms, 'Preferred_Room', $tuple['room_name']);
			}
		}
	}

	function getPrefTimes(&$fet, $actPrefTimes, $mysqli, $time_cons_id){
		$query="SELECT * FROM preferred_times INNER JOIN days ON preferred_times.day_id = days.days_id INNER JOIN hours ON preferred_times.hour_id = hours.hours_id ".
		" WHERE time_cons_id = ".$time_cons_id;
		$queryResult = $mysqli->query($query);

		$qCount = "SELECT count(*) AS \"count\" FROM preferred_times INNER JOIN days ON preferred_times.day_id = days.days_id INNER JOIN hours ON preferred_times.hour_id = hours.hours_id ".
		" WHERE time_cons_id = ".$time_cons_id;
		$qCountRes = $mysqli->query($qCount);
		
		$count = $qCountRes->fetch_assoc();

		if($count['count'] == 1){
			$tuple = $queryResult->fetch_assoc();
			buildNode($fet, $actPrefTimes, 'Preferred_Day', $tuple['day_name']);
			buildNode($fet, $actPrefTimes, 'Preferred_Hour', $tuple['hour_name']);
		}else {
			buildNode($fet, $actPrefTimes, 'Number_of_Preferred_Starting_Times', $count['count']);
			while($tuple = $queryResult->fetch_assoc()){
				$actPrefTimes2 = $fet->createElement('Preferred_Starting_Time');
				$actPrefTimes2 = $actPrefTimes->appendChild($actPrefTimes2);
				buildNode($fet, $actPrefTimes, 'Preferred_Day', $tuple['day_name']);
				buildNode($fet, $actPrefTimes, 'Preferred_Hour', $tuple['hour_name']);	
			}
		}
	}

	function getNOverlapActivities(&$fet, $timeCons, $mysqli, $userTableID){
		$query = "SELECT anoc_id, num_of_activities, weight_percentage, active, comments FROM activities_not_overlapping_con WHERE activities_not_overlapping_con.user_table_id = ".$userTableID;
		$queryResult = $mysqli->query($query);

		while($tuple = $queryResult->fetch_assoc()){
			$NOverlapCons = $fet->createElement('ConstraintActivitiesNotOverlapping');
			$NOverlapCons = $timeCons->appendChild($NOverlapCons);

			buildNode($fet, $NOverlapCons, 'Weight_Percentage', $tuple['weight_percentage']);
			buildNode($fet, $NOverlapCons, 'Number_of_Activities', $tuple['num_of_activities']);
		
			$query2 = "SELECT activity_id FROM list_of_anoc WHERE anoc_id = ".$tuple['anoc_id'];
			$queryResult2 = $mysqli->query($query2);
			
			while($tuple2 = $queryResult2->fetch_assoc()){
				buildNode($fet, $NOverlapCons, 'Activity_Id', $tuple2['activity_id']);
			}

			buildNode($fet, $NOverlapCons, 'Active', 'true');
			buildNode($fet, $NOverlapCons, 'Comments', $tuple['comments']);
		}
	}

	function getTeachersNAT(&$fet, $timeCons, $mysqli, $userTableID){
		$query = "SELECT * FROM not_available_times INNER JOIN teachers ON not_available_times.teacher_id = teachers.teacher_id WHERE not_available_times.user_table_id = ".$userTableID;
		$queryResult = $mysqli->query($query);

		while($tuple = $queryResult->fetch_assoc()){
			$teachersNAT = $fet->createElement('ConstraintTeacherNotAvailableTimes');
			$teachersNAT = $timeCons->appendChild($teachersNAT);

			buildNode($fet, $teachersNAT, 'Weight_Percentage', $tuple['weight_percentage']);
			buildNode($fet, $teachersNAT, 'Teacher', $tuple['teach_name']);
			buildNode($fet, $teachersNAT, 'Number_of_Not_Available_Times', $tuple['num_of_times']);
		
			$query2 = "SELECT * FROM list_of_nat INNER JOIN days ON list_of_nat.day_id = days.days_id INNER JOIN hours ON list_of_nat.hour_id = hours.hours_id  WHERE nat_id = ".$tuple['nat_id'];
			$queryResult2 = $mysqli->query($query2);
			while($tuple2 = $queryResult2->fetch_assoc()){
				$actTeachersNAT = $fet->createElement('Not_Available_Time');
				$actTeachersNAT = $teachersNAT->appendChild($actTeachersNAT);					

				buildNode($fet, $actTeachersNAT, 'Day', $tuple2['day_name']);
				buildNode($fet, $actTeachersNAT, 'Hour', $tuple2['hour_name']);
			}

			buildNode($fet, $teachersNAT, 'Active', 'true');
			buildNode($fet, $teachersNAT, 'Comments', $tuple['comments']);
		}
	}

	function getRoomsNAT(&$fet, $spaceCons, $mysqli, $userTableID){
		$query = "SELECT * FROM not_available_times INNER JOIN rooms ON not_available_times.room_id = rooms.room_id WHERE not_available_times.user_table_id = ".$userTableID;
		$queryResult = $mysqli->query($query);

		while($tuple = $queryResult->fetch_assoc()){
			$roomsNAT = $fet->createElement('ConstraintRoomNotAvailableTimes');
			$roomsNAT = $spaceCons->appendChild($roomsNAT);

			buildNode($fet, $roomsNAT, 'Weight_Percentage', $tuple['weight_percentage']);
			buildNode($fet, $roomsNAT, 'Room', $tuple['room_name']);
			buildNode($fet, $roomsNAT, 'Number_of_Not_Available_Times', $tuple['num_of_times']);
		
			$query2 = "SELECT * FROM list_of_nat INNER JOIN days ON list_of_nat.day_id = days.days_id INNER JOIN hours ON list_of_nat.hour_id = hours.hours_id  WHERE nat_id = ".$tuple['nat_id'];
			$queryResult2 = $mysqli->query($query2);
			while($tuple2 = $queryResult2->fetch_assoc()){
				$actRoomsNAT = $fet->createElement('Not_Available_Time');
				$actRoomsNAT = $roomsNAT->appendChild($actRoomsNAT);					

				buildNode($fet, $actRoomsNAT, 'Day', $tuple2['day_name']);
				buildNode($fet, $actRoomsNAT, 'Hour', $tuple2['hour_name']);
			}

			buildNode($fet, $roomsNAT, 'Active', 'true');
			buildNode($fet, $roomsNAT, 'Comments', $tuple['comments']);
		}
	}

	function getTeachersMaxHours(&$fet, $timeCons, $mysqli, $userTableID){
		$query = $sql = 'SELECT * FROM teachers_max_hours INNER JOIN teachers ON teachers_max_hours.teacher_id = teachers.teacher_id '.
		'WHERE teachers_max_hours.user_table_id = '.$userTableID;
		$queryResult = $mysqli->query($query);

		while($tuple = $queryResult->fetch_assoc()){
			$teachersMaxHours = $fet->createElement('ConstraintTeacherMaxHoursDaily');
			$teachersMaxHours = $timeCons->appendChild($teachersMaxHours);

			buildNode($fet, $teachersMaxHours, 'Weight_Percentage', $tuple['weight_percentage']);
			buildNode($fet, $teachersMaxHours, 'Teacher_Name', $tuple['teach_name']);
			buildNode($fet, $teachersMaxHours, 'Maximum_Hours_Daily', $tuple['max_hours']);
		
			buildNode($fet, $teachersMaxHours, 'Active', 'true');
			buildNode($fet, $teachersMaxHours, 'Comments', $tuple['comments']);
		}
	}

	function getActivitiesPreferredStartingTime(&$fet, $timeCons, $mysqli, $userTableID){
		$query = "SELECT * FROM time_constraints WHERE time_constraints.user_table_id = ".$userTableID;
		$queryResult = $mysqli->query($query);

		while($tuple = $queryResult->fetch_assoc()){
			if($tuple['num_of_pref_times'] == 1){
				$actPrefTimes = $fet->createElement('ConstraintActivityPreferredStartingTime');
				$actPrefTimes = $timeCons->appendChild($actPrefTimes);
		
			} else {
				$actPrefTimes = $fet->createElement('ConstraintActivityPreferredStartingTimes');
				$actPrefTimes = $timeCons->appendChild($actPrefTimes);					
			}
			buildNode($fet, $actPrefTimes, 'Weight_Percentage', $tuple['weight_percentage']);
			buildNode($fet, $actPrefTimes, 'Activity_Id', $tuple['activity_id']);
			getPrefTimes($fet, $actPrefTimes, $mysqli, $tuple['time_cons_id']);
	
			buildNode($fet, $actPrefTimes, 'Active', 'true');
			buildNode($fet, $actPrefTimes, 'Comments', $tuple['comments']);
		}
	}
	
#-------------------------------------------------------------------------------------------------
#Main Program
#all queries are according to user_table_id, which is passed through session cookies
	if(isset($_SESSION['user']['user_table_id'])){
		$userTableID = $_SESSION['user']['user_table_id'];
		$userName = $_SESSION['user']['username'];
		$semester = $_SESSION['user']['semester'];
	
		$query = "SELECT semester FROM user_tables WHERE user_table_id = ".$userTableID;
		$queryResult = $mysqli->query($query);

		$table = $queryResult->fetch_assoc();
		$tableName = $table['semester'];
		
		$fet = new DOMDocument('1.0', "UTF-8");
		$fet->formatOutput = true;
		
		$root = $fet->createElement('fet');
		$rootAttr = $fet->createAttribute('version');
		$rootAttr->value = '5.49.0';
		$root->appendChild($rootAttr);
		$fet->appendChild($root);
		
		getInstituition($fet, $root, $mysqli, $userTableID);
		getComments($fet, $root, $mysqli, $userTableID);
		getDays($fet, $root, $mysqli, $userTableID);
		getHours($fet, $root, $mysqli, $userTableID);
		getSubjects($fet, $root, $mysqli, $userTableID);
		getTeachers($fet, $root, $mysqli, $userTableID);
		getStudents($fet, $root, $mysqli, $userTableID);
				
		getActivities($fet, $root, $mysqli, $userTableID);
		getBuildings($fet, $root, $mysqli, $userTableID);
		getRooms($fet, $root, $mysqli, $userTableID);
		getTimeConstraints($fet, $root, $mysqli, $userTableID);
		getSpaceConstraints($fet, $root, $mysqli, $userTableID);

		#closes the link to the database
		$mysqli->close();
		
		$dir = "/opt/lampp/htdocs/fet/uploads/".$userName."/".$semester."/";
		$dir .= $semester.".fet";
		$fet->save($dir);
	}
?>
