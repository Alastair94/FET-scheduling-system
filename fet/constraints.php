<?php
	include 'PHP/validUser.php';
	$semester = $_SESSION['user']['semester'];
?>
<!DOCTYPE html>
<html ng-app="myAppConstraints">
<head>
	<title>Time Table Constraints</title>
	<link rel="stylesheet" type="text/css" href="Style/formStyle.css">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
	 <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
    <script src="JS/bootstrap.min.js"></script>
    <script src="JS/myAppConstraints.js"></script>
</head>

<body>
	<div id="wrapper">
		<header>
			<h1 class="mainheader">FET Time Tables</h1><!--end mainheader-->
		</header>
		<div id="mainForm">
			<fieldset style="display:flex;">
				<legend><?php echo ucfirst($semester);?></legend>
				<?php include 'html/nav.html'?>
		
			<article id="box">
				<ul class="tabs">
					<li><a href="#tab1" data-toggle="tab">Subjects</a></li>
					<li><a href="#tab2" data-toggle="tab">Space&Time for activities</a></li>
					<li><a href="#tab3" data-toggle="tab">Not overlapping activities</a></li>
				</ul>
				<div class="tab_container" ng-controller="AppController">
				
					<div id="tab1" class="tab_content">
						<div ng-controller="SubjectsCtrl">
							<div>
								Subject:<br>
								<select 
									ng-model="subject" 
									ng-options="sb.name for sb in subjects" >
									<option value="" selected disabled hidden>Choose here</option>
								</select>
							</div>
							<div>
								Preferred Room:<br>
								<div style="width: 175px; float: left">
									<select size="10" 
										ng-model="act_room" 
										ng-options="r.name for r in rooms" style="min-width: 150px;" 
										ng-dblclick="updateR()" autofocus>
									</select>
								</div>

								<div style="width: 175px; float: left">	
									<select size="10" 
										ng-model="chosenR"
										ng-options="cr.name for cr in chosenRooms" style="min-width: 150px;" 
										ng-dblclick="removeR()">
									</select>
								</div>
							</div>
							<div>
								Weight Percentage<br>
								<input size="10"
									ng-model="weightP"
									type="number"
									min="0" max="100" 
									>
							</div>
								<button ng-click="saveAct()" >Add</button><br>
							<div style="clear:both" class="unstyled">
								<br>Subject constraints:<br>
								<ul class="unstyled">
									<li ng-repeat="sConstraint in spaceConstraints">
										<!-- Constraint ID: {{sConstraint.id}}<br> -->
										Subject: {{sConstraint.name}}<br>
										Weight percentage: {{sConstraint.weight_percentage}}<br>
										Number of preferred rooms: {{sConstraint.num_of_pref_rooms}}<br>
										<a href ng-click="destroy(sConstraint.id)">delete</a>
									</li>
								</ul>
							</div>
							<div ng-include src="template.url"></div>
							<div ng-view></div>
						</div>
					</div>

					<div id="tab2" class="tab_content" ng-controller="ActivitiesCtrl">
						<div>
							<div>
								Activities:<br>
								<select 
									ng-model="activity" 
									ng-options="'ID: ' + act.id for act in activities"
									ng-change="isTaken(activity)">
									<option value="" selected disabled hidden>Choose here</option>
								</select>
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
							<div style="display:flex;">
								<div style="display:flex">
									<div>
										<p style="width:200px;">
											Time constraint:
										</p>
										<p style="width:200px; color:red" ng-show="takenTime">
											There is already a time constraint for activity with that ID!
										</p>
									</div>
									<select size="10" 
											ng-model="act_day"
											ng-disabled="takenTime"
											ng-options="d.day_name for d in days" style="min-width: 150px;">
									</select>
									<select size="10" 
											ng-model="act_hour"
											ng-options="h.hour_name for h in hours" style="min-width: 150px;"
											ng-disabled="takenTime"
											ng-dblclick="selectTime()">
									</select>
									<select size="10" 
											ng-model="chosen_time"
											ng-dblclick="removeTime()"
											ng-disabled="takenTime"
											ng-options="c.day_name + '->' + c.hour_name for c in chosenTimes" style="min-width: 150px;">
									</select>
								</div>
								<div>
									<div>
										<p>Preferred time: <span style="color:green">{{act_day.day_name}} {{act_hour.hour_name}}</span></p>
									</div>
									<div style="display:flex;">
										<div style="display:flex;">
											<input type="checkbox" ng-disabled="takenTime" id="centralTime" ng-click="isItCentralTime()" ng-model="act_central_time"><label for="centralTime">Is it central?</label>
										</div>
										<div style="margin-left:20px;">
											<label for="weightPrefTime" style="width:100%;">Weight Percentage</label>
											<input size="10"
												ng-model="weightPTime"
												ng-disabled="act_central_time || takenTime"
												type="number"
												min="0" max="100"
												id="weightPrefTime" 
											>
										</div>
									</div>
									<button ng-click="saveActPrefTime()" ng-disabled="isTimeWrong() || takenTime" style="margin-top:30px; margin-left:100px;" >Add time constraint</button>
									<button ng-click="deleteTime(act_timeConstraint.time_cons_id)" ng-show="takenTime" style="margin-top:30px; margin-left:100px;" >Delete time constraint</button>
								</div>
							</div>
							<div style="display:flex;">
								<div style="display:flex">
									<div>
										<p style="width:200px;">
											Space constraint:
										</p>
										<p style="width:200px; color:red" ng-show="takenSpace">
											There is already a space constraint for activity with that ID!
										</p>
									</div>
									<select size="10" 
											ng-model="act_building"
											ng-options="b.name for b in buildings" style="min-width: 150px;"
											ng-change="searchRoomsByBuilding(act_building.id)"
											ng-disabled="takenSpace"
											>
									</select>
									<select size="10" 
											ng-model="act_room"
											ng-options="r.room_name for r in rooms" style="min-width: 150px;"
											ng-dblclick="selectSpace()"
											ng-disabled="takenSpace">
									</select>
									<select size="10" 
											ng-model="chosen_space"
											ng-options="c.build_name + ' - ' + c.room_name for c in chosenSpaces" style="min-width: 150px;"
											ng-disabled="takenSpace">
									</select>
								</div>
								<div>
									<div>
										<p>Preferred room: <span style="color:green">{{act_building.name}} {{act_room.room_name}}</span></p>
									</div>
									<div style="display:flex;">
										<div style="display:flex;">
											<input ng-disabled="takenSpace" type="checkbox" id="centralSpace" ng-click="isItCentralSpace()" ng-model="act_central_space"><label for="centralSpace">Is it central?</label>
										</div>
										<div style="margin-left:20px;">
											<label for="weightPrefSpace" style="width:100%;">Weight Percentage</label>
											<input size="10"
												ng-model="weightPSpace"
												ng-disabled="act_central_space || takenSpace"
												type="number"
												min="0" max="100"
												id="weightPrefSpace" 
											>
										</div>
									</div>
									<button ng-click="saveActPrefSpace()" ng-disabled="isSpaceWrong() || takenSpace" style="margin-top:30px; margin-left:100px;" >Add space constraint</button>
									<button ng-click="deleteSpace(act_spaceConstraint.space_cons_id)" ng-show="takenSpace" style="margin-top:30px; margin-left:100px;" >Delete space constraint</button>
								</div>
							</div>
							<div ng-include src="template.url"></div>
						</div>
					</div>
					<div id="tab3" class="tab_content" ng-controller="OverlappingCtrl">
						<div>
							<div style="display:flex">
								<div>
									Activities:<br>
									<select size="10" 
											ng-model="activity"
											ng-options="'ID: ' + act.id for act in activities"
											style="min-width: 100px; height: 200px; margin-right: 50px"
											ng-dblclick="selectActivity()">
									</select>
								</div>
								<div>
									No overlap:<br>
									<select size="10" 
											ng-model="chosenActivity"
											ng-disabled="disabledCActivities"
											ng-options="'ID: ' + act.id for act in chosenActivities"
											style="min-width: 100px; height: 200px;"
											ng-dblclick="removeActivity()">
									</select>
								</div>
								<div style="margin:auto;">
									Weight Percentage<br>
									<input size="10"
										ng-model="weightO"
										type="number"
										min="0" max="100"
										ng-disabled="disabledCActivities"
										>
								</div>
								<div style="margin:auto; margin-left:20px; width:150px">
									<button ng-click="saveNOverlap()" ng-disabled="isActivityWrong() || disabledCActivities" style="height:50px; width:150px; margin:auto" >Add time constraint</button>
									<button ng-click="deleteNOverlap(noverlap.anoc_id)" ng-show="disabledCActivities"  style="height:50px; width:150px; margin:auto"  >Delete time constraint</button>
								</div>
								<div>
									Constraints:<br>
									<select size="10" 
											ng-model="noverlap"
											ng-options="'ID: ' + n.anoc_id for n in noverlaps"
											style="min-width: 100px; height: 200px; margin-right: 50px"
											ng-click="selectNOverlap(noverlap)">
									</select>
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
					</div>
				</div>
				<br>
				</article>	
			</fieldset>
		</div>
		<?php include 'html/footer.html'?>
	</div>
</body>
</html>
