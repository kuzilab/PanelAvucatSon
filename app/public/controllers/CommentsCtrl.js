var CommentsCtrl = angular.module('CommentsCtrl', []);

CommentsCtrl.controller('CommentsController', function ($scope, $rootScope, $location, $sce, Auth, AuthUser, CrudData, $timeout) {
    var vm = this;
    console.log('Comments Controller');
    $scope.visible = true;
    var success = "rgb(114, 162, 114)";
    var error = "rgb(208, 85, 84)";

    var user = $rootScope.user;

    var UserId = user._id;

    CrudData.getComments(UserId, function (response) {
        if (response.data.success) {
            $scope.comments = response.data.comments;
        }
    });
    $scope.setUserSpeed = function (item) {
        return {
            width: item.UserSpeed + "%"
        }
    }
    $scope.setUserExperience = function (item) {
        return {
            width: item.UserExperince + "%"
        }
    }
    $scope.setUserNetwork = function (item) {
        return {
            width: item.UserNetwork + "%"
        }
    }

    vm.commentData = {
        UserId: UserId,
        WhoComment: null,
        CommentContent: null,
        UserSpeed: null,
        UserExperince: null,
        UserNetwork: null,
        UserAverageScore: null,
        CommentVisible: null,
        SavedDate: null
    }

    vm.ChangeVisible = function (item) {
        CrudData.updateCommentVisible(item, function (response) {
            if (response.data.success) {
                $scope.message = "Yorum Güncellendi :)"
                $scope.back = success;
                $scope.setStyle();
                $scope.visible = false;
                $timeout(function () {
                    $scope.visible = true;
                }, 2000);
            }
        });
    }

    $scope.setStyle = function () {
        return {
            background: $scope.back
        }
    }

    /*
    vm.commentData.WhoComment = "Ali Can Demir";
    vm.commentData.CommentContent = "Uygulama Hızlı olmasına rağmen bazen takılmalar yaşıyor";
    vm.commentData.UserSpeed = 60;
    vm.commentData.UserExperince = 90;
    vm.commentData.UserNetwork = 87;
    vm.commentData.UserAverageScore = 49;
    vm.commentData.CommentVisible = true;
    vm.commentData.SavedDate = globe.getDate();

    CrudData.saveComment(vm.commentData, function (response) {

        if (response.data.success) {
            console.log(response);
        }
    });
    */







});