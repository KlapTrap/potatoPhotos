'use strict';
/**
 * Google +1 button directive
 */
angular.module('potatoPhotosApp')
    .directive('poPlusOne', function ($timeout) {
        return {
            scope: {
                url: '='
            },
            restrict: 'E',
            templateUrl: 'app/views/directives/plusOne.html',
            link: function (scope, elem) {
                gapi.plusone.render(elem.find('.g-plusone')[0], {'href': scope.url});
            }
        }
    });
