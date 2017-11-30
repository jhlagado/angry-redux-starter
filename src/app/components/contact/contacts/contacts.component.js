import templateUrl from './contacts.html';
import { stateGo } from 'redux-ui-router';

export const contactsComponent = {
  bindings: {
    contacts: '<',
    filter: '<',
  },
  templateUrl,
  controller: class ContactsComponent {
    constructor($ngRedux, $filter) {
      'ngInject';

      this.$filter = $filter;

      this.$onDestroy = $ngRedux.connect(state => ({
        // base: state.base,
        router: state.router,
      }), {
        stateGo,
      })(this);

    }
    $onInit() {
      this.filteredContacts = this.$filter('contactsFilter')(this.contacts, this.filter);
    }
    goToContact(event) {
      this.stateGo('contact', {
        id: event.contactId,
      });
    }
  },
};

