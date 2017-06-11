front.controller("categoryPostController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.categoryPosts = [];
    $scope.posts = [];
    $scope.idCategory = angular.element('#idCategory').val();

    Init();

    function Init() {
        GetPost();
    }

    function GetPost() {
        $http.get('/API/PostAPI?att=category&&value=' + $scope.idCategory)
            .then(
                function success(response) {
                    $scope.posts = response.data;
                },
                function error(response) {

                }
            );
    }

    //Lấy tất cả danh mục
    //$http.get('/API/CategoriesAPI/')
    //    .success(function (data) {
    //        var categories = CategoryPost.getallCategory(data);
    //        angular.forEach(categories, function (value, key) {
    //            if (value.idCategoryParent == '1') {
    //                $scope.categoryPosts.push(value);
    //            }
    //        });
    //    })

}]);