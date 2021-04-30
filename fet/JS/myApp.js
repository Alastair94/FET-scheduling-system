
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




var app = angular.module("myApp", []);
app.controller("AppController", function( $scope, myHttp ) {
	$scope.teachers = [];
	$scope.subjects = [];
	$scope.students = [];
	$scope.buildings = [];
	$scope.data = [];
	$scope.days = [];
	$scope.hours = [];

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
        });
	}

	$scope.getHours = function () {
		myHttp.query({
            'query': 'hours',
            'method': 'get-all'
        }).success(function (data) {
            $scope.hours = data;
        });
	}

	$scope.getTeachers();
	$scope.getSubjects();
	$scope.getStudents();
	$scope.getDays();
	$scope.getHours();
});
//////////////////////////////
//		Days and Hours 		//
//////////////////////////////
//			Days	 		//
//////////////////////////////
app.controller('DaysCtrl', function ($scope, myHttp) {

    $scope.addDay = function () {
        var tmp_name = $scope.dayName;
        if (tmp_name) {
	        myHttp.query({
	            'query': 'days',
	            'method': 'new',
	            'day_name': tmp_name
	        }).success(function (data) {
	            console.log(data);
	            $scope.days.push({
	                day_id: data,
	                day_name: tmp_name
	            });
	            $scope.dayName = '';

	        });
        };

    };
    $scope.isCleanDay = function () {
        return angular.equals($scope.temp, $scope.item);
    };

    $scope.cancelDay = function () {
        $scope.template = '';
    };

    $scope.editThisDay = function (id) {
        $scope.template = {
            name: 'form_nko.html',
            url: 'templates/detail_d.html'
        };
		
        for (var i = $scope.days.length - 1; i >= 0; i--) {
            if ($scope.days[i].day_id === id) {
                $scope.item = angular.copy($scope.days[i]);
				$scope.temp = angular.copy($scope.item);
            }
        };
    }

    $scope.destroyDay = function () {
        myHttp.query({
            'query': 'days',
            'method': 'delete',
            'id': $scope.item.day_id
        })
            .success(function (data) {
                $scope.getDays();
                $scope.template = '';
            });
    }

    $scope.saveDay = function () {
    	if ($scope.item.day_name) {
	        myHttp.query({
	            'query': 'days',
	            'method': 'update',
	            'id': $scope.item.day_id,
	            'day_name': $scope.item.day_name
	        }).success(function (data) {
	            $scope.getDays();
	            $scope.template = '';
	        });
        };
    };
//////////////////////////////
//			Hours	 		//
//////////////////////////////
$scope.addHour = function () {
	var tmp_name = $scope.hourName;
	if (tmp_name) {
		myHttp.query({
			'query': 'hours',
			'method': 'new',
			'hour_name': tmp_name
		}).success(function (data) {
			console.log(data);
			$scope.hours.push({
				hour_id: data,
				hour_name: tmp_name
			});
			$scope.hourName = '';

		});
	};

};
$scope.isCleanHour = function () {
	return angular.equals($scope.temp, $scope.item);
};

$scope.cancelHour = function () {
	$scope.template = '';
};
$scope.editThisHour = function (id) {
	$scope.template = {
		name: 'form_nko.html',
		url: 'templates/detail_h.html'
	};
	for (var i = $scope.hours.length - 1; i >= 0; i--) {
		if ($scope.hours[i].hour_id === id) {
			$scope.item = angular.copy($scope.hours[i]);
			$scope.temp = angular.copy($scope.item);
		}
	};
};
$scope.destroyHour = function () {
	myHttp.query({
		'query': 'hours',
		'method': 'delete',
		'id': $scope.item.hour_id
	})
		.success(function (data) {
			$scope.getHours();
			$scope.template = '';
		});
};
$scope.saveHour = function () {
	if ($scope.item.hour_name) {
		myHttp.query({
			'query': 'hours',
			'method': 'update',
			'id': $scope.item.hour_id,
			'hour_name': $scope.item.hour_name
		}).success(function (data) {
			$scope.getHours();
			$scope.template = '';
		});
	};
};

});

//////////////////////////////
//		TeachersCtrl		//
//////////////////////////////
app.controller('TeachersCtrl', function( $scope, myHttp ) {
	$scope.addItem = function() {
		var data = $scope.teacherName;
		if(data) {
			myHttp.query({
	            'query': 'teachers',
	            'method': 'new',
	            'name': data
	        }).success(function (res) {
	            $scope.teachers.push({
	                name: data,
	                done: false,
	                id: res });
	            $scope.teacherName = '';
	        });
        }
	}

	$scope.editTeacher = function(id) {
		$scope.template = {
            name: 'detail.html',
            url: 'templates/detail.html'
        };

        for (var i = $scope.teachers.length - 1; i >= 0; i--) {
            if ($scope.teachers[i].id === id) {
                $scope.item = angular.copy($scope.teachers[i]);
                $scope.temp = angular.copy($scope.item);
            }
        };
	}
	$scope.isClean = function () {
        return angular.equals($scope.temp, $scope.item);
    }

	$scope.cancel = function () {
        $scope.template = '';
    }

    $scope.save = function () {
    	if ($scope.item.name) {
    		console.log('not empty');
    	
	    	myHttp.query({
	    		'query': 'teachers',
	            'method': 'update',
	            'id': $scope.item.id,
	            'name': $scope.item.name
	    	}).success(function(res){
	    		$scope.getTeachers();
	    		$scope.template = '';
	    		console.log(res);
	    	})
    	};
    }

    $scope.destroy = function () {
    	console.log($scope.item);
    	myHttp.query({
       		'query': 'teachers',
            'method': 'delete',
            'id': $scope.item.id
        }).success(function (data) {
        	$scope.getTeachers();
        	$scope.template = '';
        });
    }
});

//////////////////////////////
//		ActivitiesCtrl		//
//////////////////////////////
app.controller('ActivitiesCtrl', function( $scope, myHttp ) {
	$scope.button_value = 'Save';
	$scope.duration = 1;
	$scope.active = 0;
	$scope.student_number = -1;

	$scope.groups = [];
	$scope.subgroups = [];
	$scope.act_group = '';
	$scope.act_subgroup = '';

	$scope.getActivities = function () {
        myHttp.query({
            'query': 'activities',
            'method': 'get-all'
        }).success(function (data) {
            $scope.activities = data;
        });
    }

	$scope.getStudents = function () {
        myHttp.query({
            'query': 'students',
            'method': 'get-all'
        }).success(function (data) {
            $scope.students = data;
            $scope.act_student = $scope.students[0];

			$scope.getGroups($scope.act_student.id);
        });
    }

	$scope.getGroups = function (id) {
		if(id){
			myHttp.query({
				'query': 'groups',
				'method': 'get-single',
				'id': id
			}).success(function (data){
				$scope.groups = data;
				if($scope.groups[0] != undefined){
					$scope.act_group = $scope.groups[0];
					$scope.getSubgroups($scope.act_group.id);
				}else{
					$scope.groups = [];
					$scope.act_group = null;
				}
				$scope.act_subgroup = null;
				$scope.subgroups = [];				
			});
		}
	}

	$scope.getSubgroups = function (id) {
		if(id){
			myHttp.query({
				'query': 'subgroups',
				'method': 'get-single',
				'id': id
			}).success(function (data){
				$scope.subgroups = data;
				if($scope.subgroups[0] != undefined){
					$scope.act_subgroup = $scope.subgroups[0];
				} else{
					$scope.act_subgroup = null;
				}
			});
		}
	}

	$scope.chosenTeachers = [];
	$scope.chosenStudents = [];

	$scope.selectGroup = function () {
		for (var i = 0; i < $scope.chosenStudents.length; i++) {
			if($scope.chosenStudents[i].group_name == $scope.act_group.group_name) {			
				console.log("Group matches");	
				return;
			}
		}
		$scope.chosenStudents.push($scope.act_group);
		$scope.chosenS = $scope.chosenStudents[0];
	}

	$scope.selectSubGroup = function () {
		for (var i = 0; i < $scope.chosenStudents.length; i++) {
			if($scope.chosenStudents[i].subgroup_name == $scope.act_subgroup.subgroup_name) {			
				console.log("Subgroup matches");	
				return;
			}
		}
		$scope.chosenStudents.push($scope.act_subgroup);
		$scope.chosenS = $scope.chosenStudents[0];
	}

	$scope.removeS = function () {
		for (var i = $scope.chosenStudents.length - 1; i >= 0; i--) {
			if($scope.chosenStudents[i] == $scope.chosenS) {
				$scope.chosenStudents.splice($scope.chosenStudents.indexOf($scope.chosenS),1);
				$scope.chosenS = $scope.chosenStudents[0];
				return;
			}
		}
	}
	
	$scope.removeT = function () {
		for (var i = $scope.chosenTeachers.length - 1; i >= 0; i--) {
			if($scope.chosenTeachers[i] == $scope.chosenT) {
				$scope.chosenTeachers.splice($scope.chosenTeachers.indexOf($scope.chosenT),1);
				$scope.chosenT = $scope.chosenTeachers[0];
				return;
			}
		}
	}
	
	$scope.updateT = function() {
		for (var i = $scope.chosenTeachers.length - 1; i >= 0; i--) {
			if($scope.chosenTeachers[i] == $scope.act_teacher) {
				console.log("matches");	
				return;
			}
		}
		
		if($scope.chosenTeachers.length == 0){
			$scope.chosenTeachers.push($scope.act_teacher);
			$scope.chosenT = $scope.chosenTeachers[0];
		}
	}
	
	$scope.updateS = function() {
		for (var i = $scope.chosenStudents.length - 1; i >= 0; i--) {
			if($scope.chosenStudents[i] == $scope.act_student) {			
				console.log("Year matches");	
				return;
			}			
		}
		$scope.chosenStudents.push($scope.act_student);
		$scope.chosenS = $scope.chosenStudents[0];
	}
	
	$scope.editThis = function(id) {
		$scope.chosenS = '';
		$scope.chosenT = '';
		$scope.chosenStudents = [];
		$scope.chosenTeachers = [];
		$scope.subject = $scope.subjects[0];

		for (var i = $scope.activities.length - 1; i >= 0; i--) {
			console.log(i);
			if ($scope.activities[i].id == id) {
				console.log('match');
				$scope.tmp_id = id;
				$scope.chosenStudents.push({year_name:$scope.activities[i].year_name, id:$scope.activities[i].student_id});
				$scope.chosenTeachers.push({name:$scope.activities[i].teach_name, id:$scope.activities[i].teacher_id});
				$scope.chosenS = $scope.chosenStudents[0];
				$scope.chosenT = $scope.chosenTeachers[0];
				$scope.student_number = parseInt($scope.activities[i].number_of_students);
				$scope.duration = parseInt($scope.activities[i].duration);
				console.log($scope.chosenStudents);
				for (var j = $scope.subjects.length - 1; j >= 0; j--) {
					if($scope.subjects[j].name == $scope.activities[i].subj_name) {
						$scope.subject = $scope.subjects[j];
						continue;
					}
				}
				
				$scope.button_value = 'Update';
				console.log('match');
				$scope.checked = true;
				return;
			};
			
		};
	}
	
	$scope.cancel = function() {
		$scope.getActivities();
		$scope.getSubjects();
		$scope.chosenS = '';
		$scope.chosenT = '';
		$scope.chosenStudents = [];
		$scope.chosenTeachers = [];
		$scope.duration = 1;
		$scope.student_number = -1;
		$scope.button_value = 'Save';
		$scope.checked = false;
	}
	
	$scope.deleteAct = function(id) {
		myHttp.query({
            'query'	: 'activities',
            'method': 'delete',
			'id': id
			})
			.success(function (result) {
				$scope.activity = '';
				$scope.getActivities();
				$scope.checked = false;
			});
		
	}
	
	$scope.saveAct = function() {
		var data = [
			$scope.chosenTeachers,
			$scope.chosenStudents,
			$scope.subject,
			$scope.duration,
			$scope.active,
			$scope.student_number
		];
		if($scope.button_value == 'Update'){
		console.log('update');
			myHttp.query({
            'query'	: 'activities',
            'method': 'update',
            'data'	: data,
			'id' : $scope.tmp_id
			})
			.success(function (result) {
				$scope.getActivities();
				$scope.button_value = 'Save';
				$scope.checked = false;
				$scope.tmp_id = '';
			});
		
		} else {
			console.log('new');
			myHttp.query({
				'query'	: 'activities',
				'method': 'new',
				'data'	: data
			})
			.success(function (result) {
				$scope.getActivities();
			});
		}
		
		$scope.chosenS = '';
		$scope.chosenT = '';
		$scope.chosenStudents = [];
		$scope.chosenTeachers = [];
		$scope.subject = null;
	}

	$scope.isOK = function() {
		if ($scope.chosenStudents.length && $scope.chosenTeachers.length && $scope.subject) {
			return 0;
		};
		return 1;
	}

    $scope.getActivities();
	$scope.getStudents();
});
//////////////////////////////
//		SubjectsCtrl		//
//////////////////////////////
app.controller('SubjectsCtrl', function( $scope, myHttp ) {
    $scope.addItem = function () {
        var tmp_name = $scope.subjectName;
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
	            $scope.subjectName = '';
	        });
        };
    }

    $scope.editThis = function (id) {
        $scope.template = {
            name: 'form_nko.html',
            url: 'templates/detail.html'
        };

        for (var i = $scope.subjects.length - 1; i >= 0; i--) {
            if ($scope.subjects[i].id === id) {
                $scope.item = angular.copy($scope.subjects[i]);
                $scope.temp = angular.copy($scope.item);
            }
        };
    }

    $scope.isClean = function () {
        return angular.equals($scope.temp, $scope.item);
    };

    $scope.cancel = function () {
        $scope.template = '';
    };

    $scope.save = function () {
    	if ($scope.item.name) {
	        myHttp.query({
	            'query': 'subjects',
	            'method': 'update',
	            'id': $scope.item.id,
	            'name': $scope.item.name
	        }).success(function (data) {
	            $scope.getSubjects();
	            $scope.template = '';
	        });
        };
    }

    $scope.destroy = function () {
        myHttp.query({
            'query': 'subjects',
            'method': 'delete',
            'id': $scope.item.id
        }).success(function (data) {
            $scope.getSubjects();
            $scope.template = '';
        });
    }

});
//////////////////////////////
//		Students  			//
//////////////////////////////
app.controller('StudentsCtrl', function ($scope, myHttp) {
	$scope.button_Year = "New";
	$scope.button_Group = "New";
	$scope.button_SubGroup = "New";
	$scope.modify_Year = "Modify";
	$scope.modify_Group = "Modify";
	$scope.modify_SubGroup = "Modify";
	$scope.students = [];
	$scope.groups = [];
	$scope.subgroups = [];

	$scope.isAddableMulti = function(){
		if($scope.button_Year == "Add" || $scope.button_Group == "Add" || $scope.button_SubGroup == "Add")
			return 1;
		return 0;
	}
	$scope.isModifiableMulti = function(){
		if($scope.modify_Year == "Update" || $scope.modify_Group == "Update" || $scope.modify_SubGroup == "Update")
			return 1;
		return 0;
	}

	$scope.isAddable = function(button){
		if(button == "Add")
			return 0;
		return 1;
	}
	$scope.isModifiable = function(button){
		if(button == "Update")
			return 0;
		return 1;
	}
	

	$scope.activeYear = function() {
		if ($scope.act_student1 == undefined) {
			return 1;
		};
		return 0;
	}
	$scope.activeGroup = function() {
		if ($scope.act_group == undefined) {
			return 1;
		};
		return 0;
	}
	$scope.activeSubGroup = function() {
		if ($scope.act_subgroup == undefined) {
			return 1;
		};
		return 0;
	}

	$scope.cancel = function() {
		$scope.button_Year = "New";
		$scope.button_Group = "New";
		$scope.button_SubGroup = "New";
		$scope.modify_Year = "Modify";
		$scope.modify_Group = "Modify";
		$scope.modify_SubGroup = "Modify";
		if($scope.act_student1){
			$scope.outYear = $scope.act_student1.year_name;
			$scope.outYearNumber = parseInt($scope.act_student1.num_students);
		}
		if($scope.act_group){
			$scope.outGroup = $scope.act_group.group_name;
			$scope.outGroupNumber = parseInt($scope.act_group.num_of_students);
		}
		if($scope.act_subgroup){
			$scope.outSubGroup = $scope.act_subgroup.subgroup_name;
			$scope.outSubGroupNumber = parseInt($scope.act_subgroup.num_of_students);
		}
	}

	$scope.clearYear = function() {
		$scope.outYear = null;
		$scope.outYearNumber = null;
		$scope.clearGroup();
	}
	$scope.clearGroup = function() {
		$scope.outGroup = null;
		$scope.outGroupNumber = null;
		$scope.clearSubGroup();
	}
	$scope.clearSubGroup = function () {
		$scope.outSubGroup = null;
		$scope.outSubGroupNumber = null;
	}

	$scope.addYear = function () {
		if($scope.button_Year == "New"){
			$scope.clearYear();
			$scope.button_Year = "Add";
		} else if($scope.button_Year == "Add"){
			var tmp_name = $scope.outYear;
        	var tmp_amount = $scope.outYearNumber;
			myHttp.query({
	            'query': 'students',
	            'method': 'new',
	            'year_name': tmp_name,
	            'num_students': tmp_amount
	        }).success(function (data) {
	            console.log(data);
				$scope.getStudents();
	        });
			$scope.button_Year = "New";
		}
    };
	$scope.addGroup = function () {
		if($scope.button_Group == "New"){
			$scope.clearGroup();
			$scope.button_Group = "Add"
		} else if($scope.button_Group == "Add"){
			myHttp.query({
	            'query': 'groups',
	            'method': 'new',
	            'year_id': $scope.act_student1.id,
	            'num_students': $scope.outGroupNumber,
				'group_name': $scope.outGroup 
	        }).success(function (data) {
	            $scope.getGroups($scope.act_student1.id);
	        });
			$scope.button_Group = "New";
		}
	}
	$scope.addSubGroup = function () {
		if($scope.button_SubGroup == "New"){
			$scope.clearSubGroup();
			$scope.button_SubGroup = "Add"
		} else if($scope.button_SubGroup == "Add"){
			myHttp.query({
	            'query': 'subgroups',
	            'method': 'new',
	            'group_id': $scope.act_group.id,
	            'num_of_students': $scope.outSubGroupNumber,
				'subgroup_name': $scope.outSubGroup,
				'student_id': $scope.act_student1.id
	        }).success(function (data) {
				$scope.clearSubGroup();
	            $scope.getSubgroups($scope.act_group.id);
				
	        });
			$scope.button_SubGroup = "New";
		}
	}

	$scope.modifyYear = function () {
		if($scope.modify_Year == "Modify"){
			$scope.clearGroup();
			$scope.modify_Year = "Update";
		}
		else if($scope.modify_Year == "Update"){
			if ($scope.outYear && $scope.outYearNumber) {
				myHttp.query({
					'query': 'students',
					'method': 'update',
					'id': $scope.act_student1.id,
					'year_name': $scope.outYear,
					'num_students': $scope.outYearNumber
				}).success(function (data) {
					$scope.getStudents();
				});
			}
			$scope.modify_Year = "Modify";
		}
	}
	$scope.modifyGroup = function (id) {
		if($scope.modify_Group == "Modify"){
			$scope.clearSubGroup();
			$scope.modify_Group = "Update";
		}
		else if($scope.modify_Group == "Update"){
			if ($scope.outGroup && $scope.outGroupNumber) {
				myHttp.query({
					'query': 'groups',
					'method': 'update',
					'id': $scope.act_group.id,
					'group_name': $scope.outGroup,
					'num_of_students': $scope.outGroupNumber
				}).success(function (data) {
					$scope.getStudents();
				});
			}
			$scope.modify_Group = "Modify";
		}
	}
	$scope.modifySubGroup = function (id) {
		if($scope.modify_SubGroup == "Modify"){
			$scope.modify_SubGroup = "Update";
		}
		else if($scope.modify_SubGroup == "Update"){
			if ($scope.outSubGroup && $scope.outSubGroupNumber) {
				myHttp.query({
					'query': 'subgroups',
					'method': 'update',
					'id': $scope.act_subgroup.id,
					'subgroup_name': $scope.outSubGroup,
					'num_of_students': $scope.outSubGroupNumber
				}).success(function (data) {
					$scope.getStudents();
				});
			}
			$scope.modify_SubGroup = "Modify";
		}
	}

	$scope.destroyYear = function (id) {
        myHttp.query({
            'query': 'students',
            'method': 'delete',
            'id': id
        })
		.success(function (data) {
			$scope.getStudents();
		});
    }
	$scope.destroyGroup = function (id) {
        myHttp.query({
            'query': 'groups',
            'method': 'delete',
            'id': id
        })
		.success(function (data) {
			$scope.getStudents();
		});
    }
	$scope.destroySubGroup = function (id) {
        myHttp.query({
            'query': 'subgroups',
            'method': 'delete',
            'id': id
        })
		.success(function (data) {
			$scope.getStudents();
		});
    }

	$scope.getStudents = function () {
		myHttp.query({
			'query': 'students',
			'method': 'get-all'
		}).success(function (data){
			$scope.students = data;
			$scope.groups = [];
			$scope.subgroups = [];
			$scope.act_subgroup = null;
			$scope.act_student1 = $scope.students[0];
			$scope.outYear = $scope.act_student1.year_name;
			$scope.outYearNumber = parseInt($scope.act_student1.num_students);
			$scope.getGroups($scope.act_student1.id);
		});
	}
	$scope.getGroups = function (id) {
		if(id){
			myHttp.query({
				'query': 'groups',
				'method': 'get-single',
				'id': id
			}).success(function (data){
				$scope.groups = data;
				if($scope.groups[0] != undefined){
					$scope.act_group = $scope.groups[0];
					$scope.outGroup = $scope.act_group.group_name;
					$scope.outGroupNumber = parseInt($scope.act_group.num_of_students);
				}else{
					$scope.groups = [];
					$scope.act_group = null;
					$scope.outGroup = null;
					$scope.outGroupNumber = null;
				}
				$scope.act_subgroup = null;
				$scope.subgroups = [];
				
				$scope.outSubGroup = null;
				$scope.outSubGroupNumber = null;
				$scope.outYear = $scope.act_student1.year_name;
				$scope.outYearNumber = parseInt($scope.act_student1.num_students);
			});
		}
	}
	$scope.getSubgroups = function (id) {
		if(id){
			myHttp.query({
				'query': 'subgroups',
				'method': 'get-single',
				'id': id
			}).success(function (data){
				$scope.subgroups = data;
				if($scope.subgroups[0] != undefined){
					$scope.act_subgroup = $scope.subgroups[0];
					$scope.getSubgroupInfo();
				} else{
					$scope.outSubGroup = null;
					$scope.outSubGroupNumber = null;
					$scope.act_subgroup = null;
				}
				$scope.outGroup = $scope.act_group.group_name;
				$scope.outGroupNumber = parseInt($scope.act_group.num_of_students);
			});
		}
	}
	$scope.getSubgroupInfo = function () {
		$scope.outSubGroup = $scope.act_subgroup.subgroup_name;
		$scope.outSubGroupNumber = parseInt($scope.act_subgroup.num_of_students);
	}

	$scope.getStudents();
});
//////////////////////////////
//		SPACE   			//
//////////////////////////////
app.controller('SpaceCtrl', function( $scope, myHttp ) {
	
    $scope.buildings = [];
    $scope.building = [];
    $scope.data = [];
    $scope.rooms = [];
    $scope.update = function () {
        $scope.rooms = [];
        for (var i = 0; i < $scope.data.length; i++) {
            if ($scope.data[i].building_id == $scope.building.id) {
                $scope.rooms.push($scope.data[i]);
            }
        }
        $scope.room = $scope.rooms[0];
    }
    $scope.getBuildings = function () {
        myHttp.query({
            'query': 'buildings',
            'method': 'get-all'
        }).success(function (data) {
            $scope.buildings = data;
            $scope.building = $scope.buildings[0];
            $scope.getRooms();
        });

    }
    $scope.getRooms = function() {
    	myHttp.query({
            'query': 'rooms',
            'method': 'get-all'
        }).success(function (data) {
            $scope.data = data;
			$scope.update();
        });
    }
    $scope.getBuildings();


    $scope.addRoom = function () {
        var tmp_id = '';
        if ($scope.roomID) {
            tmp_id = $scope.roomID;
            if ($scope.roomName && $scope.roomCapacity) {
	            for (var i = $scope.data.length - 1; i >= 0; i--) {
	                if ($scope.data[i].id == tmp_id) {
	                    $scope.data[i].name = $scope.roomName;
	                    $scope.data[i].capacity = $scope.roomCapacity;

	                    myHttp.query({
	                        'query': 'rooms',
	                        'method': 'update',
	                        'name': $scope.roomName,
	                        'capacity': $scope.roomCapacity,
	                        'id': tmp_id
	                    }).success(function (data) {
	                        console.log(data);
	                    });
	                }
	            };
        	};
        } else {

            var tmp_name = $scope.roomName;
            var tmp_c = $scope.roomCapacity;
            var tmp_bid = $scope.building.id;
            if (tmp_name && tmp_c) {
	            myHttp.query({
	                'query': 'rooms',
	                'method': 'new',
	                'name': tmp_name,
	                'build_id': tmp_bid,
	                'capacity': tmp_c
	            }).success(function (data) {
	                console.log(data);
	            });

	            $scope.data.push({
	                name: $scope.roomName,
	                capacity: $scope.roomCapacity,
	                building_id: $scope.building.id,
	                id: Math.floor((Math.random() * 100) + 1),
	                done: false
	            });
            };
        }
        console.log($scope.buildings);
        $scope.update();
        $scope.roomID = '';
        $scope.roomName = '';
        $scope.roomCapacity = '';
    }
    $scope.deleteRoom = function (id) {
        console.log("room: " + id);
        myHttp.query({
            'query': 'rooms',
            'method': 'delete',
            'id': id
        }).success(function (data) {
            console.log(data);
        });
        $scope.data.splice($scope.data.indexOf($scope.room), 1);
        $scope.update();

    };

    $scope.show = function () {
        return !$scope.rooms.length;
    }
    $scope.showB = function () {
        return !$scope.buildings.length;
    }

    $scope.addItem = function () {
        var tmp_id = '';
        if ($scope.buildingID) {
            tmp_id = $scope.buildingID;
            if ($scope.buildingInput) {
	            console.log(tmp_id);
	            for (var i = 0; i < $scope.buildings.length; i++) {
	                if ($scope.buildings[i].id == tmp_id) {
	                    myHttp.query({
	                        'query': 'buildings',
	                        'method': 'update',
	                        'name': $scope.buildingInput,
	                        'id': tmp_id
	                    }).success(function (data) {

	                        console.log($scope.buildings);
	                    });
	                    $scope.buildings[i].name = $scope.buildingInput;
	                }
	            }
            };
        } else {
            var tmp_name = $scope.buildingInput;
            if (tmp_name) {
	            myHttp.query({
	                'query': 'buildings',
	                'method': 'new',
	                'name': tmp_name
	            }).success(function (data) {
	                $scope.buildings.push({
	                    name: tmp_name,
	                    id: data,
	                    done: true
	                });
	            });
            };
        }
        $scope.buildingInput = '';

        $scope.buildingID = '';
        $scope.building = $scope.buildings[0];

    };
    $scope.editRoom = function () {
        console.log($scope.building);
        $scope.roomName = $scope.room.name;
        $scope.roomCapacity = $scope.room.capacity;
        $scope.roomID = $scope.room.id;

    };

    $scope.editItem = function () {
        console.log($scope.room);
        $scope.buildingInput = $scope.building.name;
        $scope.buildingID = $scope.building.id;
    };
    $scope.deleteItem = function () {
        console.log($scope.building);
        for (var i = 0; i < $scope.data.length; i++) {
            if ($scope.data[i].building_id == $scope.building.id) {
                console.log('alert');
                if (confirm('Are you sure you want to delete building, building has rooms?')) {
                    $scope.buildings.splice($scope.buildings.indexOf($scope.building), 1);

                    var q = $scope.building.id;
                    var q1 = $scope.data.length;
                    for (var j = q1 - 1; j >= 0; j--) {
                        if ($scope.data[j].building_id === q) {
                            console.log('match ' + j);
                            $scope.data.splice(j, 1);
                        }
                    };
                    console.log($scope.data);
                    $scope.building = $scope.buildings[0];
                    $scope.update();
                    return;
                } else {
                    return;
                }
            }
        }
        myHttp.query({
            'query': 'buildings',
            'method': 'delete',
            'id': $scope.building.id
        }).success(function (data) {
            console.log(data);
        });

        $scope.buildings.splice($scope.buildings.indexOf($scope.building), 1);
        $scope.building = $scope.buildings[0];
        $scope.update();
    };

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

