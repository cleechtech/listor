app.factory('Candidate', function($http, $rootScope) {

	return {
		add: function(candidate){
			return $http.post('/api/candidates/add', candidate);
		},
		all: function(){
			var current_user = $rootScope.user;
			return $http({
				method: 'GET',
				url: '/api/candidates',
				params: { owner: current_user._id }
			});
		}
	};
});
