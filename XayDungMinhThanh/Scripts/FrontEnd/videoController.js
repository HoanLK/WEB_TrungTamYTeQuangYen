front.controller("videoController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', function ($scope, $http, $window, $location, $filter, $sce) {
    //VAR
    $scope.videos = {};
    $scope.video = {};
    $scope.idvideos = angular.element('#id').val();

    Init();

    function Init() {
        GetVideos();
        GetVideo();
    }

    function GetVideos() {
        $http.get('/API/VideoAPI')
            .then(
                function success(response) {
                    angular.forEach(response.data, function (value, index) {
                        value.link = $sce.trustAsResourceUrl(value.link);
                    });
                    $scope.videos = response.data;
                },
                function error(response) {

                }
            );
    }

    function GetVideo() {
        $http.get('/API/VideoAPI/' + $scope.idvideos)
            .then(
                function success(response) {
                    $scope.video = response.data;
                },
                function error(response) {

                }
            );
    }
}]);