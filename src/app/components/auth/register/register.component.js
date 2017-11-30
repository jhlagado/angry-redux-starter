import templateUrl from './register.html';
import { stateGo } from 'redux-ui-router';

export const registerComponent = {
  templateUrl,
  controller: class RegisterComponent {
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
    createUser(event) {
      return this.authService
        .register(event.user)
        .then(() => {
          this.stateGo('app');
        }, (reason) => {
          this.error = reason.message;
        });
    }
  },
};
