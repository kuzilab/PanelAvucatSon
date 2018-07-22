var IndexCtrl = angular.module('IndexCtrl', []);


IndexCtrl.controller('IndexController', function ($scope, $rootScope, $location, MockData, AuthUser, Auth, $window) {

    var vm = this;
    console.log('Index Controller')

    $rootScope.user = AuthUser.getCookieUser();

    console.log($rootScope.user);


    vm.ChangeClass = function (menu) {
        menu.class = "nav-link text-nowrap d-flex active";

        if (menu.name == "Güvenli Çıkış") {
            Auth.logout();
            $window.location.href = "http://localhost:3001/avukat-giris-yap"
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

    vm.header = {};
    vm.header.brand = "Avucat";
    vm.header.title = "Avucat Yönetim Paneli";
    vm.header.profile = $rootScope.user.ProfilePicPath;
    vm.header.username = $rootScope.user.NameSurname
    vm.loggedIn = true;

    MockData.getMenus().then(function (data) {
        $rootScope.menus = data;
    });
});