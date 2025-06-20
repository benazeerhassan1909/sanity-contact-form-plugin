import {Plugin as Plugin_2} from 'sanity'
import {default as React_2} from 'react'

export declare const ContactForm: React_2.FC<ContactFormProps>

export declare const contactFormPlugin: Plugin_2<void>

declare interface ContactFormProps {
  formData: {
    title?: string
    showtitle?: boolean
    fields: Field[]
    submitButtonText?: string
    id?: string
    class?: string
    settings: {
      adminEmail: string
      successMessage: string
      confirmationSubject: string
      confirmationMessage: string
      recaptchaEnabled: boolean
      recaptchaSiteKey: string
      recaptchaSecretKey: string
    }
  }
}

declare interface Field {
  label: string
  name: string
  type: string
  placeholder?: string
  isRequired?: boolean
  selectOptions?: string[]
  helpText?: string
  note?: string
  showPlaceholder?: boolean
  radioOptions?: string[]
  checkboxOptions?: string[]
}

export {}
