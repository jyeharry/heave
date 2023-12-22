import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Octicons from '@expo/vector-icons/Octicons'
import { FC, useRef, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { PressableProps, View } from 'react-native'
import { Row } from 'react-native-reanimated-table'
import {
  SetType,
  SetTypeAbbreviation,
  SetTypeName,
  WorkoutSchemaType,
  nonStandardSetTypes,
} from '../../types'
import { SetTypeModal } from '../SetTypeModal'
import { SetTypeModalButton } from '../SetTypeModalButton'
import { Button } from '@/components/Button'
import { ControlledInput } from '@/components/ControlledInput'
import { theme } from '@/constants/theme'

const CompleteSetButton: FC<
  PressableProps & {
    completed: boolean
  }
> = ({ completed, onPress }) => (
  <Button
    size="none"
    colour={completed ? 'primary' : 'grey'}
    style={{ borderWidth: completed ? 1 : 0, padding: completed ? 0 : 1 }}
    onPress={onPress}
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

export const SetRow = ({
  setRowIndex,
  exerciseIndex,
  flexArr,
}: {
  setRowIndex: number
  exerciseIndex: number
  flexArr: number[]
}) => {
  const [visible, setVisible] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const setTypeButtonRef = useRef<View | null>(null)
  const { setValue, getValues } = useFormContext<WorkoutSchemaType>()
  const setFormName = `exercises.${exerciseIndex}.sets.${setRowIndex}` as const
  const completed = useWatch<WorkoutSchemaType>({
    name: `${setFormName}.completed`,
    defaultValue: getValues(`${setFormName}.completed`),
  })
  const setType = useWatch<WorkoutSchemaType>({
    name: `${setFormName}.setType`,
    defaultValue: getValues(`${setFormName}.setType`),
  }) as SetType | undefined
  const previous = getValues(`${setFormName}.previous`)

  const handleOpenModal = () => {
    if (setTypeButtonRef.current) {
      setTypeButtonRef.current.measure(
        (_x, _y, _width, _height, pageX, pageY) => {
          setModalPosition({ top: pageY, left: pageX })
        },
      )
    }
    setVisible(true)
  }

  const row = [
    <View ref={setTypeButtonRef}>
      <Button
        colour="grey"
        size="small"
        onPress={handleOpenModal}
        bordered={false}
      >
        {(setType?.abbreviation != null &&
          SetTypeAbbreviation[setType.abbreviation]) ||
          setRowIndex + 1}
      </Button>
    </View>,
    previous ?? (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Octicons name="dash" size={22} />
      </View>
    ),
    <ControlledInput
      name={`${setFormName}.weight`}
      inputMode="decimal"
      style={{
        height: '100%',
        textAlign: 'center',
      }}
      colour="grey"
    />,
    <ControlledInput
      name={`${setFormName}.reps`}
      inputMode="numeric"
      style={{
        height: '100%',
        textAlign: 'center',
      }}
      colour="grey"
    />,
    <CompleteSetButton
      completed={!!completed}
      onPress={() => setValue(`${setFormName}.completed`, !completed)}
    />,
  ]

  return (
    <>
      <SetTypeModal
        visible={visible}
        setVisible={setVisible}
        position={modalPosition}
      >
        {nonStandardSetTypes.map((nonStandardSetType, i, arr) => {
          const selected = setType?.name === nonStandardSetType.name
          return (
            <SetTypeModalButton
              key={i}
              setType={nonStandardSetType}
              selected={selected}
              onPress={() => {
                setValue(
                  `${setFormName}.setType`,
                  selected
                    ? { name: SetTypeName.Standard }
                    : nonStandardSetType,
                )
                setVisible(false)
              }}
              top={i === 0}
              bottom={i === arr.length - 1}
            />
          )
        })}
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
