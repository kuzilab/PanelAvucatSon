var app = angular.module('app', ['ngCookies', 'ngRoute', 'ngMessages', 'ProfileCtrl', 'LoginCtrl', 'CertificatesCtrl', 'EssaysCtrl', 'CommentsCtrl', 'SocialCtrl',
    'SignUpCtrl', 'IndexCtrl', 'ExtendProfileCtrl', 'mockDataService', 'crudDataService', 'authDataService', 'uploadDataService', 'passDataService', 'googleMapService',
]);


// Environments ---------------------------------
app.run(function ($rootScope, $location) {

    $rootScope.sayac = 0;

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        console.log("route is changed");
        var path = $location.path();

        if ($rootScope.sayac == 0) {
            $rootScope.$on('$viewContentLoaded', function () {
                Initializer();
            });
            $rootScope.sayac = 1;
        }
    });
});


// Routing -------------------------------------
app.config(function ($httpProvider, $routeProvider, $locationProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: '../views/profile.html',
            controller: 'ProfileController',
            controllerAs: 'profile'
        })
        .when('/test', {
            templateUrl: '../views/login.html',
            controller: 'LoginController',
            controllerAs: 'login'
        })
        .when('/signup', {
            templateUrl: '../views/signup.html',
            controller: 'SignUpController',
            controllerAs: 'signup'
        })
        .when('/extendProfile', {
            templateUrl: '../views/extendProfile.html',
            controller: 'ExtendProfileController',
            controllerAs: 'extend'
        })
        .when('/certificates', {
            templateUrl: '../views/certificates.html',
            controller: 'CertificatesController',
            controllerAs: 'certificate'
        })
        .when('/essays', {
            templateUrl: '../views/essays.html',
            controller: 'EssaysController',
            controllerAs: 'essay'
        })
        .when('/comments', {
            templateUrl: '../views/comments.html',
            controller: 'CommentsController',
            controllerAs: 'comment'
        })
        .when('/social', {
            templateUrl: '../views/social.html',
            controller: 'SocialController',
            controllerAs: 'social'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });



});