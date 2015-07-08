angular.module( 'polymerblog.home', [
'auth0'
])
.controller( 'HomeCtrl', function HomeController( $scope, auth, $http, $location, store ) {

  $scope.auth = auth;

  $scope.callApi = function() {
    // Just call the API as you'd do using $http
    $http({
      url: 'http://localhost:3001/secured/ping',
      method: 'GET'
    }).then(function() {
      alert("Sucesso ao consultar o server Node.js");
    }, function(response) {
      if (response.status == 0) {
        alert("Erro ao consultar o server, você está logado? O Server foi iniciado?");
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
