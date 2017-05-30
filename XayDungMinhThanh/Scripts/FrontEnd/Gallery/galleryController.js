front.controller("galleryController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', function ($scope, $http, $window, $location, $filter, $sce) {
    //VAR
    $scope.thuViens = [];

    Init();

    function Init() {
        Get();
    }

    function Get() {
        $http.get('/api/GalleryAPI')
            .then(
                function success(response) {
                    $scope.thuViens = response.data;
                },
                function error(response) {

                }
            );
    }

    //FUNCTIONe
    function CutString(input, limit) {
        var output = angular.copy(input);
        var index = angular.copy(limit - 1);

        while ((output[index] != ' ') && index < (output.length - 1)) {
            index++;
        }

        return (output.substring(0, index) + "...");
    }


}]);