(function() {
	'use strict';

	angular.module('polymerblog.home', ['auth0']).controller('HomeCtrl', HomeController);

	HomeController.$inject = ['auth', '$http', '$state', 'store'];

	function HomeController(auth, $http, $state, store) {

		var vm = this;
		vm.auth = auth;
		vm.logout = logout;
		vm.callApi = callApi;
		vm.redirectPosts = redirectPosts;

		function callApi() {
			$http({
				url: 'http://localhost:3000/secured/ping',
				method: 'GET'
			}).then(function() {
				alert("Sucesso ao consultar o server Node.js");
			}, function(response) {
				if (response.status === 0) {
					alert("Erro ao consultar o server, você está logado? O Server foi iniciado?");
				} else {
					alert(response.data);
				}
			});
		}

		function logout() {
			auth.signout();
			store.remove('profile');
			store.remove('token');
			$state.go('login');
		}

		function redirectPosts() {
			$state.go('posts');
		}
	}
}());
