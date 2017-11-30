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

import { middleware } from './middleware/middleware.module';
import { authReducer } from './reducers/auth.reducer';

registerServiceWorker();

export const root = angular
  .module('root', [
    uiRouter,
    ngRedux,
    ngReduxUiRouter,
    common,
    components,
    middleware,
  ])
  .component('root', rootComponent)
  .config(($locationProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true);
  })
  .config(($ngReduxProvider) => {
    'ngInject';

    const rootReducer = combineReducers({
      auth: authReducer,
      router,
    });

    $ngReduxProvider.createStoreWith(
      rootReducer,
      [
        'authMiddleware',
        'ngUiRouterMiddleware',
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
