'use strict';
/**
 * A flickr photo list with endless scrolling
 */
angular.module('potatoPhotosApp')
    .directive('poPhotoListItem', function ($timeout) {
        return {
            scope: {
                photo: '='
            },
            restrict: 'E',
            templateUrl: 'app/views/directives/itemListView.html',
            controller: function ($scope, $state, paFlickrPhotoService) {
                $scope.currentState = $state.current.name;
                $scope.getPhotoPageUrl = paFlickrPhotoService.getPhotoPageUrl;
                $scope.getPhotoOwnerUrl = paFlickrPhotoService.getPhotoOwnerUrl;
            }
        }
    });
