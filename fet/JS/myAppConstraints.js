
$(document).ready(function() {

 //When page loads...
 $(".tab_content").hide(); //Hide all content
 $("ul.tabs li:first").addClass("active").show(); //Activate first tab
 $(".tab_content:first").show(); //Show first tab content

 //On Click Event
 $("ul.tabs li").click(function() {

  $("ul.tabs li").removeClass("active"); //Remove any "active" class
  $(this).addClass("active"); //Add "active" class to selected tab
  $(".tab_content").hide(); //Hide all tab content

  var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
  $(activeTab).fadeIn('fast'); //Fade in the active ID content
  return false;
 });

});




var app = angular.module("myAppConstraints", []);
app.controller("AppController", function( $scope, myHttp ) {
	$scope.teachers = [];
	$scope.subjects = [];
	$scope.students = [];
	$scope.buildings = [];
	$scope.rooms = [];
	$scope.data = [];
	$scope.days = [];
	$scope.hours = [];
	$scope.weightP = 100;

	$scope.spaceConstraints = [];

	$scope.getBuildings = function () {
        myHttp.query({
            'query': 'buildings',
            'method': 'get-all'
        }).success(function (data) {
            $scope.buildings = data;
            $scope.act_building = $scope.buildings[0];
            $scope.getRooms();
        });

    }

	$scope.getRooms = function () {
		myHttp.query({
            'query': 'rooms',
            'method': 'get-all'
        }).success(function (data) {
            $scope.rooms = data;
			$scope.act_room = $scope.rooms[0];
        });
	}

	$scope.getSpaceConstraints = function () {
		myHttp.query({
            'query': 'subjectSpaceConstraints',
            'method': 'get-all'
        }).success(function (data) {
            $scope.spaceConstraints = data;
        });
	}

	$scope.getTeachers = function() {
		myHttp.query({
            'query': 'teachers',
            'method': 'get-all'
        }).success(function (data) {
            $scope.teachers = data;
            $scope.act_teacher = $scope.teachers[0];
        });
	}

	$scope.getSubjects = function() {
		myHttp.query({
            'query': 'subjects',
            'method': 'get-all'
        }).success(function (data) {
            $scope.subjects = data;
        });
	}

	$scope.getStudents = function () {
        myHttp.query({
            'query': 'students',
            'method': 'get-all'
        }).success(function (data) {
            $scope.students = data;
            $scope.act_student = $scope.students[0];
        });
    }

	$scope.getDays = function () {
		myHttp.query({
            'query': 'days',
            'method': 'get-all'
        }).success(function (data) {
            $scope.days = data;
			$scope.act_day = $scope.days[0];
        });
	}

	$scope.getHours = function () {
		myHttp.query({
            'query': 'hours',
            'method': 'get-all'
        }).success(function (data) {
            $scope.hours = data;
			$scope.act_hour = $scope.hours[0];
        });
	}

	$scope.getSpaceConstraints();
	$scope.getBuildings();
	$scope.getTeachers();
	$scope.getSubjects();
	$scope.getStudents();
	$scope.getDays();
	$scope.getHours();
});
//////////////////////////////
//		SubjectsCtrl		//
//////////////////////////////
app.controller('SubjectsCtrl', function( $scope, myHttp ) {
	$scope.chosenRooms = [];
	$scope.updateR = function() {
		for (var i = $scope.chosenRooms.length - 1; i >= 0; i--) {
			if($scope.chosenRooms[i] == $scope.act_room) {
				console.log("matches");
				return;
			}
		}

		$scope.chosenRooms.push($scope.act_room);
		$scope.chosenR = $scope.chosenRooms[0];
	}
	$scope.removeR = function () {
		for (var i = $scope.chosenRooms.length - 1; i >= 0; i--) {
			if($scope.chosenRooms[i] == $scope.chosenR) {
				$scope.chosenRooms.splice($scope.chosenRooms.indexOf($scope.chosenR),1);
				$scope.chosenR = $scope.chosenRooms[0];
				return;
			}
		}
	}

    $scope.addItem = function () {
        var tmp_name = $scope.subject;
        if (tmp_name) {
	        myHttp.query({
	            'query': 'subjects',
	            'method': 'new',
	            'name': tmp_name
	        }).success(function (data) {
	            $scope.subjects.push({
	                name: tmp_name,
	                done: false,
	                id: data
	            });
	            $scope.subject = '';
	        });
        };
    }

	$scope.saveAct = function() {
		var newdata = [
			$scope.chosenRooms,
			$scope.subject,
			$scope.weightP
		];
		var chosenRooms = $scope.chosenRooms; // Save it to a variable which won't be emptied (asynchronous task ahead)

		myHttp.query({ // Checks if there are any constraint for subject already
            'query': 'subjectSpaceConstraints',
            'method': 'get-single',
			'id': $scope.subject.id
        }).success(function (data) {
			if(data[0]==null){
				console.log('New SubjectPreferredRoomConstraint');
				myHttp.query({
					'query'	: 'subjectSpaceConstraints',
					'method': 'new',
					'data'	: newdata
				})
				.success(function (result) {
					var newdata2 = [
						result,
						chosenRooms
					];
					myHttp.query({
						'query': 'preferredRooms',
						'method': 'new',
						'data'	: newdata2
					}).success(function (result) {
						window.alert("Successfully uploaded!");
					});
				});
			} else {
				window.alert("There is already a constraint for that: " + $scope.subject.name);
			}
			$scope.chosenR = '';
			$scope.chosenRooms = [];
			$scope.subject = null;
			$scope.getSpaceConstraints();
        });
	}

    $scope.destroy = function (id) {
		if(confirm("Are you sure you want to delete this subject?")){
			myHttp.query({
				'query': 'subjectSpaceConstraints',
				'method': 'delete',
				'id': id
			}).success(function (data) {
				$scope.getSpaceConstraints();
			});
		}
    };

});

//////////////////////////////
//		ActivitiesCtrl		//
//////////////////////////////
app.controller('ActivitiesCtrl', function( $scope, myHttp ) {
	$scope.activities = [];
	$scope.rooms = [];
	$scope.buildings = [];
	$scope.act_room = '';
	$scope.act_building = '';
	$scope.chosenTimes = [];
	$scope.chosen_time = '';
	$scope.act_central_time = false;
	$scope.chosenSpaces = [];
	$scope.chosen_space = '';
	$scope.act_central_space = false;
	$scope.weightPSpace = 100;
	$scope.weightPTime = 100;
	$scope.takenTime = false;
	$scope.takenSpace = false;
	$scope.act_timeConstraint = '';
	$scope.act_spaceConstraint = '';


	$scope.getActivities = function () {
		myHttp.query({
			'query': 'activities',
			'method': 'get-all'
		}).success(function (data) {
			$scope.activities = data;
		});
	}

	$scope.getBuildings = function () {
        myHttp.query({
            'query': 'buildings',
            'method': 'get-all'
        }).success(function (data) {
            $scope.buildings = data;
            $scope.act_building = $scope.buildings[0];
            $scope.searchRoomsByBuilding($scope.act_building.id);
        });
    }

	$scope.searchRoomsByBuilding = function (id) {
		myHttp.query({
			'query': 'rooms',
			'method': 'get-single',
			'id': id
		}).success(function (data) {
			$scope.rooms = data;
			$scope.act_room = data[0];
		})
	}

	$scope.isItCentralTime = function () {
		if($scope.act_central_time){
			$scope.weightPTime = 100;
		}
	}

	$scope.isItCentralSpace = function () {
		if($scope.act_central_space){
			$scope.weightPSpace = 100;
		}
	}

	$scope.selectTime = function (){
		for (var i = 0; i < $scope.chosenTimes.length; i++) {
			if($scope.chosenTimes[i].day_name + $scope.chosenTimes[i].hour_name == $scope.act_day.day_name + $scope.act_hour.hour_name) {
				console.log("Time matches");
				return;
			}
		}
		let time = {
			...$scope.act_day,
			...$scope.act_hour
		}
		$scope.chosenTimes.push(time);
		$scope.chosen_time = $scope.chosenTimes[0];
	}

	$scope.removeTime = function () {
		for (var i = $scope.chosenTimes.length - 1; i >= 0; i--) {
			if($scope.chosenTimes[i] == $scope.chosen_time) {
				$scope.chosenTimes.splice($scope.chosenTimes.indexOf($scope.chosen_time),1);
				$scope.chosen_time = $scope.chosenTimes[0];
				return;
			}
		}
	}

	$scope.selectSpace = function (){
		for (var i = 0; i < $scope.chosenSpaces.length; i++) {
			if($scope.chosenSpaces[i].id == $scope.act_room.id) {
				console.log("Room matches");
				return;
			}
		}

		$scope.chosenSpaces.push($scope.act_room);
		$scope.chosen_space = $scope.chosenSpaces[0];
	}

	$scope.saveActPrefTime = function () {
		let _activity = $scope.activity;
		let _chosenTime = $scope.chosenTimes;
		let _weightPTime = $scope.weightPTime;
		let _act_central_time = $scope.act_central_time;
		myHttp.query({
			'query': 'activityTimeConstraints',
			'method': 'get-single',
			'id': _activity.id
		}).success( function (data0){
			if(data0[0]==null){
				window.alert(data0[0]);
				var data = [
					_activity,
					_weightPTime,
					_chosenTime,
					_act_central_time
				];
				myHttp.query({
					'query': 'activityTimeConstraints',
					'method': 'new',
					'data': data
				}).success(function (result){
					var preferredTimes = [
						result,
						_chosenTime
					];
					myHttp.query({
						'query': 'preferredTimes',
						'method': 'new',
						'data': preferredTimes
					}).success(function (result){
						console.log('Succesfully created a new Preferred time constraint with id: ' + result + ', and ' + _chosenTime.length + ' preferred hours!');
					});
				});
			} else{
				window.alert("There is already a time constraint for activity with ID: " + _activity.id);
			}
		})

		$scope.activity = '';
		$scope.timeToDefault();
	}

	$scope.deleteTime = function(id){
		if(confirm("Are you sure you want to delete this time constraint?")){
			myHttp.query({
				'query': 'activityTimeConstraints',
				'method': 'delete',
				'id': id
			}).success(function (data) {
				$scope.timeToDefault();
				$scope.activity = '';
				$scope.takenTime = false;
			});
		}
	}

	$scope.deleteSpace = function(id){
		if(confirm("Are you sure you want to delete this space constraint?")){
			myHttp.query({
				'query': 'activitySpaceConstraints',
				'method': 'delete',
				'id': id
			}).success(function (data) {
				$scope.spaceToDefault();
				$scope.activity = '';
				$scope.takenSpace = false;
			});
		}
	}

	$scope.saveActPrefSpace = function () {
		var _activity = $scope.activity;
		var _chosenSpaces = $scope.chosenSpaces;
		var _weightPSpace = $scope.weightPSpace;
		var _act_central_space = $scope.act_central_space; // Save these variables because async operation ahead
		myHttp.query({
			'query': 'activitySpaceConstraints',
			'method': 'get-single',
			'id': _activity.id
		}).success( function (data0){
			if(data0[0]==null){
				var data = [
					_activity,
					_weightPSpace,
					_chosenSpaces,
					_act_central_space
				];
				myHttp.query({
					'query': 'activitySpaceConstraints',
					'method': 'new',
					'data': data
				}).success(function (result1){
					var preferredSpaces = [
						result1,
						_chosenSpaces
					];
					myHttp.query({
						'query': 'preferredRooms',
						'method': 'new',
						'data': preferredSpaces
					}).success(function (result2){
						console.log('Succesfully created a new Preferred space constraint with id: ' + result1 + ', and ' + _chosenSpaces.length + ' preferred rooms!');
					});
				});
			} else{
				window.alert("There is already a space constraint for activity with ID: " + _activity.id);
			}
		})

		$scope.activity = '';
		$scope.spaceToDefault();
	}

	$scope.isTimeWrong = function () {
		if($scope.activity && $scope.chosenTimes.length > 0 && $scope.weightPTime)
			return false;
		else
			return true;
	}

	$scope.isSpaceWrong = function () {
		if($scope.activity && $scope.chosenSpaces.length > 0 && $scope.weightPSpace)
			return false;
		else
			return true;
	}

	$scope.isTaken = function (activity) {
		if(activity != undefined){
			myHttp.query({
				'query': 'activityTimeConstraints',
				'method': 'get-single',
				'id': activity.id
			}).success(function(result){
				$scope.timeToDefault();
				if(result[0]==null){ // So if there there is no constraint for that activity
					$scope.takenTime = false;
				}
				else{ // If there there IS a constraint for that activity
					$scope.act_timeConstraint = result[0];
					$scope.takenTime = true;
					$scope.weightPTime = parseInt(result[0].weight_percentage);
					if(result[0].locked == "true")
						$scope.act_central_time = true;
					else
						$scope.act_central_time = false;
					myHttp.query({
						'query': 'preferredTimes',
						'method': 'get-single',
						'id': result[0].time_cons_id
					}).success(function(result2){
						for($i = 0;$i<result[0].num_of_pref_times; $i++){
							$scope.chosenTimes.push(result2[$i]);
						}
						$scope.chosen_time = $scope.chosenTimes[0];
					})
				}
			})

			myHttp.query({
				'query': 'activitySpaceConstraints',
				'method': 'get-single',
				'id': activity.id
			}).success(function(resultSpace){
				$scope.spaceToDefault();
				if(resultSpace[0]==null){
					$scope.takenSpace = false;
				}
				else{
					$scope.act_spaceConstraint = resultSpace[0];
					$scope.takenSpace = true;
					$scope.weightPSpace = parseInt(resultSpace[0].weight_percentage);
					if(resultSpace[0].locked == "true")
						$scope.act_central_space = true;
					else
						$scope.act_central_space = false;
					myHttp.query({
						'query': 'preferredRooms',
						'method': 'get-single',
						'id': resultSpace[0].space_cons_id
					}).success(function(result2){
						for($i = 0;$i<resultSpace[0].num_of_pref_rooms; $i++){
							$scope.chosenSpaces.push(result2[$i]);
						}
						$scope.chosen_space = $scope.chosenSpaces[0];
					})
				}
			})

			//$scope.chosenTimes = activity.chosenTimes;
		}
	}

	$scope.timeToDefault = function () {
		$scope.act_day = $scope.days[0];
		$scope.act_hour = $scope.hours[0];
		$scope.chosenTimes = [];
		$scope.weightPTime = 100;
		$scope.act_central_time = false;
	}

	$scope.spaceToDefault = function () {
		$scope.act_building = $scope.buildings[0];
		$scope.searchRoomsByBuilding($scope.act_building.id);
		$scope.chosenSpaces = [];
		$scope.weightPSpace = 100;
		$scope.act_central_space = false;
	}

	$scope.getBuildings();
	$scope.getDays();
	$scope.getHours();
	$scope.getActivities();
});

//////////////////////////////
//		OverlappingCtrl		//
//////////////////////////////
app.controller('OverlappingCtrl', function( $scope, myHttp ) {
	$scope.activities = [];
	$scope.chosenActivities = [];
	$scope.noverlaps = [];
	$scope.noverlap = '';
	$scope.weightO = 100;
	$scope.actNoverlaps = [];
	$scope.disabledCActivities = false;

	$scope.getActivities = function () {
		myHttp.query({
			'query': 'activities',
			'method': 'get-all'
		}).success(function (data) {
			$scope.activities = data;
			$scope.activity = data[0];
		});
	}

	$scope.selectActivity = function (){
		if($scope.disabledCActivities){
			$scope.chosenActivities = [];
			$scope.disabledCActivities = false;
			$scope.weightO = 100;
		}
		for (var i = 0; i < $scope.chosenActivities.length; i++) {
			if($scope.chosenActivities[i].id == $scope.activity.id) {
				console.log("Activity matches");
				return;
			}
		}

		$scope.chosenActivities.push($scope.activity);
		$scope.chosenActivity = $scope.chosenActivities[0];
	}

	$scope.removeActivity = function () {
		for (var i = $scope.chosenActivities.length - 1; i >= 0; i--) {
			if($scope.chosenActivities[i] == $scope.chosenActivity) {
				$scope.chosenActivities.splice($scope.chosenActivities.indexOf($scope.chosenActivity),1);
				$scope.chosenActivity = $scope.chosenActivities[0];
				return;
			}
		}
	}

	$scope.saveNOverlap = function () {
		let _chosenActivities = $scope.chosenActivities;
		let _weightO = $scope.weightO;

		for($i = 0; $i < $scope.actNoverlaps.length; $i++){
			if(_chosenActivities.length == $scope.actNoverlaps[$i].length){
				$sum = 0;
				for($j = 0; $j < $scope.actNoverlaps[$i].length; $j++){
					for($k = 0; $k < $scope.chosenActivities.length; $k++){
						if($scope.actNoverlaps[$i][$j].id.includes(_chosenActivities[$k].id)){
							$sum++;
						}
					}
				}
				if($sum == _chosenActivities.length){
					window.alert("There is already a constraint for these activities with ID: " + $scope.actNoverlaps[$i][0].anoc_id);
					$scope.chosenActivities = [];
					return;
				}
			}
		}

		var data = [
			_chosenActivities,
			_weightO
		];
		myHttp.query({
			'query': 'activityNOverlaps',
			'method': 'new',
			'data': data
		}).success(function (result1){
			var _activities = [
				result1,
				_chosenActivities
			];
			myHttp.query({
				'query': 'listActivityNOverlaps',
				'method': 'new',
				'data': _activities
			}).success(function (result2){
				console.log('Succesfully created a new No Overlap constraint with id: ' + result1 + ', with ' + _chosenActivities.length + ' activities!');
			});
		});

		$scope.chosenActivities = [];
		$scope.activity = $scope.activities[0];
		$scope.weightO = 100;
		$scope.getNOverlaps();
	}

	$scope.isActivityWrong = function () {
		if($scope.activity && $scope.chosenActivities.length > 1 && $scope.weightO)
			return false;
		else
			return true;
	}

	$scope.deleteNOverlap = function(id){
		if(confirm("Are you sure you want to delete this time constraint?")){
			myHttp.query({
				'query': 'activityNOverlaps',
				'method': 'delete',
				'id': id
			}).success(function (data) {
				// $scope.timeToDefault();
				// $scope.activity = '';
				$scope.getNOverlaps();
				$scope.chosenActivities = [];
			});
		}
	}

	$scope.getNOverlaps = function () {
		$scope.actNoverlaps = [];
		myHttp.query({
			'query': 'activityNOverlaps',
			'method': 'get-all'
		}).success(function (data){
			$scope.noverlaps = data;
			$scope.noverlap = data[0];

			$scope.noverlaps.forEach(element => {
				myHttp.query({
					'query': 'listActivityNOverlaps',
					'method': 'get-single',
					'id': element.anoc_id
				}).success(function(result){
					$scope.actNoverlaps.push(result);
				})
			});
		})
	}

	$scope.selectNOverlap = function (noverlap) {
		if($scope.noverlap != undefined){
			$scope.disabledCActivities = true;
			$scope.chosenActivities = [];
			// $scope.actNoverlaps = [];
			$scope.weightO = parseInt(noverlap.weight_percentage);
			myHttp.query({
				'query': 'listActivityNOverlaps',
				'method': 'get-single',
				'id': noverlap.anoc_id
			}).success(function (results){
				for($i = 0; $i < results.length; $i++){
					$scope.chosenActivities.push(results[$i]);
					$scope.chosenActivity = $scope.chosenActivities[0];
				}
			})
		}

	}

	$scope.getActivities();
	$scope.getNOverlaps();
});

//////////////////////////////
//		TeachersNATCtrl		//
//////////////////////////////
app.controller('TeachersNATCtrl', function( $scope, myHttp ) {
	$scope.chosenTimes = [];
	$scope.teachersNATs = [];
	$scope.weightT = 100;
	$scope.disabledTeachersNAT = false;

	$scope.selectTime = function (){
		if($scope.disabledTeachersNAT){
			$scope.chosenTimes = [];
			$scope.disabledTeachersNAT = false;
			$scope.weightT = 100;
		}
		for (var i = 0; i < $scope.chosenTimes.length; i++) {
			if($scope.chosenTimes[i].day_name + $scope.chosenTimes[i].hour_name == $scope.act_day.day_name + $scope.act_hour.hour_name) {
				console.log("Time matches");
				return;
			}
		}
		let time = {
			...$scope.act_day,
			...$scope.act_hour
		}
		$scope.chosenTimes.push(time);
		$scope.chosen_time = $scope.chosenTimes[0];
	}

	$scope.removeTime = function () {
		for (var i = $scope.chosenTimes.length - 1; i >= 0; i--) {
			if($scope.chosenTimes[i] == $scope.chosen_time) {
				$scope.chosenTimes.splice($scope.chosenTimes.indexOf($scope.chosen_time),1);
				$scope.chosen_time = $scope.chosenTimes[0];
				return;
			}
		}
	}

	$scope.saveTeachersNAT = function () {
		let _chosenTimes = $scope.chosenTimes;
		let _weightT = $scope.weightT;
		let _teacher = $scope.act_teacher;

		myHttp.query({
			'query': 'teachersNAT',
			'method': 'get-single',
			'id': _teacher.id
		}).success(function(result){
			if(result[0]==null){
				let data = [
					_chosenTimes,
					_weightT,
					_teacher
				];
				myHttp.query({
					'query': 'teachersNAT',
					'method': 'new',
					'data': data
				}).success(function (result_id){
					let data2 = [
						result_id,
						_chosenTimes
					];
					myHttp.query({
						'query': 'listNAT',
						'method': 'new',
						'data': data2
					}).success(function(final_result){
						window.alert('Successfully created a new TeacherNotAvailableTimes constraint for ' + _teacher.name + ' with id: ' + result_id + ', with ' + _chosenTimes.length + ' not available times!');
						$scope.getTeachersNAT();
					})
				});
			}else{
				window.alert("There is already a time constraint for " + _teacher.name + "!");
			}
		})

		$scope.chosenTimes = [];
		$scope.act_teacher = $scope.teachers[0];
		$scope.weightT = 100;
	}

	$scope.isTeachersNATWrong = function () {
		if($scope.act_teacher && $scope.chosenTimes.length > 0 && $scope.weightT)
			return false;
		else
			return true;
	}

	$scope.getTeachersNAT = function () {
		myHttp.query({
			'query': 'teachersNAT',
			'method': 'get-all'
		}).success(function (data) {
			$scope.teachersNATs = data;
			$scope.act_teachersNAT = data[0];
		});
	}

	$scope.selectTeachersNAT = function (teachersNAT) {
		if($scope.act_teachersNAT != undefined){
			$scope.disabledTeachersNAT = true;
			$scope.chosenTimes = [];
			$scope.weightT = parseInt(teachersNAT.weight_percentage);
			myHttp.query({
				'query': 'listNAT',
				'method': 'get-single',
				'id': teachersNAT.nat_id
			}).success(function (results){
				for($i = 0; $i < results.length; $i++){
					$scope.chosenTimes.push(results[$i]);
					$scope.chosen_time = $scope.chosenTimes[0];
				}
			})
		}
	}

	$scope.deleteTeachersNAT = function(id){
		if(confirm("Are you sure you want to delete this time constraint?")){
			myHttp.query({
				'query': 'teachersNAT',
				'method': 'delete',
				'id': id
			}).success(function (data) {
				$scope.getTeachersNAT();
				$scope.chosenTimes = [];
			});
		}
	}

	$scope.getTeachersNAT();
});

//////////////////////////////
//		TeachersMaxHourCtrl		//
//////////////////////////////
app.controller('TeachersMaxHoursCtrl', function( $scope, myHttp ) {
	$scope.maxHourCONs = [];
	$scope.weightT = 100;
	$scope.maxHour = 5;
	$scope.disabledTeachersNAT = false;
	$scope.wrongWeight = false;

	$scope.saveMaxHourCON = function () {
		let _teacher = $scope.act_teacher;
		let _weightT = $scope.weightT;
		let _maxHour = $scope.maxHour;

		myHttp.query({
			'query': 'maxHourCON',
			'method': 'get-single',
			'id': _teacher.id
		}).success(function(result){
			if(result[0]==null){
				let data = [
					_teacher,
					_weightT,
					_maxHour
				];
				myHttp.query({
					'query': 'maxHourCON',
					'method': 'new',
					'data': data
				}).success(function (result_id){
					window.alert('Successfully created constraint for '+_teacher.name+' with '+_maxHour+' classes per day!');
					$scope.getMaxHourCONs();
					$scope.weightT = 100;
					$scope.maxHour = 5;
					$scope.act_teacher = $scope.teachers[0];
				});
			}else{
				window.alert("There is already a time constraint for " + _teacher.name + "!");
			}
		})
	}

	$scope.isMaxHourCONWrong = function () {
		if($scope.act_teacher && $scope.maxHour && $scope.weightT)
			return false;
		else
			return true;
	}

	$scope.getMaxHourCONs = function () {
		myHttp.query({
			'query': 'maxHourCON',
			'method': 'get-all'
		}).success(function (data) {
			$scope.maxHourCONs = data;
			$scope.act_maxHourCON = data[0];
		});
	}

	$scope.selectMaxHourCON = function (maxHourCON) {
		if($scope.act_maxHourCON != undefined){
			$scope.disabledMaxHourCON = true;
			$scope.wrongWeight = false;
			$scope.weightT = parseInt(maxHourCON.weight_percentage);
			$scope.maxHour = parseInt(maxHourCON.max_hours);
		}
	}

	$scope.toDefault = function() {
		if(!$scope.disabledTeachersNAT){
			$scope.disabledMaxHourCON = false;
			$scope.weightT = 100;
			$scope.maxHour = 5;
		}
	}

	$scope.deleteMaxHourCON = function(id){
		if(confirm("Are you sure you want to delete this constraint?")){
			myHttp.query({
				'query': 'maxHourCON',
				'method': 'delete',
				'id': id
			}).success(function (data) {
				$scope.getMaxHourCONs();
				$scope.toDefault();
			});
		}
	}

	$scope.isWeightWrong = function() {
		if($scope.weightT!=100)
			$scope.wrongWeight = true;
		else
			$scope.wrongWeight = false;
	}
	$scope.getMaxHourCONs();
});

//////////////////////////////
//		RoomsNATCtrl		//
//////////////////////////////
app.controller('RoomsNATCtrl', function( $scope, myHttp ) {
	$scope.chosenRooms = [];
	$scope.roomsNATs = [];
	$scope.selectedRooms = [];
	$scope.chosenTimes = [];
	$scope.act_building = '';
	$scope.act_room = '';
	$scope.act_roomsNAT = '';
	$scope.weightR = 100;
	$scope.disabledRoomsNAT = false;

	$scope.selectRoom = function (act_building) {
		myHttp.query({
			'query': 'rooms',
			'method': 'get-single',
			'id': act_building.id
		}).success(function (result){
			$scope.selectedRooms = result;
			$scope.act_room = result[0];
		})
	}

	$scope.selectTime = function (){
		if($scope.disabledRoomsNAT){
			$scope.chosenTimes = [];
			$scope.disabledRoomsNAT = false;
			$scope.weightR = 100;
		}
		for (var i = 0; i < $scope.chosenTimes.length; i++) {
			if($scope.chosenTimes[i].day_name + $scope.chosenTimes[i].hour_name == $scope.act_day.day_name + $scope.act_hour.hour_name) {
				console.log("Time matches");
				return;
			}
		}
		let time = {
			...$scope.act_day,
			...$scope.act_hour
		}
		$scope.chosenTimes.push(time);
		$scope.chosen_time = $scope.chosenTimes[0];
	}

	$scope.removeTime = function () {
		for (var i = $scope.chosenTimes.length - 1; i >= 0; i--) {
			if($scope.chosenTimes[i] == $scope.chosen_time) {
				$scope.chosenTimes.splice($scope.chosenTimes.indexOf($scope.chosen_time),1);
				$scope.chosen_time = $scope.chosenTimes[0];
				return;
			}
		}
	}

	$scope.saveRoomsNAT = function () {
		let _chosenTimes = $scope.chosenTimes;
		let _weightR = $scope.weightR;
		let _room = $scope.act_room;

		myHttp.query({
			'query': 'roomsNAT',
			'method': 'get-single',
			'id': _room.id
		}).success(function(result){
			if(result[0]==null){
				let data = [
					_chosenTimes,
					_weightR,
					_room
				];
				myHttp.query({
					'query': 'roomsNAT',
					'method': 'new',
					'data': data
				}).success(function (result_id){
					let data2 = [
						result_id,
						_chosenTimes
					];
					myHttp.query({
						'query': 'listNAT',
						'method': 'new',
						'data': data2
					}).success(function(final_result){
						window.alert('Successfully created a new RoomNotAvailableTimes constraint for ' + _room.room_name + ' with id: ' + result_id + ', with ' + _chosenTimes.length + ' not available times!');
						$scope.getRoomsNAT();
					})
				});
			}else{
				window.alert("There is already a time constraint for " + _room.room_name + "!");
			}
		})

		$scope.chosenTimes = [];
		$scope.act_building = '';
		$scope.act_room = '';
		$scope.weightR = 100;
	}

	$scope.isRoomsNATWrong = function () {
		if($scope.act_room && $scope.chosenTimes.length > 0 && $scope.weightR)
			return false;
		else
			return true;
	}

	$scope.getRoomsNAT = function () {
		myHttp.query({
			'query': 'roomsNAT',
			'method': 'get-all'
		}).success(function (data) {
			$scope.roomsNATs = data;
			$scope.act_roomsNAT = data[0];
		});
	}

	$scope.selectRoomsNAT = function (roomsNAT) {
		if($scope.act_roomsNAT != undefined){
			$scope.disabledRoomsNAT = true;
			$scope.chosenTimes = [];
			$scope.weightR = parseInt(roomsNAT.weight_percentage);
			myHttp.query({
				'query': 'listNAT',
				'method': 'get-single',
				'id': roomsNAT.nat_id
			}).success(function (results){
				for($i = 0; $i < results.length; $i++){
					$scope.chosenTimes.push(results[$i]);
					$scope.chosen_time = $scope.chosenTimes[0];
				}
			})
		}
	}

	$scope.deleteRoomsNAT = function(id){
		if(confirm("Are you sure you want to delete this time constraint?")){
			myHttp.query({
				'query': 'roomsNAT',
				'method': 'delete',
				'id': id
			}).success(function (data) {
				$scope.getRoomsNAT();
				$scope.chosenTimes = [];
			});
		}
	}

	$scope.getRoomsNAT();
});


app.factory('myHttp', function($http){
	return {
		query: function(data) {
			return $http({
				method:'GET',
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},
				params:data,
				url:'process_form.php'
			});
		}
	}
});

