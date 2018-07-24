var EssaysCtrl = angular.module('EssaysCtrl', []);

EssaysCtrl.controller('EssaysController', function ($timeout, $scope, $rootScope, CrudData, UploadSrv, $compile, AuthUser) {

    console.log('Essays Controller');
    angular.element(function () {
        console.log('page loading completed');

    });


    var vm = this;
    $scope.visible = true;
    $scope.message = "";
    $scope.selectedPicName = "Yayın kapak resmi seçmeyi unutmayınız."
    var success = "rgb(114, 162, 114)";
    var error = "rgb(208, 85, 84)";
    var warn = "#eac675";
    $scope.essays;

    $rootScope.user = AuthUser.getUser();
    var UserId = $rootScope.user._id;
    vm.EssayPicChanged = false;
    vm.Action = "Değişiklikleri Kaydet";

    CrudData.getEssays(UserId, function (response) {
        if (response.data.success) {

            $rootScope.essays = response.data.essays;

            var sayac = 0;
            $scope.content = "";
            angular.forEach($scope.essays, function (item) {
                var id = "'" + item._id + "'";
                $scope.content += '<tr><td>' + sayac++ + '</td><td>' +
                    '<div class="doc-thumbnail img-thumbnail mx-auto"><img class="img-fluid mx-auto" src=' + item.EssayImgPath + ' data-toggle="tooltip" data-placement="top" title=' + item.EssayName + '/></div></td>' +
                    '<td><a class="text-info" href="#">' + item.EssayName + ' <span class="icons icon-action-redo"></span></a></td>' +
                    '<td>' + item.ProcessDate + '</td><td><button type="button" class="btn btn-info" ng-click="essay.ChooseFile(' + id + ')">Seç</button></td>' +
                    '<td><button type="button" class="btn btn-danger" ng-click="essay.deleteEssay(' + id + ')">Sil</button></td></tr>';
            });
            console.log($scope.content);
            var tblElem = angular.element($scope.content);
            var compileFN = $compile(tblElem);
            compileFN($scope);

            // add to DOM 
            $("#table").append(tblElem);
            $("#mainTable").DataTable();

        }
    });


    vm.essayData = {
        _id: null,
        UserId: user._id,
        EssayName: null,
        EssayContent: null,
        EssaySubject: null,
        EssayImgPath: null,
        ProcessDate: null,
        EssaySituation: null,
        EssayPicName: null
    }

    vm.deleteEssay = function (id) {

        var item;
        angular.forEach($scope.essays, function (ite) {
            if (ite._id == id) {
                item = ite;
            }
        });

        result = window.confirm("Yayını Silmek istediğinize emin misiniz ?");
        if (result) {
            CrudData.deleteEssay(item, function () {
                CrudData.getEssays(UserId, function (response) {
                    if (response.data.success) {
                        $rootScope.essays = response.data.essays;

                        location.reload();
                        $scope.message = "Silme Başarılı :)";
                        $scope.back = success;
                        $scope.setStyle();
                        $scope.visible = false;
                    } else {
                        $scope.message = "Silme Hata Oluştu :(";
                        $scope.back = error;
                        $scope.setStyle();
                        $scope.visible = false;

                    }
                    $timeout(function () {
                        $scope.visible = true;
                        location.reload();
                    }, 2500);
                });
            });
        }
    }

    vm.ChooseFile = function (id) {

        var item;
        angular.forEach($scope.essays, function (ite) {

            if (ite._id == id) {
                item = ite;
            }
        });


        vm.Action = "Güncelle"
        vm.essayData._id = item._id;
        vm.essayData.EssayName = item.EssayName;
        vm.essayData.EssaySubject = item.EssaySubject;
        vm.essayData.EssayImgPath = item.EssayImgPath;
        vm.essayData.ProcessDate = item.ProcessDate;
        vm.essayData.EssaySituation = item.EssaySituation;
        vm.essayData.EssayPicName = item.EssayPicName;
        $scope.selectedPicName = vm.essayData.EssayPicName;
        $('#formEditor').summernote('code', item.EssayContent);

    }
    vm.CancelAction = function () {
        vm.essayData = {
            _id: null,
            UserId: user._id,
            EssayName: null,
            EssayContent: null,
            EssaySubject: null,
            EssayImgPath: null,
            ProcessDate: null,
            EssaySituation: null,
            EssayPicName: null
        }
        $('#formEditor').summernote('code', null);
        vm.Action = "Değişiklikleri Kaydet"
        $scope.selectedPicName = "Yayın kapak resmi seçmeyi unutmayınız."
    }

    $scope.essayPicSelected = function (element) {

        vm.essayData.EssayPicName = element.files[0].name;
        $scope.EssayPicType = element.files[0].type;
        $scope.EssayFile = element.files[0];
        $scope.selectedPicName = vm.essayData.EssayPicName

        vm.EssayPicChanged = true;
        $scope.$apply(function () {})
    }

    vm.SaveOrUpdateEssay = function () {

        vm.essayData.EssayContent = globe.GetValueById("formEditor");

        console.log(vm.essayData.EssayContent);


        if (vm.essayData.EssayContent == null || vm.essayData.EssayContent == '' || vm.essayData.EssayContent == '<p><br></p>') {

            $scope.message = "Yayın İçeriği Girmelisiniz :|";
            $scope.back = warn;
            $scope.setStyle();
            $scope.visible = false;

            $timeout(function () {
                $scope.visible = true;
            }, 2500);
        } else {
            vm.essayData.ProcessDate = globe.getDate();
            vm.essayData.EssayImgPath = '../assets/uploadEssayFiles/' + user._id + "_" + vm.essayData.EssayPicName;
            vm.essayData.EssaySituation = true;

            console.log(vm.essayData);
            console.log(vm.Action);

            if (vm.Action == "Güncelle") {

                if (vm.EssayPicChanged) {
                    UploadSrv.uploadEssayFile($scope.EssayFile);
                    CrudData.updateEssay(vm.essayData, function (response) {
                        if (response.data.success) {

                            $scope.message = "Yayın Güncellendi";
                            $scope.back = success;
                            $scope.setStyle();
                            $scope.visible = false;
                        } else {
                            $scope.message = "Yayın Güncellerken Hata Oluştu :(";
                            $scope.back = error;
                            $scope.setStyle();
                            $scope.visible = false;
                        }

                        $timeout(function () {
                            $scope.visible = true;
                        }, 2500);
                    });
                } else {

                    CrudData.updateEssay(vm.essayData, function (response) {
                        if (response.data.success) {
                            $scope.message = "Yayın Güncellendi :)"
                            $scope.back = success;
                            location.reload();
                            $scope.setStyle();
                            $scope.visible = false;
                        } else {
                            $scope.message = "Yayın Güncellerken Hata Oluştu :("
                            $scope.back = error;
                            $scope.setStyle();
                            $scope.visible = false;
                        }

                        $timeout(function () {
                            $scope.visible = true;
                            location.reload();
                        }, 2500);
                    });
                }
            } else if (vm.Action == "Değişiklikleri Kaydet") {

                if ($scope.EssayFile != null && $scope.EssayFile != undefined) {
                    UploadSrv.uploadEssayFile($scope.EssayFile);
                    CrudData.saveEssay(vm.essayData, function (response) {
                        if (response.data.success) {
                            location.reload();
                            vm.Action = "Değişiklikleri Kaydet"
                            vm.EssayPicChanged = false;
                            $scope.message = "Yayın Eklendi :)";
                            $scope.back = success;
                            $scope.setStyle();
                            $scope.visible = false;
                        } else {
                            $scope.message = "Yayın Eklemede Hata Oluştu :(";
                            $scope.back = error;
                            $scope.setStyle();
                            $scope.visible = false;
                        }
                        $timeout(function () {
                            $scope.visible = true;
                            location.reload();
                        }, 2500);
                    });

                } else {
                    $scope.message = "Yayın için kapak resmi unutmayin :|";
                    $scope.back = warn;
                    $scope.setStyle();
                    $scope.visible = false;
                    $timeout(function () {
                        $scope.visible = true;
                    }, 2500);
                }
            }

            vm.Action = "Değişiklikleri Kaydet"
            vm.EssayPicChanged = false;
            vm.essayData = {
                _id: null,
                UserId: user._id,
                EssayName: null,
                EssayContent: null,
                EssaySubject: null,
                EssayImgPath: null,
                ProcessDate: null,
                EssaySituation: null,
                EssayPicName: null,
            }
            $scope.selectedPicName = "Yayın kapak resmi seçmeyi unutmayınız."

            CrudData.getEssays(UserId, function (response) {
                if (response.data.success) {
                    $rootScope.essays = response.data.essays;
                }
            });
        }
    }

    $scope.setStyle = function () {
        return {
            background: $scope.back
        }
    }



});