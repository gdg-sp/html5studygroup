(function() {
	'use strict';

	angular.module('polymerblog.login', ['auth0']).controller('LoginCtrl', LoginController);

	function LoginController(auth, $state, store) {

		var vm = this;
		vm.login = login;

		function login() {
			auth.signin({}, function(profile, token) {
				store.set('profile', profile);
				store.set('token', token);
				$state.go('home');
			}, function(error) {
				console.log("Houve um erro ao logar, veja o console.", error);
			});
		}
	}
}());
