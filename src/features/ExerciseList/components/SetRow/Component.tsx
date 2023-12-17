import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Octicons from '@expo/vector-icons/Octicons'
import { Dispatch, FC, useRef, useState } from 'react'
import { TextInputProps, View } from 'react-native'
import { Row } from 'react-native-reanimated-table'
import { SetType, SetTypeAbbreviation, nonStandardSetTypes } from '../../types'
import { SetTypeModal } from '../SetTypeModal'
import { SetTypeModalButton } from '../SetTypeModalButton'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { theme } from '@/constants/theme'

const CompleteSetButton: FC<{
  completed: boolean
  setCompleted: Dispatch<React.SetStateAction<boolean>>
}> = ({ completed, setCompleted }) => (
  <Button
    size="none"
    colour={completed ? 'primary' : 'grey'}
    style={{ borderWidth: completed ? 1 : 0, padding: completed ? 0 : 1 }}
    onPress={() => setCompleted((prevCompleted) => !prevCompleted)}
  >
    <MaterialCommunityIcons
      name="check"
      size={22}
      style={{
        textAlign: 'center',
      }}
    />
  </Button>
)

const RowInput: FC<TextInputProps> = ({ placeholder }) => (
  <Input
    size="body"
    placeholder={placeholder}
    style={{
      height: '100%',
      textAlign: 'center',
    }}
    colour="grey"
  />
)

export const SetRow = ({
  numOfWarmups,
  position,
  flexArr,
  setType,
  previous,
  weight,
  reps,
  setNumOfWarmups,
}: {
  numOfWarmups: number
  position: number
  flexArr: number[]
  setType: SetType
  previous?: string
  weight?: number
  reps?: number
  setNumOfWarmups: Dispatch<React.SetStateAction<number>>
}) => {
  const [visible, setVisible] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const [completed, setCompleted] = useState(false)
  const [thisSetType, setThisSetType] = useState<SetType>(setType)
  const ref = useRef<View | null>(null)

  const handleOpenModal = () => {
    if (ref.current) {
      ref.current.measure((_x, _y, _width, _height, pageX, pageY) => {
        setModalPosition({ top: pageY, left: pageX })
      })
    }
    setVisible(true)
  }

  const row = [
    <View ref={ref}>
      <Button
        colour="grey"
        size="small"
        onPress={handleOpenModal}
        bordered={false}
      >
        {thisSetType?.abbreviation === undefined
          ? position - numOfWarmups
          : SetTypeAbbreviation[thisSetType.abbreviation]}
      </Button>
    </View>,
    previous ?? (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Octicons name="dash" size={22} />
      </View>
    ),
    <RowInput placeholder={weight?.toString()} />,
    <RowInput placeholder={reps?.toString()} />,
    <CompleteSetButton completed={completed} setCompleted={setCompleted} />,
  ]

  return (
    <>
      <SetTypeModal
        visible={visible}
        setVisible={setVisible}
        position={modalPosition}
      >
        {nonStandardSetTypes.map((nonStandardSetType, i, arr) => (
          <SetTypeModalButton
            key={i}
            setType={nonStandardSetType}
            setSetType={setThisSetType}
            setVisible={setVisible}
            setNumOfWarmups={setNumOfWarmups}
            selected={thisSetType.name === nonStandardSetType.name}
            top={i === 0}
            bottom={i === arr.length - 1}
          />
        ))}
      </SetTypeModal>
      <Row
        data={row}
        flexArr={flexArr}
        textStyle={{
          ...theme.text.body,
          textAlign: 'center',
        }}
        style={{
          height: 22,
          gap: 6,
        }}
      />
    </>
  )
}
