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

        function convertArrayToTags(array) {
            var tagArray = [];
            for (var i = 0; i < array.length; i++) {
                var tag = array[i];
                tagArray.push({'text': tag});
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
                    if (options.newSearch) {
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


        function fetchCachedResult() {
            var cache = paFlickrPhotoService.getCache('search');
            // If we have a cache load that in
            if (cache) {
                $scope.photos = cache.photos;
                $scope.tags = convertArrayToTags(cache.tags);
                $scope.searchText = cache.text;
            }
            // Setup the watches after as not to trigger them ourselves
            $scope.$watch('searchText', function (newVal, oldVal) {
                newSearch(newVal, oldVal, 'searchText')
            });
            $scope.$watchCollection('tags', function (newVal, oldVal) {
                newSearch(newVal, oldVal, 'tags')
            });
        }

        fetchCachedResult();
    });

