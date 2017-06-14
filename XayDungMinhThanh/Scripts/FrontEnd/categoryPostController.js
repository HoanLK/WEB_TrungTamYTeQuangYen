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
                $scope.posts = angular.copy(response.data);
                angular.forEach($scope.posts, function (value, index) {
                    if (value.content != null) {
                        value.content = (value.content.length > 1098) ? CutString(value.content, 1000) : value.content;
                    }
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

}]);