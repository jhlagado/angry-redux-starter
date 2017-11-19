import templateUrl from './contacts.html';

export const contactsComponent = {
  bindings: {
    contacts: '<',
    filter: '<',
  },
  templateUrl,
  controller: class ContactsComponent {
    constructor($state, $filter) {
      'ngInject';

      this.$state = $state;
      this.$filter = $filter;
    }
    $onInit() {
      this.filteredContacts = this.$filter('contactsFilter')(this.contacts, this.filter);
    }
    goToContact(event) {
      this.$state.go('contact', {
        id: event.contactId,
      });
    }
  },
};
