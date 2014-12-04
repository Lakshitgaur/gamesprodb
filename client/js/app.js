var GameDB = angular.module('GameDB', [
  'ngRoute',
  'phonecatControllers', 'googleOauth'
]);

GameDB.config(function ($routeProvider) {
    $routeProvider
      .when('/access_token=:accessToken', {
          template: '',
          controller: function ($location,$rootScope) {
              var hash = $location.path().substr(1);

              var splitted = hash.split('&');
              var params = {};

              for (var i = 0; i < splitted.length; i++) {
                  var param  = splitted[i].split('=');
                  var key    = param[0];
                  var value  = param[1];
                  params[key] = value;
                  $rootScope.accesstoken=params;
              }
              $location.path("/about");
          }
      })
});
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
               controller: 'MainCtrl'
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

GameDB.controller('DemoCtrl', function ($rootScope, $scope, $window, Token) {
    $scope.accessToken = Token.get();

    $scope.authenticate = function () {
        var extraParams = $scope.askApproval ? { approval_prompt: 'force' } : {};
        Token.getTokenByPopup(extraParams)
          .then(function (params) {
              // Success getting token from popup.

              // Verify the token before setting it, to avoid the confused deputy problem.
              Token.verifyAsync(params.access_token).
                then(function (data) {
                    $rootScope.$apply(function () {
                        $scope.accessToken = params.access_token;
                        $scope.expiresIn = params.expires_in;

                        Token.set(params.access_token);
                    });
                }, function () {
                    alert("Failed to verify token.")
                });

          }, function () {
              // Failure getting token from popup.
              alert("Failed to get token from popup.");
          });
    };
});

GameDB.controller('MainCtrl', function ($scope) {
    $scope.login=function() {
        var client_id="your client id";
        var scope="email";
        var redirect_uri="http://localhost:9000";
        var response_type="token";
        var url="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+
        "&response_type="+response_type;
        window.location.replace(url);
    };
});

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
                    rssoutput += "<ul class='news-headlines'> <li class='selected'>" + thefeeds[i].link + "</li></ul><div class='news-preview'><div class='news-content'><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></u></h1>" + "<h3>" + "News Date:" + entrydatestr + "</h3>" + "<br />" + thefeeds[i].content + "</p></br></div></div>"

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
