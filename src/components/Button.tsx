import Color from 'color'
import { FC, ReactNode } from 'react'
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import Text from './Text'
import { theme, BaseColourMap } from '@/constants/theme'

type ButtonColourMap = Pick<BaseColourMap, 'primary' | 'danger'>

interface ButtonProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  colour?: keyof ButtonColourMap
}

export const Button: FC<ButtonProps> = ({
  children,
  colour = 'primary',
  style,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        buttonVariants[colour],
        {
          opacity: pressed ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text style={[buttonTextVariants[colour]]}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 3,
    borderWidth: 1,
  },
})

const buttonVariants: ButtonColourMap = StyleSheet.create({
  primary: {
    backgroundColor: theme.colours.primary100,
    borderColor: theme.colours.primary,
  },
  danger: {
    backgroundColor: Color(theme.colours.danger).lightness(95).toString(),
    borderColor: theme.colours.danger,
  },
})

const buttonTextVariants: ButtonColourMap = StyleSheet.create({
  primary: {
    color: theme.colours.primary,
  },
  danger: {
    color: theme.colours.danger,
  },
})
