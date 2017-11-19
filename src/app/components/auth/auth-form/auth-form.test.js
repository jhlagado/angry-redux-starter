import angular from 'angular';
import 'angular-mocks';

import { authForm } from './auth-form.module';

const { inject } = angular.mock;

describe('Auth', () => {
  beforeEach(() => {
    angular.mock.module(authForm);
  });

  describe('AuthFormController', () => {
    let $componentController;
    let controller;
    const mockUser = { $id: 1 };
    const mockSubmit = angular.noop;

    beforeEach(inject(($injector) => {
      $componentController = $injector.get('$componentController');

      controller = $componentController('authForm',
        { $scope: {} },
        { user: mockUser, button: '', message: '', onSubmit: mockSubmit }
      );
    }));

    it('should call onSelect with the correct payload', () => {
      const payload = { $event: { user: mockUser } };

      spyOn(controller, 'onSubmit');
      controller.submitForm();
      expect(controller.onSubmit).toHaveBeenCalledWith(payload);
    });
  });
});
