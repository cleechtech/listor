
app.factory('Job', function($http, $rootScope){

	var request_jobs = function(method, url_endpoint, args){
		var current_user = $rootScope.user;
		var params = { owner: current_user._id };

		if(args){
			params = angular.extend(params, args);
		}

		return $http({
			method: method,
			url: url_endpoint,
			params: params
		});
	};

	return {
		all: function(){
			return request_jobs('GET', '/api/jobs');
		},
		getOne: function(id){
			return $http.get('/api/jobs/' + id);
		},
		add: function(newJob){
			return request_jobs('POST', '/api/jobs', newJob);
		},
		update: function(){

		},
		remove: function(){

		},
	}
})