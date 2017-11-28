// import { stateGo } from 'redux-ui-router';

import templateUrl from './root.html';

export const rootComponent = {
  templateUrl,
  controller: class ContactsComponent {
    constructor($ngRedux) {
      'ngInject';

      this.$onDestroy = $ngRedux.connect(state => ({
        base: state.base,
        router: state.router,
      }))(this);

      // this.dispatch(stateGo('app'));
      this.dispatch({ type: 'hello' });
    }
  },
};
