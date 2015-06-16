'use strict';

angular.module('potatoPhotosApp')
    .controller('poSearchController', function ($scope, $state, paFlickrPhotoService, $timeout) {
        $scope.photos = [];
        $scope.firstFetch = true;
        $scope.searchText = '';
        $scope.tags = [];
        var timeouts = {};

        function convertTagsToArray(tags) {
            var tagArray = [];
            for (var i = 0; i < tags.length; i++) {
                var tag = tags[i];
                tagArray.push(tag.text);
            }
            return tagArray;
        }

        function fetch(options) {
            options = options || {};
            options.params = {
                format: 'json',
                per_page: 20,
                text: $scope.searchText,
                tag_mode: 'all',
                tags: convertTagsToArray($scope.tags)
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

        function newSearch(newVal, oldVal, timeoutKey) {
            if (newVal !== oldVal) {

                if (timeouts.hasOwnProperty(timeoutKey)) {
                    $timeout.cancel(timeouts[timeoutKey]);
                }
                // Debounce the search
                timeouts[timeoutKey] = $timeout(function () {
                    fetch({newSearch: true});
                }, 250)
            }
        }

        $scope.$watch('searchText', function (newVal, oldVal) {
            newSearch(newVal, oldVal, 'searchText')
        });
        $scope.$watchCollection('tags', function (newVal, oldVal) {

            newSearch(newVal, oldVal, 'tags')
        });
    });

