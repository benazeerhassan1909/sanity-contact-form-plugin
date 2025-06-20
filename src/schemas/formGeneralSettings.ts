import {defineType} from 'sanity'

export const formGeneralSettings = defineType({
  name: 'formGeneralSettings',
  title: 'Form: General Settings',
  type: 'document',
  fields: [
    {
      name: 'adminEmail',
      title: 'Admin Email',
      type: 'string',
      description: 'The email address where submissions should be sent.',
      validation: (Rule) => Rule.required().email(),
    },
    // Gmail smtp settings
    {
      name: 'smtpUsername',
      title: 'Gmail SMTP Username',
      type: 'string',
      description: 'For Gmail, use full address',
      validation: (Rule) => Rule.required().email(),

    },
    {
      name: 'smtpPassword',
      title: 'Gmail SMTP Password',
      type: 'string',
      description: 'For Gmail, use an App Password',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 3,
      description: 'Message displayed to the user after successful submission.',
    },
    {
      name: 'confirmationSubject',
      title: 'Email Subject',
      type: 'string',
    },
    {
      name: 'confirmationMessage',
      title: 'Email Message',
      type: 'text',
      rows: 4,
    },
    {
      name: 'recaptchaEnabled',
      title: 'Enable reCAPTCHA',
      type: 'boolean',
      description: 'Enable Google reCAPTCHA for spam protection.',
      initialValue: false,
    },
    {
      name: 'recaptchaSiteKey',
      title: 'reCAPTCHA Site Key',
      type: 'string',
      description: 'Google reCAPTCHA site key for spam protection.',
      hidden: ({ document }) => !document?.recaptchaEnabled,
      validation: (Rule) =>
        Rule.custom((field, context) => {
          // Get the current document from context
          const document = context.document;

          // Only validate if recaptchaEnabled is true
          if (document?.recaptchaEnabled && !field) {
            return 'Site key is required when reCAPTCHA is enabled';
          }

          return true;
        })
    },
    {
      name: 'recaptchaSecretKey',
      title: 'reCAPTCHA Secret Key',
      type: 'string',
      description: 'Google reCAPTCHA secret key for server-side validation.',
      hidden: ({ document }) => !document?.recaptchaEnabled,
      validation: (Rule) =>
        Rule.custom((field, context) => {
          // Get the current document from context
          const document = context.document;
          
          // Only validate if recaptchaEnabled is true
          if (document?.recaptchaEnabled && !field) {
            return 'Secret key is required when reCAPTCHA is enabled';
          }

          return true;
        })
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Form: General Settings',
      }
    },
  },
})
