'use strict';

angular.module('potatoPhotosApp')
    .directive('poPhotoListItem', function () {
        return {
            scope: {
                photo: '='
            },
            restrict: 'E',
            templateUrl: 'app/views/directives/itemListView.html',
            controller: function ($scope, $state, paFlickrPhotoService) {
                $scope.go = function (id) {
                    if (id || id === 0) {
                        $state.go('main.details', {id: id});
                    }
                };
                $scope.getPhotoPageUrl = paFlickrPhotoService.getPhotoPageUrl;
                $scope.getPhotoOwnerUrl = paFlickrPhotoService.getPhotoOwnerUrl;
            }
        }
    });
