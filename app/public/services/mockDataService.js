'use strict'
var mockDataService = angular.module('mockDataService', []);
mockDataService.service('MockData', function ($http, $q) {

    var mockService = {};

    mockService.getMenus = function () {
        var deferred = $q.defer();
        $http.get('assets/json/Menus.json').then(function (response) {
            deferred.resolve(response.data);
            return deferred.promise;
        });
        return deferred.promise;
    }


    mockService.getExpertiseFields = function () {
        var deferred = $q.defer();
        $http.get('assets/json/ExpertiseFields.json').then(function (response) {
            deferred.resolve(response.data);
            return deferred.promise;
        });
        return deferred.promise;
    }

    mockService.getCities = function () {
        var deferred = $q.defer();
        $http.get('assets/json/Cities.json').then(function (response) {
            deferred.resolve(response.data);
            return deferred.promise;
        });
        return deferred.promise;
    }


    mockService.getSchools = function () {
        var deferred = $q.defer();
        $http.get('assets/json/Schools.json').then(function (response) {
            deferred.resolve(response.data);
            return deferred.promise;
        });
        return deferred.promise;
    }




    return mockService;

});