import templateUrl from './root.html';

export const rootComponent = {
  templateUrl,
  controller: class ContactsComponent {
    constructor($ngRedux, $scope) {
      'ngInject';

      const unsubscribe = $ngRedux.connect(this.mapStateToThis)(this);
      $scope.$on('$destroy', unsubscribe);
    }

    mapStateToThis(state) {
      return {
        x: state.x,
      };
    }
  },
};
