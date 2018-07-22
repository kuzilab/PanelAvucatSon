'use strict'
var uploadDataService = angular.module('uploadDataService', []);

uploadDataService.service('UploadSrv', function ($http, $q) {

    var uploadService = {};

    // --------------------------------------------------------------------------------
    uploadService.uploadProfilePic = function (file) {

        var formData = new FormData();
        formData.append('ProfileFilePic', file);
        formData.append('FileName', file.FileName);

        $http.post('/api/uploadProfilePic', formData, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        });
    }
    // -------------------------------------------------------------------------------
    uploadService.uploadEssayFile = function (file) {

        var formData = new FormData();
        formData.append('EssayFile', file);
        formData.append('FileName', file.FileName);

        return $http.post('/api/uploadEssayFile', formData, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        });
    }
    // ---------------------------------------------------------------------------------
    uploadService.uploadCertificateFile = function (file) {
        var formData = new FormData();
        formData.append('CertificateFile', file);
        formData.append('FileName', file.FileName);

        return $http.post('/api/uploadCertificateFile', formData, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        });
    }

    return uploadService;
});