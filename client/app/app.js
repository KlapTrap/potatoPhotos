'use strict';

angular.module('potatoPhotosApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap'
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
      });
  });
