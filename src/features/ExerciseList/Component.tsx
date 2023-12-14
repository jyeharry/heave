import MCIcon from '@expo/vector-icons/MaterialCommunityIcons'
import Octicon from '@expo/vector-icons/Octicons'
import { FC, useRef, useState } from 'react'
import { Modal, Pressable, TextInputProps, View } from 'react-native'
import { Row, Table } from 'react-native-reanimated-table'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { theme } from '@/constants/theme'

const CompleteSetButton = () => (
  <Button size="none" colour="grey" style={{ borderWidth: 0 }}>
    <MCIcon
      name="check"
      size={22}
      style={{
        textAlign: 'center',
      }}
    />
  </Button>
)

const TableInput: FC<TextInputProps> = ({ placeholder }) => (
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

const SetTypeModal = ({
  visible,
  setVisible,
  position,
}: {
  visible: boolean
  setVisible: (visible: boolean) => void
  position: { top: number; left: number }
}) => (
  <Modal visible={visible} animationType="fade" transparent>
    <Pressable
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => setVisible(false)}
    >
      <View
        style={{
          borderRadius: 16,
          backgroundColor: theme.colours.grey150,
          position: 'absolute',
          top: position.top,
          left: position.left,
        }}
      >
        <SetTypeModalButton top>Warmup</SetTypeModalButton>
        <SetTypeModalButton bottom>Dropset</SetTypeModalButton>
      </View>
    </Pressable>
  </Modal>
)

const SetTypeModalButton = ({
  children,
  top,
  bottom,
}: {
  children: React.ReactNode
  top?: boolean
  bottom?: boolean
}) => (
  <Button
    style={[
      { borderRadius: 0 },
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
  >
    {children}
  </Button>
)

const SetRow = ({
  numOfWarmups,
  index,
  flexArr,
  setLabel,
  previous,
  weight,
  reps,
}: {
  numOfWarmups: number
  index: number
  flexArr: number[]
  setLabel?: string
  previous?: string
  weight?: number
  reps?: number
}) => {
  const [visible, setVisible] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
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
        {setLabel ?? index + 1 - numOfWarmups}
      </Button>
    </View>,
    previous ?? (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Octicon name="dash" size={22} />
      </View>
    ),
    <TableInput placeholder={weight?.toString()} />,
    <TableInput placeholder={reps?.toString()} />,
    <CompleteSetButton />,
  ]

  return (
    <>
      <SetTypeModal
        visible={visible}
        setVisible={setVisible}
        position={modalPosition}
      />
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

export const ExerciseList = () => {
  const header = [
    'Set',
    'Previous',
    'kg',
    'Reps',
    <MCIcon
      name="check"
      size={22}
      style={{
        textAlign: 'center',
      }}
    />,
  ]

  const flexArr = [1, 4, 2, 2, 1]
  const rows = [
    { setLabel: 'W', previous: '40kg x 10', weight: 45, reps: 8 },
    { setLabel: '1', previous: '40kg x 9', weight: 45, reps: 6 },
    { setLabel: '2', previous: '40kg x 8', weight: 40, reps: 7 },
    {},
  ]
  const numOfWarmups = rows.filter((row) => row.setLabel === 'W').length

  return (
    <View style={{ marginTop: 16 }}>
      <Table style={{ rowGap: 16 }}>
        <Row
          data={header}
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
        {rows.map((row, i) => (
          <SetRow
            key={i}
            index={i}
            numOfWarmups={numOfWarmups}
            flexArr={flexArr}
            {...row}
          />
        ))}
        <Button size="small" colour="grey">
          Add Set
        </Button>
      </Table>
      <Button style={{ marginTop: 32 }}>Add Exercise</Button>
    </View>
  )
}
