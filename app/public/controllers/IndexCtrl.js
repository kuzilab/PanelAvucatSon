var IndexCtrl = angular.module('IndexCtrl', []);


IndexCtrl.controller('IndexController', function ($scope, $rootScope, $location, MockData, AuthUser, Auth, $window, $cookieStore, $location) {

    var vm = this;
    console.log('Index Controller')

    $rootScope.user = AuthUser.getCookieUser();

    vm.header = {};
    vm.header.brand = "Avucat";
    vm.header.title = "Avucat Yönetim Paneli";
    vm.header.profile = $rootScope.user.ProfilePicPath;
    vm.header.username = $rootScope.user.NameSurname
    vm.loggedIn = true;


    vm.ChangeClass = function (menu) {
        menu.class = "nav-link text-nowrap d-flex active";

        if (menu.name == "Güvenli Çıkış") {
            Auth.logout();
            var AuthenticateSituation = false;
            console.log($rootScope.user.Email);
            $window.location.href = "http://localhost:3001/avukat-giris-yap"
            Auth.UpdateAuthenticate($rootScope.user.Email, AuthenticateSituation, function (response) {
                if (response.data.success) {
                    $window.location.href = "http://localhost:3001/avukat-giris-yap"
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
    });
});