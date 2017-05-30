admin.controller("modifyBacSiController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'Url', function ($scope, $http, $window, $location, $filter, Alias, Url) {
    //VAR
    apiBacSi = "/API/BacSiAPI";
    $scope.bacSi = {};
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
    $scope.bacSi.id = Url.getParameterByName('idBacSi');

    Init();

    function Init() {
        //Nếu sửa thì trả về giá trị
        if ($scope.bacSi.id !== null) {
            GetBacSi($scope.bacSi.id);
        }
        //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
    }

    //Save
    $scope.Save = function () {
        if($scope.bacSi.id == null){
            $http.post(apiBacSi, $scope.bacSi)
                .then(
                    function success(response) {
                        $scope.bacSi = angular.copy(response.data);
                        toastr.success('Thành công', 'Thêm bacSi');
                        $window.location.href = '/Admin/BacSi/Modify?idBacSi=' + $scope.bacSi.id;
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm bacSi');
                    }
                );
        }
        else {
            $http.put(apiBacSi + '/' + $scope.bacSi.id, $scope.bacSi)
                .then(
                    function success(response) {
                        toastr.success('Thành công', 'Lưu bacSi');
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu bacSi');
                    }
                );
        }
    }

    //Save and Exit
    $scope.SaveAndExit = function () {
        if ($scope.bacSi.id == null) {
            $http.post(apiBacSi, $scope.bacSi)
                .then(
                    function success(response) {
                        $scope.bacSi = angular.copy(response.data);
                        toastr.success('Thành công', 'Thêm bacSi');
                        $window.location.href = '/Admin/BacSi';
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm bacSi');
                    }
                );
        }
        else {
            $http.put(apiBacSi + '/' + $scope.bacSi.id, $scope.bacSi)
                .then(
                    function success(response) {
                        toastr.success('Thành công', 'Lưu bacSi');
                        $window.location.href = '/Admin/BacSi';
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu bacSi');
                    }
                );
        }
    }

    //Save and Add
    $scope.SaveAndAdd = function () {
        if ($scope.bacSi.id == null) {
            $http.post(apiBacSi, $scope.bacSi)
                .then(
                    function success(response) {
                        if (response.status == 201) {
                            $scope.bacSi = angular.copy(response.data);
                            toastr.success('Thành công', 'Thêm bacSi');
                            $window.location.href = '/Admin/BacSi/Modify';
                        }
                        else {
                            toastr.error('Thất bại', 'Thêm bacSi');
                        }
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm bacSi');
                    }
                );
        }
        else {
            $http.put(apiBacSi + '/' + $scope.bacSi.id, $scope.bacSi)
                .then(
                    function success(response) {
                        if (response.status == 204) {
                            toastr.success('Thành công', 'Lưu bacSi');
                            $window.location.href = '/Admin/BacSi/Modify';
                        } else {
                            toastr.error('Thất bại', 'Lưu bacSi');
                        }
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu bacSi');
                    }
                );
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin/BacSi';
    }

    //Set Value Default
    function SetValueDefault(){
        $scope.bacSi = {
            featured: 1
        };
    }

    //Get BacSi
    function GetBacSi(id) {
        $http.get(apiBacSi + '/' + $scope.bacSi.id)
            .then(function success(response) {
                if (response.status == 200) {
                    $scope.bacSi = angular.copy(response.data);
                }
                else {
                    $window.location.href = '/Admin/BacSi';
                }
            }, function error(response) {
                $window.location.href = '/Admin/BacSi';
            });
    }

    //Chọn hình ảnh bacSi
    $scope.ChooseImageBacSi = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.bacSi.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    $scope.GenAlias = function () {
        $scope.bacSi.alias = Alias.genAlias($scope.bacSi.hoTen);
        console.log($scope.bacSi.hoTen);
    };
    
}]);