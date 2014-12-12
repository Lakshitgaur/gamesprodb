GameDB.controller('GameCtrl', function ($scope, $http, $location) {
    $scope.retrieve = false;
    $scope.success = false;
    $scope.getGameList = function () {
        

        console.log('Sending query...');
        $http.jsonp('http://www.giantbomb.com/api/search/', {
            params: {
                api_key: key,
                format: 'jsonp',
                json_callback: 'JSON_CALLBACK',
                resources: 'game',
                //field_list: 'id,name,image',
                limit: '20',
                query: $scope.nameOfGame
            }
        }).success(function (data, status, headers, config) {
            console.log('Success!');
            console.log(data.results);
            $scope.gameslist = data.results;
            $scope.success = true;
        }).error(function (data, status, headers, config) {
            console.log('Error!');
        });

    };


    $scope.deleteGame = function (id) {
        var user = $scope.currentUser;
        $http.delete("/DeletegameList/" + id).success(function (response) {
            $scope.retireveGame(user);
            console.log(response);
            
        })
    }




    $scope.retireveGame = function (user) {

        
        console.log(user);

        $http.get("/RetireveGame/" + user)
       
           .success(function (response) {
               console.log(response);
               $scope.retrieve = true;
               $scope.setGamelist(response);
               $location.path("Gamelist");
           })


    }



    $scope.AddGame = function (g) {


        if ($scope.isAuthorized) {
               $scope.gamelst = {
                "user": $scope.currentUser,
                "Name_game": g.name,
                "Description": g.deck,
                "releasedate": g.original_release_date,
                "image": g.image.thumb_url,
                "sitedetail": g.site_detail_url
            };

            console.log($scope.gamelst);
            
            $http.post("/AddGame", $scope.gamelst)
           .success(function (response) {

               $scope.message = "Successfully Inserted";
             

           })
        }
        else {
            $scope.message = "Please login to add it to your favourite list"
        }
    }
    $scope.show_games = function (pathurl) {

        console.log(pathurl)
        $location.path(pathurl)
    }
});

