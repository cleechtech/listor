app.factory('Candidate', function($http, $rootScope) {

	var request_candidates = function(url_endpoint){
		var current_user = $rootScope.user;
		return $http({
			method: 'GET',
			url: url_endpoint,
			params: { owner: current_user._id }
		});
	};

	return {
		add: function(candidate){
			return $http.post('/api/candidates/add', candidate);
		},
		updateStatus: function(id, newStatus){
			return $http.put('/api/candidates/updateStatus', {
				id: id,
				status: newStatus
			});
		},
		// general update function for changing candidate's information
		update: function(candidate){
			return $http.put('/api/candidates/update', candidate);
		},
		remove: function(id){
			return $http.delete('/api/candidates/' + id);
		},
		// get all current user's candidates
		all: function(){
			return request_candidates('/api/candidates');
		},
		needsApproval: function(){
			return request_candidates('/api/candidates/needsApproval');
		},
		needsFeedback: function(){
			return request_candidates('/api/candidates/needsFeedback');
		},
		needsInterview: function(){
			return request_candidates('/api/candidates/needsInterview');
		},
		finalStages: function(){
			return request_candidates('/api/candidates/finalStages');
		}
	};
});
