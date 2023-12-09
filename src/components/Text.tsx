import { FC } from 'react'
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native'
import { theme } from '@/constants/theme'

interface TextProps extends RNTextProps {
  size?: keyof typeof styles
}

const Text: FC<TextProps> = ({ children, style, size = 'body' }) => {
  return (
    <RNText style={[{ color: theme.colours.dark }, style, styles[size]]}>
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})

export default Text
