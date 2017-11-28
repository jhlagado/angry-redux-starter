import angular from 'angular';

export const middlewares = angular
  .module('middlewares', [])
  .factory('middleware1', ($log) => {
    'ngInject';

    return store => next => (action) => {
      $log.log('middleware', store, next, action);
      next(action);
    };
  })
  .name;
