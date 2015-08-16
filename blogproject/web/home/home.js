angular.module( 'polymerblog.home', [
  'auth0',
  'pascalprecht.translate'
])
.config(function ($translateProvider) {
  $translateProvider.translations('pt-br', {
    home: {
      testServerSuccess: 'Sucesso ao consultar o server Node.js',
      testServerError: 'Erro ao consultar o server, você está logado? O Server foi iniciado?',
      wellcome: 'Bem-Vindo',
      makeAuthCall: 'Fazer Chamada Autenticada',
      viewPosts: 'Ver os Posts'
    }
  });

  $translateProvider.translations('en', {
    home: {
      testServerSuccess: 'Success to query the server Node.js',
      testServerError: 'Error to query the server, do you are logged? The server has started?',
      wellcome: 'Wellcome',
      makeAuthCall: 'Make Authenticated Call',
      viewPosts: 'View Posts'
    }
  });
})
.controller( 'HomeCtrl', function HomeController( $scope, auth, $http, $location, store, $filter) {

  $scope.auth = auth;

  $scope.callApi = function() {
    // Just call the API as you'd do using $http
    $http({
      url: 'http://localhost:3001/secured/ping',
      method: 'GET'
    }).then(function() {
      alert($filter('translate')('home.testServerSuccess'));
    }, function(response) {
      if (response.status == 0) {
        alert($filter('translate')('home.testServerError'));
      }
      else {
        alert(response.data);
      }
    });
  }

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  }
  
  $scope.redirectPosts = function() {
    $location.path('/posts');
  }

});
