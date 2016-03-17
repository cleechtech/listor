
app.controller('JobsCtrl', function($scope, Job){
	Job.all().then(function(res){
		console.log(res.data);
		$scope.jobs = res.data;
	});
	
});