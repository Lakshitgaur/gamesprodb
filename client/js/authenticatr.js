angular.module("authtctr", []).controller("Autheticate", function ($scope) {

    OAuth.initialize('rlDsXOGvYCNPj57Fjf2OMCvju-c')

    $scope.clickConnect = function (provider) {
        //Authorize your user to facebook
        OAuth.popup(provider).done(function (result) {
            //Get your user's personal data
            result.me().done(function (me) {
                $scope.me = me
                $scope.provider = provider
            })
        })
    }
});