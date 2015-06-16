'use strict';

angular.module('potatoPhotosApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'angularMoment',
    'ngTagsInput'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        var VIEWS_PATH = 'app/views/';
        $urlRouterProvider
            .otherwise('/potato');

        $stateProvider
            .state('main', {
                url: '',
                abstract: true,
                templateUrl: VIEWS_PATH + 'main.html'
            })
            .state('main.home', {
                url: '/potato',
                controller: 'poHomeController',
                templateUrl: VIEWS_PATH + 'home.html'
            })
            .state('main.details', {
                url: '/details?id&returnState',
                controller: 'poDetailsController',
                templateUrl: VIEWS_PATH + 'details.html'
            })
            .state('main.search', {
                url: '/search',
                controller: 'poSearchController',
                templateUrl: VIEWS_PATH + 'search.html'
            });
    })
    .constant('angularMomentConfig', {
        preprocess: 'unix'
        //timezone: 'Europe/London'
    });

