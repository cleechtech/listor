
app.factory('Job', function($http){
	return {
		all: function(){
			return $http.get('/api/jobs');
		},
		add: function(){

		},
		update: function(){

		},
		remove: function(){

		},
	}
})