

app.directive('candidate', function(){
	return {
		template: '<div class="candidate">' +
			'<h4>{{ item.displayName }} <i ng-click="editCandidate(item, listName)" class="fa fa-pencil-square-o"></i><span ng-click="deleteCandidate(item, listName)">X</span></h4>' +
			'<p>{{ item.email }}, {{ item.phone }}</p>' +
			'<p>{{ item.comments }}</p>' +
			'</div>'
	};
});