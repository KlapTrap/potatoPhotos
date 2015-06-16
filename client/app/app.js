'use strict';

angular.module('potatoPhotosApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'angularMoment'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        var VIEWS_PATH = 'app/views/';
        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('main', {
                url: '',
                abstract: true,
                templateUrl: VIEWS_PATH + 'main.html'
            })
            .state('main.home', {
                url: '/home',
                controller: 'poHomeController',
                templateUrl: VIEWS_PATH + 'home.html'
            })
            .state('main.details', {
                url: '/details?id',
                controller: 'poDetailsController',
                templateUrl: VIEWS_PATH + 'details.html'
            });
    })
    .constant('angularMomentConfig', {
        preprocess: 'unix',
        timezone: 'Europe/London'
    });

