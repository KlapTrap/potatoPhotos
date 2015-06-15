'use strict';

angular.module('potatoPhotosApp')
  .service('poPotatoPhotosService', function (paFlickrPhotoService) {
    this.getPotatoPhotos = function () {
      return paFlickrPhotoService.getPhotos({
        tags: 'potato',
        tagMode: 'all',
        format: 'json'
      })
    };
  })
  .service('paFlickrPhotoService', function ($http) {
    var url = 'http://api.flickr.com/services/feeds/photos_public.gne';
    this.getPhotos = function (params) {
      params.jsoncallback = 'JSON_CALLBACK';
      params.page = 2;
      return $http({
        url: url,
        method: "JSONP",
        params: params
      }).then(function (res) {
        return res.data.items;
      });
    }
  });
