import { FC } from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { theme } from '@/theme/theme'

interface TextProps extends RNTextProps {
  type?: keyof typeof theme.text
}

export const Text: FC<TextProps> = ({
  children,
  style,
  type = 'body',
  ...props
}) => {
  return (
    <RNText
      style={[{ color: theme.colours.dark }, theme.text[type], style]}
      {...props}
    >
      {children}
    </RNText>
  )
}
