'use strict';

angular.module('potatoPhotosApp')
    .controller('poSearchController', function ($scope, $state, paFlickrPhotoService, $timeout) {
        $scope.photos = [];
        $scope.firstFetch = true;
        $scope.searchText = '';
        var searchTimeout = null;

        function fetch(options) {
            options = options || {};
            options.params = {
                format: 'json',
                per_page: 20,
                text: $scope.searchText
            };

            options.key = 'search';
            return paFlickrPhotoService.getPhotos(options).then(function (photos) {
                    if (options.fromCache || options.newSearch) {
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

        $scope.fetchNextPage = function () {
            return fetch({
                next: true
            })
        };

        $scope.$watch('searchText', function (before, after) {
            if (before !== after) {
                if (searchTimeout) {
                    $timeout.cancel(searchTimeout);
                }
                // Debounce the search
                searchTimeout = $timeout(function () {
                    fetch({newSearch: true});
                    $timeout.cancel(searchTimeout);
                }, 250)
            }

        })
    });

