# sanity-plugin-contact-form

> This is a **Sanity Studio v3** plugin.

## Installation

```sh
npm install sanity-plugin-contact-form
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {contactFormPlugin} from 'sanity-plugin-contact-form'

export default defineConfig({
  //...
  plugins: [contactFormPlugin({})],
})
```

## Sanity Configuration

### Schema Modifications

To make `formGeneralSettings` a singleton, add the following to your desk structure:

```js
S.listItem()
  .title('Form General Settings')
  .child(
    S.editor()
      .schemaType('formGeneralSettings')
      .documentId('form-general-settings') // singleton ID
  ),
```

### Queries

Add these queries to your `sanity/lib/queries.ts`:

```js
export const CONTACT_FORM_QUERY = `*[_type == "contactForm" && _id == $formId]{
  title,
  showtitle,
  _id,
  id,
  class,
  fields[]{
    label,
    name,
    type,
    isRequired,
    helpText,
    note,
    showPlaceholder,
    selectOptions,
    placeholder,
    radioOptions,
    checkboxOptions,
    options[]{
      value,
      label
    },
  },
  submitButtonText
}[0]`;

export const CONTACT_FORM_SETTINGS_QUERY = `*[_type == "formGeneralSettings"][0]{
  adminEmail,
  successMessage,
  confirmationSubject,
  confirmationMessage,
  recaptchaEnabled,
  recaptchaSiteKey,
  recaptchaSecretKey,
  smtpUsername,
  smtpPassword
}`;
```
## 🧩 API Routes (Next.js)

Create the following file inside your Next.js app to handle form submissions and send confirmation/admin emails using Gmail via nodemailer:

**File:** `src/app/api/submit-form/route.ts`

---

## 🔐 Environment Variables

Add these to your `.env.local` in your Next.js app:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_WRITE_TOKEN=token_generated_from_sanity_account


NOTE:  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN, should be added in client.ts for write permission to sanity for image upload process
```

---

## 📦 React Component Setup

### 1. Create `ContactFormWrapper.tsx`

```tsx
'use client';

import { ContactForm } from '../sanity/plugins/sanity-plugin-contact-form';

export function ContactFormWrapper({ formData }: { formData: any }) {
  return <ContactForm formData={formData} />;
}
```

### 2. Use in your `page.tsx`

```tsx
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, CONTACT_FORM_QUERY, CONTACT_FORM_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { client } from '@/sanity/lib/client';
import { ContactFormWrapper } from '@/components/ContactFormWrapper';

type RouteProps = {
  params: Promise<{ slug: string }>;
};

const getPage = async (params: RouteProps["params"]) =>
  sanityFetch({
    query: PAGE_QUERY,
    params: await params,
  });

export default async function Page({ params }: RouteProps) {
  const { data: page } = await getPage(params);

  const formId = page?.contactForm?._ref;
  const formData = formId ? await getContactForm(formId) : null;

  return (
    <>
      <ContactFormWrapper formData={formData} />
    </>
  );
}

async function getContactForm(formId: string) {
  try {
    const [formData, formSettings] = await Promise.all([
      client.fetch(CONTACT_FORM_QUERY, { formId }),
      client.fetch(CONTACT_FORM_SETTINGS_QUERY),
    ]);

    return { ...formData, settings: formSettings };
  } catch (error) {
    console.error("Error fetching contact form:", error);
    throw error;
  }
}
```


## License

[MIT](LICENSE) © multidots

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.



