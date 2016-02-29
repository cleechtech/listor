app.factory('Candidate', function($http) {

	return {
		add: function(candidate){
			return $http.post('/api/candidates/add', candidate);
		},
		all: function(){
			return $http.get('/api/candidates');
		}
	};
});
