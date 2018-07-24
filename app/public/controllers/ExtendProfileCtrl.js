var ExtendProfileCtrl = angular.module('ExtendProfileCtrl', []);

ExtendProfileCtrl.controller('ExtendProfileController', function ($timeout, $scope, $rootScope, $location, $sce, Auth, AuthUser, CrudData, MockData, AuthToken) {

    var vm = this;

    // $scope.user = AuthUser.getCookieUser();
    console.log("updated", $rootScope.updated);
    if ($rootScope.updatedExtend == false) {
        $rootScope.user = AuthUser.getCookieUser();
    }

    $scope.visible = true;
    $scope.message = "";
    var success = "rgb(114, 162, 114)";
    var error = "rgb(208, 85, 84)";

    console.log("user", $scope.user);
    console.log('ExtendProfile Controller');

    vm.extendData = {
        UserId: $rootScope.user._id,
        BureauName: $rootScope.user.BureauName,
        BureauWebName: $rootScope.user.BureauWebName,
        Address: $rootScope.user.Address,
        ExperienceYear: $rootScope.user.ExperienceYear,
        UserWebName: $rootScope.user.UserWebName,
        Biography: $rootScope.user.Biography,
        TBBNo: $rootScope.user.TBBNo,
        ADLNo: $rootScope.user.ADLNo,
        BureauNo: $rootScope.user.BureauNo,
        BureauCityId: $rootScope.user.BureauCityId,
        LicenceSchoolName: $rootScope.user.LicenceSchoolName,
        LicenceSchoolId: $rootScope.user.LicenceSchoolId,
        LicenceSchoolDate: $rootScope.user.LicenceSchoolDate,
        HighLicenceSchoolName: $rootScope.user.HighLicenceSchoolName,
        HighLicenceSchoolId: $rootScope.user.HighLicenceSchoolId,
        HighLicenceSchoolDate: $rootScope.user.HighLicenceSchoolDate,
        PostLicenceSchoolName: $rootScope.user.PostLicenceSchoolName,
        PostLicenceSchoolId: $rootScope.user.PostLicenceSchoolId,
        PostLicenceSchoolDate: $rootScope.user.PostLicenceSchoolDate,
        UserKeywords: $rootScope.user.UserKeywords,
        ProcessDate: $rootScope.user.ProcessDate,
        IsBureauWebName: $rootScope.user.IsBureauWebName,
        IsUserWebName: $rootScope.user.IsUserWebName,
        IsLicenceSchoolName: $rootScope.user.IsLicenceSchoolName,
        IsHighLicenceSchoolName: $rootScope.user.IsHighLicenceSchoolName,
        IsPostLicenceSchoolName: $rootScope.user.IsPostLicenceSchoolName,

    }
    globe.SetValueById("formUserKeywords", vm.extendData.UserKeywords);


    // GET CITIES -----------------------------------------------
    MockData.getCities().then(function (data) {

        $scope.cities = data;
    });

    // GET SCHOOLS -----------------------------------------------
    MockData.getSchools().then(function (data) {

        $scope.schools = data;

    });

    vm.GetIsUserWebName = function () {
        console.log(vm.extendData.IsUserWebName);
    }
    vm.GetIsBureauWebName = function () {
        console.log(vm.extendData.IsBureauWebName);
    }
    vm.GetIsLicenceSchoolName = function (item) {


    }
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

        console.log($("#formUserKeywords").text());


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

            // - School Name Definition -------------------------------
            angular.forEach($scope.schools, function (item) {
                if (item.id == vm.extendData.LicenceSchoolId) {
                    vm.extendData.LicenceSchoolName = item.name;
                }
                if (item.id == vm.extendData.HighLicenceSchoolId) {
                    vm.extendData.HighLicenceSchoolName = item.name;
                }
                if (item.id == vm.extendData.PostLicenceSchoolId) {
                    vm.extendData.PostLicenceSchoolName = item.name;
                }
            });
            // ---------------------------------------------------------


            CrudData.updateExtendProfile(vm.extendData, function (response) {
                console.log(response.data.success);



                if (response.data.success === true) {

                    Auth.login($scope.user.Email, $scope.user.PasswordPlain, function (response) {
                        if (response.data.success) {

                            $rootScope.updatedExtend = true;
                            console.log("update extend", response.data.user);
                            $rootScope.user = response.data.user;
                            vm.extendData = {
                                UserId: $rootScope.user._id,
                                BureauName: $rootScope.user.BureauName,
                                BureauWebName: $rootScope.user.BureauWebName,
                                Address: $rootScope.user.Address,
                                ExperienceYear: $rootScope.user.ExperienceYear,
                                UserWebName: $rootScope.user.UserWebName,
                                Biography: $rootScope.user.Biography,
                                TBBNo: $rootScope.user.TBBNo,
                                ADLNo: $rootScope.user.ADLNo,
                                BureauNo: $rootScope.user.BureauNo,
                                BureauCityId: $rootScope.user.BureauCityId,
                                LicenceSchoolName: $rootScope.user.LicenceSchoolName,
                                LicenceSchoolId: $rootScope.user.LicenceSchoolId,
                                LicenceSchoolDate: $rootScope.user.LicenceSchoolDate,
                                HighLicenceSchoolName: $rootScope.user.HighLicenceSchoolName,
                                HighLicenceSchoolId: $rootScope.user.HighLicenceSchoolId,
                                HighLicenceSchoolDate: $rootScope.user.HighLicenceSchoolDate,
                                PostLicenceSchoolName: $rootScope.user.PostLicenceSchoolName,
                                PostLicenceSchoolId: $rootScope.user.PostLicenceSchoolId,
                                PostLicenceSchoolDate: $rootScope.user.PostLicenceSchoolDate,
                                UserKeywords: $rootScope.user.UserKeywords,
                                ProcessDate: $rootScope.user.ProcessDate,
                                IsBureauWebName: $rootScope.user.IsBureauWebName,
                                IsUserWebName: $rootScope.user.IsUserWebName,
                                IsLicenceSchoolName: $rootScope.user.IsLicenceSchoolName,
                                IsHighLicenceSchoolName: $rootScope.user.IsHighLicenceSchoolName,
                                IsPostLicenceSchoolName: $rootScope.user.IsPostLicenceSchoolName,
                            }

                            $scope.message = "Detay Profiliniz Güncellendi :)"
                            $scope.back = success;
                            $scope.setStyle();
                            $scope.visible = false;
                            $timeout(function () {
                                $scope.visible = true;

                                $scope.$apply(function () {});

                            }, 2000);

                        }
                    });

                } else {
                    $scope.message = "Detay Profil Güncelleme Hata Oluştu :("
                    $scope.back = error;
                    $scope.setStyle();
                    $scope.visible = false;
                    $timeout(function () {
                        $scope.visible = true;
                        //  location.reload();
                    }, 2000);
                }
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