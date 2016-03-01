
app.controller('MainCtrl', function($rootScope, $scope, Candidate){
	$scope.addCandidate = function(candidate){
		candidate.owner = $rootScope.user._id;
		return Candidate.add(candidate).then(function(res){
			$scope.reset();
		});
	};

	$scope.reset = function() {
		$scope.c = angular.copy($scope.master);
	};

	$scope.refreshCandidates = function(){
		console.log('calling all candidates...');
		Candidate.all().then(function(res){
			console.log(res);
		});
	};
});