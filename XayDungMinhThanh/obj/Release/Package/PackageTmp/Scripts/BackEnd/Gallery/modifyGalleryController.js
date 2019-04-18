
admin.controller("modifyGalleryController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'Url', function ($scope, $http, $window, $location, $filter, Alias, Url) {
    //VAR
    //Gallery
    var apiGallery = "/API/GalleryAPI";
    $scope.gallery = {};
    //Image
    var apiImage = "/API/ImageAPI";
    $scope.image = {};
    $scope.imageList = {};
    $scope.images = [];

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
    $scope.featureds = [
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
    $scope.gallery.id = Url.getParameterByName('idGallery');

    //---POPUP---
    //Image
    $scope.modifyImage = false;
    $scope.deleteImage = false;
    $scope.titlePopupModifyImage = "Thêm hình ảnh";
    $scope.popupModifyImage = {
        width: 500,
        height: 600,
        contentTemplate: "templateModifyImage",
        showTitle: true,
        resizeEnabled: true,
        bindingOptions: {
            title: "titlePopupModifyImage",
            visible: "modifyImage",
        }
    };
    $scope.popupDeleteImage = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteImage",
        showTitle: false,
        bindingOptions: {
            visible: "deleteImage",
        }
    };

    //---CONTEXTMENU---
    var itemContextMenus = [
        { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
        { value: 'edit', text: ' Sửa', icon: 'fa fa-pencil' },
        { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
    ];
    //Images
    $scope.contextMenuImage = {
        dataSource: itemContextMenus,
        width: 100,
        target: '#listImage',
        itemTemplate: function (itemData, itemIndex, itemElement) {
            var template = $('<div></div>');
            if (itemData.icon) {
                template.append('<span class="' + itemData.icon + '"><span>');
            }
            template.append(itemData.text);
            return template;
        },
        onItemClick: function (e) {
            if (!e.itemData.items) {
                switch (e.itemData.value) {
                    case "add":
                        $scope.AddImage();
                        break;
                    case "edit":
                        $scope.EditImage();
                        break;
                    case "delete":
                        $scope.DeleteImage();
                        break;
                }

            }
        }
    };

    //---LIST---
    $scope.imageList = {
        width: '100%',
        height: 500,
        baseItemHeight: 200,
        baseItemWidth: 200,
        itemMargin: 10,
        direction: "vertical",
        showScrollbar: true,
        bindingOptions: {
            items: 'images'
        },
        onItemContextMenu: function (e) {
            $scope.image = {};
            $scope.image = angular.copy($scope.images[e.itemIndex]);
            $scope.image.index = angular.copy(e.itemIndex);
        }
    };

    Init();

    function Init() {

        //Nếu sửa thì trả về giá trị của Gallery
        if ($scope.gallery.id !== null) {
            GetGallery($scope.gallery.id);
        }
            //Không thì thiết lập giá trị mặc định
        else {
            SetValueDefault();
        }
    }

    //GALLERY
    //Save
    $scope.Save = function () {
        if ($scope.gallery.id == null) {
            //Lưu gallery để lấy IDGallery
            $http.post(apiGallery, $scope.gallery)
                .then(
                    function success(response) {
                        $scope.gallery = angular.copy(response.data);
                        //Save Images của Gallery tương ứng
                        angular.forEach($scope.images, function (value, index) {
                            value.idGallery = $scope.gallery.id;
                            $http.post(apiImage, value)
                                .then(function success(response) {
                                    if (index == ($scope.images.length - 1)) {
                                        toastr.success('Thành công', 'Thêm thư viện Ảnh');
                                        //$window.location.href = '/Admin/Gallery/Modify?idGallery=' + $scope.gallery.id;
                                    }
                                }, function error(response) {

                                });
                        });
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm thư viện Ảnh');
                    }
                );
        }
        else {
            //Lưu thông tin Gallery
            $http.put(apiGallery + '/' + $scope.gallery.id, $scope.gallery)
                .then(
                    function success(response) {
                        /**
                         * Cập nhật lại Images cho Gallery bằng cách
                         * Step1: Xóa hết Images hiện tại
                         * Step2: Thêm lại mảng Images hiện tại
                         */
                        $http.get('/Gallery/DeleteImages/' + $scope.gallery.id)
                            .then(function success(response) {
                                if (response.data == 1) {
                                    angular.forEach($scope.images, function (value, index) {
                                        value.idGallery = $scope.gallery.id;
                                        $http.post(apiImage, value)
                                            .then(function success(response) {
                                                $scope.images[index] = angular.copy(response.data);
                                            }, function error(response) {
                                            });
                                    });
                                }
                            }, function error(response) {
                                toastr.error('Thất bại', 'Không cập nhật được hình ảnh');
                            });


                        toastr.success('Thành công', 'Lưu thông tin thư viện Ảnh');
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu thư viện Ảnh');
                    }
                );
        }
    }
    //Save and Exit
    $scope.SaveAndExit = function () {
        if ($scope.gallery.id == null) {
            //Lưu gallery để lấy IDGallery
            $http.post(apiGallery, $scope.gallery)
                .then(
                    function success(response) {
                        $scope.gallery = angular.copy(response.data);
                        //Save Images của Gallery tương ứng
                        angular.forEach($scope.images, function (value, index) {
                            value.idGallery = $scope.gallery.id;
                            $http.post(apiImage, value)
                                .then(function success(response) {
                                    if (index == ($scope.images.length - 1)) {
                                        toastr.success('Thành công', 'Thêm thư viện Ảnh');
                                        $window.location.href = '/Admin/Gallery';
                                    }
                                }, function error(response) {

                                });
                        });
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm thư viện Ảnh');
                    }
                );
        }
        else {
            //Lưu thông tin Gallery
            $http.put(apiGallery + '/' + $scope.gallery.id, $scope.gallery)
                .then(
                    function success(response) {
                        /**
                         * Cập nhật lại Images cho Gallery bằng cách
                         * Step1: Xóa hết Images hiện tại
                         * Step2: Thêm lại mảng Images hiện tại
                         */
                        $http.get('/Gallery/DeleteImages/' + $scope.gallery.id)
                            .then(function success(response) {
                                if (response.data == 1) {
                                    angular.forEach($scope.images, function (value, index) {
                                        value.idGallery = $scope.gallery.id;
                                        $http.post(apiImage, value)
                                            .then(function success(response) {
                                                $scope.images[index] = angular.copy(response.data);
                                            }, function error(response) {
                                            });
                                    });
                                }
                            }, function error(response) {
                                toastr.error('Thất bại', 'Không cập nhật được hình ảnh');
                            });


                        toastr.success('Thành công', 'Lưu thông tin thư viện Ảnh');
                        $window.location.href = '/Admin/Gallery';
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu thư viện Ảnh');
                    }
                );
        }
    }
    //Save and Add
    $scope.SaveAndAdd = function () {
        if ($scope.gallery.id == null) {
            //Lưu gallery để lấy IDGallery
            $http.post(apiGallery, $scope.gallery)
                .then(
                    function success(response) {
                        $scope.gallery = angular.copy(response.data);
                        //Save Images của Gallery tương ứng
                        angular.forEach($scope.images, function (value, index) {
                            value.idGallery = $scope.gallery.id;
                            $http.post(apiImage, value)
                                .then(function success(response) {
                                    if (index == ($scope.images.length - 1)) {
                                        toastr.success('Thành công', 'Thêm thư viện Ảnh');
                                        $window.location.href = '/Admin/Gallery/Modify';
                                    }
                                }, function error(response) {

                                });
                        });
                    },
                    function error(response) {
                        toastr.error('Thất bại', 'Thêm thư viện Ảnh');
                    }
                );
        }
        else {
            //Lưu thông tin Gallery
            $http.put(apiGallery + '/' + $scope.gallery.id, $scope.gallery)
                .then(
                    function success(response) {
                        /**
                         * Cập nhật lại Images cho Gallery bằng cách
                         * Step1: Xóa hết Images hiện tại
                         * Step2: Thêm lại mảng Images hiện tại
                         */
                        $http.get('/Gallery/DeleteImages/' + $scope.gallery.id)
                            .then(function success(response) {
                                if (response.data == 1) {
                                    angular.forEach($scope.images, function (value, index) {
                                        value.idGallery = $scope.gallery.id;
                                        $http.post(apiImage, value)
                                            .then(function success(response) {
                                                $scope.images[index] = angular.copy(response.data);
                                            }, function error(response) {
                                            });
                                    });
                                }
                            }, function error(response) {
                                toastr.error('Thất bại', 'Không cập nhật được hình ảnh');
                            });


                        toastr.success('Thành công', 'Lưu thông tin thư viện Ảnh');
                        $window.location.href = '/Admin/Gallery/Modify';
                    },
                    function errorCallback(response) {
                        toastr.error('Thất bại', 'Lưu thư viện Ảnh');
                    }
                );
        }
    }
    //Cancel
    $scope.Cancel = function () {
        $window.location.href = '/Admin/Gallery';
    }

    //Set Value Default
    function SetValueDefault() {
        $scope.gallery = {
            featured: false,
            published: true,
            version: 1,
            robots: 'Index, Follow',
            timePublished: new Date(),
        };
    }

    //Get Gallery
    function GetGallery(id) {
        $http.get(apiGallery + '/' + $scope.gallery.id)
            .then(function success(response) {
                //Lấy thông tin Gallery
                $scope.gallery = angular.copy(response.data);
                $scope.gallery.timePublished = new Date($scope.gallery.timePublished);
                //Lấy Images của Gallery
                $http.get(apiImage + '?att=idGallery&&value=' + $scope.gallery.id)
                    .then(function success(responsive) {
                        $scope.images = angular.copy(responsive.data);
                    }, function error(responsive) {
                    })
            }, function error(response) {
                $window.location.href = '/Admin/Gallery';
            });
    }
    //Chọn hình ảnh
    $scope.ChooseImage = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.gallery.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }


    //IMAGES
    $scope.AddImage = function () {
        $scope.image = {};
        $scope.titlePopupModifyImage = "Thêm hình ảnh";
        $scope.modifyImage = true;
    }
    $scope.EditImage = function () {
        $scope.titlePopupModifyImage = "Sửa hình ảnh";
        if ($scope.image == {}) {
            toastr.error("Chọn ảnh để sửa");
        } else {
            $scope.modifyImage = true;
        }
    }
    $scope.SaveImage = function () {
        //Thêm
        if (!angular.isDefined($scope.image.index)) {
            $scope.images.push($scope.image);
        }
        //Sửa
        else {
            $scope.images[$scope.image.index] = $scope.image;
        }
        $scope.modifyImage = false;
    };
    $scope.CancelSaveImage = function () {
        $scope.modifyImage = false;
    }
    $scope.DeleteImage = function () {
        $scope.deleteImage = true;
    }
    $scope.ConfirmDeleteImage = function () {
        $scope.images.splice($scope.image.index, 1);
        $scope.deleteImage = false;
    };
    $scope.CancelDeleteImage = function () {
        $scope.deleteImage = false;
    };

    //Chọn hình ảnh Gallery
    $scope.ChooseImageGallery = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.image.url = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }


    //Generate Alias
    $scope.GenAlias = function () {
        $scope.gallery.alias = angular.copy(Alias.genAlias($scope.gallery.title));
    };


}]);