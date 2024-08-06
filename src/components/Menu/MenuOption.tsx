import { FC } from 'react'
import { MenuOption as Option, MenuOptionProps } from 'react-native-popup-menu'
import { theme } from '@/constants/theme'

export const MenuOption: FC<MenuOptionProps & { active?: boolean }> = ({
  value,
  text,
  active,
  onSelect,
}) => (
  <Option
    value={value}
    text={text}
    onSelect={onSelect}
    customStyles={{
      optionWrapper: [
        {
          alignItems: 'center',
          marginHorizontal: 12,
          marginVertical: 8,
        },
      ],
      optionText: [theme.text.body],
      optionTouchable: {
        activeOpacity: 0.5,
        style: [
          active && {
            backgroundColor: theme.colours.grey200,
          },
        ],
      },
    }}
  />
)
