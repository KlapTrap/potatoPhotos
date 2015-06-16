'use strict';

angular.module('potatoPhotosApp')
    .controller('poHomeController', function ($scope, $state, poPotatoPhotosService) {
        $scope.photos = [];
        $scope.firstFetch = true;
        function fetch(options) {
            options.key = 'potato';
            return poPotatoPhotosService.getPotatoPhotos(options).then(function (photos) {
                    if (options.fromCache) {
                        // Make sure we repopulate the whole photo list if we grab it from the cache
                        $scope.photos = photos;
                    } else {
                        $scope.photos = $scope.photos.concat(photos);
                    }
                    $scope.error = false;
                    return true;
                },
                function () {
                    $scope.error = true;
                    return false;
                });
        }

        fetch({fromCache: true}).then(function () {
            $scope.firstFetch = false;
        });

        $scope.fetchNextPage = function () {
            return fetch({
                next: true
            })
        }
    });
