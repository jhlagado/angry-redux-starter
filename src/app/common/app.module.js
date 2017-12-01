import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import { appComponent } from './app.component';
import { appNav } from './app-nav/app-nav.module';
import { appSidebar } from './app-sidebar/app-sidebar.module';
import { hello } from './hello/hello.module';
import { authForm } from './auth-form/auth-form.module';
import { contactSingle } from './contact/contact.module';
import { contactTag } from './contact-tag/contact-tag.module';
import { contactDetail } from './contact-detail/contact-detail.module';
import './app.scss';

export const app = angular
  .module('common.app', [
    uiRouter,
    appNav,
    appSidebar,
    hello,
    authForm,
    contactSingle,
    contactTag,
    contactDetail,
  ])
  .component('app', appComponent)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('app', {
        redirectTo: 'contacts',
        url: '/app',
        data: {
          requiredAuth: true,
        },
        component: 'app',
      });
  })
  .name;
