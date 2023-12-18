import { SetType, SetTypeName } from '../../types'
import { Button } from '@/components/Button'
import { theme } from '@/constants/theme'

export const SetTypeModalButton = ({
  setType,
  selected,
  top,
  bottom,
  setVisible,
}: {
  setType: SetType
  selected?: boolean
  top?: boolean
  bottom?: boolean
  setVisible: (visible: boolean) => void
}) => (
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
    onPress={() => {
      setVisible(false)
    }}
  >
    {SetTypeName[setType.name]}
  </Button>
)
