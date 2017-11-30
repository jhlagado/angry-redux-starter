import templateUrl from './contact-edit.html';
import { stateGo } from 'redux-ui-router';

export const contactEditComponent = {
  bindings: {
    contact: '<',
  },
  templateUrl,
  controller: class ContactEditComponent {
    constructor($ngRedux, ContactService, cfpLoadingBar, $window) {
      'ngInject';

      this.contactService = ContactService;
      this.cfpLoadingBar = cfpLoadingBar;
      this.$window = $window;

      this.$onDestroy = $ngRedux.connect(state => ({
        // base: state.base,
        router: state.router,
      }), {
        stateGo,
      })(this);
    }
    deleteContact(event) {
      const message = `Delete ${event.contact.name} from contacts?`;
      if (this.$window.confirm(message)) {
        return this.contactService
          .deleteContact(event.contact)
          .then(() => {
            this.stateGo('contacts');
          });
      }
      return undefined;
    }
    updateContact(event) {
      this.cfpLoadingBar.start();
      return this.contactService
        .updateContact(event.contact)
        .then(() => {
          this.cfpLoadingBar.complete();
        }, () => {
          this.cfpLoadingBar.complete();
        });
    }
  },
};
