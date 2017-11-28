import angular from 'angular';
import { helloComponent } from './hello.component';

export const hello = angular
  .module('common.hello', [])
  .component('helloComponent', helloComponent)
  .name;

