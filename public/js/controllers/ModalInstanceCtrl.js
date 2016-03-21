app.controller('ModalInstanceCtrl', function($scope, candidate, Candidate, $uibModalInstance){

	// candidate = JS object of candidate to edit
	// Candidate = angular.js facotry for CRUDing candidates

	$scope.candModal = candidate;

	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	};

	$scope.editCandidate = function(){
		Candidate.update($scope.candModal).then(function(res){
			$uibModalInstance.close(res.data);
		});
	};
});