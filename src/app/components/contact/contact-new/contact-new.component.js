import templateUrl from './contact-new.html';
import { stateGo } from 'redux-ui-router';

export const contactNewComponent = {
  templateUrl,
  controller: class ContactNewComponent {
    constructor($ngRedux, ContactService) {
      'ngInject';

      this.dispatch = this.$ngRedux.dispatch;
      this.contactService = ContactService;

      this.$onDestroy = $ngRedux.connect(state => ({
        // base: state.base,
        router: state.router,
      }), {
        stateGo,
      })(this);

    }
    $onInit() {
      this.contact = {
        name: '',
        email: '',
        job: '',
        location: '',
        social: {
          facebook: '',
          github: '',
          twitter: '',
          linkedin: '',
        },
        tag: 'none',
      };
    }
    createNewContact(event) {
      this.dispatch({type:'CONTACT_CREATE_NEW', payload: {contact: event.contact}});

      return this.contactService
        .createNewContact(event.contact)
        .then((contact) => {
          this.stateGo('contact', {
            id: contact.key,
          });
        });
    }
  },
};
