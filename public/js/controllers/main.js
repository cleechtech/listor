
app.controller('MainCtrl', function($scope, $http){
	$scope.contactList = '';
	$scope.sendEmails = function(){
		var contacts = { contactList: $scope.contactList }
		// send to server
		return $http.post('/emails/sendToList', contacts).then(function(res){
			console.log(res);
			$scope.contactList = '';
		});
	};
});