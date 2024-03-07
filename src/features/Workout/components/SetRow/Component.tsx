import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Octicons from '@expo/vector-icons/Octicons'
import { FC, useRef, useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { PressableProps, View } from 'react-native'
import { Row } from 'react-native-reanimated-table'
import {
  SetType,
  SetTypeAbbreviation,
  SetTypeName,
  WorkoutSchemaType,
  WorkoutSet,
  nonStandardSetTypes,
} from '../../types'
import { SetTypeModal } from '../SetTypeModal'
import { SetTypeModalButton } from '../SetTypeModalButton'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
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
    defaultValue: false,
  })

  const setType = useWatch<WorkoutSchemaType>({
    name: `${setFormName}.setType`,
    defaultValue: { name: SetTypeName.Standard },
  }) as SetType | undefined

  const sets = useWatch<WorkoutSchemaType>({
    name: `exercises.${exerciseIndex}.sets`,
    defaultValue: [],
  }) as WorkoutSet[]

  const previousWarmups = sets
    .slice(0, setRowIndex)
    .reduce(
      (numOfWarmups, set) =>
        set.setType.name === SetTypeName.Warmup
          ? numOfWarmups + 1
          : numOfWarmups,
      0,
    )
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
          setRowIndex + 1 - previousWarmups}
      </Button>
    </View>,
    previous ?? (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Octicons name="dash" size={22} />
      </View>
    ),
    <Controller
      name={`${setFormName}.weight`}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          inputMode="decimal"
          style={{
            height: '100%',
            textAlign: 'center',
          }}
          colour="grey"
        />
      )}
    />,
    <Controller
      name={`${setFormName}.reps`}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          inputMode="numeric"
          style={{
            height: '100%',
            textAlign: 'center',
          }}
          colour="grey"
        />
      )}
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
