front.controller("sideBarController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', function ($scope, $http, $window, $location, $filter, $sce) {
    //VAR
    //$scope.banners = [];
    //$scope.services = [];
    //$scope.infoCompany = {};
    //$scope.featuredPosts = [];
    //$scope.bacSis = [];
    //$scope.videos = [];
    //$scope.thuViens = [];
    //$scope.gioiThieus = [];


    Init();

    function Init() {
        //GetServices();
        //GetInfoCompany();
        //GetPosts();
        //GetBacSis();
        //GetVideos();
        //GetThuViens();
        //getGioiThieus();
    }

    //function getGioiThieus() {
    //    $http.get('/API/PostAPI?att=gioiThieu&&value=6')
    //        .then(
    //            function success(response) {
    //                $scope.gioiThieus = response.data;
    //                console.log(response.data);
    //            },
    //            function error(response) {

    //            }
    //        );
    //}

    //function GetServices() {
    //    $http.get('/Home/GetServices')
    //        .then(
    //            function success(response) {
    //                $scope.services = angular.copy(response.data);
    //                angular.forEach($scope.services, function (value, index) {
    //                    if (value.description != null) {
    //                        value.description = (value.description.length > 170) ? CutString(value.description, 172) : value.description;
    //                    }

    //                });
    //            },
    //            function error(response) {

    //            }
    //        );
    //}

    //function GetInfoCompany() {
    //    $http.get('/API/InfoCompanyAPI')
    //        .then(
    //            function success(response) {
    //                if (response.status == 200) {
    //                    $scope.infoCompany = angular.copy(response.data[0]);
    //                }
    //            },
    //            function error(response) {

    //            }
    //        );
    //}

    //function GetPosts() {
    //    $http.get('/Home/GetPosts')
    //        .then(
    //            function success(response) {
    //                angular.forEach(response.data, function (value, index) {
    //                    value.timePublished = new Date(parseInt(value.timePublished.substr(6)));
    //                    if (value.description != null) {
    //                        value.description = (value.description.length > 130) ? CutString(value.description, 127) : value.description;
    //                    }
    //                });
    //                $scope.featuredPosts = angular.copy(response.data);
    //            },
    //            function error(response) {

    //            }
    //        );
    //}

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