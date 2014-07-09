'use strict';

angular.module('nuBoard', ['firebase', 'ngRoute'])

  .constant('AppConfig', {
    defaultToolset: {
      stylus: {id: 'line', value: 'line'},
      color: {id: 'skyblue', value: 'skyblue'},
      width: {id: '5', value: 5},
      lineCap: {id: 'round', value: 'round'},
      lineJoin: {id: 'round', value: 'round'}
    },
    firebase: {
      baseUrl: 'https://fiery-fire-1095.firebaseio.com',
      appNamespace: 'nuBoard'
    },
    syncActive: true
  })

  .run(['Logger', function (Logger) {
    // init Logger
    Logger.setLevel(Logger.LOG);
  }])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/new-board', {
        controller: 'NewBoardCtrl',
        template: '<pre>redirect to new board</pre>'
      })
      .when('/:boardId', {
        controller: 'MainCtrl',
        templateUrl: 'app/app.tpl.html'
      })
      .otherwise({
        redirectTo: '/new-board'
      })
  })

  .controller('MainCtrl', function ($scope, $routeParams, $rootScope, SyncService, AppConfig, SurfaceService) {

    if (AppConfig.syncActive) {
      SyncService.init();
    }
    SurfaceService.init();
    $rootScope.boardId = $routeParams.boardId;
    $scope.shapes = {}; //todo: move this to surface
    $scope.focus = {x: 0.5, y: 0.5};
    $scope.surfaceWidth = 2000;
    $scope.surfaceHeight = 2000;
    $scope.currentViewport = {};
  })

  .controller('NewBoardCtrl', function ($scope, $location, BoardIdService) {
    var newBoardId = BoardIdService.generate();
    $location.path('/' + newBoardId);

  });