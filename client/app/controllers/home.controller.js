'use strict';

angular.module('potatoPhotosApp')
    .controller('poHomeController', function ($scope, $state, poPotatoPhotosService, paFlickrPhotoService) {
        poPotatoPhotosService.getPotatoPhotos().then(function (photos) {
                $scope.photos = photos;
                $scope.error = false;
            },
            function () {
                $scope.error = true;
            });
    });
