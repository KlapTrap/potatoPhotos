'use strict';

angular.module('potatoPhotosApp')
/**
 * A thin wrapper on top of the Flickr service that provides default options for a potato search
 */
    .service('poPotatoPhotosService', function (paFlickrPhotoService) {

        this.getPotatoPhotos = function (options) {
            options = options || {};
            options.key = 'potato';
            var params = options.params = options.params || {};
            params.tags = ['potato'];
            params.tagMode = 'all';
            params.format = 'json';
            params.per_page = 20;
            return paFlickrPhotoService.getPhotos(options);
        };

    })
/**
 * A thin wrapper on top of the Flickr service that provides default options for a potato search
 */
    .service('paFlickrPhotoService', function ($http, $q) {
        var url = 'https://api.flickr.com/services/rest/';
        var apiKey = '503a3ba265e96c811cac7e7bb7489e20';
        var photoListCache = {};
        var photoDetailCache = {};
        var cachedListPhotos = {};

        var extras = [
            'owner_name',
            'date_upload',
            'url_m'
        ];
        //////
        // Cache methods

        function cachePhotos(photos, key) {
            if (photos && photos.length) {
                if (!hasCache(key)) {
                    createCache(key);
                }
                cachedListPhotos[key].photos = cachedListPhotos[key].photos.concat(photos);
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

        function hasCache(key) {
            return cachedListPhotos.hasOwnProperty(key);
        }

        function getCache(key) {
            return cachedListPhotos[key];
        }

        this.getCache = getCache;

        function createCache(key) {
            cachedListPhotos[key] = {
                photos: [],
                page: 1
            };
            return cachedListPhotos[key];
        }

        function cleanCache(key) {
            createCache(key);
        }

        function getOrCreateGetCache(key) {
            if (!hasCache(key)) {
                createCache(key);
            }
            return getCache(key);
        }

        this.reset = function () {
            cachedListPhotos = {};
        };
        ///////

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

        /**
         * Gets a list of photos from given params
         * A clientside cache will retain search details and results if requested
         * @param options
         * params: flikr params
         * key: the cache key to use
         * newsearch: if this is a new search, we will clean the cache
         * fromCache: try to fetch previous results from cache
         * @returns promise(photos)
         */
        this.getPhotos = function (options) {
            options = options || {};
            options.params = options.params || {};
            // Deal with the cache

            if (options.key) {
                if (options.newSearch) {
                    cleanCache(options.key);
                }
                var cache = getOrCreateGetCache(options.key);
                if (options.next) {
                    var currentPage = getOrCreateGetCache(options.key).page;
                    currentPage++;
                    options.params.page = currentPage;
                }
                cache.tags = options.params.tags || [];
                cache.text = options.params.text || '';
            }
            var params = options.params;
            // Check the cache
            if (options.fromCache && options.key) {
                console.log('Checking cache');
                if (hasCache(options.key)) {
                    var photo = getCache(options.key).photos;
                    // If we have a cache but no photos, we need to fetch.
                    if (photo && photo.length) {
                        console.log('Fetching from cache');
                        return $q(function (resolve) {
                            resolve(getCache(options.key).photos);
                        })
                    }
                }
            }

            // No photos in the cache
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
        /**
         * Gets an photo from it's flickr id
         * @param id the id of the photo
         * @returns promise(photo)
         */
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
        /**
         * Get the photo's flickr page from a photo object
         * @param photo
         * @returns {string}
         */
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

        /**
         * Get the photo's owner flickr page from a photo object
         * @param photo
         * @returns {string}
         */
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
