'use client'
import React, { useState, useRef } from 'react'
import ReCAPTCHA from "react-google-recaptcha"

interface Field {
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

interface ContactFormProps {
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

export const ContactForm: React.FC<ContactFormProps> = ({ formData }) => {
  const [formState, setFormState] = useState<Record<string, string | boolean | string[] | File>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string }>({})
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const onReCAPTCHAChange = (captchaCode: string | null) => {
    if (!captchaCode) return
    setFormState((prev) => ({ ...prev, recaptcha: captchaCode }))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, checked, options } = e.target as HTMLInputElement & HTMLSelectElement
    let finalValue: string | boolean | string[]
    const inputType = (e.target as HTMLInputElement).type
    if (inputType === 'checkbox') {
      if (Array.isArray(formState[name])) {
        finalValue = checked
          ? [...(formState[name] as string[]), value]
          : (formState[name] as string[]).filter((v) => v !== value)
      } else {
        finalValue = checked ? value : ''
      }
    } else if (inputType === 'select-multiple') {
      finalValue = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value)
    } else if (inputType === 'radio') {
      finalValue = value
    } else {
      finalValue = value
    }
    setFormState((prev) => ({ ...prev, [name]: finalValue }))
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData?.fields) return false
    let isValid = true
    formData.fields.forEach((field) => {
      const fieldValue = formState[field.name]
      const isEmpty =
        fieldValue === undefined ||
        fieldValue === null ||
        (typeof fieldValue === 'string' && fieldValue.trim() === '') ||
        (Array.isArray(fieldValue) && fieldValue.length === 0)
      if (field.isRequired) {
        if (field.type === 'file') {
          if (!fieldValue || !(fieldValue instanceof File)) {
            errors[field.name] = 'Please upload a file'
            isValid = false
          }
        } else if (isEmpty) {
          errors[field.name] = `Please enter your ${field.label?.toLowerCase()}.`
          isValid = false
        }
        if (field.type === 'checkbox' && !fieldValue) {
          errors[field.name] = 'Please check the box'
          isValid = false
        }
        if (field.type === 'radio' && !fieldValue) {
          errors[field.name] = 'Please select an option'
          isValid = false
        }
      }
      if (!isEmpty && fieldValue) {
        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue.toString())) {
          errors[field.name] = 'Please enter a valid email address'
          isValid = false
        } else if (field.type === 'url' && !/^https?:\/\/.+\..+/.test(fieldValue.toString())) {
          errors[field.name] = 'Please enter a valid URL'
          isValid = false
        } else if (field.type === 'tel' && !/^[\d\s+\-()]{10,}$/.test(fieldValue.toString())) {
          errors[field.name] = 'Please enter a valid phone number'
          isValid = false
        }
      }
    })
    setFormErrors(errors)
    return isValid
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    const file = files?.[0]
    setFormState((prev) => ({
      ...prev,
      [name]: file || '',
    }))
    setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const resetForm = () => {
    const newState: Record<string, string | boolean | string[] | File> = {}
    formData.fields.forEach(field => {
      if (field.type === 'checkbox') {
        newState[field.name] = field.checkboxOptions?.length && field.checkboxOptions.length > 1 ? [] : false
      } else if (field.type === 'select') {
        newState[field.name] = []
      } else if (field.type === 'file') {
        newState[field.name] = ''
      } else if (field.type === 'radio') {
        newState[field.name] = ''
      } else {
        newState[field.name] = ''
      }
    })
    setFormState(newState)
    setFormErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})
    try {
      if (!validateForm()) throw new Error('Please fill in all required fields correctly.')
      if (!formData?.fields) throw new Error('Form configuration is missing')
      if (formData.settings.recaptchaEnabled && !recaptchaRef.current)
        throw new Error('reCAPTCHA script not loaded yet. Please try again.')
      const recaptchaToken = recaptchaRef.current ? recaptchaRef.current.getValue() : null
      const formPayload = new FormData()
      formPayload.append('Form Id', formData.id || '')
      if (recaptchaToken) formPayload.append('recaptchaToken', recaptchaToken)
      Object.entries(formState).forEach(([key, value]) => {
        const field = formData.fields.find((f) => f.name === key)
        const payloadKey = field && field.type === 'file' ? key : field?.label || key
        if (value instanceof File) {
          if (value && value.name) {
            formPayload.append(payloadKey, value)
          }
        } else if (Array.isArray(value)) {
          value.forEach((v) => formPayload.append(payloadKey, v))
        } else if (typeof value === 'string' && value !== '') {
          formPayload.append(payloadKey, value)
        }
      })
      if (formData.settings) {
        formPayload.append('settings', JSON.stringify(formData.settings))
      }
      console.log('Submitting form with payload:', Object.fromEntries(formPayload.entries()))
      const response = await fetch(`/api/submit-form`, {
        method: 'POST',
        body: formPayload,
      })
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }
      const result = await response.json()
      if (result.recaptchaSuccess === false)
        throw new Error('reCAPTCHA verification failed. Please try again.')
      if (formData.settings.recaptchaEnabled) {
        recaptchaRef.current?.reset()
        setFormState(prev => {
          // Remove 'recaptcha' from formState without assigning it
          const rest = { ...prev }
          delete rest.recaptcha
          return rest
        })
      }
      resetForm()
      setSubmitStatus({
        success: true,
        message: formData.settings.successMessage || 'Form submitted successfully.',
      })
      setTimeout(() => {
        setSubmitStatus({})
        recaptchaRef.current?.reset()
      }, 2000)
    } catch (error) {
      setSubmitStatus({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Error submitting application. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!formData) return <div>Loading form...</div>

  const renderField = (field: Field) => {
    const key = `field-${field.name}`
    const errorClass = formErrors[field.name] ? 'has-error' : ''
    const commonProps = {
      id: field.name,
      name: field.name,
      required: field.isRequired,
      onChange: handleChange,
      className: errorClass,
      placeholder: field.showPlaceholder ? field.label : field.placeholder,
      value: (formState[field.name] as string) || '',
    }
    const help = field.helpText && (
      <div className="help-tip">
        <p>{field.helpText}</p>
      </div>
    )
    const note = field.note && (
      <div className="note-text">
        <p>Note:{field.note}</p>
      </div>
    )
    switch (field.type) {
      case 'textarea':
        return (
          <div key={key}>
            <label htmlFor={field.name}>
              {field.label} {field.isRequired && <span className="required-asterisk">*</span>}
            </label>
            {help}
            {note}
            <textarea {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
          </div>
        )
      case 'select':
        return (
          <div key={key}>
            <label htmlFor={field.name}>
              {field.label} {field.isRequired && <span className="required-asterisk">*</span>}
            </label>
            {help}
            {note}
            <select
              {...commonProps}
              value={
                Array.isArray(formState[field.name])
                  ? (formState[field.name] as string[])
                  : (formState[field.name] as string) || ''
              }
            >
              <option value="" disabled>
                {field.placeholder || `Select ${field.label}`}
              </option>
              {field.selectOptions?.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {formErrors[field.name] && (
              <div className="general-error-form">{formErrors[field.name]}</div>
            )}
          </div>
        )
      case 'checkbox':
        return (
            <div key={key} className={`checkbox-wrapper${formErrors[field.name] ? ' has-error-border' : ''}`}>
            <label className="checkbox-labels">
              {field.label} {field.isRequired && <span className="required-asterisk">*</span>}
            </label>
            {help}
            {note}
            {field.checkboxOptions?.map(opt => (
              <div key={opt} className="checkbox-option">
                <input
                  type="checkbox"
                  name={field.name}
                  value={opt}
                  onChange={handleChange}
                  className={`checkbox`}
                  id={`${field.name}-${opt}`}
                  checked={
                    Array.isArray(formState[field.name])
                      ? (formState[field.name] as string[]).includes(opt)
                      : formState[field.name] === opt
                  }
                />
                <label
                  htmlFor={`${field.name}-${opt}`}
                  style={{ marginLeft: '0.25rem' }}
                  className="checkbox-label"
                >
                  {opt}
                </label>
              </div>
            ))}
          </div>
        )
      case 'radio':
        return (
            <div key={key} className={`radio-wrapper${formErrors[field.name] ? ' has-error-border' : ''}`}>
            <label className="radio-label">
              {field.label} {field.isRequired && <span className="required-asterisk">*</span>}
            </label>
            {help}
            {note}
            {field.radioOptions?.map(opt => (
              <div key={opt} className="radio-option">
                <input
                  type="radio"
                  name={field.name}
                  value={opt}
                  onChange={handleChange}
                  className={`radio`}
                  id={`${field.name}-${opt}`}
                  checked={(formState[field.name] as string) === opt}
                />
                <label htmlFor={`${field.name}-${opt}`} style={{ marginLeft: '0.25rem' }}>
                  {opt}
                </label>
              </div>
            ))}
          </div>
        )
      case 'file':
        return (
          <div key={key}>
            <label htmlFor={field.name}>
              {field.label} {field.isRequired && <span className="required-asterisk">*</span>}
            </label>
            {help}
            {note}
            <input
              id={field.name}
              type="file"
              name={field.name}
              placeholder={field.showPlaceholder ? field.label : field.placeholder}
              required={field.isRequired}
              onChange={handleFileChange}
              className={formErrors[field.name] ? 'has-error' : ''}
              key={formState[field.name] instanceof File ? 'file-filled' : 'file-empty'}
            />
            {formErrors[field.name] && (
              <div className="general-error-form">{formErrors[field.name]}</div>
            )}
          </div>
        )
      default:
        return (
          <div key={key}>
            <label htmlFor={field.name}>
              {field.label} {field.isRequired && <span className="required-asterisk">*</span>}
            </label>
            {help}
            {note}
            <input {...commonProps} type={field.type} />
          </div>
        )
    }
  }

  return (
    <form id={formData.id} className={formData.class || ''} onSubmit={handleSubmit}>
      {formData.showtitle && <h2 style={{ textAlign: 'center', color: 'red' }}>{formData.title}</h2>}
      {formData.fields.map(renderField)}
      {formData.settings && formData.settings.recaptchaEnabled && (
        <ReCAPTCHA
          sitekey={formData.settings.recaptchaSiteKey}
          ref={recaptchaRef}
          onChange={onReCAPTCHAChange}
        />
      )}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : formData.submitButtonText || 'Apply Now'}
      </button>
      {submitStatus.message && (
        <div
          className={` ${submitStatus.success ? 'resume-submit-success' : 'general-error-form'}`}
          role="alert"
        >
          {submitStatus.message}
        </div>
      )}
      <style>
        {`
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
        `}
      </style>
    </form>
  )
}
