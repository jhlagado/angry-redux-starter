import templateUrl from './login.html';
import { stateGo } from 'redux-ui-router';

export const loginComponent = {
  templateUrl,
  controller: class LoginComponent {
    constructor($ngRedux, AuthService) {
      'ngInject';

      this.authService = AuthService;

      this.$onDestroy = $ngRedux.connect(state => ({
        // base: state.base,
        router: state.router,
      }), {
        stateGo,
      })(this);

    }
    $onInit() {
      this.error = null;
      this.user = {
        email: '',
        password: '',
      };
    }
    loginUser(event) {
      return this.authService
        .login(event.user)
        .then(() => {
          this.stateGo('app');
        }, (reason) => {
          this.error = reason.message;
        });
    }
  },
};
