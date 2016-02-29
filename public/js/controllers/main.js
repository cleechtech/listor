
app.controller('MainCtrl', function($scope, Candidate){
	$scope.addCandidate = function(candidate){
		console.log(candidate);
		return Candidate.add(candidate).then(function(res){
			console.log(res);
			$scope.reset();
		});
	};

	$scope.reset = function() {
		$scope.c = angular.copy($scope.master);
	};
});