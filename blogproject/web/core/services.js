var Post = function ($resource, $http) {
  var actions = {
    save: {
    //   method: 'POST',
    //   transformRequest: [function(data) {
    //     var newData = _.extend({}, data);
    //     if (newData.query_id === undefined) {
    //       newData.query_id = newData.query.id;
    //       delete newData.query;
    //     }
    //
    //     return newData;
    //   }].concat($http.defaults.transformRequest)
    },

    getAll: {

    }

  };

  // var resource = $resource('/api/alerts/:id', {id: '@id'}, actions);

  return resource;
};

AuthService = function(auth, $location, $filter, store){

    var all = {
        auth: auth,

        login: function(){
            auth.signin({}, function(profile, token) {
                store.set('profile', profile);
                store.set('token', token);
                $location.path("/");
            }, function(error) {
                console.log($filter('translate')('login.loginFail'), error);
            });

        },

        logout: function() {
          auth.signout();
          store.remove('profile');
          store.remove('token');
          $location.path('/login');
        }

    };

    return all;
};

angular.module('polymerblog.services', ['auth0'])
    // .factory('Post', ['$resource', '$timeout', '$q', '$http', Post])
    .service('AuthService', ['auth', '$location', '$filter', 'store',  AuthService])
    ;
