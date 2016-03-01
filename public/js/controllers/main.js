
app.controller('MainCtrl', function($rootScope, $scope, $q, Candidate){
	$scope.master = {};
	$scope.c = {};

	$scope.addCandidate = function(candidate){
		candidate.owner = $rootScope.user._id;
		return Candidate.add(candidate).then(function(res){
			$scope.reset();
		});
	};

	$scope.reset = function() {
		$scope.c = angular.copy($scope.master)
	};

	$scope.refreshCandidates = function(){
		// Candidate.all().then(function(res){
		// 	console.log(res.data);
		// });
		$q.all([
			Candidate.needsApproval(),
			Candidate.needsFeedback(),
			Candidate.needsInterview(),
			Candidate.finalStages()
		]).then(function(res){
			$scope.needsApproval = res[0].data;
			$scope.needsFeedback = res[1].data;
			$scope.needsInterview = res[2].data;
			$scope.finalStages = res[3].data;
		}).catch(function(err){
			console.error(err);
		});
	};
});