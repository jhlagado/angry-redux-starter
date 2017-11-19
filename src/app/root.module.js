import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { rootComponent } from './root.component';
import { common } from './common/common.module';
import { components } from './components/components.module';
import './root.scss';

import registerServiceWorker from './registerServiceWorker';

registerServiceWorker();

export const root = angular
  .module('root', [
    uiRouter,
    common,
    components,
  ])
  .component('root', rootComponent)
  .config(($locationProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true);
  })
  .name;
