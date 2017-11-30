import templateUrl from './app.html';
import { stateGo } from 'redux-ui-router';
export const appComponent = {
  templateUrl,
  controller: class AppComponent {
    constructor($ngRedux, AuthService) {
      'ngInject';

      this.authService = AuthService;
      this.user = AuthService.getUser();

      this.$onDestroy = $ngRedux.connect(state => ({
        // base: state.base,
        router: state.router,
      }), {
        stateGo,
      })(this);
    }
    logout() {
      return this.authService
        .logout()
        .then(() => this.stateGo('auth.login'));
    }
  },
};
