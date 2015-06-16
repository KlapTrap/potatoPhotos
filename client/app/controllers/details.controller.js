'use strict';

angular.module('potatoPhotosApp')
    .controller('poDetailsController', function ($scope, $stateParams, paFlickrPhotoService) {
        if ($stateParams.id) {
            paFlickrPhotoService.getPhoto($stateParams.id).then(function (photo) {
                    $scope.photo = photo;
                    $scope.error = false;
                },
                function () {
                    $scope.error = true;
                });
        } else {
            $scope.error = true;
        }
        $scope.returnState = $stateParams.returnState;
        $scope.getPhotoPageUrl = paFlickrPhotoService.getPhotoPageUrl;
        $scope.getPhotoOwnerUrl = paFlickrPhotoService.getPhotoOwnerUrl;
        $scope.getSourceUrl = paFlickrPhotoService.getSourceUrl;
    });
