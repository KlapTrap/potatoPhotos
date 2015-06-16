'use strict';

angular.module('potatoPhotosApp')
    .service('poPotatoPhotosService', function (paFlickrPhotoService) {

        this.getPotatoPhotos = function (options) {
            options = options || {};
            var params = options.params = options.params || {};
            params.tags = 'potato';
            params.tagMode = 'all';
            params.format = 'json';
            params.per_page = 20;
            return paFlickrPhotoService.getPhotos(options);
        };

    })
    .service('paFlickrPhotoService', function ($http, $q) {
        var url = 'https://api.flickr.com/services/rest/';
        var apiKey = '503a3ba265e96c811cac7e7bb7489e20';
        var photoListCache = {};
        var photoDetailCache = {};
        var cachedListPhotos = {};
        var currentPage = 1;

        var extras = [
            'owner_name',
            'date_upload',
            'url_m'
        ];

        function cachePhotos(photos, key) {
            if (photos && photos.length) {
                if (!cachedListPhotos.hasOwnProperty(key)) {
                    cachedListPhotos[key] = [];
                }
                cachedListPhotos[key] = cachedListPhotos[key].concat(photos);
            }
        }

        function cachePhoto(photo, options) {
            options = options || {};
            if (options.detail) {
                photoDetailCache[photo.id] = photo;
            } else {
                photoListCache[photo.id] = photo;
            }
        }

        function getPhotoFromCache(id) {
            if (photoDetailCache.hasOwnProperty(id)) {
                return photoDetailCache[id];
            }
            return null;
        }

        function convertToPhotoObject(photo) {
            var tags = photo.tags.tag;
            var newTags = '';

            for (var i = 0; i < tags.length; i++) {
                newTags += (' ' + tags[i]._content);
            }

            photo.tags = newTags;
            photo.title = photo.title._content;
            return photo;
        }

        this.reset = function () {
            currentPage = 1;
            cachedListPhotos = {};
        };

        this.getPhotos = function (options) {
            options = options || {};
            options.params = options.params || {};
            if (options.next) {
                currentPage++;
                options.params.page = currentPage;
            }
            var params = options.params;
            // Check the cache
            if (options.fromCache && options.key) {
                console.log('Checking cache');
                if (cachedListPhotos.hasOwnProperty(options.key)) {
                    console.log('Fetching from cache');
                    return $q(function (resolve) {
                        resolve(cachedListPhotos[options.key]);
                    });
                }
            }

            params.jsoncallback = 'JSON_CALLBACK';
            params.format = 'json';
            params.method = 'flickr.photos.search';
            params.api_key = apiKey;
            params.extras = extras.join(',');

            return $http({
                url: url,
                method: 'JSONP',
                params: params
            }).then(function (res) {
                if (res.data && res.data.photos && res.data.photos.photo) {
                    var photos = res.data.photos.photo;
                    cachePhotos(photos, options.key);
                }
                return photos;
            });
        };

        this.getPhoto = function (id) {
            var photo = getPhotoFromCache(id);
            if (photo) {
                return $q(function (resolve) {
                    resolve(photo);
                });
            }
            // We don't have the image cached, fetch it
            var params = {
                jsoncallback: 'JSON_CALLBACK',
                method: 'flickr.photos.getInfo',
                api_key: apiKey,
                format: 'json',
                photo_id: id
            };

            return $http({
                url: url,
                method: "JSONP",
                params: params
            }).then(function (res) {
                photo = convertToPhotoObject(res.data.photo);
                cachePhoto(photo, {detail: true});
                return photo;
            });
        };

        this.getSourceUrl = function (photo) {
            if (!photo) {
                return '';
            }
            var urlSections = {
                first: 'https://farm',
                second: '.staticflickr.com/',
                third: '/',
                fourth: '_'
            };
            var url =
                urlSections.first
                + photo.farm
                + urlSections.second
                + photo.server
                + urlSections.third
                + photo.id
                + urlSections.fourth
                + photo.secret
                + '.jpg';

            return url;
        };

        var basePhotoPageUrl = 'https://www.flickr.com/photos/';

        this.getPhotoPageUrl = function (photo) {
            if (!photo) {
                return '';
            }
            var owner;
            if (photo.owner) {
                // The getRecent and getInfo apis return different owners
                if (photo.owner.nsid) {
                    owner = photo.owner.nsid;
                } else {
                    owner = photo.owner;
                }
            }
            return (basePhotoPageUrl + owner + '/' + photo.id);
        };

        this.getPhotoOwnerUrl = function (photo) {
            if (!photo) {
                return '';
            }
            if (photo.owner && photo.owner.nsid) {
                return (basePhotoPageUrl + photo.owner.nsid);
            }
            return (basePhotoPageUrl + photo.owner);
        };

    });
