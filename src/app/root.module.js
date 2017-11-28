import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngRedux from 'ng-redux';
import { combineReducers } from 'redux';

import ngReduxUiRouter, { router } from 'redux-ui-router';

import registerServiceWorker from './registerServiceWorker';

import { rootComponent } from './root.component';
import { common } from './common/common.module';
import { components } from './components/components.module';
import './root.scss';

import { middlewares } from './middlewares';

// console.info(ngUiRouter);

registerServiceWorker();

export const root = angular
  .module('root', [
    uiRouter,
    ngRedux,
    ngReduxUiRouter,
    common,
    components,
    middlewares,
  ])
  .component('root', rootComponent)
  .config(($locationProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true);
  })
  .config(($ngReduxProvider) => {
    'ngInject';

    const baseReducer = (state = { x: 123 }) =>
      state;

    const rootReducer = combineReducers({
      base: baseReducer,
      router,
    });

    $ngReduxProvider.createStoreWith(
      rootReducer,
      [
        'middleware1',
        // 'ngUiRouterMiddleware',
      ],
      /* eslint-disable no-underscore-dangle */
      [window.__REDUX_DEVTOOLS_EXTENSION__()]
      /* eslint-enable */
    );
  })
  .run(($ngRedux, $rootScope, $timeout) => {
    // To reflect state changes when disabling/enabling actions via the monitor
    // there is probably a smarter way to achieve that
    $ngRedux.subscribe(() => {
      $timeout(() => { $rootScope.$apply(() => { }); }, 100);
    });
  })
  .name;
