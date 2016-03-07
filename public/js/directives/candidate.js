

app.directive('candidate', function(){
	return {
		template: '<h4>{{ item.displayName }} <span ng-click="deleteCandidate(item, listName)">X</span></h4>' +
			'<p>{{ item.email }}, {{ item.phone }}</p>' +
			'<p>{{ item.comments }}</p>'
	};
});