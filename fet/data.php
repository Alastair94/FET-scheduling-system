<?php
	include 'PHP/validUser.php';
	$semester = $_SESSION['user']['semester'];
?>
<!DOCTYPE html>
<html ng-app="myApp">
<head>
	<title>Time Table Data</title>
	<link rel="stylesheet" type="text/css" href="Style/formStyle.css">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
    <script src="http://code.angularjs.org/1.1.5/angular-resource.js"></script>
	<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
    <script src="JS/bootstrap.min.js"></script>
    <script src="JS/myApp.js"></script>
</head>

<body>
	<div id="wrapper">
		<header>
			<h1 class="mainheader">FET Time Tables</h1><!--end mainheader-->
		</header>
		<div id="mainForm">
			<fieldset style="display:flex">
				<legend><?php echo ucfirst($semester);?></legend>
				<?php include 'html/nav.html'?>
				
				
				<article id="box">
					<ul id="datatab" class="tabs" style="width:100%;">
					   <li><a href="#tab1" data-toggle="tab">Days and Hours</a></li>
					   <li><a href="#tab2" data-toggle="tab">Teachers</a></li>
					   <li><a href="#tab3" data-toggle="tab">Subjects</a></li>
					   <li><a href="#tab4" data-toggle="tab">Students</a></li>
					   <li><a href="#tab5" data-toggle="tab">Space</a></li>
					   <li><a href="#tab6" data-toggle="tab">Activities</a></li>
					</ul>
					<div class="tab_container" ng-controller="AppController">
							<!-- ================= TAB 1 ========================= -->
							<div id="tab1" class="tab_content" ng-controller="DaysCtrl">
								<div style="width: 50%; float: left">	
									<form name="myForm">
										Day name:<br> <input name="input" ng-model="dayName" required><br>
										<button ng-click="addDay()">Add</button><br>
									</form>

									<ul class="unstyled">
										<li ng-repeat="day in days">
											{{day.day_name}}
											<a href ng-click="editThisDay(day.day_id)">edit</a>
										</li>
									</ul>
								</div>
								<div style="width: 50%; float: left">	
									<form name="myForm1">
										Hour name:<br> <input name="input" ng-model="hourName" required><br>
										<button ng-click="addHour()">Add</button><br>
									</form>

									<ul class="unstyled">
										<li ng-repeat="hour in hours">
											{{hour.hour_name}}
											<a href ng-click="editThisHour(hour.hour_id)">edit</a>
										</li>
									</ul>
								</div>
								
								<div style="clear: both" ng-include="template.url"></div>
							</div>
							
							<!-- ================= TAB 2 ========================= -->
							<div id="tab2" class="tab_content" ng-controller="TeachersCtrl">
								<form name="myForm">
									Teacher name:<br> <input name="input" ng-model="teacherName" required>
									<button ng-click="addItem()" >Add</button><br>
								</form>
								<ul class="unstyled">
									<li ng-repeat="teacher in teachers">
										{{teacher.name}}
										<a href ng-click="editTeacher(teacher.id)">edit</a>
									</li>
								</ul>
								<div ng-include src="template.url"></div>
							</div>
							<!-- =================== TAB 3 ======================= -->
							<div id="tab3" class="tab_content" ng-controller="SubjectsCtrl">
								<form name="myForm">
									Subject name:<br> <input name="input" ng-model="subjectName" required>
									<button ng-click="addItem()" >Add</button><br>
								</form>
								<ul class="unstyled">
									<li ng-repeat="subject in subjects">
										{{subject.name}}
										<a href ng-click="editThis(subject.id)">edit</a>
									</li>
								</ul>
								<div ng-include src="template.url"></div>
							</div>
							<!-- =================== TAB 4 ======================= -->
							<div id="tab4" class="tab_content" ng-controller="StudentsCtrl">
								<div>
									<div style="float:left" >
										<p>
											Years
										</p>
										<select size="10" 
											ng-model="act_student1" 
											ng-options="s.year_name for s in students" style="min-width: 150px"
											ng-click="getGroups(act_student1.id)" 
											ng-disabled="isAddableMulti() || isModifiableMulti()">
										</select>
									</div>
									<div style="float:left">
										<p>
										Groups
										</p>
										<select size="10" 
											ng-model="act_group" 
											ng-options="g.group_name for g in groups" style="min-width: 150px"
											ng-click="getSubgroups(act_group.id)" 
											ng-disabled="isAddableMulti() || isModifiableMulti()">
										</select>
									</div>
									<div style="float:left">
										<p>
										Subgroups
										</p>
										<select size="10" 
											ng-model="act_subgroup"
											ng-click="getSubgroupInfo()"
											ng-options="s.subgroup_name for s in subgroups" style="min-width: 150px"
											ng-disabled="isAddableMulti() || isModifiableMulti()">
										</select>
									</div>
								</div>
								<div style="clear:both">
									<div >
										<div style="display:grid">
										Year:				<br> <input ng-disabled="isAddable(button_Year) && isModifiable(modify_Year)" name="input" ng-model="outYear"><br><br>
										Students of year:	<br> <input ng-disabled="isAddable(button_Year) && isModifiable(modify_Year)" name="input" ng-model="outYearNumber" type="number"><br>
										</div><br>
										<div style="text-align:center">
											<button ng-click="addYear()" ng-show="isAddable(button_Group) && isAddable(button_SubGroup) && !isModifiableMulti()">{{button_Year}}</button>
											<button ng-disabled="activeYear()" ng-show="isModifiable(modify_Group) && isModifiable(modify_SubGroup) && !isAddableMulti()" ng-click="modifyYear()">{{modify_Year}}</button>
											<button ng-disabled="activeYear()" ng-show="!isAddableMulti() && !isModifiableMulti()" ng-click="destroyYear(act_student1.id)">Delete</button>
											<button ng_show="!isAddable(button_Year) || !isModifiable(modify_Year)" ng-click="cancel()">Cancel</button>
										</div>
									</div><br>
									<div >
										<div style="display:grid"> 
											Group:				<br> <input ng-disabled="isAddable(button_Group) && isModifiable(modify_Group)" name="input" ng-model="outGroup"><br>
											Students of group:	<br> <input ng-disabled="isAddable(button_Group) && isModifiable(modify_Group)" name="input" ng-model="outGroupNumber" type="number"><br>
										</div><br>
										<div style="text-align:center">
											<button ng-disabled="activeYear()" ng-click="addGroup()" ng-show="isAddable(button_Year) && isAddable(button_SubGroup) && !isModifiableMulti()">{{button_Group}}</button>
											<button ng-disabled="activeGroup()" ng-show="isModifiable(modify_Year) && isModifiable(modify_SubGroup) &&!isAddableMulti()" ng-click="modifyGroup()">{{modify_Group}}</button>
											<button ng-disabled="activeGroup()" ng-show="!isAddableMulti() && !isModifiableMulti()" ng-click="destroyGroup(act_group.id)">Delete</button>
											<button ng_show="!isAddable(button_Group) || !isModifiable(modify_Group)" ng-click="cancel()">Cancel</button>
										</div>
									</div><br>
									<div >
										<div style="display:grid">
											Subgroup:				<br> <input ng-disabled="isAddable(button_SubGroup) && isModifiable(modify_SubGroup)" name="input" ng-model="outSubGroup"><br>
											Students of subgroup:	<br> <input ng-disabled="isAddable(button_SubGroup) && isModifiable(modify_SubGroup)" name="input" ng-model="outSubGroupNumber" type="number"><br>
										</div><br>
										<div style="text-align:center">
											<button ng-disabled="activeGroup()" ng-click="addSubGroup()" ng-show="isAddable(button_Year) && isAddable(button_Group) && !isModifiableMulti()">{{button_SubGroup}}</button>
											<button ng-disabled="activeSubGroup()" ng-show="isModifiable(modify_Year) && isModifiable(modify_Group) &&!isAddableMulti()" ng-click="modifySubGroup()">{{modify_SubGroup}}</button>
											<button ng-disabled="activeSubGroup()" ng-show="!isAddableMulti() && !isModifiableMulti()" ng-click="destroySubGroup(act_subgroup.id)">Delete</button>
											<button ng_show="!isAddable(button_SubGroup) || !isModifiable(modify_SubGroup)" ng-click="cancel()">Cancel</button>
										</div>
									</div>
								</div>
								<br><br>							
								<div style="clear:both" ng-include src="template.url"></div>
							</div>
							<!-- =================== TAB 5 ======================= -->
							<div id="tab5" class="tab_content" ng-controller="SpaceCtrl">
								<div style="width: 300px; float: left">
									<p>Add buildings</p>
									Building:<br> 
									<input name="input" ng-model="buildingInput" required><br>
									<input name="input" type="hidden" ng-model="buildingID"><br>
									<button ng-click="addItem()">Add</button> 
									<button ng-click="editItem()" ng-disabled="showB()">Edit</button>
									<button ng-click="deleteItem()" ng-disabled="showB()">Delete</button><br>

									<select ng-model="building" 
										ng-options="c.name for c in buildings" size="10" style="min-width: 150px;" 
										ng-change="update()">
									</select>
								</div>

								<div style="width: 300px; float: left">
									<p>Add rooms</p> 
									Select building: <br>
									<select ng-model="building" 
										ng-options="c.name for c in buildings" 
										ng-change="update()">
									</select><br/>

									Room name: <br><input name="input" ng-model="roomName" required><br>
									Capacity: <br><input name="input" ng-model="roomCapacity" required><br>
									<input name="input" type="hidden" ng-model="roomID"><br>
									<button ng-click="addRoom()">Add</button> 
									<button ng-click="editRoom()" ng-disabled="show()">Edit</button>
									<button ng-click="deleteRoom(room.id)" ng-disabled="show()">Delete</button><br>

									<select 
										ng-model="room" 
										ng-options="(r.name + ' - ' + r.capacity) for r in rooms" size="10" 
										style="min-width: 150px;">
									</select>
								</div>
							</div>
							<!-- =================== TAB 6 ======================= -->
							<div id="tab6" class="tab_content" ng-controller="ActivitiesCtrl">
								<h2>Add new activity</h2>
								<div>
									<div style="width:100%;display:flex">
										<div style="display:flex">
											<div>
												Teachers
												<select size="10" 
													ng-model="act_teacher" 
													ng-options="t.name for t in teachers"
													ng-dblclick="updateT()">
												</select>
											</div>
											<div style="margin-left:10px">
												Selected teachers
												<select size="10" 
													ng-model="chosenT"
													ng-options="ct.name for ct in chosenTeachers" 
													ng-dblclick="removeT()"
													style="background-color:khaki;min-width:185px;">
												</select>
											</div>
										</div>
										<div style="margin-left:50px">
											Years
											<select size="10"
												ng-model="act_student" 
												ng-options="st.year_name for st in students" 
												ng-dblclick="updateS()"
												ng-click="getGroups(act_student.id)" 
												>
											</select>
										</div>
										<div>
											Groups
											<select size="10" 
												ng-model="act_group" 
												ng-options="g.group_name for g in groups" style="min-width: 150px"
												ng-dblclick="selectGroup()"
												ng-click="getSubgroups(act_group.id)" 
												>
											</select>
										</div>
										<div>
											Subgroups
											<select size="10" 
												ng-model="act_subgroup"
												ng-dblclick="selectSubGroup()"
												ng-options="s.subgroup_name for s in subgroups" style="min-width: 150px"
												>
											</select>
										</div>
										<div style="margin-left:10px">
											Selected students
											<select size="10" 
												ng-model="chosenS" 
												ng-options="st.year_name +' -> '+ st.group_name +' -> '+ st.subgroup_name for st in chosenStudents" 
												ng-dblclick="removeS()"
												style="background-color:khaki;min-width:185px;">
											</select>
										</div>
									</div>
									<div style="width: 100%; font-size: 15px; display:flex; margin-top:20px; height:30px;">
										<p>Duration:</p>
										<input size="10"
											ng-model="duration"
											type="number"
											min="1"
											style="width:40px">
										<br>
										<input
											type="radio"
											id="active"
											name="isActive"
											value="0"
											ng-model="active"
											>
										<label style="width: 100px" for="active">Active</label>
										<br>
										<input
											type="radio"
											id="notActive"
											name="isActive"
											value="1"
											ng-model="active"
											>
										<label style="width: 100px" for="notActive">Not active</label>

										<br><br>
										<select 
											ng-model="subject" 
											ng-options="sb.name for sb in subjects" >
											<option value="" selected disabled hidden>Subjects</option>
										</select>
										<p>
										Student number:
										</p>
										<input
											type="number"
											ng-model="student_number"
											size="10"
										>
									</div>
									<br>
									<div style="clear: both">
										<button ng-click="saveAct()" ng-disabled="isOK()">{{button_value}}</button>
									</div>
									<div>
										<div style="text-align:center;margin-bottom:30px;">
											<h3>Activities</h3>
											<div style="margin-top:30px;display:flex">
												<div style="margin-left:auto;margin-right:auto">
													<select 
														ng-model="activity" 
														ng-options="'ID: ' + act.id for act in activities"
														style="width:125px">
														<option value="" selected disabled hidden>Choose here</option>
													</select>
												</div>
												<div style="margin-left:auto;margin-right:auto">
													<button ng-click="deleteAct(activity.id)" ng-disabled="!activity" style="float:inline-end">Delete Activity</button>
												</div>
											</div>
										</div>
										<table style="width:100%; text-align: center; table-layout: fixed">
											<tr>
												<th>ID:</th>
												<th>Duration:</th>
												<th>Active:</th>
												<th>Teacher:</th>
												<th>Subject:</th>
												<th>Headcount:</th>
											</tr>
											<tr style="height: 30px">
												<td>{{activity.id}} </td>
												<td>{{activity.duration}}</td>
												<td>{{activity.active==0 && 'True' || activity.active==1 && 'False' || ''}}</td>
												<td>{{activity.teach_name}}</td>
												<td>{{activity.subj_name}}</td>
												<td>{{activity.number_of_students}}</td>
											</tr>
											<tr>
												<td colspan="6">Students:</td>
											</tr>
											<tr>
												<th colspan="2">Years:</th>
												<th colspan="2">Groups:</th>
												<th colspan="2">Subgroups:</th>
											</tr>
										</table>
										<div style="width:100%; display:flex; text-align: center;">
											<div style="width:33%; border: 1px solid black; height:150px; overflow-y:scroll; overflow-x:hidden;">
												<p ng-repeat="act in activity.year_array">{{act.year_name}}</p>
											</div>
											<div style="width:33%; border: 1px solid black; height:150px; overflow-y:scroll; overflow-x:hidden;">
												<p ng-repeat="act in activity.group_array">{{act.group_name}}</p>
											</div>
											<div style="width:33%; border: 1px solid black; height:150px; overflow-y:scroll; overflow-x:hidden;">
												<p ng-repeat="act in activity.subgroup_array">{{act.subgroup_name}}</p>
											</div>
										</div>
									</div>
									<span ng-show="checked">
									<button ng-click="cancel()" ng-disabled="isOK()">Cancel</button>
									<button ng-click="deleteAct()" ng-disabled="isOK()">Delete</button>
									</span>

									<div ng-include src="template.url"></div>
								<div>
							</div>
							<!-- ================== END ======================== -->

						</div><!--END tab-->
					<br>				
				</article>
			</fieldset>
		</div>
	</div>
</body>
</html>
