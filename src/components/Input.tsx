import { FC } from 'react'
import { TextInputProps as RNTextInputProps, TextInput } from 'react-native'
import { theme } from '@/constants/theme'

interface InputProps extends RNTextInputProps {
  size?: keyof typeof theme.text
}

const Input: FC<InputProps> = ({
  size = 'body',
  placeholder,
  style,
  ...props
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={theme.placeholderColour}
      style={[{ color: theme.colours.dark }, theme.text[size], style]}
      {...props}
    />
  )
}

export default Input
