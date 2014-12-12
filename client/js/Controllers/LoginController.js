GameDB.controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService, $location) {
    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.login = function (credentials) {
        AuthService.login(credentials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
           
            $scope.setCurrentUser(user);
            $scope.setAuthorization(true);
            $location.path("loginsucss")

        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $location.path("loginunssucss")
        });
    };
});