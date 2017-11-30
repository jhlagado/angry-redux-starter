import angular from 'angular';
import { authMiddleware } from './auth.middleware.service'

export const middleware = angular
  .module('middlewares', [])
  .factory('authMiddleware', authMiddleware)
  .name;
