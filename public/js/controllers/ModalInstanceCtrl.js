app.controller('ModalInstanceCtrl', function($scope, candidate, Candidate, $uibModalInstance){

	// candidate = JS object of candidate to edit
	// Candidate = angular.js facotry for CRUDing candidates

	$scope.c = candidate;

	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	};

	$scope.editCandidate = function(){
		console.log($scope.c);
		Candidate.update($scope.c).then(function(res){
			console.log('response: ', res.data)
		});

		// $uibModalInstance.close($scope.selected.item);
	};
});