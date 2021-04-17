<?php
function queryAll($mysqli)
{
    if (isset($_SESSION['user']['username'], $_SESSION['user']['user_table_id'])) {
        $user_id      = $_SESSION['user']['username'];
        $user_table_id = $_SESSION['user']['user_table_id'];
        $return_arr    = array();
        if ($_GET['query'] == 'teachers') {
            $sql =
            'SELECT teacher_id, teach_name ' .
            'FROM teachers, user_tables ' .
            'WHERE user_tables.user_table_id = teachers.user_table_id ' .
            'AND user_tables.user_table_id = ' . $user_table_id;

            if ($result = $mysqli->query($sql)) {

                /* fetch associative array */
                //var_dump($result);die();
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']   = $row['teacher_id'];
                    $row_array['name'] = $row['teach_name'];
                    array_push($return_arr, $row_array);
                }
                /* free result set */
                $result->free();
            }
        } else if ($_GET['query'] == 'subjects') {
            $sql =
            'SELECT subj_id, subj_name ' .
            'FROM subjects, user_tables ' .
            'WHERE user_tables.user_table_id = subjects.user_table_id ' .
            'AND user_tables.user_table_id = ' . $user_table_id;

            if ($result = $mysqli->query($sql)) {

                /* fetch associative array */
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']   = $row['subj_id'];
                    $row_array['name'] = $row['subj_name'];
                    array_push($return_arr, $row_array);
                }
                /* free result set */
                $result->free();
            }
        } else if ($_GET['query'] == 'students') {
            $sql = 'SELECT student_id, year_name, num_students ' .
            'FROM students, user_tables ' .
            'WHERE user_tables.user_table_id = students.user_table_id ' .
            'AND user_tables.user_table_id = ' . $user_table_id;

            if ($result = $mysqli->query($sql)) {

                /* fetch associative array */
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']           = $row['student_id'];
                    $row_array['num_students'] = $row['num_students'];
                    $row_array['year_name']    = $row['year_name'];
                    array_push($return_arr, $row_array);
                }
                /* free result set */
                $result->free();
            }
        } else if ($_GET['query'] == 'rooms') {
            $sql = 'SELECT room_id, room_name,capacity, building_id ' .
            'FROM rooms, user_tables ' .
            'WHERE rooms.user_table_id = user_tables.user_table_id ' .
            'AND user_tables.user_table_id = ' . $user_table_id;

            if ($result = $mysqli->query($sql)) {
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']          = $row['room_id'];
                    $row_array['name']        = $row['room_name'];
                    $row_array['building_id'] = $row['building_id'];
                    $row_array['capacity']    = $row['capacity'];
                    array_push($return_arr, $row_array);
                }
                /* free result set */
                $result->free();
            }
        } else if ($_GET['query'] == 'buildings') {
            $sql = 'SELECT building_id, build_name ' .
            'FROM buildings, user_tables ' .
            'WHERE buildings.user_table_id = user_tables.user_table_id ' .
            'AND user_tables.user_table_id = ' . $user_table_id;

            if ($result = $mysqli->query($sql)) {
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']   = $row['building_id'];
                    $row_array['name'] = $row['build_name'];
                    array_push($return_arr, $row_array);
                }
                /* free result set */
                $result->free();
            }
        } else if ($_GET['query'] == 'asd') {
			$sql = 'SELECT activities_id, teach_name, activities.teacher_id,activities.student_id, subj_name, year_name, user_tables.user_table_id, activities.number_of_students, duration '.
			'FROM teachers, subjects, students, activities, user_tables '.
			'WHERE activities.teacher_id = teachers.teacher_id '.
			'AND activities.subj_id = subjects.subj_id '.
			'AND activities.student_id = students.student_id '.
			'AND activities.user_table_id = user_tables.user_table_id '.
			'AND user_tables.user_table_id = '. $user_table_id;
			if ($result = $mysqli->query($sql)) {
                while ($row = $result->fetch_assoc()) {
					$row_array['id']   = $row['activities_id'];
                    $row_array['teach_name']   = $row['teach_name'];
					$row_array['teacher_id']   = $row['teacher_id'];
					$row_array['student_id']   = $row['student_id'];
                    $row_array['subj_name'] = $row['subj_name'];
					$row_array['year_name'] = $row['year_name'];
                    $row_array['number_of_students'] = $row['number_of_students'];
                    $row_array['duration'] = $row['duration'];
                    array_push($return_arr, $row_array);
                }
                /* free result set */
                $result->free();
            }
			
			
		} else if ($_GET['query'] == 'activities') {
			$sql = 'SELECT * '.
			'FROM activities, subjects, teachers '.
			'WHERE activities.teacher_id = teachers.teacher_id '.
            'AND activities.subj_id = subjects.subj_id '.
            'AND activities.user_table_id = '. $user_table_id;

			if ($result = $mysqli->query($sql)) {
                while ($row = $result->fetch_assoc()) {
					$row_array['id']   = $row['activities_id'];
                    $row_array['teach_name']   = $row['teach_name'];
					$row_array['teacher_id']   = $row['teacher_id'];
                    $row_array['subj_name']   = $row['subj_name'];
                    $row_array['number_of_students'] = $row['number_of_students'];
                    $row_array['duration'] = $row['duration'];
                    array_push($return_arr, $row_array);
                }
                $result->free();
            }


		}else if ($_GET['query'] == 'days') {
            $sql = 'SELECT days_id, day_name ' .
            'FROM days, user_tables ' .
            'WHERE user_tables.user_table_id = days.user_table_id ' .
            'AND user_tables.user_table_id = ' . $user_table_id;

            if ($result = $mysqli->query($sql)) {

                /* fetch associative array */
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']           = $row['days_id'];
                    //$row_array['group_id'] = $row['group_id'];
                    $row_array['day_name']    = $row['day_name'];
                    array_push($return_arr, $row_array);
                }
                /* free result set */
                $result->free();
            }
        } else if ($_GET['query'] == 'hours') {
            $sql = 'SELECT hours_id, hour_name ' .
            'FROM hours, user_tables ' .
            'WHERE user_tables.user_table_id = hours.user_table_id ' .
            'AND user_tables.user_table_id = ' . $user_table_id;

            if ($result = $mysqli->query($sql)) {

                /* fetch associative array */
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']           = $row['hours_id'];
                    //$row_array['group_id'] = $row['group_id'];
                    $row_array['hour_name']    = $row['hour_name'];
                    array_push($return_arr, $row_array);
                }
                /* free result set */
                $result->free();
            }
        } else if($_GET['query'] == 'subjectSpaceConstraints'){
            $sql = 'SELECT space_cons_id, weight_percentage, num_of_pref_rooms, activity_id, subject_id, subj_name '.
            'FROM space_constraints, user_tables, subjects ' .
            'WHERE user_tables.user_table_id = space_constraints.user_table_id ' .
            'AND user_tables.user_table_id = ' . $user_table_id . ' AND space_constraints.subject_id = subjects.subj_id OR activity_id IS NOT NULL';

            if ($result = $mysqli->query($sql)) {

                /* fetch associative array */
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']   = $row['space_cons_id'];
                    $row_array['name'] = $row['subj_name'];
                    $row_array['subject_id'] = $row['subject_id'];
                    $row_array['activity_id']   = $row['activity_id'];
                    $row_array['weight_percentage']   = $row['weight_percentage'];
					$row_array['num_of_pref_rooms']   = $row['num_of_pref_rooms'];
                    array_push($return_arr, $row_array);
                }
                /* free result set */
                $result->free();
            }
        } else if($_GET['query'] == 'groups'){
            $sql = 'SELECT group_id, group_name, num_of_students, student_id '.
            'FROM groups, user_tables '.
            'WHERE user_tables.user_table_id = groups.user_table_id AND user_tables.user_table_id = '.$user_table_id;

            if ($result = $mysqli->query($sql)) {
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']   = $row['group_id'];
                    $row_array['group_name'] = $row['group_name'];
                    $row_array['num_of_students'] = $row['num_of_students'];
                    $row_array['student_id']   = $row['student_id'];
                    array_push($return_arr, $row_array);
                }
                $result->free();
            }
        }else if($_GET['query'] == 'subgroups'){
            $sql = 'SELECT subgroup_id, subgroup_name, num_of_students, group_id, student_id '.
            'FROM subgroups, user_tables '.
            'WHERE user_tables.user_table_id = subgroups.user_table_id AND user_tables.user_table_id = '.$user_table_id;

            if ($result = $mysqli->query($sql)) {
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']   = $row['subgroup_id'];
                    $row_array['subgroup_name'] = $row['subgroup_name'];
                    $row_array['num_of_students'] = $row['num_of_students'];
                    $row_array['group_id']   = $row['group_id'];
                    $row_array['student_id']   = $row['student_id'];
                    array_push($return_arr, $row_array);
                }
                $result->free();
            }
        }


        return json_encode($return_arr);
    }
}

function updateRow($mysqli, $id) {

    if ($_GET['query'] == 'teachers') {
        $name = $_GET['name'];
        $stmt = $mysqli->prepare("UPDATE teachers SET teach_name = ? WHERE teacher_id = ?");
        $stmt->bind_param("ss", $name, $id);
        $stmt->execute();
    } else if ($_GET['query'] == 'subjects') {
        $name = $_GET['name'];
        $stmt = $mysqli->prepare("UPDATE subjects SET subj_name = ? WHERE subj_id = ?");
        $stmt->bind_param("ss", $name, $id);
        $stmt->execute();
    } else if ($_GET['query'] == 'students') {

        $year_name    = $_GET['year_name'];
        $num_students = $_GET['num_students'];
        //$group_id = $_GET['group_id'];

        $stmt = $mysqli->prepare("UPDATE students SET year_name = ?, num_students = ? WHERE student_id = ?");
        $stmt->bind_param("sss", $year_name, $num_students, $id);
        $stmt->execute();
    } else if ($_GET['query'] == 'buildings') {
        $name = $_GET['name'];

        $stmt = $mysqli->prepare("UPDATE buildings SET build_name = ? WHERE building_id = ?");
        $stmt->bind_param("ss", $name, $id);
        $stmt->execute();
    } else if ($_GET['query'] == 'rooms') {
        $room_name = $_GET['name'];
        $capacity  = $_GET['capacity'];

        $stmt = $mysqli->prepare("UPDATE rooms SET room_name = ?, capacity = ? WHERE room_id = ?");
        $stmt->bind_param("sss", $room_name, $capacity, $id);
        $stmt->execute();
    } else if ($_GET['query'] == 'activities') {

		$data = json_decode($_GET['data']);
		$teacher_id = $data[0][0]->id;
		$student_id = $data[1][0]->id;
		$subj_id = $data[2]->id;
		$id = $_GET['id'];

        $stmt = $mysqli->prepare("UPDATE  activities SET  teacher_id =  ?,subj_id =  ?,student_id =  ? WHERE  activities.activities_id = ?");
        $stmt->bind_param("ssss", $teacher_id, $subj_id, $student_id, $id);
        $stmt->execute();
    } else if ($_GET['query'] == 'days') {

        $day_name    = $_GET['day_name'];

        $stmt = $mysqli->prepare("UPDATE days SET day_name = ? WHERE days_id = ?");
        $stmt->bind_param("ss", $day_name, $id);
        $stmt->execute();
    } else if ($_GET['query'] == 'hours') {

        $hour_name    = $_GET['hour_name'];

        $stmt = $mysqli->prepare("UPDATE hours SET hour_name = ? WHERE hours_id = ?");
        $stmt->bind_param("ss", $hour_name, $id);
        $stmt->execute();
    } else if ($_GET['query'] == 'groups') {

        $group_name    = $_GET['group_name'];
        $num_of_students = $_GET['num_of_students'];

        $stmt = $mysqli->prepare("UPDATE groups SET group_name = ?, num_of_students = ? WHERE group_id = ?");
        $stmt->bind_param("sss", $group_name, $num_of_students, $id);
        $stmt->execute();
    } else if ($_GET['query'] == 'subgroups') {

        $subgroup_name    = $_GET['subgroup_name'];
        $num_of_students = $_GET['num_of_students'];

        $stmt = $mysqli->prepare("UPDATE subgroups SET subgroup_name = ?, num_of_students = ? WHERE subgroup_id = ?");
        $stmt->bind_param("sss", $subgroup_name, $num_of_students, $id);
        $stmt->execute();
    }

    $nrows = $stmt->affected_rows;

    if (!$nrows) {
        return '{"error":[{"message":"Not updated"}]}';
    }
    return $nrows;

}

function createNew($mysqli)
{
    $user_table_id = $_SESSION['user']['user_table_id'];
    $user_id       = $_SESSION['user']['username'];
    if ($_GET['query'] == 'teachers') {
        $name          = $_GET['name'];
        $stmt = $mysqli->prepare('INSERT INTO teachers VALUES (NULL, ?, ?)');
        $stmt->bind_param("ss", $name, $user_table_id);
        $stmt->execute();

    } else if ($_GET['query'] == 'subjects') {
        $name          = $_GET['name'];
        $stmt = $mysqli->prepare('INSERT INTO subjects VALUES (NULL, ?, ?)');
        $stmt->bind_param("ss", $name, $user_table_id);
        $stmt->execute();

    } else if ($_GET['query'] == 'students') {
        $year_name    = $_GET['year_name'];
        $num_students = $_GET['num_students'];
        //$group_id = $_GET['group_id'];

        $stmt = $mysqli->prepare('INSERT INTO students (user_table_id, year_name, num_students) VALUES(?, ?, ?)');
        $stmt->bind_param("sss", $user_table_id, $year_name, $num_students);
        $stmt->execute();
    } else if ($_GET['query'] == 'buildings') {
        $building_name = $_GET['name'];
        $stmt          = $mysqli->prepare('INSERT INTO buildings (build_name, user_table_id) VALUES (?, ?)');
        $stmt->bind_param("ss", $building_name, $user_table_id);
        $stmt->execute();
    } else if ($_GET['query'] == 'rooms') {
        $room_name = $_GET['name'];
        $capacity  = $_GET['capacity'];
        $build_id  = $_GET['build_id'];
        $stmt      = $mysqli->prepare('INSERT INTO rooms (room_name, capacity, building_id,user_table_id) VALUES (?,?,?,?)');
        $stmt->bind_param("ssss", $room_name, $capacity, $build_id, $user_table_id);
        $stmt->execute();
    } else if ($_GET['query'] == 'activities') {
		$data = json_decode($_GET['data']);
		$teacher_id = $data[0][0]->id;
		$chosenStudents = $data[1];
		$subj_id = $data[2]->id;
        $duration = $data[3];
        $active = $data[4];
        $number_of_students = $data[5];

		// $stmt = $mysqli->prepare('INSERT INTO `activities` (`activities_id`, `duration`, `total_duration`, `active`, `teacher_id`, `subj_id`, `student_id`, `user_table_id`, `activity_group_id`) VALUES (NULL, 21, 12, "true", ?, ?, ?, ?, NULL);');
        $stmt = $mysqli->prepare('INSERT INTO activities (duration, total_duration, active, teacher_id, subj_id, user_table_id, activity_group_id, number_of_students) VALUES (?, NULL, ?, ?, ?, ?, NULL,?);');
        $stmt->bind_param("iiiiii",$duration, $active, $teacher_id, $subj_id, $user_table_id,$number_of_students);
        $stmt->execute();

        $activity_id = $mysqli->insert_id;

        for($i = 0; $i < count($chosenStudents); $i++){
            if($chosenStudents[$i]->subgroup_name){
                $stmt = $mysqli->prepare('INSERT INTO activity_subgroups (activity_id, subgroup_id, subgroup_name) VALUES (?, ?, ?);');
                $stmt->bind_param("iis", $activity_id, $chosenStudents[$i]->id, $chosenStudents[$i]->subgroup_name);
                $stmt->execute();
            }
            else if($chosenStudents[$i]->group_name){
                $stmt = $mysqli->prepare('INSERT INTO activity_groups (activity_id, group_id, group_name) VALUES (?, ?, ?);');
                $stmt->bind_param("iis", $activity_id, $chosenStudents[$i]->id, $chosenStudents[$i]->group_name);
                $stmt->execute();
            }
            else if($chosenStudents[$i]->year_name){
                $stmt = $mysqli->prepare('INSERT INTO activity_years (activity_id, year_id, year_name) VALUES (?, ?, ?);');
                $stmt->bind_param("iis", $activity_id, $chosenStudents[$i]->id, $chosenStudents[$i]->year_name);
                $stmt->execute();
            }
        }
    } else if ($_GET['query'] == 'days'){
        $day_name   = $_GET['day_name'];

        $stmt = $mysqli->prepare('INSERT INTO days (user_table_id, day_name) VALUES(?, ?)');
        $stmt->bind_param("is", $user_table_id, $day_name);
        $stmt->execute();
    } else if ($_GET['query'] == 'hours'){
        $hour_name   = $_GET['hour_name'];

        $stmt = $mysqli->prepare('INSERT INTO hours (user_table_id, hour_name) VALUES(?, ?)');
        $stmt->bind_param("is", $user_table_id, $hour_name);
        $stmt->execute();
    } else if ($_GET['query'] == 'subjectSpaceConstraints'){
        $data = json_decode($_GET['data']);
        $weight_percentage = $data[2];
        $subject_id = $data[1]->id;
        $numb_of_pref_rooms = count($data[0]);

        $stmt = $mysqli->prepare('INSERT INTO space_constraints (weight_percentage, num_of_pref_rooms, active, comments, user_table_id, activity_id, subject_id, permanently_locked) VALUES (?, ?, NULL, NULL, ?, NULL, ?, NULL);');
        $stmt->bind_param("iiii", $weight_percentage, $numb_of_pref_rooms, $user_table_id, $subject_id);
        $stmt->execute();
    } else if ($_GET['query'] == 'preferredRooms'){
        $data = json_decode($_GET['data']);
        $space_cons_id = $data[0];

        foreach($data[1] as &$v){
            $stmt = $mysqli->prepare('INSERT INTO preferred_rooms (space_cons_id, room_id) VALUES (?, ?);');
            $stmt->bind_param("ii", $space_cons_id, $v->id);
            $stmt->execute();
        }
    } else if ($_GET['query'] == 'groups'){
        $year_id = $_GET['year_id'];
        $num_students  = $_GET['num_students'];
        $group_name  = $_GET['group_name'];

        $stmt = $mysqli->prepare('INSERT INTO groups (group_name, num_of_students, student_id, user_table_id) VALUES (?, ?, ?, ?);');
        $stmt->bind_param("siii", $group_name, $num_students, $year_id, $user_table_id);
        $stmt->execute();
    }else if ($_GET['query'] == 'subgroups'){
        $group_id = $_GET['group_id'];
        $num_of_students  = $_GET['num_of_students'];
        $subgroup_name  = $_GET['subgroup_name'];
        $student_id = $_GET['student_id'];

        $stmt = $mysqli->prepare('INSERT INTO subgroups (subgroup_name, num_of_students, group_id, user_table_id, student_id) VALUES (?, ?, ?, ?, ?);');
        $stmt->bind_param("siiii", $subgroup_name, $num_of_students, $group_id, $user_table_id, $student_id);
        $stmt->execute();
    }

    $nrows = $mysqli->insert_id;
    if (!$nrows) {
        return '{"error":[{"message":"Not inserted"}]}';
    }
    return $nrows;
}

function destroyRow($mysqli, $id)
{

    if ($_GET['query'] == 'teachers') {
        $mysqli->query("DELETE FROM teachers WHERE teacher_id = $id");
    } else if ($_GET['query'] == 'subjects') {
        $mysqli->query("DELETE FROM subjects WHERE subj_id = $id");
    } else if ($_GET['query'] == 'students') {
        $mysqli->query("DELETE FROM students    WHERE   student_id = $id");
        $mysqli->query("DELETE FROM groups      WHERE   student_id = $id");
        $mysqli->query("DELETE FROM subgroups   WHERE   student_id = $id");
    } else if ($_GET['query'] == 'rooms') {
        $mysqli->query("DELETE FROM rooms WHERE room_id = $id");
    } else if ($_GET['query'] == 'buildings') {
        $mysqli->query("DELETE FROM buildings WHERE building_id = $id");
    } else if ($_GET['query'] == 'activities') {
        $mysqli->query("DELETE FROM activities WHERE activities_id = $id");
    } else if ($_GET['query'] == 'days') {
        $mysqli->query("DELETE FROM days WHERE days_id = $id");
    } else if ($_GET['query'] == 'hours') {
        $mysqli->query("DELETE FROM hours WHERE hours_id = $id");
    } else if ($_GET['query'] == 'subjectSpaceConstraints') {
        $mysqli->query("DELETE FROM space_constraints WHERE space_cons_id = $id");
        $mysqli->query("DELETE FROM preferred_rooms WHERE space_cons_id = $id");
    } else if ($_GET['query'] == 'groups') {
        $mysqli->query("DELETE FROM groups       WHERE group_id = $id");
        $mysqli->query("DELETE FROM subgroups    WHERE group_id = $id");
    } else if ($_GET['query'] == 'subgroups') {
        $mysqli->query("DELETE FROM subgroups WHERE subgroup_id = $id");
    } 

    $i = $mysqli->affected_rows;
    if (!$i) {
        return '{"error":[{"message":"Not deleted"}]}';
    }
    return $i;
}

function querySingle($mysqli, $id){
    if (isset($_SESSION['user']['username'], $_SESSION['user']['user_table_id'])) {
        $user_id      = $_SESSION['user']['username'];
        $user_table_id = $_SESSION['user']['user_table_id'];
        $return_arr    = array();
        if($_GET['query'] == 'subjectSpaceConstraints') {
                $sql =
                'SELECT space_cons_id, subj_name FROM space_constraints, subjects '.
                'WHERE space_constraints.subject_id = '.$id.' AND space_constraints.subject_id = subjects.subj_id '.
                'AND subjects.subj_id = '.$id;
            if ($result = $mysqli->query($sql)) {
                /* fetch associative array */
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']   = $row['space_cons_id'];
                    $row_array['name'] = $row['subj_name'];
                    $row_array['subject_id'] = $row['subject_id'];
                    $row_array['activity_id']   = $row['activity_id'];
                    $row_array['weight_percentage']   = $row['weight_percentage'];
                    $row_array['num_of_pref_rooms']   = $row['num_of_pref_rooms'];
                    array_push($return_arr, $row_array);
                }
                /* free result set */
                $result->free();
            }
        } else if($_GET['query'] == 'subjects'){
            $sql =
            'SELECT subj_id, subj_name ' .
            'FROM subjects, user_tables ' .
            'WHERE user_tables.user_table_id = subjects.user_table_id AND subjects.subj_id = '.$id.' '.
            'AND user_tables.user_table_id = ' . $user_table_id;

            if ($result = $mysqli->query($sql)) {
                /* fetch associative array */
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']   = $row['subj_id'];
                    $row_array['name'] = $row['subj_name'];
                    array_push($return_arr, $row_array);
                }
                /* free result set */
                $result->free();
            }
        } else if($_GET['query'] == 'groups'){
            // $sql =
            // 'SELECT group_id, group_name, num_of_students, groups.student_id '.
            // 'FROM groups, students WHERE groups.student_id = '.$id.' AND user_table_id = '.$user_table_id.'AND students.student_id = '.$id;

            $sql =
            'SELECT group_id, group_name, num_of_students, groups.student_id, year_name FROM groups INNER JOIN students ON groups.student_id = students.student_id WHERE groups.student_id = '.$id;

            // $sql = 
            // 'SELECT * FROM groups WHERE student_id = '.$id;

            if ($result = $mysqli->query($sql)) {
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']   = $row['group_id'];
                    $row_array['group_name'] = $row['group_name'];
                    $row_array['num_of_students']   = $row['num_of_students'];
                    $row_array['student_id'] = $row['student_id'];
                    $row_array['year_name'] = $row['year_name'];
                    array_push($return_arr, $row_array);
                }
                $result->free();
            }
        } else if($_GET['query'] == 'subgroups'){
            $sql =
            'SELECT subgroup_id, subgroup_name, subgroups.num_of_students, subgroups.group_id, subgroups.student_id, group_name, year_name '.
            'FROM subgroups INNER JOIN groups ON subgroups.group_id = groups.group_id INNER JOIN students ON subgroups.student_id = students.student_id WHERE subgroups.group_id = '.$id;


                // $sql =
                // 'SELECT * FROM subgroups WHERE group_id = 15';

            if ($result = $mysqli->query($sql)) {
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']   = $row['subgroup_id'];
                    $row_array['subgroup_name'] = $row['subgroup_name'];
                    $row_array['num_of_students']   = $row['num_of_students'];
                    $row_array['group_id'] = $row['group_id'];
                    $row_array['student_id'] = $row['student_id'];
                    $row_array['group_name'] = $row['group_name'];
                    $row_array['year_name'] = $row['year_name'];
                    array_push($return_arr, $row_array);
                }
                $result->free();
            }
        } else if($_GET['query'] == 'stud_activity'){
            $sql =
            'SELECT stud_activity_id, activities_id, student_name '.
            'FROM students_in_activity WHERE activities_id = '.$id;

            if ($result = $mysqli->query($sql)) {
                while ($row = $result->fetch_assoc()) {
                    $row_array['id']   = $row['stud_activity_id'];
                    $row_array['activities_id'] = $row['activities_id'];
                    $row_array['student_name']   = $row['student_name'];
                    array_push($return_arr, $row_array);
                }
                $result->free();
            }
        }
        return json_encode($return_arr);
    }
}
