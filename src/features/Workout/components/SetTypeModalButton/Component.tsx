import { FC } from 'react'
import { PressableProps } from 'react-native'
import { SetType, SetTypeName } from '../../types'
import { Button } from '@/components/Button'
import { theme } from '@/constants/theme'

export const SetTypeModalButton: FC<
  PressableProps & {
    setType: SetType
    selected?: boolean
    top?: boolean
    bottom?: boolean
  }
> = ({ setType, selected, top, bottom, onPress }) => (
  <Button
    style={[
      { borderRadius: 0 },
      selected && { backgroundColor: theme.colours.grey200 },
      top && {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 12,
      },
      bottom && {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        paddingBottom: 12,
      },
    ]}
    size="large"
    colour="grey"
    bordered={false}
    onPress={onPress}
  >
    {SetTypeName[setType.name]}
  </Button>
)
