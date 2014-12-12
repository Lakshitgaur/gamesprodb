GameDB.controller('LatestGameCtrl', function ($scope, $http) {
    $http.jsonp('http://www.giantbomb.com/api/search/', {
        params: {
            api_key: key,
            format: 'jsonp',
            json_callback: 'JSON_CALLBACK',
            resources: 'game',
             limit: '20',
            query: 'expected_release_year:2014'
            
        }
    })
        .success(function (data, status, headers, config) {
            console.log('Success!');
            console.log(data.results);
            $scope.gamelist = data.results;
        })
        .error(function (data, status, headers, config) {
            console.log('Error!');
        });
});