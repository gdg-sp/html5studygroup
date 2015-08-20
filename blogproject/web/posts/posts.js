angular.module( 'polymerblog.posts', [])
    .controller( 'PostsCtrl', function PostsController( $scope, AuthService ) {

        $scope.auth = AuthService.auth;

        $scope.logout = AuthService.logout;

    })
;
