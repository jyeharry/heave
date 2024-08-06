import {
  ForwardRefExoticComponent,
  ForwardedRef,
  RefAttributes,
  forwardRef,
} from 'react'
import { TextInputProps, StyleSheet, TextInput } from 'react-native'
import { theme } from '@/theme/theme'
import { BaseColourMap } from '@/theme/types'

type InputColourMap = Pick<BaseColourMap, 'grey'>

export interface InputProps extends TextInputProps {
  size?: keyof typeof theme.text
  colour?: keyof InputColourMap
}

export const Input: ForwardRefExoticComponent<
  InputProps & RefAttributes<TextInput>
> = forwardRef(
  (
    { size = 'body', placeholder, style, colour, ...props },
    ref: ForwardedRef<TextInput>,
  ) => (
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
      ref={ref}
    />
  ),
)

const styles: InputColourMap = StyleSheet.create({
  grey: { backgroundColor: theme.colours.grey150 },
})
