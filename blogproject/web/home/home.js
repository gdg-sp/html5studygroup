angular.module('polymerblog.home', [
  'auth0',
  'pascalprecht.translate'
])
  .config(function ($translateProvider) {
    $translateProvider.translations('pt-br', {
      home: {
        success: 'Sucesso ao consultar o server Node.js',
        error: 'Erro ao consultar o server, você está logado? O Server foi iniciado?',
        welcome: 'Bem-Vindo',
        callAuthenticated: 'Fazer Chamada Autenticada',
        viewPosts: 'Ver os Posts'
      }
    });
    $translateProvider.translations('en', {
      home: {
        success: 'Success to query the server Node.js',
        error: 'Error querying the server, you logged in?. The server started?',
        welcome: 'Welcome',
        callAuthenticated: 'Make call authenticated',
        viewPosts: 'View posts'
      }
    });

    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.preferredLanguage('pt-br');
  })
  .controller('HomeCtrl', function HomeController($scope, auth, $http, $location, store, $filter) {

    $scope.auth = auth;

    $scope.callApi = function () {
      // Just call the API as you'd do using $http
      $http({
        url: 'http://localhost:3001/secured/ping',
        method: 'GET'
      }).then(function () {
        alert($filter('translate')('home.success'));
      }, function (response) {
        if (response.status == 0) {
          alert($filter('translate')('home.error'));
        }
        else {
          alert(response.data);
        }
      });
    };

    $scope.logout = function () {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $location.path('/login');
    };

    $scope.redirectPosts = function () {
      $location.path('/posts');
    }
  });