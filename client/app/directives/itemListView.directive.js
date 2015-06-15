'use strict';

angular.module('potatoPhotosApp')
  .directive('poPhotoListItem', function () {
      return {
        scope: {
          photo: '='
        },
        restrict: 'E',
        templateUrl: 'app/views/directives/itemListView.html'
      }
  });
