import { FC } from 'react'
import {
  TextInputProps as RNTextInputProps,
  StyleSheet,
  TextInput,
} from 'react-native'
import { BaseColourMap, theme } from '@/constants/theme'

type InputColourMap = Pick<BaseColourMap, 'grey'>

interface InputProps extends RNTextInputProps {
  size?: keyof typeof theme.text
  colour?: keyof InputColourMap
}

export const Input: FC<InputProps> = ({
  size = 'body',
  placeholder,
  style,
  colour,
  ...props
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={theme.placeholderColour}
      style={[
        { color: theme.colours.dark, borderRadius: 8 },
        theme.text[size],
        colour && styles[colour],
        style,
      ]}
      {...props}
    />
  )
}

const styles: InputColourMap = StyleSheet.create({
  grey: { backgroundColor: theme.colours.grey150 },
})
