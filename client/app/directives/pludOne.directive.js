'use strict';

angular.module('potatoPhotosApp')
    .directive('poPlusOne', function ($timeout) {
        return {
            scope: {
                url: '='
            },
            restrict: 'E',
            templateUrl: 'app/views/directives/plusOne.html',
            link: function (scope, elem) {
                gapi.plusone.render(elem.find('.g-plusone')[0], {'data-href': scope.url});
            }
        }
    });
