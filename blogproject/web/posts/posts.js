angular.module( 'polymerblog.posts', [
	'auth0',
	'pascalprecht.translate'
])
.config(function ($translateProvider) {
  $translateProvider.translations('pt-br', {
    posts: {
      viewPosts: 'Vendo posts como'
    }
  });

  $translateProvider.translations('en', {
    posts: {
      viewPosts: 'Viewing posts as'
    }
  });
})
.controller( 'PostsCtrl', function PostsController( $scope, auth, $http, $location, store, AuthService ) {
	$scope.auth = AuthService.auth;

	$scope.logout = AuthService.logout;
});
