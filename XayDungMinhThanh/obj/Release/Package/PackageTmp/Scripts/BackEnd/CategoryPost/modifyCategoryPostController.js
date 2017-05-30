
admin.controller("modifyCategoryPostController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'Url', function ($scope, $http, $window, $location, $filter, Alias, Url) {
    //VAR
    apiCategoryPost = "/API/CategoryPostAPI";
    $scope.categoryPost = {};
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
    $scope.isServices = [
        {
            text: "Có",
            value: true
        },
        {
            text: "Không",
            value: false
        }
    ];

    //Lấy idCategory từ Url
    $scope.categoryPost.id = Url.getParameterByName('idCategoryPost');

    Init();

    function Init(){
        //Nếu sửa thì trả về giá trị của Category
        if ($scope.categoryPost.id !== null) {
            GetCategoryPost($scope.categoryPost.id);
        }
        //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
    }

    //Save
    $scope.Save = function () {
        if($scope.categoryPost.id == null){
            $http.post(apiCategoryPost, $scope.categoryPost)
                .then(
                    function success(response) {
                        $scope.categoryPost = angular.copy(response.data);
                        toastr.success('Thành công', 'Thêm Danh mục Bài viết');
                        $window.location.href = '/Admin/CategoryPost/Modify?idCategoryPost=' + $scope.categoryPost.id;
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Danh mục Bài viết');
                    }
                );
        }
        else {
            $http.put(apiCategoryPost + '/' + $scope.categoryPost.id, $scope.categoryPost)
                .then(
                    function success(response) {
                        toastr.success('Thành công', 'Lưu Danh mục Bài viết');
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Danh mục Bài viết');
                    }
                );
        }
    }

    //Save and Exit
    $scope.SaveAndExit = function () {
        if ($scope.categoryPost.id == null) {
            $http.post(apiCategoryPost, $scope.categoryPost)
                .then(
                    function success(response) {
                        $scope.categoryPost = angular.copy(response.data);
                        toastr.success('Thành công', 'Thêm Danh mục Bài viết');
                        $window.location.href = '/Admin/CategoryPost';
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Danh mục Bài viết');
                    }
                );
        }
        else {
            $http.put(apiCategoryPost + '/' + $scope.categoryPost.id, $scope.categoryPost)
                .then(
                    function success(response) {
                        toastr.success('Thành công', 'Lưu Danh mục Bài viết');
                        $window.location.href = '/Admin/CategoryPost';
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Danh mục Bài viết');
                    }
                );
        }
    }

    //Save and Add
    $scope.SaveAndAdd = function () {
        if ($scope.categoryPost.id == null) {
            $http.post(apiCategoryPost, $scope.categoryPost)
                .then(
                    function success(response) {
                        $scope.categoryPost = angular.copy(response.data);
                        toastr.success('Thành công', 'Thêm Danh mục Bài viết');
                        $window.location.href = '/Admin/CategoryPost/Modify';
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm Danh mục Bài viết');
                    }
                );
        }
        else {
            $http.put(apiCategoryPost + '/' + $scope.categoryPost.id, $scope.categoryPost)
                .then(
                    function success(response) {
                        toastr.success('Thành công', 'Lưu Danh mục Bài viết');
                        $window.location.href = '/Admin/CategoryPost/Modify';
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu Danh mục Bài viết');
                    }
                );
        }
    }

    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin/CategoryPost';
    }

    //Set Value Default
    function SetValueDefault(){
        $scope.categoryPost = {
            published: true,
            version: 1,
            isService: false,
            robots: 'Index, Follow',
            colorBackgroundBanner: "#000000",
            colorTitleBanner: "#ffffff",
            colorTextBanner: "#ffffff",
            timePublished: new Date()
        };
    }

    //Get Category Post
    function GetCategoryPost(id) {
        $http.get(apiCategoryPost + '/' + $scope.categoryPost.id)
            .then(function success(response) {
                if (response.status == 200) {
                    $scope.categoryPost = angular.copy(response.data);
                    $scope.categoryPost.timePublished = new Date($scope.categoryPost.timePublished);
                    //$scope.categoryPost.timePublished = $filter('date')($scope.categoryPost.timePublished, 'HH:mm:ss dd-MM-yyyy');
                }
                else {
                    $window.location.href = '/admin/categorypost';
                }
            }, function error(response) {
                $window.location.href = '/admin/categorypost';
            });
    }

    //Chọn hình ảnh
    $scope.ChooseImage = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.categoryPost.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Chọn hình ảnh banner
    $scope.ChooseImageBanner = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.categoryPost.imageBanner = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Generate Alias
    $scope.GenAlias = function () {
        $scope.categoryPost.alias = angular.copy(Alias.genAlias($scope.categoryPost.title));
    };

    
}]);