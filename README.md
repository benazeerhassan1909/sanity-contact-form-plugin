# 📬 Sanity Contact Form Plugin

A customizable contact form plugin for Sanity Studio, with seamless integration in your Next.js frontend.

---

## 🚀 Features

- Create multiple forms with flexible field types
- Define global settings (admin email, reCAPTCHA, confirmation messages, etc.) via a singleton document
- Fully functional Next.js integration
- API endpoints to handle submissions and send emails
- Field types supported: text, textarea, select, checkbox, radio, file upload, etc.
- Google reCAPTCHA support
- Email notifications to admin using Gmail SMTP
- Customizable success and confirmation messages

---

## ⚙️ Form Configuration

### 1. General Settings (Singleton)

Configure the following global settings in Sanity Studio:

- **Admin Email**: Recipient for form submissions
- **Gmail SMTP Settings**: Email and App password for authentication
- **Success Message**: Message shown after successful submission
- **Confirmation Subject & Message**: For user confirmation emails
- **reCAPTCHA Settings**: Enable/disable, set site and secret keys

### 2. Form Creation

While creating a form in Sanity, you can:

- Set form title and visibility
- Add multiple field types: Text, Email, Select, Radio, Checkbox, File upload
- Configure field-specific settings: Required, Placeholder, Help text, Note
- Set custom submit button text

---

## 🧩 Plugin Dependencies

Install required packages:

```bash
# Google reCAPTCHA
npm install react-google-recaptcha
npm install --save-dev @types/react-google-recaptcha

# Nodemailer
npm install nodemailer
npm install --save-dev @types/nodemailer
```

---

## 🔧 Plugin Installation (Studio)

Install the plugin in your Sanity Studio:

```bash
cd your-studio
npm install sanity-plugin-contact-form
```

Register it in `sanity.config.ts`:

```ts
import { contactFormPlugin } from 'sanity-plugin-contact-form';

export default defineConfig({
  plugins: [contactFormPlugin()],
});
```

---

## 🗂️ Schema Setup

### 1. `formGeneralSettings` Singleton

Use this structure in your `structure.ts` to make the settings document singleton:

```js
S.listItem()
  .title('Form General Settings')
  .child(
    S.editor()
      .schemaType('formGeneralSettings')
      .documentId('form-general-settings')
  )
```

Filter out the form settings from the main document list:

```js
...S.documentTypeListItems().filter(
  (item) =>
    item.getId() &&
    !["formGeneralSettings"].includes(item.getId()!)
),
```

### 2. Page Schema Field

Add the following field to your page schema:

```ts
defineField({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'reference',
  to: [{ type: 'contactForm' }],
  description: 'Select a contact form to display.',
}),
```

Update your page query to include the `contactForm` field and generate schema.

---

## 📚 Sanity Queries

Add the following to `queries.ts` in your `sanity/lib/` directory:

```ts
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

---

## 🛠️ API Route (Next.js)

Create the file below in your Next.js app:  
`src/app/api/submit-form/route.ts`

<details>
<summary>Click to expand full code</summary>

```ts
import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import nodemailer from 'nodemailer'

// ... (uploadResume, sendEmailWithAttachment, and POST handler as in original)
```

</details>

**This file:**

- Handles form submission
- Sends confirmation and admin emails via Gmail (using Nodemailer)
- Uploads file attachments to Sanity
- Verifies Google reCAPTCHA (if enabled)

Full code is included above — no changes required.

---

## 🔐 Environment Variables

Add these to your `.env.local` in your Next.js app:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_WRITE_TOKEN=your_sanity_token
```

✅ Make sure `client.ts` uses `NEXT_PUBLIC_SANITY_WRITE_TOKEN` for write permissions (e.g., file uploads):

```ts
export const client = createClient({
  // …other code
  token: clientEnv.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
});
```

---

## 💻 React Component Integration

### 1. Create the Wrapper component

`src/components/ContactFormWrapper.tsx`:

```tsx
'use client';

import { ContactForm } from '../sanity/plugins/sanity-plugin-contact-form';

export function ContactFormWrapper({ formData }: { formData: any }) {
  return <ContactForm formData={formData} />;
}
```

### 2. Use in Page

In your `page.tsx` file, render the form on the frontend:

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

---

With this setup, your contact forms are completely managed in Sanity and rendered in your Next.js app with API-powered submission and email handling.
