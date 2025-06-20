// schemas/form.js
export const contactFormSchema = {
  name: 'contactForm',
  type: 'document',
  title: 'Forms',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Form Title',
    },
    {
      name: 'showtitle',
      type: 'boolean',
      title: 'Show Title',
      initialValue: false,
    },
    {
      name: 'id',
      type: 'string',
      title: 'ID',
      options: {
        source: 'title',
      },
      validation: (Rule: {required: () => void}) => Rule.required(),
    },
    {
      name: 'class',
      type: 'string',
      title: 'Class',
    },
    {
      name: 'fields',
      type: 'array',
      title: 'Form Fields',
      of: [
        {
          type: 'object',
          title: 'Field',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule: {required: () => void}) => Rule.required(),
            },
            {
              name: 'type',
              type: 'string',
              title: 'Field Type',
              options: {
                list: [
                  {title: 'Text', value: 'text'},
                  {title: 'Email', value: 'email'},
                  {title: 'Tel', value: 'tel'},
                  {title: 'Textarea', value: 'textarea'},
                  {title: 'URL', value: 'url'},
                  {title: 'File Upload', value: 'file'},
                  {title: 'Checkbox', value: 'checkbox'},
                  {title: 'Select Dropdown', value: 'select'},
                  {title: 'Radio Buttons', value: 'radio'},
                ],
                layout: 'dropdown',
              },
              initialValue: 'text',
            },
            {
              name: 'showPlaceholder',
              type: 'boolean',
              title: 'Use Label as Placeholder?',
              initialValue: true,
              hidden: ({parent}: {parent: {type?: string}}) =>
                parent?.type === 'checkbox' ||
                parent?.type === 'radio' ||
                parent?.type === 'file' ||
                parent?.type === 'select',
            },
            {
              name: 'placeholder',
              type: 'string',
              title: 'Placeholder Text',
              hidden: ({parent}: {parent: {showPlaceholder?: boolean}}) => parent?.showPlaceholder,
            },
            {
              name: 'name',
              type: 'string',
              title: 'Field Name',
              description: 'Unique field name (e.g., fullName, email, phone)',
              validation: (Rule: {required: () => void}) => Rule.required(),
            },
            {
              name: 'selectOptions',
              type: 'array',
              title: 'Dropdown Options',
              of: [{type: 'string'}],
              description: 'Add all available options for selection',
              hidden: ({parent}: {parent?: {type?: string}}) => parent?.type !== 'select',
              validation: (Rule: {
                custom: (
                  callback: (
                    options: string[] | undefined,
                    context: {parent?: {type?: string}},
                  ) => true | string,
                ) => void
              }) =>
                Rule.custom(
                  (options: string[] | undefined, context: {parent?: {type?: string}}) => {
                    if (context.parent?.type === 'select' && (!options || options.length === 0)) {
                      return 'At least one option is required for select fields'
                    }
                    return true
                  },
                ),
            },
            {
              name: 'radioOptions',
              type: 'array',
              title: 'Radio Options',
              of: [{type: 'string'}],
              description: 'Add all available options for selection',
              hidden: ({parent}: {parent?: {type?: string}}) => parent?.type !== 'radio',
              validation: (Rule: {
                custom: (
                  callback: (
                    options: string[] | undefined,
                    context: {parent?: {type?: string}},
                  ) => true | string,
                ) => void
              }) =>
                Rule.custom(
                  (options: string[] | undefined, context: {parent?: {type?: string}}) => {
                    if (context.parent?.type === 'radio' && (!options || options.length === 0)) {
                      return 'At least one option is required for radio fields'
                    }
                    return true
                  },
                ),
            },
            {
              name: 'checkboxOptions',
              type: 'array',
              title: 'Checkbox Options',
              of: [{type: 'string'}],
              description: 'Add all available options for selection',
              hidden: ({parent}: {parent?: {type?: string}}) => parent?.type !== 'checkbox',
              validation: (Rule: {
                custom: (
                  callback: (
                    options: string[] | undefined,
                    context: {parent?: {type?: string}},
                  ) => true | string,
                ) => void
              }) =>
                Rule.custom(
                  (options: string[] | undefined, context: {parent?: {type?: string}}) => {
                    if (context.parent?.type === 'checkbox' && (!options || options.length === 0)) {
                      return 'At least one option is required for checkbox fields'
                    }
                    return true
                  },
                ),
            },
            {
              name: 'helpText',
              type: 'string',
              title: 'Help Text',
            },
            {
              name: 'note',
              type: 'string',
              title: 'Note',
            },
            {
              name: 'isRequired',
              type: 'boolean',
              title: 'Required Field?',
              initialValue: true,
            },
          ],
        },
      ],
      validation: (Rule: {required: () => void}) => Rule.required(),
    },
    {
      name: 'submitButtonText',
      type: 'string',
      title: 'Submit Button Text',
      initialValue: 'Apply Now',
    },
  ],
}
