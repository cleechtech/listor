

app.directive('candidate', function(){
	return {
		template: '<h4>{{ item.displayName }}</h4>' +
			'<p>{{ item.email }}, {{ item.phone }}</p>' +
			'<p>{{ item.comments }}</p>'
	};
});