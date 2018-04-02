admin.controller("modifyGiaDVController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'Url', function ($scope, $http, $window, $location, $filter, Alias, Url) {
    //VAR
    apiGiaDV = "/API/GiaDichVuAPI";
    $scope.GiaDV = {};
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

    //Lấy IDCategory từ Url
    $scope.GiaDV.ID = Url.getParameterByName('IDGiaDV');

    Init();

    function Init() {
        //Nếu sửa thì trả về giá trị
        if ($scope.GiaDV.ID !== null) {
            GetGiaDV($scope.GiaDV.ID);
        }
        //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
    }

    //Save
    $scope.Save = function () {
        if ($scope.GiaDV.ID == null) {
            $http.post(apiGiaDV, $scope.GiaDV)
                .then(
                function success(response) {
                    $scope.GiaDV = angular.copy(response.data);
                    toastr.success('Thành công', 'Thêm GiaDV');
                    $window.location.href = '/Admin/GiaDV/Modify?IDGiaDV=' + $scope.GiaDV.ID;
                },
                function error(response) {
                    toastr.error('Thất bại', 'Thêm GiaDV');
                }
                );
        }
        else {
            $http.put(apiGiaDV + '/' + $scope.GiaDV.ID, $scope.GiaDV)
                .then(
                function success(response) {
                    toastr.success('Thành công', 'Lưu GiaDV');
                },
                function errorCallback(response) {
                    toastr.error('Thất bại', 'Lưu GiaDV');
                }
                );
        }
    }

    //Save and Exit
    $scope.SaveAndExit = function () {
        if ($scope.GiaDV.ID == null) {
            $http.post(apiGiaDV, $scope.GiaDV)
                .then(
                function success(response) {
                    $scope.GiaDV = angular.copy(response.data);
                    toastr.success('Thành công', 'Thêm GiaDV');
                    $window.location.href = '/Admin/GiaDV';
                },
                function error(response) {
                    toastr.error('Thất bại', 'Thêm GiaDV');
                }
                );
        }
        else {
            $http.put(apiGiaDV + '/' + $scope.GiaDV.ID, $scope.GiaDV)
                .then(
                function success(response) {
                    toastr.success('Thành công', 'Lưu GiaDV');
                    $window.location.href = '/Admin/GiaDV';
                },
                function errorCallback(response) {
                    toastr.error('Thất bại', 'Lưu GiaDV');
                }
                );
        }
    }

    //Save and Add
    $scope.SaveAndAdd = function () {
        if ($scope.GiaDV.ID == null) {
            $http.post(apiGiaDV, $scope.GiaDV)
                .then(
                function success(response) {
                    if (response.status == 201) {
                        $scope.GiaDV = angular.copy(response.data);
                        toastr.success('Thành công', 'Thêm GiaDV');
                        $window.location.href = '/Admin/GiaDV/Modify';
                    }
                    else {
                        toastr.error('Thất bại', 'Thêm GiaDV');
                    }
                },
                function error(response) {
                    toastr.error('Thất bại', 'Thêm GiaDV');
                }
                );
        }
        else {
            $http.put(apiGiaDV + '/' + $scope.GiaDV.ID, $scope.GiaDV)
                .then(
                function success(response) {
                    if (response.status == 204) {
                        toastr.success('Thành công', 'Lưu GiaDV');
                        $window.location.href = '/Admin/GiaDV/Modify';
                    } else {
                        toastr.error('Thất bại', 'Lưu GiaDV');
                    }
                },
                function errorCallback(response) {
                    toastr.error('Thất bại', 'Lưu GiaDV');
                }
                );
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin/GiaDV';
    }

    //Set Value Default
    function SetValueDefault() {
        $scope.GiaDV = {
            featured: 1
        };
    }

    //Get GiaDV
    function GetGiaDV(ID) {
        $http.get(apiGiaDV + '/' + $scope.GiaDV.ID)
            .then(function success(response) {
                if (response.status == 200) {
                    $scope.GiaDV = angular.copy(response.data);
                }
                else {
                    $window.location.href = '/Admin/GiaDV';
                }
            }, function error(response) {
                $window.location.href = '/Admin/GiaDV';
            });
    }

    //Chọn hình ảnh GiaDV
    $scope.ChooseImageGiaDV = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.GiaDV.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    $scope.GenAlias = function () {
        $scope.GiaDV.alias = Alias.genAlias($scope.GiaDV.hoTen);
        console.log($scope.GiaDV.hoTen);
    };

}]);