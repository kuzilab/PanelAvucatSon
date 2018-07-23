var SocialCtrl = angular.module('SocialCtrl', []);

SocialCtrl.controller('SocialController', function ($timeout, $scope, $rootScope, $location, $sce, CrudData, AuthUser) {
    var vm = this;
    $scope.visible = true;
    $scope.message = "";
    var success = "rgb(114, 162, 114)";
    var error = "rgb(208, 85, 84)";
    var back = success;
    $scope.user = AuthUser.getCookieUser();
    vm.action = "Değişiklikleri Kaydet"
    console.log('Social Controller');

    vm.socialData = {
        _id: null,
        UserId: null,
        BureauFacebook: null,
        BureauInstagram: null,
        BureauTwitter: null,
        UserFacebook: null,
        UserInstagram: null,
        UserTwitter: null,
        ProcessDate: null
    }

    var UserId = $scope.user._id;
    CrudData.getSocialInfo(UserId, function (response) {
        if (response.data.success) {

            var socials = response.data.socials;
            if (response.data.socials.length != 0) {
                vm.action = "Güncelle";
                vm.socialData = {
                    _id: socials._id,
                    UserId: socials.UserId,
                    BureauFacebook: socials.BureauFacebook,
                    BureauInstagram: socials.BureauInstagram,
                    BureauTwitter: socials.BureauTwitter,
                    UserFacebook: socials.UserFacebook,
                    UserInstagram: socials.UserInstagram,
                    UserTwitter: socials.UserTwitter,
                    ProcessDate: socials.ProcessDate
                }
            } else {

                vm.socialData = {
                    UserId: null,
                    BureauFacebook: null,
                    BureauInstagram: null,
                    BureauTwitter: null,
                    UserFacebook: null,
                    UserInstagram: null,
                    UserTwitter: null,
                    ProcessDate: null
                }

            }
        }
    });

    vm.updateOrSaveSocialInfo = function () {
        vm.socialData.ProcessDate = globe.getDate();
        vm.socialData.UserId = $scope.user._id;

        console.log(vm.socialData);

        CrudData.saveOrUpdateSocialInfo(vm.socialData, vm.action, function (response) {
            if (response.data.success) {
                if (vm.action = "Güncelle") {
                    $scope.message = "Güncelleme Başarılı :)";
                } else {
                    $scope.message = "Kayıt Başarılı :)";
                }

                $scope.back = success;
                $scope.setStyle();
                $scope.visible = false;

                $timeout(function () {
                    $scope.visible = true;

                }, 2500);
            }
        });
    }

    $scope.setStyle = function () {
        return {
            background: back
        }
    }
});