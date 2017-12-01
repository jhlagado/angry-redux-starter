import angular from 'angular';
import { ContactService } from './contact.service';
import { lengthCheck } from './length-check/length-check.directive';
import { contacts } from './contacts/contacts.module';
import { contactNew } from './contact-new/contact-new.module';
import { contactEdit } from './contact-edit/contact-edit.module';

export const contact = angular
  .module('components.contact', [
    contacts,
    contactNew,
    contactEdit,
  ])
  .service('ContactService', ContactService)
  .directive('lengthCheck', lengthCheck)
  .name;
