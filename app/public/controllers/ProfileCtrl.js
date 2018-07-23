var ProfileCtrl = angular.module('ProfileCtrl', []);

ProfileCtrl.controller('ProfileController', function ($cookieStore, $window, $scope, $rootScope, GoogleMapster, $location, $sce, Auth, AuthUser, MockData, CrudData, UploadSrv, PassData, $timeout) {

    console.log('Profile Controller');
    var vm = this;
    $scope.visible = true;
    $scope.message = "";
    var success = "rgb(114, 162, 114)";
    var error = "rgb(208, 85, 84)";

    $scope.user = AuthUser.getCookieUser();
    console.log(AuthUser.getCookieUser());

    vm.RePassword = $scope.user.PasswordPlain;
    vm.profileData = {
        _id: $scope.user._id,
        NameSurname: $scope.user.NameSurname,
        ProfilePicPath: $scope.user.ProfilePicPath,
        Phone: $scope.user.Phone,
        Email: $scope.user.Email,
        ExpertiseFields: $scope.user.ExpertiseFields,
        LatLng: $scope.user.LatLng,
        Lat: $scope.user.Lat,
        Lng: $scope.user.Lng,
        Password: $scope.user.Password,
        PasswordPlain: $scope.user.PasswordPlain,
        ProcessDate: $scope.user.ProcessDate,
        LocationAddress: $scope.user.LocationAddress,
        ProfileBase64Pic: $scope.user.ProfileBase64Pic
    }

    console.log(vm.profileData);

    globe.SetValueById('formUzmanlikAlanlari', $scope.user.ExpertiseFields);

    getExpertiseFields = function () {
        vm.profileData.ExpertiseFields = globe.GetValueById('formUzmanlikAlanlari');
        if (vm.profileData.ExpertiseFields.length != 0) {} else {
            vm.profileData.ExpertiseFields = null;
        }
        $scope.$apply(function () {});
    }


    if (vm.profileData.ProfilePicPath == null) {
        vm.profileData.ProfilePicPath = "../assets/img/user.png";
    }

    vm.SelectedExpertise = function () {
        console.log(vm.profileData.ExpertiseFields);

    }






    // --------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------

    $scope.profilePicSelected = function (element) {
        $scope.profilePicName = element.files[0].name;
        $scope.profilePicType = element.files[0].type;
        $scope.profilePicFile = element.files[0];
        var result = globe.getExtension($scope.profilePicType)

        console.log($scope.profilePicName);

        if (result == "fail") {
            alert("Seçtiğiniz dosya .png veya .jpg formatında olmalıdır !!!")
        } else {
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(function () {
                    var image = new Image();
                    image.src = e.target.result;
                    image.onload = function () {
                        $scope.width = this.width;
                        $scope.height = this.height;
                        if ($scope.width > 1000 || $scope.height > 1000) {
                            $scope.PicSize = false;
                            vm.profileData.ProfilePicPath = "../assets/img/user.png"
                            alert("Profil resminin yüksekliği ve genişliği 1000px'den büyük olamaz !!!");
                        } else {
                            $scope.changedProfile = true;
                            $scope.PicSize = true;

                            if ($scope.changedProfile && $scope.PicSize) {
                                vm.profileData.ProfilePicPath = e.target.result // Base64 
                                vm.profileData.ProfileBase64Pic = e.target.result;
                                $scope.$apply(function () {});
                            }
                        }
                    }
                });
            };
            reader.readAsDataURL(element.files[0]);
        }
    };

    // GET EXPERTISE FIELDS ------------------------------------------------------------------------
    MockData.getExpertiseFields().then(function (data) {

        $scope.expertises = data;
        $scope.list = [];
        var userExpertises = $scope.user.ExpertiseFields;
        if (data.length != 0) {
            for (var i = 0; i < userExpertises.length; i++) {
                var expertise = userExpertises[i];
                for (var j = 0; j < data.length; j++) {
                    if (data[j].id === expertise) {
                        $scope.list.push(data[j]);
                    }
                }
            }
        }
    });

    vm.test = function () {
        console.log(globe.GetValueById('formUzmanlikAlanlari'));
    }

    vm.updateProfile = function () {

        console.log(vm.profileData);

        // Form Uzmanlık Alanı Problemi ----------------------
        var arr = globe.GetValueById('formUzmanlikAlanlari');
        if (arr.length != 0) {
            var arrTo = [];
            angular.forEach(arr, function (item) {
                arrTo.push(parseInt(item));
            });
            vm.profileData.ExpertiseFields = arrTo;
        }
        // ---------------------------------------------------

        if (vm.profileData.LatLng != null && vm.profileData.LatLng != undefined) {
            if (vm.RePassword == vm.profileData.PasswordPlain) {

                if ($scope.changedProfile == true && $scope.PicSize == true) {
                    console.log("changed profile");
                    UploadSrv.uploadProfilePic($scope.profilePicFile);
                    vm.profileData.Password = vm.profileData.PasswordPlain;
                    vm.profileData.ProcessDate = globe.getDate();
                    vm.profileData.ProfilePicPath = '../assets/uploadProfileFiles/' + $scope.profilePicName;


                    CrudData.updateProfile(vm.profileData, function (response) {
                        if (response.data.success == true) {
                            Auth.login(vm.profileData.Email, vm.profileData.Password, function (response) {
                                if (response.data.success) {
                                    $rootScope.user = response.data.user;
                                    $scope.user = $rootScope.user;
                                }
                            });
                            $scope.message = "Profiliniz Güncellendi :)";
                            $scope.back = success;
                            $scope.setStyle();
                        } else {
                            $scope.message = "Profil Güncelleme Hata Oluştu :(";
                            $scope.back = error;
                            $scope.setStyle();
                        }

                        $scope.visible = false;
                        $timeout(function () {
                            $scope.visible = true;
                        }, 2000);
                    });
                } else {

                    vm.profileData.Password = vm.profileData.PasswordPlain;
                    vm.profileData.ProcessDate = globe.getDate();

                    CrudData.updateProfile(vm.profileData, function (response) {
                        console.log(response);
                        if (response.data.success == true) {
                            Auth.login(vm.profileData.Email, vm.profileData.Password, function (response) {
                                if (response.data.success) {
                                    $rootScope.user = response.data.user;
                                    $scope.user = $rootScope.user;
                                }
                            });
                            $scope.message = "Profiliniz Güncellendi :)"
                            $scope.back = success;
                            $scope.setStyle();
                        } else {
                            $scope.message = "Profil Güncelleme Hata Oluştu :("
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
        }


    }
    //  LOCATION METHODS ----------------------------------------------------------------------------
    //  ---------------------------------------------------------------------------------------------
    vm.deleteMarker = function () {
        for (var i = 0; i < $rootScope.markers.length; i++) {
            if ($rootScope.markers[i] != null) {
                $rootScope.markers[i].setMap(null);
                $rootScope.markers[i] = null;
            }
        }
    }

    $rootScope.markers = [];
    $scope.isLocation = false;
    // Create Default Map
    $scope.map = GoogleMapster.createGoogleMap();
    google.maps.event.addListener($scope.map, 'click', function (event) {
        vm.deleteMarker();
        vm.profileData.LatLng = event.latLng.lat() + "," + event.latLng.lng();
        vm.profileData.Lat = event.latLng.lat();
        vm.profileData.Lng = event.latLng.lng();
        $scope.isLocation = true;
        if (vm.profileData.Lat != null && vm.profileData.Lng != null) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
                map: $scope.map
            });
            $rootScope.markers.push(marker);
            var message = 'Konum Alındı - Enlem : (' + $scope.lat + ") Boylam : (" + $scope.lng + ")";
        }
    });

    vm.ok = function () {
        var geocoder = new google.maps.Geocoder();
        position = {
            lat: vm.profileData.Lat,
            lng: vm.profileData.Lng
        }
        geocoder.geocode({
            location: position
        }, function (results, status) {

            if (status === google.maps.GeocoderStatus.OK)
                vm.profileData.LocationAddress = results[0].formatted_address
            $scope.$apply(function () {});;
        });
    }

    $scope.setStyle = function () {
        return {
            background: $scope.back
        }
    }



});