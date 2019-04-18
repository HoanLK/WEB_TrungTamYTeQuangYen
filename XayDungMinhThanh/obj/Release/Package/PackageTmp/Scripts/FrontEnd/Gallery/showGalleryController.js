front.controller("showGalleryController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', '$timeout', '$interval', function ($scope, $http, $window, $location, $filter, $sce, $timeout, $interval) {
    //---VAR---
    $scope.gallery = {};
    $scope.images = [];
    $scope.gallery.id = angular.element('#idGallery').val();

    Init();

    function Init() {
        GetGallery();
    }

    function GetGallery() {
        $http.get('/Gallery2/GetGallery/' + $scope.gallery.id)
            .then(
                function success(response) {
                    $scope.gallery = angular.copy(response.data.Info);
                    $scope.images = angular.copy(response.data.Images);
                    angular.forEach($scope.images, function (value, index) {
                        value.thumbUrl = angular.copy(value.url);
                    });
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

    // Config
    
    //Hiệu ứng
    $scope.conf = {
        imgAnim: 'fadeup'
    };

    // Thumbnails
    $scope.thumbnails = true;

    // Inline
    $scope.inline = false;

    // Bubbles
    $scope.bubbles = true;

    // Image bubbles
    $scope.imgBubbles = false;

    // Background close
    $scope.bgClose = false;

}]);