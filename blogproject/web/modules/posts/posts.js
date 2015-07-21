angular.module( 'polymerblog.posts', [
'auth0'
])
.controller( 'PostsCtrl', function PostsController( $scope, auth, $http, $location, store ) {

  $scope.auth = auth;

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  }

});
