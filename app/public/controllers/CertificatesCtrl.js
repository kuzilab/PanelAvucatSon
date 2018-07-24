var CertificatesCtrl = angular.module('CertificatesCtrl', []);

CertificatesCtrl.controller('CertificatesController', function ($timeout, $scope, $rootScope, $location, $sce, MockData, UploadSrv, CrudData, AuthUser, $compile) {



    var vm = this;
    $scope.visible = true;
    $scope.message = "";
    var success = "rgb(114, 162, 114)";
    var error = "rgb(208, 85, 84)";
    var warn = "#eac675";
    console.log('Certificates Controller');

    $rootScope.user = AuthUser.getUser();

    var UserId = $rootScope.user._id;
    var CertificateSituation = $rootScope.user.CertificateSituation;

    CrudData.getCertificates(UserId, function (response) {
        if (response.data.success) {
            $rootScope.certificates = response.data.certificates;

            var sayac = 0;
            $scope.content = "";
            angular.forEach($rootScope.certificates, function (item) {
                var id = "'" + item._id + "'";
                sayac += 1;
                var path = "../assets/img/docs/" + item.ThumbnailType;
                $scope.content += '<tr><td>' + sayac + '</td>' +
                    '<td><div class="doc-thumbnail img-thumbnail mx-auto"><img class="img-fluid mx-auto" src=' + path + ' data-toggle="tooltip" data-placement="top"title="Microsoft Word" /></div></td>' +
                    '<td>' + item.CertificateFileName + '</td>' +
                    '<td>' + item.FileType + '</td>' +
                    '<td>' + item.SavedDate + '</td>' +
                    '<td><button type="button" class="btn btn-danger" ng-click="certificate.deleteCertificate(' + id + ')">Sil</button></td></tr>'
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

    vm.certificateData = {
        UserId: $rootScope.user._id,
        CertificateFileName: null,
        CertificateFilePath: null,
        FileType: null,
        SavedDate: null,
        CertificateSituation: null,
        ThumbnailType: null,
        ProfileBase64Pic: null
    }

    $scope.certificateSelected = function (element) {

        $scope.certificateName = element.files[0].name;
        $scope.certificateType = element.files[0].type;
        $scope.certificateFile = element.files[0];
        console.log(element.files[0]);

        var reader = new FileReader();
        reader.onload = function (e) {
            $scope.$apply(function () {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    vm.certificateData.ProfileBase64Pic = e.target.result;
                }
            });
        };
        reader.readAsDataURL(element.files[0]);

    }

    vm.deleteCertificate = function (id) {

        result = window.confirm("Dosyayı Silmek istediğinize emin misiniz ?");

        if (result) {

            var item;
            angular.forEach($scope.certificates, function (ite) {
                if (ite._id == id) {
                    item = ite;
                }
            });

            CrudData.deleteCertificate(item, function (response) {
                if (response.data.success) {
                    CrudData.getCertificates(UserId, function (response) {
                        if (response.data.success) {
                            $rootScope.certificates = response.data.certificates;
                            $scope.message = "Silme Başarılı :)";
                            $scope.back = success;
                            $scope.setStyle();
                            $scope.visible = false;
                            $timeout(function () {
                                $scope.visible = true;
                                location.reload();
                            }, 2500);
                        }
                    });
                    console.log(response);
                }
            });

        }
    }

    vm.SaveCertificate = function () {
        var result = globe.getExtension($scope.certificateType)
        if (result == "success") {

            UploadSrv.uploadCertificateFile($scope.certificateFile);
            vm.certificateData.SavedDate = globe.getDate();
            vm.certificateData.CertificateSituation = true
            var type = globe.getExtensionForCertificate($scope.certificateType);
            vm.certificateData.FileType = '.' + type
            vm.certificateData.ThumbnailType = "default.png";
            vm.certificateData.CertificateFilePath = '../assets/uploadCertificateFiles/' + $scope.certificateName;

            CrudData.saveCertificate(vm.certificateData, function (response) {
                if (response.data.success) {
                    var UserId = user._id;
                    CrudData.getCertificates(UserId, function (response) {
                        if (response.data.success) {
                            $rootScope.certificates = response.data.certificates;

                            var sayac = 0;
                            $scope.content = "";
                            angular.forEach($rootScope.certificates, function (item) {
                                var id = "'" + item._id + "'";
                                sayac += 1;
                                var path = "../assets/img/docs/" + item.ThumbnailType;
                                $scope.content += '<tr><td>' + sayac + '</td>' +
                                    '<td><div class="doc-thumbnail img-thumbnail mx-auto"><img class="img-fluid mx-auto" src=' + path + ' data-toggle="tooltip" data-placement="top"title="Microsoft Word" /></div></td>' +
                                    '<td>' + item.CertificateFileName + '</td>' +
                                    '<td>' + item.FileType + '</td>' +
                                    '<td>' + item.SavedDate + '</td>' +
                                    '<td><button type="button" class="btn btn-danger" ng-click="certificate.deleteCertificate(' + id + ')">Sil</button></td></tr>'
                            });

                            console.log($scope.content);
                            var tblElem = angular.element($scope.content);
                            var compileFN = $compile(tblElem);
                            compileFN($scope);

                            // add to DOM 
                            $("#table").append(tblElem);
                            $("#mainTable").DataTable();


                            $scope.message = "Dosya Eklendi :)";
                            $scope.back = success;
                            $scope.setStyle();
                            $scope.visible = false;
                            $timeout(function () {
                                $scope.visible = true;
                                //   location.reload()
                            }, 2500);
                        } else {
                            $scope.message = "Dosya Yüklerken Hata Oluştu :(";
                            $scope.back = error;
                            $scope.setStyle();
                            $scope.visible = false;
                            $timeout(function () {
                                $scope.visible = true;
                            }, 2500);
                        }
                    });
                }
            });

        } else {
            $scope.message = ".PNG veya JPEG formatı seçmelisiniz :|";
            $scope.back = warn;
            $scope.setStyle();
            $scope.visible = false;
            $timeout(function () {
                $scope.visible = true;
            }, 2500);
        }
    }

    $scope.setStyle = function () {
        return {
            background: $scope.back
        }
    }


});