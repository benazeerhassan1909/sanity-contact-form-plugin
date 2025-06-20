import { defineType, definePlugin } from "sanity";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
const contactFormSchema = {
  name: "contactForm",
  type: "document",
  title: "Forms",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Form Title"
    },
    {
      name: "showtitle",
      type: "boolean",
      title: "Show Title",
      initialValue: !1
    },
    {
      name: "id",
      type: "string",
      title: "ID",
      options: {
        source: "title"
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: "class",
      type: "string",
      title: "Class"
    },
    {
      name: "fields",
      type: "array",
      title: "Form Fields",
      of: [
        {
          type: "object",
          title: "Field",
          fields: [
            {
              name: "label",
              type: "string",
              title: "Label",
              validation: (Rule) => Rule.required()
            },
            {
              name: "type",
              type: "string",
              title: "Field Type",
              options: {
                list: [
                  { title: "Text", value: "text" },
                  { title: "Email", value: "email" },
                  { title: "Tel", value: "tel" },
                  { title: "Textarea", value: "textarea" },
                  { title: "URL", value: "url" },
                  { title: "File Upload", value: "file" },
                  { title: "Checkbox", value: "checkbox" },
                  { title: "Select Dropdown", value: "select" },
                  { title: "Radio Buttons", value: "radio" }
                ],
                layout: "dropdown"
              },
              initialValue: "text"
            },
            {
              name: "showPlaceholder",
              type: "boolean",
              title: "Use Label as Placeholder?",
              initialValue: !0,
              hidden: ({ parent }) => parent?.type === "checkbox" || parent?.type === "radio" || parent?.type === "file" || parent?.type === "select"
            },
            {
              name: "placeholder",
              type: "string",
              title: "Placeholder Text",
              hidden: ({ parent }) => parent?.showPlaceholder
            },
            {
              name: "name",
              type: "string",
              title: "Field Name",
              description: "Unique field name (e.g., fullName, email, phone)",
              validation: (Rule) => Rule.required()
            },
            {
              name: "selectOptions",
              type: "array",
              title: "Dropdown Options",
              of: [{ type: "string" }],
              description: "Add all available options for selection",
              hidden: ({ parent }) => parent?.type !== "select",
              validation: (Rule) => Rule.custom(
                (options, context) => context.parent?.type === "select" && (!options || options.length === 0) ? "At least one option is required for select fields" : !0
              )
            },
            {
              name: "radioOptions",
              type: "array",
              title: "Radio Options",
              of: [{ type: "string" }],
              description: "Add all available options for selection",
              hidden: ({ parent }) => parent?.type !== "radio",
              validation: (Rule) => Rule.custom(
                (options, context) => context.parent?.type === "radio" && (!options || options.length === 0) ? "At least one option is required for radio fields" : !0
              )
            },
            {
              name: "checkboxOptions",
              type: "array",
              title: "Checkbox Options",
              of: [{ type: "string" }],
              description: "Add all available options for selection",
              hidden: ({ parent }) => parent?.type !== "checkbox",
              validation: (Rule) => Rule.custom(
                (options, context) => context.parent?.type === "checkbox" && (!options || options.length === 0) ? "At least one option is required for checkbox fields" : !0
              )
            },
            {
              name: "helpText",
              type: "string",
              title: "Help Text"
            },
            {
              name: "note",
              type: "string",
              title: "Note"
            },
            {
              name: "isRequired",
              type: "boolean",
              title: "Required Field?",
              initialValue: !0
            }
          ]
        }
      ],
      validation: (Rule) => Rule.required()
    },
    {
      name: "submitButtonText",
      type: "string",
      title: "Submit Button Text",
      initialValue: "Apply Now"
    }
  ]
}, formGeneralSettings = defineType({
  name: "formGeneralSettings",
  title: "Form: General Settings",
  type: "document",
  fields: [
    {
      name: "adminEmail",
      title: "Admin Email",
      type: "string",
      description: "The email address where submissions should be sent.",
      validation: (Rule) => Rule.required().email()
    },
    // Gmail smtp settings
    {
      name: "smtpUsername",
      title: "Gmail SMTP Username",
      type: "string",
      description: "For Gmail, use full address",
      validation: (Rule) => Rule.required().email()
    },
    {
      name: "smtpPassword",
      title: "Gmail SMTP Password",
      type: "string",
      description: "For Gmail, use an App Password",
      validation: (Rule) => Rule.required()
    },
    {
      name: "successMessage",
      title: "Success Message",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
      description: "Message displayed to the user after successful submission.",
      initialValue: "Thank you for your submission! We will get back to you soon."
    },
    {
      name: "confirmationSubject",
      title: "Email Subject",
      type: "string",
      description: "Subject line for the confirmation email sent to the admin.",
      initialValue: "New Submission",
      validation: (Rule) => Rule.required()
    },
    {
      name: "confirmationMessage",
      title: "Email Message",
      type: "text",
      rows: 4,
      description: "Message body for the confirmation email sent to the admin.",
      initialValue: "Thank you for your submission! We have received your message and will get back to you shortly."
    },
    {
      name: "recaptchaEnabled",
      title: "Enable reCAPTCHA",
      type: "boolean",
      description: "Enable Google reCAPTCHA for spam protection.",
      initialValue: !1
    },
    {
      name: "recaptchaSiteKey",
      title: "reCAPTCHA Site Key",
      type: "string",
      description: "Google reCAPTCHA site key for spam protection.",
      hidden: ({ document }) => !document?.recaptchaEnabled,
      validation: (Rule) => Rule.custom((field, context) => context.document?.recaptchaEnabled && !field ? "Site key is required when reCAPTCHA is enabled" : !0)
    },
    {
      name: "recaptchaSecretKey",
      title: "reCAPTCHA Secret Key",
      type: "string",
      description: "Google reCAPTCHA secret key for server-side validation.",
      hidden: ({ document }) => !document?.recaptchaEnabled,
      validation: (Rule) => Rule.custom((field, context) => context.document?.recaptchaEnabled && !field ? "Secret key is required when reCAPTCHA is enabled" : !0)
    }
  ],
  preview: {
    prepare() {
      return {
        title: "Form: General Settings"
      };
    }
  }
}), ContactForm = ({ formData }) => {
  const [formState, setFormState] = useState({}), [formErrors, setFormErrors] = useState({}), [isSubmitting, setIsSubmitting] = useState(!1), [submitStatus, setSubmitStatus] = useState({}), recaptchaRef = useRef(null), onReCAPTCHAChange = (captchaCode) => {
    captchaCode && setFormState((prev) => ({ ...prev, recaptcha: captchaCode }));
  }, handleChange = (e) => {
    const { name, value, checked, options } = e.target;
    let finalValue;
    const inputType = e.target.type;
    inputType === "checkbox" ? Array.isArray(formState[name]) ? finalValue = checked ? [...formState[name], value] : formState[name].filter((v) => v !== value) : finalValue = checked ? value : "" : inputType === "select-multiple" ? finalValue = Array.from(options).filter((opt) => opt.selected).map((opt) => opt.value) : finalValue = value, setFormState((prev) => ({ ...prev, [name]: finalValue }));
  }, validateForm = () => {
    const errors = {};
    if (!formData?.fields) return !1;
    let isValid = !0;
    return formData.fields.forEach((field) => {
      const fieldValue = formState[field.name], isEmpty = fieldValue == null || typeof fieldValue == "string" && fieldValue.trim() === "" || Array.isArray(fieldValue) && fieldValue.length === 0;
      field.isRequired && (field.type === "file" ? (!fieldValue || !(fieldValue instanceof File)) && (errors[field.name] = "Please upload a file", isValid = !1) : isEmpty && (errors[field.name] = `Please enter your ${field.label?.toLowerCase()}.`, isValid = !1), field.type === "checkbox" && !fieldValue && (errors[field.name] = "Please check the box", isValid = !1), field.type === "radio" && !fieldValue && (errors[field.name] = "Please select an option", isValid = !1)), !isEmpty && fieldValue && (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue.toString()) ? (errors[field.name] = "Please enter a valid email address", isValid = !1) : field.type === "url" && !/^https?:\/\/.+\..+/.test(fieldValue.toString()) ? (errors[field.name] = "Please enter a valid URL", isValid = !1) : field.type === "tel" && !/^[\d\s+\-()]{10,}$/.test(fieldValue.toString()) && (errors[field.name] = "Please enter a valid phone number", isValid = !1));
    }), setFormErrors(errors), isValid;
  }, handleFileChange = (e) => {
    const { name, files } = e.target, file = files?.[0];
    setFormState((prev) => ({
      ...prev,
      [name]: file || ""
    })), setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }, resetForm = () => {
    const newState = {};
    formData.fields.forEach((field) => {
      field.type === "checkbox" ? newState[field.name] = field.checkboxOptions?.length && field.checkboxOptions.length > 1 ? [] : !1 : field.type === "select" ? newState[field.name] = [] : newState[field.name] = "";
    }), setFormState(newState), setFormErrors({});
  }, handleSubmit = async (e) => {
    e.preventDefault(), setIsSubmitting(!0), setSubmitStatus({});
    try {
      if (!validateForm()) throw new Error("Please fill in all required fields correctly.");
      if (!formData?.fields) throw new Error("Form configuration is missing");
      if (formData.settings.recaptchaEnabled && !recaptchaRef.current)
        throw new Error("reCAPTCHA script not loaded yet. Please try again.");
      const recaptchaToken = recaptchaRef.current ? recaptchaRef.current.getValue() : null, formPayload = new FormData();
      formPayload.append("Form Id", formData.id || ""), recaptchaToken && formPayload.append("recaptchaToken", recaptchaToken), Object.entries(formState).forEach(([key, value]) => {
        const field = formData.fields.find((f) => f.name === key), payloadKey = field && field.type === "file" ? key : field?.label || key;
        value instanceof File ? value && value.name && formPayload.append(payloadKey, value) : Array.isArray(value) ? value.forEach((v) => formPayload.append(payloadKey, v)) : typeof value == "string" && value !== "" && formPayload.append(payloadKey, value);
      }), formData.settings && formPayload.append("settings", JSON.stringify(formData.settings));
      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: formPayload
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }
      if ((await response.json()).recaptchaSuccess === !1)
        throw new Error("reCAPTCHA verification failed. Please try again.");
      formData.settings.recaptchaEnabled && (recaptchaRef.current?.reset(), setFormState((prev) => {
        const rest = { ...prev };
        return delete rest.recaptcha, rest;
      })), resetForm(), setSubmitStatus({
        success: !0,
        message: formData.settings.successMessage || "Form submitted successfully."
      }), setTimeout(() => {
        setSubmitStatus({}), recaptchaRef.current?.reset();
      }, 2e3);
    } catch (error) {
      setSubmitStatus({
        success: !1,
        message: error instanceof Error ? error.message : "Error submitting application. Please try again."
      });
    } finally {
      setIsSubmitting(!1);
    }
  };
  if (!formData) return /* @__PURE__ */ jsx("div", { children: "Loading form..." });
  const renderField = (field) => {
    const key = `field-${field.name}`, errorClass = formErrors[field.name] ? "has-error" : "", commonProps = {
      id: field.name,
      name: field.name,
      required: field.isRequired,
      onChange: handleChange,
      className: errorClass,
      placeholder: field.showPlaceholder ? field.label : field.placeholder,
      value: formState[field.name] || ""
    }, help = field.helpText && /* @__PURE__ */ jsx("div", { className: "help-tip", children: /* @__PURE__ */ jsx("p", { children: field.helpText }) }), note = field.note && /* @__PURE__ */ jsx("div", { className: "note-text", children: /* @__PURE__ */ jsxs("p", { children: [
      "Note:",
      field.note
    ] }) });
    switch (field.type) {
      case "textarea":
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: field.name, children: [
            field.label,
            " ",
            field.isRequired && /* @__PURE__ */ jsx("span", { className: "required-asterisk", children: "*" })
          ] }),
          help,
          note,
          /* @__PURE__ */ jsx("textarea", { ...commonProps })
        ] }, key);
      case "select":
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: field.name, children: [
            field.label,
            " ",
            field.isRequired && /* @__PURE__ */ jsx("span", { className: "required-asterisk", children: "*" })
          ] }),
          help,
          note,
          /* @__PURE__ */ jsxs(
            "select",
            {
              ...commonProps,
              value: Array.isArray(formState[field.name]) ? formState[field.name] : formState[field.name] || "",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", disabled: !0, children: field.placeholder || `Select ${field.label}` }),
                field.selectOptions?.map((opt) => /* @__PURE__ */ jsx("option", { value: opt, children: opt }, opt))
              ]
            }
          ),
          formErrors[field.name] && /* @__PURE__ */ jsx("div", { className: "general-error-form", children: formErrors[field.name] })
        ] }, key);
      case "checkbox":
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `checkbox-wrapper${formErrors[field.name] ? " has-error-border" : ""}`,
            children: [
              /* @__PURE__ */ jsxs("label", { className: "checkbox-labels", children: [
                field.label,
                " ",
                field.isRequired && /* @__PURE__ */ jsx("span", { className: "required-asterisk", children: "*" })
              ] }),
              help,
              note,
              field.checkboxOptions?.map((opt) => /* @__PURE__ */ jsxs("div", { className: "checkbox-option", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    name: field.name,
                    value: opt,
                    onChange: handleChange,
                    className: "checkbox",
                    id: `${field.name}-${opt}`,
                    checked: Array.isArray(formState[field.name]) ? formState[field.name].includes(opt) : formState[field.name] === opt
                  }
                ),
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: `${field.name}-${opt}`,
                    style: { marginLeft: "0.25rem" },
                    className: "checkbox-label",
                    children: opt
                  }
                )
              ] }, opt))
            ]
          },
          key
        );
      case "radio":
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `radio-wrapper${formErrors[field.name] ? " has-error-border" : ""}`,
            children: [
              /* @__PURE__ */ jsxs("label", { className: "radio-label", children: [
                field.label,
                " ",
                field.isRequired && /* @__PURE__ */ jsx("span", { className: "required-asterisk", children: "*" })
              ] }),
              help,
              note,
              field.radioOptions?.map((opt) => /* @__PURE__ */ jsxs("div", { className: "radio-option", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "radio",
                    name: field.name,
                    value: opt,
                    onChange: handleChange,
                    className: "radio",
                    id: `${field.name}-${opt}`,
                    checked: formState[field.name] === opt
                  }
                ),
                /* @__PURE__ */ jsx("label", { htmlFor: `${field.name}-${opt}`, style: { marginLeft: "0.25rem" }, children: opt })
              ] }, opt))
            ]
          },
          key
        );
      case "file":
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: field.name, children: [
            field.label,
            " ",
            field.isRequired && /* @__PURE__ */ jsx("span", { className: "required-asterisk", children: "*" })
          ] }),
          help,
          note,
          /* @__PURE__ */ jsx(
            "input",
            {
              id: field.name,
              type: "file",
              name: field.name,
              placeholder: field.showPlaceholder ? field.label : field.placeholder,
              required: field.isRequired,
              onChange: handleFileChange,
              className: formErrors[field.name] ? "has-error" : ""
            },
            formState[field.name] instanceof File ? "file-filled" : "file-empty"
          ),
          formErrors[field.name] && /* @__PURE__ */ jsx("div", { className: "general-error-form", children: formErrors[field.name] })
        ] }, key);
      default:
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: field.name, children: [
            field.label,
            " ",
            field.isRequired && /* @__PURE__ */ jsx("span", { className: "required-asterisk", children: "*" })
          ] }),
          help,
          note,
          /* @__PURE__ */ jsx("input", { ...commonProps, type: field.type })
        ] }, key);
    }
  };
  return /* @__PURE__ */ jsxs("form", { id: formData.id, className: formData.class || "", onSubmit: handleSubmit, children: [
    formData.showtitle && /* @__PURE__ */ jsx("h2", { style: { textAlign: "center", color: "red" }, children: formData.title }),
    formData.fields.map(renderField),
    formData.settings && formData.settings.recaptchaEnabled && /* @__PURE__ */ jsx(
      ReCAPTCHA,
      {
        sitekey: formData.settings.recaptchaSiteKey,
        ref: recaptchaRef,
        onChange: onReCAPTCHAChange
      }
    ),
    /* @__PURE__ */ jsx("button", { type: "submit", disabled: isSubmitting, children: isSubmitting ? "Submitting..." : formData.submitButtonText || "Apply Now" }),
    submitStatus.message && /* @__PURE__ */ jsx(
      "div",
      {
        className: ` ${submitStatus.success ? "resume-submit-success" : "general-error-form"}`,
        role: "alert",
        children: submitStatus.message
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
          form {
            max-width: 600px;
            margin: 2rem auto;
            padding: 2rem;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            font-family: system-ui, sans-serif;
          }
          form h2 {
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
            color: #111827;
          }
          form>div {
            margin-bottom: 1.25rem;
            position: relative;
          }
          label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #374151;
          }
          .required-asterisk { color: red; }
          input, textarea, select {
            width: 100%;
            padding: 0.75rem;
            font-size: 1rem;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            background-color: #fff;
            color: #111827;
            transition: border-color 0.2s;
          }
          input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 1px #2563eb33;
          }
          textarea {
            resize: vertical;
            min-height: 120px;
          }
          button[type='submit'] {
            background-color: #2563eb;
            color: white;
            padding: 0.75rem 1.25rem;
            font-size: 1rem;
            font-weight: 600;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }
          button[type='submit']:hover { background-color: #1d4ed8; }
          p { font-size: 1rem; color: #16a34a; margin-top: 1rem; }
          input[type="checkbox"].has-error-border {
            outline: 1px solid red;
            outline-offset: 1px;
            padding: 10px;
          }
          input.has-error, textarea.has-error  { border: 1px solid #ff0000 !important; }
          .radio, .checkbox {
            margin-right: 0.4rem;
            accent-color: #2563eb;
            width: 16px;
            height: 16px;
            cursor: pointer;
          }
          .radio-option, .checkbox-option { display: flex; gap: 0.5rem; }
          .has-error-border { border: 1px solid red; padding: 10px; }
          .general-error-form { color: red; margin-top: 1rem; }
          .resume-submit-success { color: green; margin-top: 1rem; }
          .help-tip {
            position: absolute;
            top: 0;
            right: 0;
            text-align: center;
            background-color: #595959;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            font-size: 12px;
            line-height: 21px;
            cursor: default
          }
          .help-tip:before {
            content: '?';
            font-weight: 700;
            color: #fff
          }
          .help-tip:hover p {
            display: block;
            transform-origin: 100% 0%;
            -webkit-animation: .3s ease-in-out fadeIn;
            animation: .3s ease-in-out fadeIn;
            z-index: 999
          }
          .help-tip p {
            display: none;
            background-color: #1e2021;
            padding: 15px 10px;
            width: 290px;
            position: absolute;
            border-radius: 3px;
            box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
            right: -4px;
            color: #fff;
            font-size: 13px;
            line-height: 1.4;
            word-wrap: break-word
          }
          .help-tip p:before {
            position: absolute;
            content: '';
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-bottom-color: #1e2021;
            right: 10px;
            top: -12px
          }
          .help-tip p:after {
            width: 100%;
            height: 40px;
            content: '';
            position: absolute;
            top: -40px;
            left: 0
          }
          .help-tip p a {
            color: #fff;
            font-size: inherit;
            text-decoration: none;
            pointer-events: none
          }
          .help-tip p{text-align: left}
          .note-text p {
            margin-bottom: 0.5rem;
            font-size: 0.8rem;
            font-style: italic;
            color:rgb(77, 78, 80)!important;
          }
        ` })
  ] });
}, SINGLETON_ID = "formGeneralSettings", contactFormPlugin = definePlugin(() => ({
  name: "sanity-plugin-contact-form",
  schema: {
    types: [contactFormSchema, formGeneralSettings]
  },
  document: {
    newDocumentOptions: (prev) => prev.filter((template) => template.templateId !== SINGLETON_ID)
  }
}));
export {
  ContactForm,
  contactFormPlugin
};
//# sourceMappingURL=index.js.map
