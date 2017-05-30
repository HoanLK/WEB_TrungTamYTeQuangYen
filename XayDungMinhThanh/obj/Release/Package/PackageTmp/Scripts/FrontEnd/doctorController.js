front.controller("doctorController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', function ($scope, $http, $window, $location, $filter, $sce) {
    //VAR
    $scope.bacSis = {};
    $scope.bacSi = {};
    $scope.idbacSis = angular.element('#id').val();

    Init();

    function Init() {
        GetBacSis();
        GetBacSi();
    }

    function GetBacSis() {
        $http.get('/API/BacSiAPI')
            .then(
                function success(response) {
                    $scope.bacSis = response.data;
                },
                function error(response) {

                }
            );
    }

    function GetBacSi() {
        $http.get('/API/BacSiAPI/' + $scope.idbacSis)
            .then(
                function success(response) {
                    $scope.bacSi = response.data;
                    console.log($scope.bacSi);
                },
                function error(response) {

                }
            );
    }
}]);