import { FC } from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { theme } from '@/constants/theme'

interface TextProps extends RNTextProps {
  size?: keyof typeof theme.text
}

export const Text: FC<TextProps> = ({
  children,
  style,
  size = 'body',
  ...props
}) => {
  return (
    <RNText
      style={[{ color: theme.colours.dark }, theme.text[size], style]}
      {...props}
    >
      {children}
    </RNText>
  )
}
