'use strict';

angular.module('nuBoard')
  .service('DistributionService', function (Logger, KineticService, ToolbarService, SyncService) {

    this.draw = function (data) {
      KineticService.draw(data);
    };

    this.newLine = function (data) {
      data.toolbarState = ToolbarService.getState();
      KineticService.newLine(data);
    }

  });