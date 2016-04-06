
var app = angular.module('Listor', [
	'ui.router',
	'ui.bootstrap',
	'satellizer',
	'dndLists',
	'textAngular'
]);

app.config(function($stateProvider, $urlRouterProvider, $authProvider){
	// satellizer config
	$authProvider.google({
      clientId: '925082493768-e6ftet5isbrrhtg2tra4v7lhr23v6619.apps.googleusercontent.com'
    });

    // define routes
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "templates/main.html",
			controller: 'MainCtrl'
		})
		.state('jobs', {
			url: "/jobs",
			templateUrl: "templates/jobs.html",
			controller: 'JobsCtrl',
			resolve: {
				setTheUser: function(Account){
					return Account.setUser();
				}
			}
		})
		.state('job', {
			url: "/jobs/:id",
			templateUrl: "templates/job.html",
			controller: 'JobCtrl',
			resolve: {
				theJob: function(Job, $stateParams){
					// grab individual job
					return Job.getOne($stateParams.id);
				}
			}
		})
		.state('about', {
			url: "/about",
			templateUrl: "templates/about.html",
		})
		.state('register', {
			url: "/register",
			templateUrl: "templates/register.html",
			controller: 'AuthCtrl',
			resolve: {
	          skipIfLoggedIn: skipIfLoggedIn
	        }
		})
		.state('login', {
			url: "/login",
			templateUrl: "templates/login.html",
			controller: 'AuthCtrl'
		})
		.state('logout', {
			url: '/logout',
			template: null,
			controller: 'LogoutCtrl'
		})
		.state('profile', {
			url: '/profile',
			templateUrl: 'templates/profile.html',
			controller: 'ProfileCtrl',
			resolve: {
				loginRequired: loginRequired
			}
		});

	$urlRouterProvider.otherwise("/");

	// Resolve functions
	function skipIfLoggedIn($q, $auth) {
      var dfd = $q.defer();
      if ($auth.isAuthenticated()) {
        dfd.reject();
      } else {
        dfd.resolve();
      }
      return dfd.promise;
    }
    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }
});