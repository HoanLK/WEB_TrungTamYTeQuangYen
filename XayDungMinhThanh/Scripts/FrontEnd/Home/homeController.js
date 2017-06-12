front.controller("homeController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', function ($scope, $http, $window, $location, $filter, $sce) {
    //VAR
    $scope.tinTucs = [];
    $scope.hoatDongTTs = [];
    $scope.hoatDongDoanThanhNien = [];
    $scope.giaoDucSucKhoes = [];
    $scope.tinTucNganhYs = [];


    Init();

    function Init() {
        GetTinTucs();
        GetHoatDongTTs();
        GetHoatDongDoanThanhNien();
        GetGiaoDucSucKhoes();
        GetTinTucNganhYs();
    }

    function GetBacSis() {
        $http.get('/API/BacSiAPI?att=bacSiHome&&value=6')
            .then(
                function success(response) {
                    $scope.bacSis = response.data;
                },
                function error(response) {

                }
            );
    }

    function GetThuViens() {
        $http.get('/API/GalleryAPI?att=galleryHome&&value=6')
            .then(
                function success(response) {
                    $scope.thuViens = response.data;
                },
                function error(response) {

                }
            );
    }

    function GetVideos() {
        $http.get('/API/VideoAPI?att=videoHome&&value=6')
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

    //New
    function GetTinTucs() {
        $http.get('/API/PostAPI?att=tinTucHome&&value=1')
            .then(
                function success(response) {
                    $scope.tinTucs = response.data;
                },
                function error(response) {

                }
            );
    }

    function GetHoatDongTTs() {
        $http.get('/API/PostAPI?att=postHome&&value=15')
            .then(
                function success(response) {
                    $scope.hoatDongTTs = response.data;
                },
                function error(response) {

                }
            );
    }

    function GetHoatDongDoanThanhNien() {
        $http.get('/API/PostAPI?att=postHome&&value=16')
            .then(
                function success(response) {
                    $scope.hoatDongDoanThanhNien = response.data;
                },
                function error(response) {

                }
            );
    }

    function GetGiaoDucSucKhoes() {
        $http.get('/API/PostAPI?att=postHome&&value=17')
            .then(
                function success(response) {
                    $scope.giaoDucSucKhoes = response.data;
                },
                function error(response) {

                }
            );
    }

    function GetTinTucNganhYs() {
        $http.get('/API/PostAPI?att=postHome&&value=18')
            .then(
                function success(response) {
                    $scope.tinTucNganhYs = response.data;
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