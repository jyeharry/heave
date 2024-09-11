import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Octicons from '@expo/vector-icons/Octicons'
import { FC, useContext } from 'react'
import {
  Controller,
  UseFieldArrayRemove,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { PressableProps, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Row } from 'react-native-reanimated-table'
import { WorkoutModeContext } from './WorkoutModeContext'
import {
  SetType,
  WorkoutFormSchemaType,
  WorkoutSetFormType,
  setTypeAbbreviationMap,
  nonStandardSetTypes,
  NonStandardSetType,
} from '../types'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { MenuButton, MenuOption } from '@/components/Menu'
import { theme } from '@/constants/theme'

const CompleteSetButton: FC<
  PressableProps & {
    completed: boolean
  }
> = ({ completed, onPress, disabled, ...props }) => (
  <Button
    size="none"
    colour={completed ? 'primary' : 'grey'}
    style={{ borderWidth: completed ? 1 : 0, padding: completed ? 0 : 1 }}
    onPress={onPress}
    disabled={disabled}
    {...props}
  >
    {disabled ? (
      <Octicons name="dash" size={22} />
    ) : (
      <MaterialCommunityIcons
        name="check"
        size={22}
        style={{
          textAlign: 'center',
        }}
      />
    )}
  </Button>
)

export const SET_ROW_HEIGHT = 22

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
  const workoutMode = useContext(WorkoutModeContext)
  const {
    setValue,
    control,
    formState: { defaultValues },
    getValues,
  } = useFormContext<WorkoutFormSchemaType>()
  const formSetName = `exercises.${exerciseIndex}.sets.${setRowIndex}` as const

  const completed = useWatch<WorkoutFormSchemaType>({
    name: `${formSetName}.completed`,
    defaultValue: false,
  })

  const setType = useWatch<WorkoutFormSchemaType>({
    name: `${formSetName}.setType`,
    defaultValue: 'Standard',
  }) as SetType

  const sets = useWatch<WorkoutFormSchemaType>({
    name: `exercises.${exerciseIndex}.sets`,
    defaultValue: [],
  }) as WorkoutSetFormType[]

  const numOfPreviousWarmups = sets
    .slice(0, setRowIndex)
    .reduce(
      (numOfWarmups, set) =>
        set.setType === 'Warmup' ? numOfWarmups + 1 : numOfWarmups,
      0,
    )

  const hasReplacedExercise =
    defaultValues?.exercises?.[exerciseIndex]?.exercise?.exerciseID !==
    getValues(`exercises.${exerciseIndex}`).exercise.exerciseID

  const previousWeight =
    defaultValues?.exercises?.[exerciseIndex]?.sets?.[setRowIndex]?.weight
  const previousReps =
    defaultValues?.exercises?.[exerciseIndex]?.sets?.[setRowIndex]?.reps

  const previousWeightAndRepsText = previousReps
    ? previousWeight
      ? `${previousWeight}kg x ${previousReps}`
      : `${previousReps} reps`
    : null

  const setLabel =
    setTypeAbbreviationMap[setType] || setRowIndex + 1 - numOfPreviousWarmups

  const row = [
    <MenuButton
      triggerButtonChildren={setLabel}
      triggerButtonProps={{
        size: 'small',
        colour: 'grey',
        bordered: false,
      }}
      menuProps={{
        onSelect: (value: NonStandardSetType) => {
          const isAlreadySelected = setType === value
          setValue(
            `${formSetName}.setType`,
            isAlreadySelected ? 'Standard' : value,
          )
        },
      }}
    >
      {nonStandardSetTypes.map((nonStandardSetType, i) => (
        <MenuOption
          key={i}
          value={nonStandardSetType}
          text={nonStandardSetType}
          active={setType === nonStandardSetType}
        />
      ))}
    </MenuButton>,
    (!hasReplacedExercise && previousWeightAndRepsText) || (
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
      render={({
        field: { onChange, onBlur, value },
      }) => (
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
    <View style={{ backgroundColor: theme.backgroundColour, borderRadius: 8 }}>
      <CompleteSetButton
        completed={!!completed}
        onPress={() => setValue(`${formSetName}.completed`, !completed)}
        disabled={workoutMode !== 'perform'}
      />
    </View>,
  ]

  return (
    <Swipeable
      containerStyle={{ overflow: 'visible' }}
      overshootFriction={2}
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
      <Row
        data={row}
        flexArr={flexArr}
        textStyle={{
          ...theme.text.body,
          textAlign: 'center',
        }}
        style={{
          height: SET_ROW_HEIGHT,
          gap: 6,
        }}
      />
    </Swipeable>
  )
}
