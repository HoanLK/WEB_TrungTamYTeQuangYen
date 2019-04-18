admin.controller("modifyVideoController", ['$scope', '$http', '$window', '$location', '$filter', 'Url', '$sce', function ($scope, $http, $window, $location, $filter, Url, $sce) {
    //VAR
    apiVideo = "/API/VideoAPI";
    $scope.video = {};
    $scope.statuses = [
        {
            text: "Xuất bản",
            value: true
        },
        {
            text: "Không xuất bản",
            value: false
        }
    ];

    //Lấy idCategory từ Url
    $scope.video.id = Url.getParameterByName('idVideo');

    Init();

    function Init() {
        //Nếu sửa thì trả về giá trị
        if ($scope.video.id !== null) {
            GetVideo($scope.video.id);
        }
            //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
    }

    //Save
    $scope.Save = function () {
        if ($scope.video.id == null) {
            $http.post(apiVideo, $scope.video)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.video = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm video');
                            $window.location.href = '/Admin/Video/Modify?idVideo=' + $scope.video.id;
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm video');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm video');
                    }
                );
        }
        else {
            $http.put(apiVideo + '/' + $scope.video.id, $scope.video)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu video');
                        } else {
                            toastr.error('Thất bại', 'Lưu video');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu video');
                    }
                );
        }
    }

    //Save and Exit
    $scope.SaveAndExit = function () {
        if ($scope.video.id == null) {
            $http.post(apiVideo, $scope.video)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.video = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm video');
                            $window.location.href = '/Admin/Video';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm video');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm video');
                    }
                );
        }
        else {
            $http.put(apiVideo + '/' + $scope.video.id, $scope.video)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu video');
                            $window.location.href = '/Admin/Video';
                        } else {
                            toastr.error('Thất bại', 'Lưu video');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu video');
                    }
                );
        }
    }

    //Save and Add
    $scope.SaveAndAdd = function () {
        if ($scope.video.id == null) {
            $http.post(apiVideo, $scope.video)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.video = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm video');
                            $window.location.href = '/Admin/Video/Modify';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm video');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm video');
                    }
                );
        }
        else {
            $http.put(apiVideo + '/' + $scope.video.id, $scope.video)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu video');
                            $window.location.href = '/Admin/Video/Modify';
                        } else {
                            toastr.error('Thất bại', 'Lưu video');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu video');
                    }
                );
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin/Video';
    }

    //Set Value Default
    function SetValueDefault() {
        $scope.video = {
            published: true
        };
    }

    //Get Video
    function GetVideo(id) {
        $http.get(apiVideo + '/' + $scope.video.id)
            .then(function success(response) {
                $scope.video.link1 = $scope.video.link;
                $scope.video = response.data;
                $scope.video.link1 = $sce.trustAsResourceUrl(response.data.link);
            }, function error(response) {
                $window.location.href = '/Admin/Video';
            });
    }

    $scope.GetVideoNotID = function () {
        $scope.video.link1 = $sce.trustAsResourceUrl($scope.video.link);
    };

    //Chọn hình ảnh video
    $scope.ChooseImageVideo = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.video.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }


}]);