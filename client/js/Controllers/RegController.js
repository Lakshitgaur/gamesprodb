GameDB.controller('RegController', function ($scope, $http, $location) {
    $scope.register = function () {
        $scope.err = false;
        $scope.errrrrmsg = "";
        var regCredentials = {};
        regCredentials["username"] = $scope.username;
        regCredentials["password"] = $scope.password;
        regCredentials["email"] = $scope.email;
        console.log(regCredentials);
        $http.post("/registerUser", regCredentials)
            .success(function (response) {
                console.log(response);
                if (response == "username not unique") {
                   // $scope.errormsg = "Error! username not unique";
                    //$scope.err = true;
                    // console.log($scope.errormsg);
                    //var msg = "Error! username not unique";
                    //$scope.seterr(msg);
                    $scope.errrrrmsg = "Username already taken";
                    $scope.seterrormsg();
                   


                }
                else {
                    $location.path("regsuccess");
                }
            });
    }
})