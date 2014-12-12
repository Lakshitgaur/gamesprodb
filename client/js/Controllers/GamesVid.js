GameDB.controller('GamesVid', function ($scope) {
    $scope.search = function () {
        document.getElementById("result").innerHTML = "loading...";
         var jsonpURL = "http://gdata.youtube.com/feeds/videos?vq=upcominggames&max-results=50&alt=json-in-script&callback=listVideos";
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = jsonpURL;
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(script);
    }
});