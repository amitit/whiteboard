'use strict';

angular.module('nuBoard')
  .service('RouterService', function (AppConfig) {

    var registeredInstances = {};
    var syncActive = AppConfig.syncActive;

    this.report = function (data) {
      broadcastExcept(data, data.sourceId);
    };

    var broadcastExcept = function (data, sourceIdToSkip) {
      _.forEach(Object.keys(registeredInstances), function (instanceId) {
        if (instanceId !== sourceIdToSkip) {
          registeredInstances[instanceId].callback(data);
        }
      })
    };

    /**
     * Register instance to be able to receive data posted by other
     * instances
     * @param registerCmd - {instanceId: <your-instance-id>,
     * callback: <invoked to report your-instance with new data >}
     */
    this.register = function (registerCmd) {
      registeredInstances[registerCmd.instanceId] = {
        callback: registerCmd.callback
      };
      console.log('registering ', registerCmd.instanceId);
      console.log('registered instances', Object.keys(registeredInstances));
    };

  });
