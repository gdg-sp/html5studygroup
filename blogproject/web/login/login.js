angular.module('polymerblog.login', [
  'auth0',
  'pascalprecht.translate'
])
  .config(function ($translateProvider) {
    $translateProvider.translations('pt-br', {
      login: {
        welcome: 'Bem vindo ao Polymer Blog, faça o login para continuar',
        makeLogin: 'Fazer o login',
        error: 'Houve erro ao logar veja o console.'
      }
    });
    $translateProvider.translations('en', {
      login: {
        welcome: 'Welcome to Polymer Blog login to continue.',
        makeLogin: 'Make login',
        error: 'There was an error log, see the console.'
      }
    });

    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.preferredLanguage('pt-br');
  })
  .controller('LoginCtrl', function HomeController($scope, auth, $location, store, $filter) {

    $scope.login = function () {
      auth.signin({}, function (profile, token) {
        store.set('profile', profile);
        store.set('token', token);
        $location.path("/");
      }, function (error) {
        console.log($filter('translate')('login.error'), error);
      });
    }
  });

