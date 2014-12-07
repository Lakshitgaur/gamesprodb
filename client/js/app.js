var GameDB = angular.module('GameDB', [
  'ngRoute',
  'phonecatControllers', 'googleOauth'
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
      
          
      when('/loginsucss', {
          templateUrl: 'views/loginsucss.html',
          

          controller: 'LoginController'

      }).

           when('/loginunssucss', {
               templateUrl: 'views/loginunssucss.html',


               controller: 'LoginController'

           }).
        otherwise({
            redirectTo: 'views/News_page.html'
        });
  }]);



GameDB.controller('GamesVid', function ($scope) {
    $scope.search = function () {
        document.getElementById("result").innerHTML = "loading...";
        //var query = document.getElementById("query").value;
        //query = encodeURIComponent(query);
        var jsonpURL = "http://gdata.youtube.com/feeds/videos?vq=upcominggames&max-results=50&alt=json-in-script&callback=listVideos";
        // var jsonpURL = "http://gdata.youtube.com/feeds/videos?vq=" + query + "&max-results=50&alt=json-in-script&callback=listVideos";
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = jsonpURL;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(script);
    }
});


GameDB.controller('RegController', function ($scope, $http, $location) {
    $scope.register = function () {
        var regCredentials = {};
        regCredentials["username"] = $scope.username;
        regCredentials["password"] = $scope.password;
        regCredentials["email"] = $scope.email;
        console.log(regCredentials);
        $http.post("/registerUser", regCredentials)
            .success(function (response) {
                $location.path("regsuccess");
            });
    }
})

GameDB.controller('homeCtrl', function ($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

GameDB.controller('AbtCtrl', function ($scope) {
    $scope.message = 'Look! I am an about page.';
});

GameDB.controller('BlogCtrl', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

GameDB.controller('LoginController', function ($scope, $http, $location) {
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

GameDB.controller('GameCtrl', function ($scope, $http) {
    var URL = "http://net4.ccs.neu.edu/home/rasala/simpleproxy/simpleproxy.aspx?url=|http://www.giantbomb.com/api/search/?api_key=2b4e4a8e443d2571c5a9f09b0024184afc4674f1&limit=12&format=json&query=type&resources=game&callback=ewq|";

    $scope.getGameList = function () {
        var game = $scope.nameOfGame;
        var plat = "PS2";
        var url = URL.replace("type", game);

        $http.get(url).success(function (response) {
            $scope.gameslist = response.results;
            console.log($scope.gameslist);


        });
    }
    $scope.show_games = function (pathurl) {

        console.log(pathurl)
        $location.path(pathurl)
    }
});

/*GameDB.controller('LatestGameCtrl', function ($scope, $http) {
    var URL = "http://net4.ccs.neu.edu/home/rasala/simpleproxy/simpleproxy.aspx?url=|http://www.giantbomb.com/api/games/?api_key=2b4e4a8e443d2571c5a9f09b0024184afc4674f1&limit=20&filter=expected_release_year:2014,expected_release_month:12&format=json&callback=ewq|";


        $http.get(url).success(function (response) {
            $scope.gameslist = response.results;
            

            console.log($scope.gameslist);
            $scope.currentitem = response.results[0];

        }); 
});*/

GameDB.controller('LatestGameCtrl', function ($scope, $http) {
    $http.get("http://net4.ccs.neu.edu/home/rasala/simpleproxy/simpleproxy.aspx?url=|http://www.giantbomb.com/api/games/?api_key=2b4e4a8e443d2571c5a9f09b0024184afc4674f1&limit=20&filter=expected_release_year:2014,expected_release_month:12&format=json&callback=ewq|").success(function (data) {
        var jsonString = angular.toJson(data.results);
        
        $scope.gamelist = angular.fromJson(jsonString);
    });
});



GameDB.controller('Reviews', function ($scope) {
    $(function () {


        //    $("body").append('<div class="news-holder" id="news-holder"></div>');
        //document.write('<div class="news-holder" id="news-holder"></div>')
        var feedpointer = new google.feeds.Feed("http://www.giantbomb.com/feeds/reviews/");
        //feedpointer.setNumEntries(1) //Show 1 entry only
        feedpointer.load(formatoutput)


        function formatoutput(result) {
            if (!result.error) {
                var rssoutput = ""
                var thefeeds = result.feed.entries
                for (var i = 0; i < thefeeds.length; i++) {
                    var entrydate = new Date(thefeeds[i].publishedDate) //get date of entry
                    var entrydatestr = ' ' + entrydate.getFullYear() + "/" + (entrydate.getMonth() + 1) + "/" + entrydate.getDate()
                    rssoutput += "<h1><ul class='news-headlines'> <li class='selected'></li></ul><div class='news-preview'><div class='news-content'><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></u></h1>" + "<h3>" + "Reviews release Date:" + entrydatestr + "</h3>" + "<br />" + thefeeds[i].content + "</p></br></div></div> <hr style='background:#F87431; border:0; height:7px' />"

                }
                //        document.getElementByID("news-holder").innerHTML = rssoutput
                var holder = $("#reviews-here");
               // console.log(holder);
                holder.append(rssoutput);
            }
            else //if error fetching feed, alert human readable error message
                alert(result.error.message)
        }

    });
});
