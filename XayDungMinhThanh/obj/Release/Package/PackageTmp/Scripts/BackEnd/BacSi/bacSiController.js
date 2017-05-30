admin.controller("bacSiController", ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
    //---VAR---
    //Bài viết
    $scope.bacSis = [];
    $scope.bacSi = {};
    $scope.selectedBacSis = [];
    var apiBacSi = "/API/BacSiAPI";


    //---POPUP---
    //BacSi
    $scope.deleteBacSi = false;
    $scope.titleDeleteBacSi = "Bạn có chắc chắn muốn xóa?";
    $scope.popupDeleteBacSi = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteBacSi",
        showTitle: false,
        bindingOptions: {
            visible: "deleteBacSi",
        }
    };

    //---CONTROL CONFIG---

    //---LIST---
    //Category BacSis
    $scope.gridBacSis = {
        bindingOptions: {
            dataSource: 'bacSis'
        },
        allowColumnResizing: true,
        columnAutoWidth: true,
        columnChooser: {
            emptyPanelText: "Kéo và thả cột muốn ẩn vào đây",
            enabled: true,
            mode: "select",
            title: "Lựa chọn cột"
        },
        columnFixing: {
            enabled: true,
            texts: {
                fix: "Cố định cột",
                leftPosition: "Bên trái",
                rightPosition: "Bên phải",
                unfix: "Hủy cố định"
            }
        },
        columns: [
            {//0
                alignment: "left",
                allowEditing: false,
                caption: "ID",
                dataField: "id",
                fixed: true,
                fixedPosition: "left",
                width: 90
            },
            {//1
                alignment: "left",
                caption: "Họ tên",
                dataField: "hoTen",
                dataType: "string",
                fixed: true,
                fixedPosition: "left",
            },
            {//1
                alignment: "left",
                caption: "Địa chỉ",
                dataField: "diaChi",
                dataType: "string",
                fixed: true,
                fixedPosition: "left",
            },
            {//1
                alignment: "left",
                caption: "Ngày sinh",
                dataField: "ngaySinh",
                dataType: "date",
                fixed: true,
                fixedPosition: "left",
            },
            {//1
                alignment: "left",
                caption: "Email",
                dataField: "email",
                dataType: "string",
                fixed: true,
                fixedPosition: "left",
            },
            {//1
                alignment: "left",
                caption: "Chức vụ",
                dataField: "chucVu",
                dataType: "string",
                fixed: true,
                fixedPosition: "left",
            },
        ],
        editing: {
            mode: "cell",
            allowAdding: false,
            allowDeleting: false,
            allowUpdating: false,
            texts: {
                addRow: "Thêm",
                cancelAllChanges: "Không thay đổi",
                cancelRowChanges: "Hủy",
                confirmDeleteMessage: "Bạn có chắc chắn muốn xóa?",
                deleteRow: "Xóa",
                editRow: "Sửa",
                saveAllChanges: "Lưu thay đổi",
                saveRowChanges: "Lưu",
                undeleteRow: "Không xóa",
                validationCancelChanges: "Hủy thay đổi"
            }
        },
        export: {
            allowExportSelectedData: true,
            enabled: true,
            excelFilterEnabled: true,
            excelWrapTextEnabled: true,
            fileName: "Danh sách BacSi",
            texts: {
                exportAll: "Xuất toàn bộ Dữ liệu",
                exportSelectedRows: "Xuất dữ liệu đang chọn",
                exportTo: "Trích xuất"
            }
        },
        filterRow: {
            applyFilterText: "Áp dụng bộ lọc",
            betweenEndText: "Kết thúc",
            betweenStartText: "Bắt đầu",
            resetOperationText: "Thiết lập lại",
            showAllText: "(Tất cả)",
            visible: true
        },
        grouping: {
            contextMenuEnabled: true,
            expandMode: "rowClick",
            texts: {
                groupByThisColumn: "Nhóm theo Cột này",
                groupContinuedMessage: "Tiếp tục từ trang trước",
                groupContinuesMessage: "Tiếp tục trên các trang tiếp theo",
                ungroup: "Bỏ nhóm",
                ungroupAll: "Bỏ tất cả nhóm"
            }
        },
        groupPanel: {
            emptyPanelText: "Kéo một cột vào đây để nhóm theo cột đó",
            visible: false
        },
        headerFilter: {
            texts: {
                cancel: "Hủy",
                emptyValue: "(Trống)",
                ok: "Đồng ý"
            },
            visible: true
        },
        hoverStateEnabled: true,
        loadPanel: {
            enabled: true,
            text: "Đang tải ..."
        },
        noDataText: "Không có dữ liệu",
        pager: {
            infoText: "Trang {0} của {1}",
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true
        },
        paging: {
            enabled: true,
            pageIndex: 0,
            pageSize: 50
        },
        remoteOperations: {
            grouping: false,
            summary: false
        },
        rowAlternationEnabled: false,
        scrolling: {
            preloadEnabled: true
        },
        searchPanel: {
            placeholder: "Tìm kiếm ..."
        },
        selection: {
            mode: "multiple",
            showCheckBoxesMode: "onClick"
        },
        showBorders: true,
        showRowLines: true,
        sorting: {
            ascendingText: "Sắp xếp Tăng dần",
            clearText: "Xóa Sắp xếp",
            descendingText: "Sắp xếp Giảm dần"
        },
        summary: {
            texts: {
                count: "{0}",
                sum: "{0}"
            },
            groupItems: [
                {
                    column: "id",
                    summaryType: "count"
                }
            ],
            totalItems: [
                {
                    column: "id",
                    summaryType: "count"
                }
            ]
        },
        wordWrapEnabled: false,
        //METHOD
        //Toolbar
        onToolbarPreparing: function (e) {
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift(
                {//Thêm
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Thêm",
                        icon: "add",
                        type: "success",
                        onClick: function () {
                            $scope.AddBacSi();
                        }
                    }
                },
                {//Sửa
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Sửa",
                        icon: "edit",
                        type: "default",
                        onClick: function () {
                            $scope.EditBacSi();
                        }
                    }
                },
                {//Xóa
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Xóa",
                        icon: "trash",
                        type: "danger",
                        onClick: function () {
                            $scope.DeleteBacSi();
                        }
                    }
                },
                {//Load lại
                    location: "after",
                    widget: "dxButton",
                    options: {
                        hint: "Load lại Dữ liệu",
                        icon: "refresh",
                        onClick: function () {
                            GetAllBacSi();
                        }
                    }
                }
           )
        },
        //DoubleClick Row
        onRowClick: function (e) {
            var component = e.component;

            if (!component.clickCount)
                component.clickCount = 1;
            else
                component.clickCount = component.clickCount + 1;

            if (component.clickCount == 1) {
                component.lastClickTime = new Date();
                setTimeout(function () { component.lastClickTime = 0; component.clickCount = 0; }, 350);
            }
            else if (component.clickCount == 2) {
                if (((new Date()) - component.lastClickTime) < 300) {
                    $scope.bacSi = angular.copy(e.data);
                    $scope.EditBacSi();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        },
        //Select Row
        onSelectionChanged: function (e) {
            $scope.selectedBacSis = angular.copy(e.selectedRowsData);
        }
    };

    //---CONTEXTMENU---
    var itemContextMenus = [
        { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
        { value: 'edit', text: ' Sửa', icon: 'fa fa-pencil' },
        { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
    ];
    //BacSi
    $scope.contextMenuBacSi = {
        dataSource: itemContextMenus,
        width: 100,
        target: '#bacSi',
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
                        $scope.AddBacSi();
                        break;
                    case "edit":
                        $scope.EditBacSi();
                        break;
                    case "delete":
                        $scope.DeleteBacSi();
                        break;
                }
            }
        }
    };


    Init();

    //---FUNCTION---
    function Init() {
        GetAllBacSi();
    }

    //GetAllBacSi
    function GetAllBacSi() {
        $http.get(apiBacSi)
            .then(
                function success(response) {
                    if (response.status == 200) {
                        $scope.bacSis = angular.copy(response.data);
                    } else {

                    }
                },
                function error(response) {

                }
            );
    }
    //Add
    $scope.AddBacSi = function () {
        $window.location.href = "/Admin/BacSi/Modify";
    }
    //Edit
    $scope.EditBacSi = function () {
        if ($scope.selectedBacSis.length == 0) {
            toastr.error("Chọn 1 dòng để sửa");
        } else {
            $scope.bacSi = angular.copy($scope.selectedBacSis[0]);
            $window.location.href = "/Admin/BacSi/Modify?idBacSi=" + $scope.bacSi.id;
        }
    }
    //Delete
    $scope.DeleteBacSi = function () {
        if ($scope.selectedBacSis.length == 0) {
            toastr.error("Chọn dòng để xóa");
        } else {
            $scope.titleDeleteBacSi = "Bạn có chắc chắn muốn xóa?";
            $scope.deleteBacSi = true;
        }
    }
    $scope.ConfirmDeleteBacSi = function () {
        angular.forEach($scope.selectedBacSis, function (value, index) {
            $http.delete(apiBacSi + '/' + value.id)
                .then(
                    function success(response) {
                        if (response.status == 200) {
                            angular.forEach($scope.bacSis, function (valueBacSi, indexBacSi) {
                                if (value.id === valueBacSi.id) {
                                    $scope.bacSis.splice(indexBacSi, 1);
                                }
                            });
                        } else {
                            toastr.error("Thất bại", "Xóa");
                        }
                    },
                    function error(response) {
                        toastr.error("Thất bại", "Xóa");
                    }
                );
        });
        toastr.success("Thành công", "Xóa");
        $scope.deleteBacSi = false;
    };
    $scope.CancelDeleteBacSi = function () {
        $scope.deleteBacSi = false;
    };

}]);