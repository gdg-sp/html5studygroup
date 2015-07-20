(function () {
    'use strict';

    angular.module('polymerblog', [
        'auth0',
        'angular-storage',
        'angular-jwt',
        'ui.router',
        'restangular',
        'polymerblog.home',
        'polymerblog.login',
        'polymerblog.posts'
    ])
        .config(polymerBlogConfig)
        .run(polymerBlogRun)
        .controller('AppCtrl', AppCtrl);

    polymerBlogConfig.$inject = [
        'authProvider',
        '$stateProvider',
        '$urlRouterProvider',
        'jwtInterceptorProvider',
        'RestangularProvider',
        '$httpProvider'
    ];

    function polymerBlogConfig(authProvider, $stateProvider, $urlRouterProvider, jwtInterceptorProvider, RestangularProvider, $httpProvider) {

        $urlRouterProvider.otherwise('/');
        RestangularProvider.setBaseUrl('/service');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'modules/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Homepage',
                    requiresLogin: true
                }
            })
            .state('posts', {
                url: '/posts',
                templateUrl: 'modules/posts/posts.html',
                controller: 'PostsCtrl',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Posts',
                    requiresLogin: true
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'modules/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Login',
                    requiresLogin: true
                }
            });

        authProvider.init({
            domain: AUTH0_DOMAIN,
            clientID: AUTH0_CLIENT_ID,
            loginUrl: '/login'
        });

        jwtInterceptorProvider.tokenGetter = function (store) {
            return store.get('token');
        };

        // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
        // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
        // want to check the delegation-token example
        $httpProvider.interceptors.push('jwtInterceptor');
    }

    polymerBlogRun.$inject = [
        'auth',
        'store',
        'jwtHelper',
        '$rootScope',
        '$state'
    ];

    function polymerBlogRun(auth, store, jwtHelper, $rootScope, $state) {
        $rootScope.$on('$locationChangeStart', function () {
            if (!auth.isAuthenticated) {
                var token = store.get('token');
                if (token) {
                    if (!jwtHelper.isTokenExpired(token)) {
                        auth.authenticate(store.get('profile'), token);
                    } else {
                        $state.go('login');
                    }
                }
            }
        });
    }

    AppCtrl.$inject = ['$scope'];

    function AppCtrl($scope) {
        $scope.$on('$routeChangeSuccess', function (e, nextRoute) {
            if (nextRoute.$$route && angular.isDefined(nextRoute.$$route.pageTitle)) {
                $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Auth0 Sample';
            }
        });
    }
}());
