App.controller('AdminCtrl', ['$scope', '$localStorage', '$window', '$http',
    function ($scope, $localStorage, $window, $http) {

        $scope.add_admin_data = {
            email : "",
            name :"",
            grade : "",
            password : "",
            repassword : ""
        };
        $scope.adminUser_list = [];
        $scope.modalTitle = "";

        var modalState = "";
        var modalTargetId = "";
        var $modal_adminUser = $("#modal-add_admin");
        var $form_adminUser = $("#modal_admin_form");



        get_admin_list({
            callback : function(){
                setTimeout(function(){
                    $('#admin_user_table').dataTable({
                        pageLength: 10,
                        lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]]
                    });
                })
            }
        });

        $scope.open_modal = function(){
            modalState = "add";
            $scope.modalTitle = "추가";
            $modal_adminUser.modal('show');
        }

        $scope.open_edit_modal = function(id){
            open_loadingAjax();
            modalTargetId = id;
            modalState = "edit";
            $http({
                method: 'POST',
                url: "/admin/get_adminUser",
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                data: JSON.stringify({_id:id})
            }).then(function(res){
                $scope.add_admin_data = $.extend($scope.add_admin_data,res.data.data[0]);
                $scope.add_admin_data.repassword = $scope.add_admin_data.password;
                close_loadingAjax();
                $scope.modalTitle = "수정";
                $modal_adminUser.modal('show');
            })
        }

        $scope.confrim_adminUser_form = function(){
            var res = validation_add_admin($scope.add_admin_data);
            if(res.length>0){
                alert("입력값이 잘못됬습니다.");
                return false;
            }
            if(modalState == "add"){
                $http({
                    method: 'POST',
                    url: "/api/register",
                    headers: {'Content-Type': 'application/json; charset=utf-8'},
                    data: JSON.stringify($scope.add_admin_data)
                }).then(function(res){
                    $modal_adminUser.modal("hide");
                    _form_adminUser_reset();
                    get_admin_list();
                })
            }else if(modalState == "edit"){
                $http({
                    method: 'PUT',
                    url: "/admin/update_adminUser",
                    headers: {'Content-Type': 'application/json; charset=utf-8'},
                    data: JSON.stringify({_id : modalTargetId , data : $scope.add_admin_data})
                }).then(function(){
                    $modal_adminUser.modal("hide");
                    _form_adminUser_reset();
                    get_admin_list();
                })
            }

        }

        $scope.del_adminUser = function(id){
            $http({
                method: 'DELETE',
                url: "/admin/delete_adminUser",
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                data: JSON.stringify({_id:id})
            }).then(function(){
                $modal_adminUser.modal("hide");
                _form_adminUser_reset();
                get_admin_list();
            })
        }

        $scope.form_adminUser_reset = function(){
            _form_adminUser_reset();
        }

        function _form_adminUser_reset() {
            for(var i in $scope.add_admin_data){
                $scope.add_admin_data[i] = "";
            }
        }
        function get_admin_list(opt){
            var opt = $.extend({},opt);
            $http({
                method: 'GET',
                url: "/admin/get_adminUserList",
            }).then(function(res){
                var list = res.data.data;
                $scope.adminUser_list = [];
                for(var i=0;i<list.length;i++){
                    var obj = $.extend({},list[i]);
                    $scope.adminUser_list.push(obj);
                }
                if(typeof opt.callback == "function") opt.callback();
            })
        }

    }
]);

App.controller('LoginCtrl', ['$scope', '$localStorage', '$window', '$http','$state','authentication', '$location',
    function ($scope, $localStorage, $window, $http,$state,authentication,$location) {

        $scope.credentials = {
            email : "",
            password : ""
        };
        if(authentication.isLoggedIn($scope.credentials)){
            $location.path("/");
        }

        $scope.onLoginSubmit = function () {
            authentication
                .login($scope.credentials)
        };

        $scope.onKeyDownSubmit = function(e){
            if(e.keyCode == 13){
                authentication
                    .login($scope.credentials)
            }
        }
    }
]);


function open_loadingAjax(){
    swal(
        {
            title: 'loading',
            showConfirmButton: false,
            html : '<i class="fa fa-4x fa-asterisk fa-spin text-success"></i>',
            confirmButtonText: "관리 페이지 새로고침",
            allowOutsideClick: false
        }
    );
}

function close_loadingAjax(){
    swal.close();
}