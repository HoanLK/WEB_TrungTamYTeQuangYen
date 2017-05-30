front.controller("menuController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', '$cookieStore', function ($scope, $http, $window, $location, $filter, $sce, $cookieStore) {
    //VAR
    $scope.services = {};


    Init();

    function Init() {
        GetSerVices();
    }

    function GetSerVices() {
        $http.get('/Service/GetSerVices')
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.services = angular.copy(response.data);
                    }
                },
                function error(response) {

                }
            );
    }

    $scope.Search = function () {

        $cookieStore.put('search', $scope.searchText);

        $window.location.href = '/tim-kiem';
    };


}]);