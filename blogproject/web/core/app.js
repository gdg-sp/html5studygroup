angular.module('polymerblog', [
		'auth0',
		'ngRoute',
		'polymerblog.home',
		'polymerblog.login',
		'polymerblog.posts',
		'angular-storage',
		'angular-jwt'
	])
	.config(polymerBlogConfig)
	.run(polymerBlogRun)
	.controller('AppCtrl', AppCtrl);

function polymerBlogConfig($routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {
	$routeProvider
		.when('/', {
			controller: 'HomeCtrl',
			templateUrl: 'home/home.html',
			pageTitle: 'Homepage',
			requiresLogin: true
		})
		.when('/posts', {
			controller: 'PostsCtrl',
			templateUrl: 'posts/posts.html',
			pageTitle: 'Posts',
			requiresLogin: true
		})
		.when('/login', {
			controller: 'LoginCtrl',
			templateUrl: 'login/login.html',
			pageTitle: 'Login'
		})
		.otherwise({
			redirectTo: '/'
		});


	authProvider.init({
		domain: AUTH0_DOMAIN,
		clientID: AUTH0_CLIENT_ID,
		loginUrl: '/login'
	});

	jwtInterceptorProvider.tokenGetter = function(store) {
		return store.get('token');
	}

	// Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
	// NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
	// want to check the delegation-token example
	$httpProvider.interceptors.push('jwtInterceptor');
}

function polymerBlogRun($rootScope, auth, store, jwtHelper, $location) {
	$rootScope.$on('$locationChangeStart', function() {
		if (!auth.isAuthenticated) {
			var token = store.get('token');
			if (token) {
				if (!jwtHelper.isTokenExpired(token)) {
					auth.authenticate(store.get('profile'), token);
				} else {
					$location.path('/login');
				}
			}
		}

	});
}

function AppCtrl($scope, $location) {
	$scope.$on('$routeChangeSuccess', function(e, nextRoute) {
		if (nextRoute.$$route && angular.isDefined(nextRoute.$$route.pageTitle)) {
			$scope.pageTitle = nextRoute.$$route.pageTitle + ' | Auth0 Sample';
		}
	});
}
