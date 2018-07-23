'use strict'
var authDataService = angular.module('authDataService', []);

authDataService.service('Auth', function ($http, $q, AuthToken, AuthUser) {

    var authService = {};

    authService.CheckAuthenticate = function (Email, callback) {
        return $http.post('/api/CheckAuthenticate', {
            Email: Email,
        }).then(function (response) {
            callback(response);
        });
    }

    authService.UpdateAuthenticate = function (Email, AuthenticateSituation, callback) {
        return $http.post('/api/UpdateAuthenticate', {
            Email: Email,
            AuthenticateSituation: AuthenticateSituation
        }).then(function (response) {
            callback(response)
        });
    }

    authService.isUser = function (Email, callback) {
        return $http.post('/api/isUser', {
            Email: Email,
        }).then(function (response) {
            callback(response);
        });
    }

    authService.signup = function (item, callback) {
        return $http.post('/api/signup', {
            item: item
        }).then(function (response) {
            if (response.data.success) {

                AuthUser.setCookieUser();
                callback(response)
            } else {
                if (response.data.situation === "create_issue") {
                    callback(response);
                }
            }
        });
    }
    authService.login = function (Email, Password, callback) {
        return $http.post('/api/login', {
            Email: Email,
            Password: Password
        }).then(function (response) {
            if (response.data.situation === "no_user") {
                callback(response);
            } else {
                if (response.data.situation === "invalid_password") {
                    callback(response);
                } else {

                    console.log("login cagrıldıktan sonra user", response.data.user);

                    AuthToken.setCookieToken(response.data.token);
                    AuthUser.setCookieUser(response.data.user);
                    // AuthToken.setToken(response.data.token);
                    // AuthUser.setUser(response.data.user)
                    callback(response);
                }
            }
        });
    }

    authService.logout = function () {
        AuthToken.setToken();
    }
    authService.isLoggedIn = function () {
        if (AuthToken.getToken()) {
            return true;
        } else {
            return false;
        }
    }
    authService.getUser = function () {
        if (AuthToken.getToken()) {
            return $http.get('/api/me');
        } else {
            return $q.reject({
                message: "Kullanıcı token'a sahip değil !!!"
            });
        }
    }

    authService.CookieLogout = function () {
        AuthToken.setCookieToken();
    }

    authService.CookieIsLoggedIn = function () {
        if (AuthToken.getCookieToken()) {
            return true
        } else {
            return false;
        }
    }
    authService.getCookieUser = function () {
        if (AuthToken.getCookieToken()) {
            return $http.get('/api/me');
        } else {
            return $q.reject({
                message: "Kullanıcı token'a sahip değil !!!"
            });
        }
    }
    return authService;

});

// AUTHTOKEN ---------------------------------------------------------------------
// -------------------------------------------------------------------------------

authDataService.service('AuthToken', function ($window, $cookieStore) {

    var authTokenFactory = {};

    //  THIS IS FOR COOKIE STORAGE ----------------------------
    authTokenFactory.setCookieToken = function (token) {
        if (token) {
            $cookieStore.put('token', token);
        } else {
            $cookieStore.remove('token')
        }
    }
    authTokenFactory.getCookieToken = function () {
        return $cookieStore.get('token')
    }

    authTokenFactory.getToken = function () {
        return $window.localStorage.getItem('token');
    }
    authTokenFactory.setToken = function (token) {
        if (token) {
            $window.localStorage.setItem('token', token);
        } else {
            $window.localStorage.removeItem('token');
        }
    }
    return authTokenFactory;
});

// AUTHUSER --------------------------------------------------------------------------
// -----------------------------------------------------------------------------------

authDataService.service('AuthUser', function ($window, $cookieStore) {

    var authUserFactory = {};

    authUserFactory.setCookieUser = function (user) {

        console.log("setCookieUser", user);


        if (user !== null || user !== undefined) {
            $cookieStore.remove('user');
            $cookieStore.put('user', user);
        } else {
            $cookieStore.remove('user');
        }
    }

    authUserFactory.getCookieUser = function () {
        return $cookieStore.get('user');
    }

    authUserFactory.setUser = function (user) {
        if (user !== null || user !== undefined) {
            $window.localStorage.setItem('user', JSON.stringify(user));
        } else {
            $window.localStorage.removeItem('user');
        }
    }

    authUserFactory.getUser = function () {
        return JSON.parse($window.localStorage.getItem('user'));
    }

    return authUserFactory;
});

authDataService.service('AuthInterceptor', function ($q, $location, AuthToken) {

    var interceptorFactory = {};
    interceptorFactory.request = function (config) {
        // var token = AuthToken.getToken();
        var token = AuthToken.getCookieToken();

        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    };

    interceptorFactory.responseError = function (response) {
        if (response.status == 403) {
            // $location.path('/login');
            console.log("interceptor hatası 403")
        }
        return $q.reject(response);
    };
    return interceptorFactory;
});