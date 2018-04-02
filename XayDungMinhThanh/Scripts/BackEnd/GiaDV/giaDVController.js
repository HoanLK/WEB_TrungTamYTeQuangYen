admin.controller("giaDVController", ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
    //---VAR---
    //Bài viết
    $scope.GiaDVs = [];
    $scope.GiaDV = {};
    $scope.selectedGiaDVs = [];
    var apiGiaDV = "/API/GiaDichVuAPI";


    //---POPUP---
    //GiaDV
    $scope.deleteGiaDV = false;
    $scope.titleDeleteGiaDV = "Bạn có chắc chắn muốn xóa?";
    $scope.popupDeleteGiaDV = {
        width: "auto",
        height: "auto",
        contentTemplate: "templateDeleteGiaDV",
        showTitle: false,
        bindingOptions: {
            visible: "deleteGiaDV",
        }
    };

    //---CONTROL CONFIG---

    //---LIST---
    //Category GiaDVs
    $scope.gridGiaDVs = {
        bindingOptions: {
            dataSource: 'GiaDVs'
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
                dataField: "ID",
                fixed: true,
                fixedPosition: "left",
                width: 90
            },
            {//1
                alignment: "left",
                caption: "Mã dịch vụ",
                dataField: "MaDV",
                dataType: "string",
                fixed: true,
                fixedPosition: "left",
            },
            {//1
                alignment: "left",
                caption: "Tên dịch vụ",
                dataField: "TenDV",
                dataType: "string",
                fixed: true,
                fixedPosition: "left",
            },
            {//1
                alignment: "left",
                caption: "Giá bảo hiểm",
                dataField: "GiaBaoHiem",
                dataType: "int",
                fixed: true,
                fixedPosition: "left",
            },
            {//1
                alignment: "left",
                caption: "Giá viện phí",
                dataField: "GiaVienPhi",
                dataType: "int",
                fixed: true,
                fixedPosition: "left",
            },
            {//1
                alignment: "left",
                caption: "Giá yêu cầu",
                dataField: "GiaYeuCau",
                dataType: "int",
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
            fileName: "Danh sách giá dịch vụ",
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
                    column: "ID",
                    summaryType: "count"
                }
            ],
            totalItems: [
                {
                    column: "ID",
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
                            $scope.AddGiaDV();
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
                            $scope.EditGiaDV();
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
                            $scope.DeleteGiaDV();
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
                            GetAllGiaDV();
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
                    $scope.GiaDV = angular.copy(e.data);
                    $scope.EditGiaDV();
                }

                // Reset your click info
                component.clickCount = 0;
                component.lastClickTime = 0;
            }
        },
        //Select Row
        onSelectionChanged: function (e) {
            $scope.selectedGiaDVs = angular.copy(e.selectedRowsData);
        }
    };

    //---CONTEXTMENU---
    var itemContextMenus = [
        { value: 'add', text: ' Thêm', icon: 'fa fa-plus' },
        { value: 'edit', text: ' Sửa', icon: 'fa fa-pencil' },
        { value: 'delete', text: ' Xóa', icon: 'fa fa-times' }
    ];
    //GiaDV
    $scope.contextMenuGiaDV = {
        dataSource: itemContextMenus,
        width: 100,
        target: '#GiaDV',
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
                        $scope.AddGiaDV();
                        break;
                    case "edit":
                        $scope.EditGiaDV();
                        break;
                    case "delete":
                        $scope.DeleteGiaDV();
                        break;
                }
            }
        }
    };


    Init();

    //---FUNCTION---
    function Init() {
        GetAllGiaDV();
    }

    //GetAllGiaDV
    function GetAllGiaDV() {
        $http.get(apiGiaDV)
            .then(
            function success(response) {
                if (response.status == 200) {
                    $scope.GiaDVs = angular.copy(response.data);
                } else {

                }
            },
            function error(response) {

            }
            );
    }
    //Add
    $scope.AddGiaDV = function () {
        $window.location.href = "/Admin/GiaDV/Modify";
    }
    //Edit
    $scope.EditGiaDV = function () {
        if ($scope.selectedGiaDVs.length == 0) {
            toastr.error("Chọn 1 dòng để sửa");
        } else {
            console.log($scope.GiaDV);
            $scope.GiaDV = angular.copy($scope.selectedGiaDVs[0]);
            $window.location.href = "/Admin/GiaDV/Modify?idGiaDV=" + $scope.GiaDV.ID;
        }
    }
    //Delete
    $scope.DeleteGiaDV = function () {
        if ($scope.selectedGiaDVs.length == 0) {
            toastr.error("Chọn dòng để xóa");
        } else {
            $scope.titleDeleteGiaDV = "Bạn có chắc chắn muốn xóa?";
            $scope.deleteGiaDV = true;
        }
    }
    $scope.ConfirmDeleteGiaDV = function () {
        angular.forEach($scope.selectedGiaDVs, function (value, index) {
            $http.delete(apiGiaDV + '/' + value.ID)
                .then(
                function success(response) {
                    if (response.status == 200) {
                        angular.forEach($scope.GiaDVs, function (valueGiaDV, indexGiaDV) {
                            if (value.ID === valueGiaDV.ID) {
                                $scope.GiaDVs.splice(indexGiaDV, 1);
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
        $scope.deleteGiaDV = false;
    };
    $scope.CancelDeleteGiaDV = function () {
        $scope.deleteGiaDV = false;
    };

}]);