var GameDB = angular.module('GameDB', [
  'ngRoute',
  
]);

GameDB.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        

        when('/searchGames', {
            templateUrl: 'views/searchgames.html',
            controller: 'GameCtrl'
        }).
           when('/blog', {
               templateUrl: 'views/blog.html',
               controller: 'BlogCtrl'
           }).
           when('/upcomingvideo', {
               templateUrl: 'views/Upcoming_videos.html',

           }).
            when('/reviews', {
                templateUrl: 'views/reviews.html',
                controller: 'Reviews'
                
            }).
           when('/login', {
               templateUrl: 'views/authetication.html',
               controller: 'LoginController'
           }).
          when('/register', {
              templateUrl: 'views/register.html',
              controller: 'RegController'
            
          }).
           when('/regsuccess', {
               templateUrl: 'views/RegSucess.html',
               

           }).
           when('/Gamelist', {
               templateUrl: 'views/Gamelist.html',

            }).
      
          
      when('/loginsucss', {
          templateUrl: 'views/loginsucss.html',
          Controller: 'GameCtrl'
       

      }).
          when('/Logout', {
              templateUrl: 'views/Logout.html',
              //Controller: 'GameCtrl'


          }).
           when('/loginunssucss', {
               templateUrl: 'views/loginunssucss.html',


               controller: 'LoginController'

           }).
        otherwise({
            redirectTo: 'views/News_page.html'
        });
  }]);

GameDB.service('Session', function () {
    this.create = function (sessionId, userId, username) {
        this.id = sessionId;
        this.userId = userId;
        this.username = username;
        console.log("i am in session controller");
    };
    this.destroy = function () {
        this.id = null;
        this.userId = null;
        this.username = null;
    };
    return this;
});

GameDB.factory('AuthService', function ($http, Session) {
    var authService = {};

    authService.login = function (credentials) {
       // console.log(credentials);
        return $http.post('/validateLogin', credentials)
          .then(function (res) {
              console.log(res.data[0].username);
              Session.create(res.data[0]._id, res.data[0]._id, res.data[0].username);
              return res.data[0].username;
          });
    };
    console.log("i am in Autheticatedervice");
    authService.isAuthenticated = function () {
        return !!Session.userId;
    };

    return authService;
});

GameDB.controller('ApplicationController', function ($scope,

                                               AuthService, $location) {
    //$scope.errmsg = "";
    $scope.errormsg = false;

    $scope.seterrormsg = function () {
        $scope.errormsg = true;
        console.log($scope.errormsg)
    }
    $scope.geterrormsg = function () {
        return $scope.errormsg ;
        
    }



    $scope.seterr = function (msg)
    {
        $scope.errormsg = "true";
        $scope.errmsg = msg;
        console.log($scope.errmsg);
    }

    $scope.$back = function () {
        $location.path("reviews");
    };
    
    $scope.logoutmsg = null;
    $scope.logout = function () {
        $scope.isAuthorized = false;
        $scope.currentUser = null;
        $scope.logoutmsg = "You are successfully logged out";
        $location.path("");
    }

    $scope.isAuthorized = false;
    $scope.setAuthorization=function(value)
    {
        $scope.isAuthorized = value;
    }

    $scope.setGamelist = function (gamelist) {
        $scope.myGamelist = gamelist;

    };
    $scope.currentUser = null;
    // $scope.userRoles = USER_ROLES;
    //  $scope.isAuthorized = AuthService.isAuthorized;
    //$scope.isAuthorized = true;
    //console.log($scope.isAuthorized);
    $scope.parentname = "abc";
    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;

    };
});


GameDB.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});


/*GameDB.controller('LoginController', function ($scope, $http, $location) {
    $scope.login = function () {
        $scope.userdetail = "";
        var loginCredentials = {};
        loginCredentials["username"] = $scope.username;
        loginCredentials["password"] = $scope.password;
        console.log(loginCredentials);
        $http.post("/validateLogin", loginCredentials)
            .success(function (response) {
                if (response.length > 0) {
                    console.log(response);
                    var user = response[0].username;
                    console.log(user);
                    $scope.userdetail = user;
                    console.log($scope.userdetail);
                    $location.path("loginsucss");
                   
                }
                else
                   { 
                    console.log("username not found");
                $scope.name = user;
                $location.path("loginunssucss");
            }
            });
    }
})
*/







