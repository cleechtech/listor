
app.controller('JobsCtrl', function($scope, Job){
	Job.all().then(function(res){
		$scope.jobs = res.data;
	});

	$scope.addJob = function(newJob){
		Job.add(newJob).then(function(res){
			console.log(res.data);
		}).catch(function(err){
			console.error('Error adding the job!');
		});
	};
	
});