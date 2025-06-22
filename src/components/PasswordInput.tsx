import {Box, Button, Flex, TextInput} from '@sanity/ui'
import React, {forwardRef, useState} from 'react'
import {set, unset} from 'sanity'

interface PasswordInputProps {
  value: string
  onChange: (patchEvent: ReturnType<typeof set> | ReturnType<typeof unset>) => void
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({value, onChange}, ref) {
    const [visible, setVisible] = useState(false)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.currentTarget.value
      onChange(inputValue ? set(inputValue) : unset())
    }

    return (
      <Box>
        <Flex align="center" gap={2}>
          <TextInput
            ref={ref}
            type={visible ? 'text' : 'password'}
            value={value || ''}
            onChange={handleInputChange}
            style={{flex: 1}}
          />
          <Button
            mode="bleed"
            text={visible ? 'Hide' : 'Show'}
            padding={2}
            onClick={() => setVisible((v) => !v)}
          />
        </Flex>
      </Box>
    )
  },
)
