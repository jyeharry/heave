import { FC, ReactNode } from 'react'
import {
  MenuOptions,
  MenuTrigger,
  Menu,
  MenuTriggerProps,
  MenuOptionsProps,
  MenuOptionsCustomStyle,
  MenuProps,
} from 'react-native-popup-menu'
import {
  Button,
  ButtonProps,
  buttonSizes,
  buttonTextVariants,
} from '@/components/Button'
import { Text } from '@/components/Text'
import { theme } from '@/theme/theme'

type MenuTriggerButtonProps = MenuTriggerProps & {
  customStyles?: MenuTriggerProps['customStyles'] & {
    triggerTouchable?: ButtonProps
  }
}

type MenuOptionsButtonProps = MenuOptionsProps & {
  customStyles?: MenuOptionsCustomStyle & { optionTouchable?: ButtonProps }
}

export const MenuButton: FC<{
  menuProps?: MenuProps
  optionsButtonsProps?: ButtonProps
  triggerButtonProps?: ButtonProps
  triggerProps?: MenuTriggerButtonProps
  triggerButtonChildren: ReactNode
  optionsProps?: MenuOptionsButtonProps
  children: ReactNode
}> = ({
  children,
  triggerButtonProps = {},
  triggerProps = {},
  triggerButtonChildren,
  optionsProps = {},
  menuProps,
}) => {
  const {
    bordered = true,
    colour = 'primary',
    size = 'regular',
    ...restButtonProps
  } = triggerButtonProps

  return (
    <Menu {...menuProps}>
      <MenuTrigger
        onPress={triggerProps.onPress}
        customStyles={{
          triggerOuterWrapper: triggerProps.customStyles?.triggerOuterWrapper,
          triggerWrapper: [
            {
              justifyContent: 'center',
              alignItems: 'center',
              ...buttonSizes[size],
              ...(size === 'small' && { paddingBottom: 0 }),
            },
            triggerProps?.customStyles?.triggerWrapper,
          ],
          triggerTouchable: {
            colour,
            size,
            bordered,
            ...restButtonProps,
          },
          TriggerTouchableComponent: Button,
        }}
      >
        {typeof children === 'function' ? (
          children
        ) : (
          <Text style={[buttonTextVariants[colour]]}>
            {triggerButtonChildren}
          </Text>
        )}
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: [
            {
              borderRadius: 16,
            },
            optionsProps.customStyles?.optionsContainer,
          ],
          optionsWrapper: [
            {
              backgroundColor: theme.colours.grey150,
              borderRadius: 16,
              overflow: 'hidden',
            },
            optionsProps.customStyles?.optionsWrapper,
          ],
        }}
      >
        {children}
      </MenuOptions>
    </Menu>
  )
}
