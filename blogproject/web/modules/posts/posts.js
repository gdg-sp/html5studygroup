(function() {
	'use strict';

	angular.module('polymerblog.posts', ['auth0']).controller('PostsCtrl', PostsController);

	PostsController.$inject = ['auth', '$state', 'store'];

	function PostsController(auth, $state, store) {

		var vm = this;
		vm.auth = auth;
		vm.logout = logout;

		function logout() {
			auth.signout();
			store.remove('profile');
			store.remove('token');
			$state.go('login');
		}
	}
}());
