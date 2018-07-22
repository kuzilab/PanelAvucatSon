var ExtendProfileCtrl = angular.module('ExtendProfileCtrl', []);

ExtendProfileCtrl.controller('ExtendProfileController', function ($timeout, $scope, $rootScope, $location, $sce, Auth, AuthUser, CrudData, MockData) {



    var vm = this;
    var user = $rootScope.user;

    $scope.visible = true;
    $scope.message = "";
    var success = "rgb(114, 162, 114)";
    var error = "rgb(208, 85, 84)";

    console.log("user", user);
    console.log('ExtendProfile Controller');

    vm.extendData = {
        UserId: user._id,
        BureauName: user.BureauName,
        BureauWebName: user.BureauWebName,
        Address: user.Address,
        ExperienceYear: user.ExperienceYear,
        UserWebName: user.UserWebName,
        Biography: user.Biography,
        TBBNo: user.TBBNo,
        ADLNo: user.ADLNo,
        BureauNo: user.BureauNo,
        BureauCityId: user.BureauCityId,
        LicenceSchoolName: user.LicenceSchoolName,
        LicenceSchoolId: user.LicenceSchoolId,
        LicenceSchoolDate: user.LicenceSchoolDate,
        HighLicenceSchoolName: user.HighLicenceSchoolName,
        HighLicenceSchoolId: user.HighLicenceSchoolId,
        HighLicenceSchoolDate: user.HighLicenceSchoolDate,
        PostLicenceSchoolName: user.PostLicenceSchoolName,
        PostLicenceSchoolId: user.PostLicenceSchoolId,
        PostLicenceSchoolDate: user.PostLicenceSchoolDate,
        UserKeywords: user.UserKeywords,
        ProcessDate: user.ProcessDate,
        IsBureauWebName: user.IsBureauWebName,
        IsUserWebName: user.IsUserWebName,
        IsLicenceSchoolName: user.IsLicenceSchoolName,
        IsHighLicenceSchoolName: user.IsHighLicenceSchoolName,
        IsPostLicenceSchoolName: user.IsPostLicenceSchoolName,

    }
    globe.SetValueById("formUserKeywords", vm.extendData.UserKeywords);

    console.log(vm.extendData);

    // GET CITIES -----------------------------------------------
    MockData.getCities().then(function (data) {
        console.log(data);
        $scope.cities = data;
    });

    // GET SCHOOLS -----------------------------------------------
    MockData.getSchools().then(function (data) {
        console.log(data);
        $scope.schools = data;
        console.log($scope.schools);
    });

    vm.GetIsUserWebName = function () {
        console.log(vm.extendData.IsUserWebName);
    }
    vm.GetIsBureauWebName = function () {
        console.log(vm.extendData.IsBureauWebName);
    }
    vm.GetIsLicenceSchoolName = function () {}
    vm.GetIsHighLicenceSchoolName = function () {}
    vm.GetIsPostLicenceSchoolName = function () {}
    vm.GetKeywords = function () {
        console.log(vm.extendData.UserKeywords);
    }

    vm.updateExtendProfile = function () {


        vm.extendData.LicenceSchoolDate = globe.GetValueById("formLicenceSchoolYear");
        vm.extendData.HighLicenceSchoolDate = globe.GetValueById("formHighLicenceSchoolYear");
        vm.extendData.PostLicenceSchoolDate = globe.GetValueById("formPostLicenceSchoolYear");
        vm.extendData.UserKeywords = globe.GetValueById("formUserKeywords")
        console.log(vm.extendData);


        // Validation BUGS - Angular 1.6.5 version ------------------------------
        var result = 0;
        if (vm.extendData.IsLicenceSchoolName) {
            if (vm.extendData.LicenceSchoolId == null || vm.extendData.LicenceSchoolId == "") {
                result = 1;
            }
            if (vm.extendData.LicenceSchoolDate == "") {
                result = 1;
            }
        }
        if (vm.extendData.IsHighLicenceSchoolName) {
            if (vm.extendData.HighLicenceSchoolId == null || vm.extendData.HighLicenceSchoolId == "") {
                result = 1;
            }
            if (vm.extendData.HighLicenceSchoolDate == "") {
                result = 1;
            }
        }
        if (vm.extendData.IsPostLicenceSchoolName) {

            if (vm.extendData.PostLicenceSchoolName == null || vm.extendData.PostLicenceSchoolName == "") {
                result = 1;
            }
            if (vm.extendData.PostLicenceSchoolDate == "") {
                result = 1;
            }
        }
        // ----------------------------------------------------------------------------

        if (result == 0) {
            CrudData.updateExtendProfile(vm.extendData, function (response) {
                console.log(response);
                if (response.data.success == true) {
                    Auth.login(user.Email, user.Password, function (response) {
                        if (response.data.success) {
                            $rootScope.user = response.data.user;
                            user = $rootScope.user;
                        }
                    });
                    $scope.message = "Detay Profiliniz Güncellendi :)"
                    $scope.back = success;
                    $scope.setStyle();
                } else {
                    $scope.message = "Detay Profil Güncelleme Hata Oluştu :("
                    $scope.back = error;
                    $scope.setStyle();
                }
                $scope.visible = false;
                $timeout(function () {
                    $scope.visible = true;
                }, 2000);
            });
        }
    }

    vm.testMe = function () {
        console.log(vm.extendData.LicenceSchoolDate);
    }

    $scope.setStyle = function () {
        return {
            background: $scope.back
        }
    }




});