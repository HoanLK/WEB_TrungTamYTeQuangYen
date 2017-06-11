front.controller("postController", ['$scope', '$http', '$window', '$sce', function ($scope, $http, $window, $sce) {
    $scope.post = {};
    $scope.relatedPosts = [];
    $scope.idCategory;
    $scope.idPost = angular.element('#idPost').val();

    Init();

    function Init() {
        GetPost();
    }

    function GetPost() {
        $http.get('/API/PostAPI/' + $scope.idPost)
            .then(
                function success(response) {
                    $scope.post = response.data;
                    console.log($scope.post);
                    $scope.post.content = $sce.trustAsHtml(response.data.content);
                    $scope.idCategory = response.data.idCategory;
                },
                function error(response) {

                }
            );

        $http.get('/API/PostAPI?att=baiLienQuan&&value=' + $scope.idCategory)
            .then(
                function success(response) {
                    angular.forEach(response.data, function (value, key) {
                        if (value.idPost != $scope.idPost) {
                            $scope.relatedPosts.push(value);
                        };
                    });
                },
                function error(response) {

                }
            );
    }
}]);