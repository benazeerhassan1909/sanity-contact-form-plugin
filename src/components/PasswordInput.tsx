import {TextInput} from '@sanity/ui'
import React from 'react'
import {useState} from 'react'
import {set, unset} from 'sanity'

interface PasswordInputProps {
  value: string
  onChange: (patchEvent: ReturnType<typeof set> | ReturnType<typeof unset>) => void
}

export function PasswordInput({value, onChange}: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value
    onChange(inputValue ? set(inputValue) : unset())
  }

  const handleToggleVisibility = () => {
    setVisible((prev) => !prev)
  }

  return (
    <div>
      <TextInput
        type={visible ? 'text' : 'password'}
        value={value || ''}
        onChange={handleInputChange}
      />
      <button
        type="button"
        onClick={handleToggleVisibility}
        style={{
          marginTop: '5px',
          fontSize: '12px',
          background: 'transparent',
          border: 'none',
          color: '#0070f3',
          cursor: 'pointer',
        }}
      >
        {visible ? 'Hide' : 'Show'} Password
      </button>
    </div>
  )
}
