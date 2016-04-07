
app.controller('MainCtrl', function($rootScope, $scope, $q, Candidate, $uibModal, Job, $timeout){
	$scope.master = {};
	$scope.c = {};
	$scope.showAddForm = false;

	// .....yeah
	$timeout(function(){
		Job.all().then(function(res){
			$scope.jobs = res.data;

			// make a pretty string
			res.data.forEach(function(job, i){
				$scope.jobs[i].displayString = job.title + ' - ' + job.company;
			});
		});
	});

	$scope.addCandidate = function(candidate){
		candidate.owner = $rootScope.user._id;
		console.log(candidate);
		return Candidate.add(candidate).then(function(res){
			$scope.reset();
		});
	};

	// edit candidate madal popup
	$scope.editCandidate = function(candidate, fromList){

		// create modal instance
    	var modalInstance = $uibModal.open({
			animation: false,
			templateUrl: 'templates/modal-editCandidate.html',
			controller: 'ModalInstanceCtrl',
			size: 'sm',
			resolve: {
				candidate: function () {
					// sync up the status, then pass to controller
					candidate.status = fromList;
					console.log(candidate);
			  		return candidate;
				}
	    	}
    	});

    	modalInstance.result.then(function (candidate) {
    		console.log(candidate);
    	}, function () {
      		console.log('Modal dismissed at: ' + new Date());
    	});
	};

	$scope.deleteCandidate = function(c, listName){
		var ursure = confirm('sure you want to delete ' + c.displayName + '?');
		if(ursure){
			Candidate.remove(c._id).then(function(){
				var list = $scope.models.lists[listName];
				// remove from list
				list.splice(list.indexOf(c), 1);
			});
		}
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

	$scope.droppedTo = function(listName, item){
		$scope.models.lists[listName].unshift(item);
		Candidate.updateStatus(item._id, listName);
		return true;
	};

});