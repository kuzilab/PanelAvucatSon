var IndexCtrl = angular.module('IndexCtrl', []);


IndexCtrl.controller('IndexController', function ($scope, $rootScope, $location, MockData, AuthUser, Auth, $window, $cookieStore, $location, $cookieStore) {

    var vm = this;
    console.log('Index Controller')



    if ($rootScope.user != undefined) {
        $rootScope.user = AuthUser.getCookieUser();
        vm.header.profile = $rootScope.user.ProfilePicPath;
        vm.header.username = $rootScope.user.NameSurname
    } else {

    }

    vm.header = {};
    vm.header.brand = "Avucat";
    vm.header.title = "Avucat Yönetim Paneli";

    vm.loggedIn = true;

    vm.ChangeClass = function (menu) {

        menu.class = "nav-link text-nowrap d-flex active";
        $cookieStore.put("menu", menu.name);

        console.log($rootScope.selectedMenu);

        if (menu.name == "Güvenli Çıkış") {
            Auth.logout();
            var AuthenticateSituation = false;
            console.log($rootScope.user.Email);
            //   $window.location.href = "http://localhost:3001/avukat-giris-yap"

            $window.location.href = " https://vitrin-avucat-com.herokuapp.com/?Email=" + vm.loginData.Email

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

        var name = $cookieStore.get('menu');


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