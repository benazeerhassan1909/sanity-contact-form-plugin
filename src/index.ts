import {definePlugin} from 'sanity'

import {contactFormSchema} from './schemas/contactForm'
import {formGeneralSettings} from './schemas/formGeneralSettings'

const SINGLETON_ID = 'formGeneralSettings'

export const contactFormPlugin = definePlugin(() => {
  return {
    name: 'sanity-plugin-contact-form',
    schema: {
      types: [contactFormSchema, formGeneralSettings],
    },
    document: {
      newDocumentOptions: (prev) => prev.filter((template) => template.templateId !== SINGLETON_ID),
    },
  }
})

export {ContactForm} from './components/ContactForm'
