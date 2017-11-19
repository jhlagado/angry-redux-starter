import angular from 'angular';
import 'angular-mocks';

import { contact } from '../contact.module';

const { inject } = angular.mock;

describe('Contact', () => {
  beforeEach(() => {
    angular.mock.module(contact);
  });

  describe('ContactController', () => {
    let $componentController;
    let controller;
    const mockTag = 'friends';
    const mockChange = angular.noop;

    beforeEach(inject(($injector) => {
      $componentController = $injector.get('$componentController');
      controller = $componentController('contactTag',
        { $scope: {} },
        { tag: mockTag, onChange: mockChange }
      );
    }));

    it('should bind to the correct tag', () => {
      const mockTag = 'football';
      controller.tag = mockTag;
      expect(controller.tag).toEqual(mockTag);
    });

    it('should call onSelect with the correct payload', () => {
      const tag = 'mate';
      const payload = { $event: { tag } };

      spyOn(controller, 'onChange');
      controller.updateTag(tag);
      expect(controller.onChange).toHaveBeenCalledWith(payload);
    });
  });
});
