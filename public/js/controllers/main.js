
app.controller('MainCtrl', function($rootScope, $scope, $q, Candidate){
	$scope.master = {};
	$scope.c = {};
	$scope.showAddForm = false;

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

			// For the drag and drop
			$scope.models = {
		        selected: null,
		        lists: {
		        	"Needs Approval": $scope.needsApproval, 
		        	"Needs Feedback": $scope.needsFeedback,
		        	"Needs Interview": $scope.needsInterview,
		        	"Final Stages": $scope.finalStages
		        }
		    };
		}).catch(function(err){
			console.error(err);
		});
	};

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
});