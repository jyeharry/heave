import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Octicons from '@expo/vector-icons/Octicons'
import { FC, useRef, useState } from 'react'
import {
  Controller,
  UseFieldArrayRemove,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { PressableProps, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Row } from 'react-native-reanimated-table'
import {
  SetType,
  SetTypeAbbreviation,
  SetTypeName,
  WorkoutSchemaType,
  WorkoutSet,
} from '../../types'
import { SetTypeModal } from '../SetTypeModal'
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
  remove,
}: {
  setRowIndex: number
  exerciseIndex: number
  flexArr: number[]
  remove: UseFieldArrayRemove
}) => {
  const [visible, setVisible] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const setTypeButtonRef = useRef<View | null>(null)
  const { setValue, getValues, control } = useFormContext<WorkoutSchemaType>()
  const formSetName = `exercises.${exerciseIndex}.sets.${setRowIndex}` as const

  const completed = useWatch<WorkoutSchemaType>({
    name: `${formSetName}.completed`,
    defaultValue: false,
  })

  const setType = useWatch<WorkoutSchemaType>({
    name: `${formSetName}.setType`,
    defaultValue: { name: SetTypeName.Standard },
  }) as SetType

  const sets = useWatch<WorkoutSchemaType>({
    name: `exercises.${exerciseIndex}.sets`,
    defaultValue: [],
  }) as WorkoutSet[]

  const numOfPreviousWarmups = sets
    .slice(0, setRowIndex)
    .reduce(
      (numOfWarmups, set) =>
        set.setType.name === SetTypeName.Warmup
          ? numOfWarmups + 1
          : numOfWarmups,
      0,
    )
  const previous = getValues(`${formSetName}.previous`)

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

  const setLabel =
    (setType?.abbreviation != null &&
      SetTypeAbbreviation[setType.abbreviation]) ||
    setRowIndex + 1 - numOfPreviousWarmups

  const row = [
    <View ref={setTypeButtonRef}>
      <Button
        colour="grey"
        size="small"
        onPress={handleOpenModal}
        bordered={false}
      >
        {setLabel}
      </Button>
    </View>,
    previous ?? (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Octicons name="dash" size={22} />
      </View>
    ),
    <Controller
      control={control}
      name={`${formSetName}.weight`}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value?.toString()}
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
      control={control}
      name={`${formSetName}.reps`}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value?.toString()}
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
      onPress={() => setValue(`${formSetName}.completed`, !completed)}
    />,
  ]

  return (
    <Swipeable
      containerStyle={{ overflow: 'visible' }}
      renderRightActions={() => (
        <Button
          size="none"
          colour="danger"
          style={{ width: 33, marginLeft: 6 }}
          onPress={() => remove(setRowIndex)}
        >
          <MaterialCommunityIcons
            name="close"
            size={22}
            style={{
              textAlign: 'center',
            }}
          />
        </Button>
      )}
    >
      <SetTypeModal
        visible={visible}
        setVisible={setVisible}
        position={modalPosition}
        formSetName={formSetName}
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
    </Swipeable>
  )
}
