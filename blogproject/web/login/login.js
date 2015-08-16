angular.module( 'polymerblog.login', [
  'auth0',
  'pascalprecht.translate'
])
.config(function ($translateProvider) {
  $translateProvider.translations('pt-br', {
    login: {
      loginFail: 'Houve um erro ao logar, veja o console.',
      wellcome: 'Bem vindo ao Polymer Blog, faça login para continuar.',
      makeLogin: 'Fazer Login'
    }
  });

  $translateProvider.translations('en', {
    login: {
      loginFail: 'There was error on login, see the console',
      wellcome: 'Wellcome the Polymer Blog, make login to continue.',
      makeLogin: 'Make Login'
    }
  });
})
.controller( 'LoginCtrl', function HomeController( $scope, auth, $location, store, $filter) {

  $scope.login = function() {
    auth.signin({}, function(profile, token) {
      store.set('profile', profile);
      store.set('token', token);
      $location.path("/");
    }, function(error) {
      console.log($filter('translate')('login.loginFail'), error);
    });
  }

});
