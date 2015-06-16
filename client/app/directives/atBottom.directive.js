'use strict';

angular.module('potatoPhotosApp')
    .directive('poAtBottom', function ($window, $document) {
        return {
            scope: {
                fetch: '='
            },
            restrict: 'E',
            templateUrl: 'app/views/directives/atBottom.html',
            link: function (scope) {
                scope.atBottom = false;
                $window = angular.element($window);
                function checkBottom() {
                    if (!scope.loading) {
                        scope.atBottom = atBottom();
                        if (scope.atBottom) {
                            scope.loading = true;
                            scope.fetch().then(function () {
                                scope.loading = false;
                            })
                        }
                    }
                }

                $window.on('scroll', checkBottom);

                function atBottom() {
                    var windowBottom = $window.height() + $window.scrollTop();
                    var remaining = $document.height() - windowBottom;
                    return remaining <= $window.height() * 5;
                }

                scope.$on('$destroy', function () {
                    $window.off('scroll', checkBottom);
                })
            }
        }
    });
