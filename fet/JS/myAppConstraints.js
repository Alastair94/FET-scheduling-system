
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
//		Days and Hours 		//
//////////////////////////////
//			Days	 		//
//////////////////////////////
app.controller('DaysCtrl', function ($scope, myHttp) {
    // $scope.addDay = function () {
    //     var tmp_name = $scope.dayName;
    //     if (tmp_name) {
	//         myHttp.query({
	//             'query': 'days',
	//             'method': 'new',
	//             'day_name': tmp_name
	//         }).success(function (data) {
	//             console.log(data);
	//             $scope.days.push({
	//                 id: data,
	//                 day_name: tmp_name
	//             });
	//             $scope.dayName = '';

	//         });
    //     };

    // };
    // $scope.isCleanDay = function () {
    //     return angular.equals($scope.temp, $scope.item);
    // };

    // $scope.cancelDay = function () {
    //     $scope.template = '';
    // };

    // $scope.editThisDay = function (id) {
    //     $scope.template = {
    //         name: 'form_nko.html',
    //         url: 'templates/detail_d.html'
    //     };
    //     for (var i = $scope.days.length - 1; i >= 0; i--) {
    //         if ($scope.days[i].id === id) {
    //             $scope.item = angular.copy($scope.days[i]);
    //             $scope.temp = angular.copy($scope.item);
    //         }
    //     };
    // }

    // $scope.destroyDay = function () {
    //     myHttp.query({
    //         'query': 'days',
    //         'method': 'delete',
    //         'id': $scope.item.id
    //     })
    //         .success(function (data) {
    //             $scope.getDays();
    //             $scope.template = '';
    //         });
    // }

    // $scope.saveDay = function () {
    // 	if ($scope.item.day_name) {
	//         myHttp.query({
	//             'query': 'days',
	//             'method': 'update',
	//             'id': $scope.item.id,
	//             'day_name': $scope.item.day_name
	//         }).success(function (data) {
	//             $scope.getDays();
	//             $scope.template = '';
	//         });
    //     };
    // };
//////////////////////////////
//			Hours	 		//
//////////////////////////////
// $scope.addHour = function () {
// 	var tmp_name = $scope.hourName;
// 	if (tmp_name) {
// 		myHttp.query({
// 			'query': 'hours',
// 			'method': 'new',
// 			'hour_name': tmp_name
// 		}).success(function (data) {
// 			console.log(data);
// 			$scope.hours.push({
// 				id: data,
// 				hour_name: tmp_name
// 			});
// 			$scope.hourName = '';

// 		});
// 	};

// };
// $scope.isCleanHour = function () {
// 	return angular.equals($scope.temp, $scope.item);
// };

// $scope.cancelHour = function () {
// 	$scope.template = '';
// };
// $scope.editThisHour = function (id) {
// 	$scope.template = {
// 		name: 'form_nko.html',
// 		url: 'templates/detail_h.html'
// 	};
// 	for (var i = $scope.hours.length - 1; i >= 0; i--) {
// 		if ($scope.hours[i].id === id) {
// 			$scope.item = angular.copy($scope.hours[i]);
// 			$scope.temp = angular.copy($scope.item);
// 		}
// 	};
// };
// $scope.destroyHour = function () {
// 	myHttp.query({
// 		'query': 'hours',
// 		'method': 'delete',
// 		'id': $scope.item.id
// 	})
// 		.success(function (data) {
// 			$scope.getHours();
// 			$scope.template = '';
// 		});
// };
// $scope.saveHour = function () {
// 	if ($scope.item.hour_name) {
// 		myHttp.query({
// 			'query': 'hours',
// 			'method': 'update',
// 			'id': $scope.item.id,
// 			'hour_name': $scope.item.hour_name
// 		}).success(function (data) {
// 			$scope.getHours();
// 			$scope.template = '';
// 		});
// 	};
// };

});

//////////////////////////////
//		TeachersCtrl		//
//////////////////////////////
app.controller('TeachersCtrl', function( $scope, myHttp ) {
	//$scope.teachers = [];
	// $scope.addItem = function() {
	// 	var data = $scope.teacherName;
	// 	if(data) {
	// 		myHttp.query({
	//             'query': 'teachers',
	//             'method': 'new',
	//             'name': data
	//         }).success(function (res) {
	//             $scope.teachers.push({
	//                 name: data,
	//                 done: false,
	//                 id: res });
	//             $scope.teacherName = '';
	//         });
    //     }
	// }

	// $scope.editTeacher = function(id) {
	// 	$scope.template = {
    //         name: 'detail.html',
    //         url: 'templates/detail.html'
    //     };

    //     for (var i = $scope.teachers.length - 1; i >= 0; i--) {
    //         if ($scope.teachers[i].id === id) {
    //             //$scope.item = $scope.teachers[i];
    //             $scope.item = angular.copy($scope.teachers[i]);
    //             $scope.temp = angular.copy($scope.item);
    //         }
    //     };
	// }
	// $scope.isClean = function () {
    //     return angular.equals($scope.temp, $scope.item);
    // }

	// $scope.cancel = function () {
    //     $scope.template = '';
    // }

    // $scope.save = function () {
    // 	if ($scope.item.name) {
    // 		console.log('not empty');

	//     	myHttp.query({
	//     		'query': 'teachers',
	//             'method': 'update',
	//             'id': $scope.item.id,
	//             'name': $scope.item.name
	//     	}).success(function(res){
	//     		$scope.getTeachers();
	//     		$scope.template = '';
	//     		console.log(res);
	//     	})
    // 	};
    // }

    // $scope.destroy = function () {
    // 	console.log($scope.item);
    // 	myHttp.query({
    //    		'query': 'teachers',
    //         'method': 'delete',
    //         'id': $scope.item.id
    //     }).success(function (data) {
    //     	$scope.getTeachers();
    //     	$scope.template = '';
    //     });
    // }

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
		let _weightPTime = $scope.weightPTime
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
//		Students  			//
//////////////////////////////
app.controller('StudentsCtrl', function ($scope, myHttp) {
    // $scope.addItem = function () {
    //     var tmp_name = $scope.studentName;
    //     var tmp_amount = $scope.studentAmount;
    //     if (tmp_name && tmp_amount) {
	//         myHttp.query({
	//             'query': 'students',
	//             'method': 'new',
	//             'year_name': tmp_name,
	//             'num_students': tmp_amount
	//         }).success(function (data) {
	//             console.log(data);
	//             $scope.students.push({
	//                 id: data,
	//                 year_name: tmp_name,
	//                 num_students: tmp_amount
	//             });
	//             $scope.studentName = '';
	//             $scope.studentAmount = '';

	//         });
    //     };

    // };
    // $scope.isClean = function () {
    //     return angular.equals($scope.temp, $scope.item);
    // };

    // $scope.cancel = function () {
    //     $scope.template = '';
    // };

    // $scope.editThis = function (id) {
    //     $scope.template = {
    //         name: 'form_nko.html',
    //         url: 'templates/detail_s.html'
    //     };
    //     for (var i = $scope.students.length - 1; i >= 0; i--) {
    //         if ($scope.students[i].id === id) {
    //             $scope.item = angular.copy($scope.students[i]);
    //             $scope.temp = angular.copy($scope.item);
    //         }
    //     };
    // }

    // $scope.destroy = function () {
    //     myHttp.query({
    //         'query': 'students',
    //         'method': 'delete',
    //         'id': $scope.item.id
    //     })
    //         .success(function (data) {
    //             $scope.getStudents();
    //             $scope.template = '';
    //         });
    // }

    // $scope.save = function () {
    // 	if ($scope.item.year_name && $scope.item.num_students) {
	//         myHttp.query({
	//             'query': 'students',
	//             'method': 'update',
	//             'id': $scope.item.id,
	//             'year_name': $scope.item.year_name,
	//             'num_students': $scope.item.num_students
	//         }).success(function (data) {
	//             $scope.getStudents();
	//             $scope.template = '';
	//         });
    //     };
    // };


});
//////////////////////////////
//		SPACE   			//
//////////////////////////////
app.controller('SpaceCtrl', function( $scope, myHttp ) {

    // $scope.buildings = [];
    // $scope.building = [];
    // $scope.data = [];
    // $scope.rooms = [];
    // $scope.update = function () {
    //     //console.log("B id ");
    //     $scope.rooms = [];
    //     for (var i = 0; i < $scope.data.length; i++) {
    //         if ($scope.data[i].building_id == $scope.building.id) {
    //             $scope.rooms.push($scope.data[i]);
    //         }
    //     }
    //     $scope.room = $scope.rooms[0];
    // }
    // $scope.getBuildings = function () {
    //     myHttp.query({
    //         'query': 'buildings',
    //         'method': 'get-all'
    //     }).success(function (data) {
    //         $scope.buildings = data;
    //         $scope.building = $scope.buildings[0];
    //         $scope.getRooms();
    //     });

    // }
    // $scope.getRooms = function() {
    // 	myHttp.query({
    //         'query': 'rooms',
    //         'method': 'get-all'
    //     }).success(function (data) {
    //         $scope.data = data;
	// 		$scope.update();
    //     });
    // }
    // $scope.getBuildings();


    // $scope.addRoom = function () {
    //     var tmp_id = '';
    //     if ($scope.roomID) {
    //         tmp_id = $scope.roomID;
    //         if ($scope.roomName && $scope.roomCapacity) {
	//             for (var i = $scope.data.length - 1; i >= 0; i--) {
	//                 if ($scope.data[i].id == tmp_id) {
	//                     $scope.data[i].name = $scope.roomName;
	//                     $scope.data[i].capacity = $scope.roomCapacity;

	//                     myHttp.query({
	//                         'query': 'rooms',
	//                         'method': 'update',
	//                         'name': $scope.roomName,
	//                         'capacity': $scope.roomCapacity,
	//                         'id': tmp_id
	//                     }).success(function (data) {
	//                         console.log(data);
	//                     });
	//                 }
	//             };
    //     	};
    //     } else {

    //         var tmp_name = $scope.roomName;
    //         var tmp_c = $scope.roomCapacity;
    //         var tmp_bid = $scope.building.id;
    //         if (tmp_name && tmp_c) {
	//             myHttp.query({
	//                 'query': 'rooms',
	//                 'method': 'new',
	//                 'name': tmp_name,
	//                 'build_id': tmp_bid,
	//                 'capacity': tmp_c
	//             }).success(function (data) {
	//                 console.log(data);
	//             });

	//             $scope.data.push({
	//                 name: $scope.roomName,
	//                 capacity: $scope.roomCapacity,
	//                 building_id: $scope.building.id,
	//                 id: Math.floor((Math.random() * 100) + 1),
	//                 done: false
	//             });
    //         };
    //     }
    //     console.log($scope.buildings);
    //     $scope.update();
    //     $scope.roomID = '';
    //     $scope.roomName = '';
    //     $scope.roomCapacity = '';
    // }
    // $scope.deleteRoom = function (id) {
    //     console.log("room: " + id);
    //     myHttp.query({
    //         'query': 'rooms',
    //         'method': 'delete',
    //         'id': id
    //     }).success(function (data) {
    //         console.log(data);
    //     });
    //     $scope.data.splice($scope.data.indexOf($scope.room), 1);
    //     $scope.update();

    // };

    // $scope.show = function () {
    //     return !$scope.rooms.length;
    // }
    // $scope.showB = function () {
    //     return !$scope.buildings.length;
    // }

    // $scope.addItem = function () {
    //     var tmp_id = '';
    //     if ($scope.buildingID) {
    //         tmp_id = $scope.buildingID;
    //         if ($scope.buildingInput) {
	//             console.log(tmp_id);
	//             for (var i = 0; i < $scope.buildings.length; i++) {
	//                 if ($scope.buildings[i].id == tmp_id) {
	//                     myHttp.query({
	//                         'query': 'buildings',
	//                         'method': 'update',
	//                         'name': $scope.buildingInput,
	//                         'id': tmp_id
	//                     }).success(function (data) {

	//                         console.log($scope.buildings);
	//                     });
	//                     $scope.buildings[i].name = $scope.buildingInput;
	//                 }
	//             }
    //         };
    //     } else {
    //         var tmp_name = $scope.buildingInput;
    //         if (tmp_name) {
	//             myHttp.query({
	//                 'query': 'buildings',
	//                 'method': 'new',
	//                 'name': tmp_name
	//             }).success(function (data) {
	//                 $scope.buildings.push({
	//                     name: tmp_name,
	//                     id: data,
	//                     done: true
	//                 });
	//             });
    //         };
    //     }
    //     $scope.buildingInput = '';

    //     $scope.buildingID = '';
    //     $scope.building = $scope.buildings[0];

    // };
    // $scope.editRoom = function () {
    //     console.log($scope.building);
    //     $scope.roomName = $scope.room.name;
    //     $scope.roomCapacity = $scope.room.capacity;
    //     $scope.roomID = $scope.room.id;

    // };

    // $scope.editItem = function () {
    //     console.log($scope.room);
    //     $scope.buildingInput = $scope.building.name;
    //     $scope.buildingID = $scope.building.id;
    // };
    // $scope.deleteItem = function () {
    //     console.log($scope.building);
    //     for (var i = 0; i < $scope.data.length; i++) {
    //         if ($scope.data[i].building_id == $scope.building.id) {
    //             console.log('alert');
    //             if (confirm('Are you sure you want to delete building, building has rooms?')) {
    //                 $scope.buildings.splice($scope.buildings.indexOf($scope.building), 1);

    //                 var q = $scope.building.id;
    //                 var q1 = $scope.data.length;
    //                 for (var j = q1 - 1; j >= 0; j--) {
    //                     if ($scope.data[j].building_id === q) {
    //                         console.log('match ' + j);
    //                         $scope.data.splice(j, 1);
    //                         //$scope.deleteRoom($scope.data[j].id);
    //                     }
    //                     //console.log($scope.data[j].building_id);
    //                 };
    //                 console.log($scope.data);
    //                 $scope.building = $scope.buildings[0];
    //                 $scope.update();
    //                 return;
    //             } else {
    //                 return;
    //             }
    //         }
    //     }
    //     myHttp.query({
    //         'query': 'buildings',
    //         'method': 'delete',
    //         'id': $scope.building.id
    //     }).success(function (data) {
    //         console.log(data);
    //     });

    //     $scope.buildings.splice($scope.buildings.indexOf($scope.building), 1);
    //     $scope.building = $scope.buildings[0];
    //     $scope.update();
    // };

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

