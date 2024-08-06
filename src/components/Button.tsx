import Color from 'color'
import React, {
  ForwardRefExoticComponent,
  ForwardedRef,
  RefAttributes,
  forwardRef,
} from 'react'
import { Pressable, PressableProps, StyleSheet, View } from 'react-native'
import { Text } from './Text'
import { theme } from '@/theme/theme'
import { BaseColourMap } from '@/theme/types'

type ButtonColourMap = Pick<BaseColourMap, 'primary' | 'danger' | 'grey'>

export interface ButtonProps extends PressableProps {
  colour?: keyof ButtonColourMap
  size?: keyof typeof buttonSizes
  bordered?: boolean
}

export const Button: ForwardRefExoticComponent<
  ButtonProps & RefAttributes<View>
> = forwardRef(
  (
    {
      bordered = true,
      children,
      colour = 'primary',
      onPress,
      style,
      size = 'regular',
      disabled,
      ...props
    },
    ref: ForwardedRef<View>,
  ) => (
    <Pressable
      style={({ pressed }) => [
        buttonStyles.button,
        {
          opacity: pressed || disabled ? 0.5 : 1,
          borderWidth: bordered ? 1 : 0,
        },
        buttonVariants[colour],
        buttonSizes[size],
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {(state) =>
        React.Children.only(
          typeof children === 'function' ? (
            children(state)
          ) : (
            <Text style={[buttonTextVariants[colour]]}>{children}</Text>
          ),
        )
      }
    </Pressable>
  ),
)

export const buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
})

export const buttonVariants: ButtonColourMap = StyleSheet.create({
  primary: {
    backgroundColor: theme.colours.primary100,
    borderColor: theme.colours.primary,
  },
  danger: {
    backgroundColor: Color(theme.colours.danger).lightness(95).toString(),
    borderColor: theme.colours.danger,
  },
  grey: {
    backgroundColor: theme.colours.grey150,
    borderColor: theme.colours.dark,
  },
})

export const buttonSizes = StyleSheet.create({
  none: {},
  small: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  regular: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  large: {
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
})

export const buttonTextVariants: ButtonColourMap = StyleSheet.create({
  primary: {
    color: theme.colours.primary,
  },
  danger: {
    color: theme.colours.danger,
  },
  grey: {
    color: theme.colours.dark,
  },
})
