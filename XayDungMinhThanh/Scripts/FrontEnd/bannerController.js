
front.controller("bannerController", ['$scope', '$http', '$window', '$location', '$filter', function ($scope, $http, $window, $location, $filter) {
    //VAR
    $scope.banners = [];
    $scope.services = [];
    $scope.infoCompany = {};
    $scope.featuredPosts = [];


    Init();

    function Init() {
        GetAllBanner();
    }

    function GetAllBanner() {
        $http.get('/API/BannerAPI')
            .then(
                function success(response) {
                    $scope.banners = angular.copy(response.data);
                },
                function error(response) {
                }
            );
    }

    //FUNCTIONe


}]);