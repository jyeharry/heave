import MCIcon from '@expo/vector-icons/MaterialCommunityIcons'
import {
  ForwardRefExoticComponent,
  ForwardedRef,
  RefAttributes,
  forwardRef,
} from 'react'
import { View } from 'react-native'
import { Button, ButtonProps } from './Button'

interface IconButtonProps extends ButtonProps {
  name: keyof typeof MCIcon.glyphMap
}

export const IconButton: ForwardRefExoticComponent<
  IconButtonProps & RefAttributes<View>
> = forwardRef(
  (
    { name, colour = 'grey', size = 'small', bordered = false, ...props },
    ref: ForwardedRef<View>,
  ) => (
    <Button
      colour={colour}
      size={size}
      bordered={bordered}
      ref={ref}
      {...props}
    >
      {({ pressed }) => (
        <MCIcon
          color={colour}
          name={name}
          size={21}
          style={{ opacity: pressed ? 0.5 : 1 }}
        />
      )}
    </Button>
  ),
)
