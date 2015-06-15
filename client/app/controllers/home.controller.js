'use strict';

angular.module('potatoPhotosApp')
  .controller('poHomeController', function ($scope, poPotatoPhotosService) {
    poPotatoPhotosService.getPotatoPhotos().then(function (photos) {
        $scope.photos = photos;
        $scope.error = false;
      },
      function () {
        $scope.error = true;
      });
  });
