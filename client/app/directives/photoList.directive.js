'use strict';
/**
 * Flickr photo list
 */
angular.module('potatoPhotosApp')
    .directive('poPhotoList', function () {
        return {
            scope: {
                fetch: '=',
                photos: '='
            },
            restrict: 'E',
            templateUrl: 'app/views/directives/photoList.html'
        }
    });
