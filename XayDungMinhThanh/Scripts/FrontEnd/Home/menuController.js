front.controller("menuController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', function ($scope, $http, $window, $location, $filter, $sce) {
    //VAR
    $scope.gioiThieus = [];

    Init();

    function Init() {
        getGioiThieus();
    }

    function getGioiThieus() {
        $http.get('/API/PostAPI?att=gioiThieu&&value=6')
            .then(
                function success(response) {
                    $scope.gioiThieus = response.data;
                    console.log(response.data);
                },
                function error(response) {

                }
            );
    }
}]);