import { Dispatch } from 'react'
import { SetType, SetTypeName } from '../../types'
import { Button } from '@/components/Button'
import { theme } from '@/constants/theme'

export const SetTypeModalButton = ({
  setType,
  selected,
  top,
  bottom,
  setSetType,
  setVisible,
  setNumOfWarmups,
}: {
  setType: SetType
  selected?: boolean
  top?: boolean
  bottom?: boolean
  setSetType: (type: SetType) => void
  setVisible: (visible: boolean) => void
  setNumOfWarmups: Dispatch<React.SetStateAction<number>>
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
      setSetType(selected ? { name: SetTypeName.Standard } : setType)
      setVisible(false)
      if (setType.name === SetTypeName.Warmup) {
        setNumOfWarmups((prevNum) => (selected ? prevNum - 1 : prevNum + 1))
      }
    }}
  >
    {SetTypeName[setType.name]}
  </Button>
)
