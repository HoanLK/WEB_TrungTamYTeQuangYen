front.controller("bangGiaController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', function ($scope, $http, $window, $location, $filter, $sce) {
    //VAR
    $scope.giaDVs = [];
    $scope.search = {};

    Init();

    function Init() {
        GetGiaDVs();
    }

    function GetGiaDVs() {
        $http.get('/API/GiaDichVuAPI')
            .then(
            function success(response) {
                $scope.giaDVs = response.data;
            },
            function error(response) {

            }
            );
    }
}]);