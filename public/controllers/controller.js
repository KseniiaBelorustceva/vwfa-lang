//$.cookie("participantID", "");
//static var participantID = "";
//window.parent.participantID = "";  // should be global thus visible in experiment.js


myApp.controller('AppCtrl', ['$scope','$http','$location', 	

	$scope.participantID = myService.sharedParticipantID;

	function($scope, $http, $location){
		
		var baseUrl = $location.path;
		/* available on '/participate' */
		/* to be removed after debugging */
		$scope.refresh = function (){
			$http.get('/participate').success(function(response){
				$scope.participantlist = response;
				$scope.participant = "";
			});
		};

		

		$scope.addParticipant = function(){
			console.log($scope.participant);
			console.log("age: " + $scope.participant.age);
			$http.post('/participate', $scope.participant).success(function(response){
				console.log("responce after insertimg a participant: response.age " + response.age);
				console.log("responce after insertimg a participant: response._id " + response._id);
				//window.parent.participantID = response._id;
				//$.cookie("participantID", response._id);
				participantID = response._id;
				console.log("participantID now set to:" + participantID);
			});
		
		};
		



/*  end of myApp.controller('ExpCtrl', ['$scope','$http','$location', function { */

	}]);



