angular.module( 'polymerblog.login', [])
    .controller( 'LoginCtrl', function HomeController( $scope, AuthService ) {

        $scope.login = AuthService.login;

    })
;
