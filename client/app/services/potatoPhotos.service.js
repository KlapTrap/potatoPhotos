'use strict';

angular.module('potatoPhotosApp')
    .service('poPotatoPhotosService', function (paFlickrPhotoService) {

        var LINK_BASE = 'https://www.flickr.com/photos/';

        this.getPotatoPhotos = function () {
            return paFlickrPhotoService.getPhotos({
                tags: 'potato',
                tagMode: 'all',
                format: 'json'
            })
        };

    })
    .service('paFlickrPhotoService', function ($http, $q) {
        //var url = 'http://api.flickr.com/services/feeds/photos_public.gne';
        var url = 'https://api.flickr.com/services/rest/';
        var apiKey = '503a3ba265e96c811cac7e7bb7489e20';
        var photoListCache = {};
        var photoDetailCache = {};

        var extras = [
            'owner_name',
            'date_upload',
            'url_m'
        ];

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

        this.getPhotos = function (params) {
            params.jsoncallback = 'JSON_CALLBACK';
            params.format = 'json';
            params.method = 'flickr.photos.search';
            params.api_key = apiKey;
            params.extras = extras.join(',');
            return $http({
                url: url,
                method: "JSONP",
                params: params
            }).then(function (res) {
                return res.data.photos.photo;
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

            //var baseUrl = https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
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
            return (basePhotoPageUrl + photo.owner);
        };

    });
