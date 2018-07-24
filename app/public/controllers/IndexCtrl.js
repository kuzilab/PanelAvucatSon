var IndexCtrl = angular.module('IndexCtrl', []);


IndexCtrl.controller('IndexController', function ($scope, $rootScope, $location, MockData, AuthUser, Auth, $window, $cookieStore, $location, $cookieStore) {

    var vm = this;
    console.log('Index Controller')

    var item = $location.search();
    var Email = item.Email;

    $rootScope.updatedExtend = false;
    $rootScope.updatedProfile = false;

    console.log(Email);
    vm.header = {};
    vm.header.brand = "Avucat";
    vm.header.title = "Avucat Yönetim Paneli";
    vm.loggedIn = true;

    console.log($window.localStorage.getItem('checked'));

    if ($window.localStorage.getItem("checked") === null) {
        Auth.CheckAuthenticate(Email, function (response) {
            if (response.data.success) {
                var Email = response.data.authenticate.Email;
                var PasswordPlain = response.data.authenticate.PasswordPlain;

                Auth.login(Email, PasswordPlain, function (response) {
                    if (response.data.success) {
                        console.log("Authenticated deyim");
                        vm.header.username = response.data.user.NameSurname;
                        vm.header.profile = response.data.user.ProfilePicPath;
                        $window.localStorage.setItem('checked', 'checked');
                    } else {
                        vm.message = response.data.message;
                        vm.situation = response.data.situation;
                        if (vm.situation === "no_user") {
                            console.log(vm.message)
                        } else if (vm.situation === "invalid_password") {
                            console.log(vm.message)
                        } else if (vm.situation === "valid_user") {
                            console.log(vm.message)
                        }
                    }
                });
            }
        });
    } else {
        var user = AuthUser.getUser();
        vm.header.username = user.NameSurname
        vm.header.profile = user.ProfilePicPath;
    }

    vm.ChangeClass = function (menu) {

        menu.class = "nav-link text-nowrap d-flex active";
        $window.localStorage.setItem('menu', menu.name);

        $cookieStore.put("menu", menu.name);

        console.log($rootScope.selectedMenu);

        if (menu.name == "Güvenli Çıkış") {
            $window.localStorage.setItem('checked', null);
            Auth.logout();
            var AuthenticateSituation = false;
            //   $window.location.href = "http://localhost:3001/avukat-giris-yap"
            $window.location.href = "https://vitrin-avucat-com.herokuapp.com/avukat-giris-yap"
            //      $window.location.href = " https://vitrin-avucat-com.herokuapp.com/?Email=" + vm.loginData.Email
            Auth.UpdateAuthenticate($rootScope.user.Email, AuthenticateSituation, function (response) {
                if (response.data.success) {
                    $window.location.href = "https://vitrin-avucat-com.herokuapp.com/avukat-giris-yap"
                }
            });
        } else {
            for (var i = 0; i < $rootScope.menus.length; i++) {
                if (menu.name != $rootScope.menus[i].name) {
                    $rootScope.menus[i].class = "nav-link text-nowrap d-flex";
                }

                if ($rootScope.menus[i].name == "Güvenli Çıkış") {
                    $rootScope.menus[i].class = "nav-link text-nowrap d-flex logout";
                }
            }
        }
    }
    MockData.getMenus().then(function (data) {
        $rootScope.menus = data;

        var name = $window.localStorage.getItem('menu');

        if (name != undefined) {
            for (var i = 0; i < $rootScope.menus.length; i++) {
                if (name == $rootScope.menus[i].name) {
                    $rootScope.menus[i].class = "nav-link text-nowrap d-flex active";
                } else {
                    $rootScope.menus[i].class = "nav-link text-nowrap d-flex";
                }

                if ($rootScope.menus[i].name == "Güvenli Çıkış") {
                    $rootScope.menus[i].class = "nav-link text-nowrap d-flex logout";
                }
            }
        }


    });
});