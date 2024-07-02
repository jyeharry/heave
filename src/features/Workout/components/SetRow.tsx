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
  SetTypeAbbreviation,
  SetTypeName,
  WorkoutSchemaType,
  WorkoutSet,
  nonStandardSetTypes,
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
  } = useFormContext<WorkoutSchemaType>()
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
  const previous =
    defaultValues?.exercises?.[exerciseIndex]?.sets?.[setRowIndex]?.previous

  const setLabel =
    (setType?.abbreviation != null &&
      SetTypeAbbreviation[setType.abbreviation]) ||
    setRowIndex + 1 - numOfPreviousWarmups

  const row = [
    <MenuButton
      triggerButtonChildren={setLabel}
      triggerButtonProps={{
        size: 'small',
        colour: 'grey',
        bordered: false,
      }}
      menuProps={{
        onSelect: (value) => {
          const isAlreadySelected = setType?.name === value.name
          setValue(
            `${formSetName}.setType`,
            isAlreadySelected ? { name: SetTypeName.Standard } : value,
          )
        },
      }}
    >
      {nonStandardSetTypes.map((nonStandardSetType, i) => (
        <MenuOption
          key={i}
          value={nonStandardSetType}
          text={SetTypeName[nonStandardSetType.name]}
          active={setType?.name === nonStandardSetType.name}
        />
      ))}
    </MenuButton>,
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
      disabled={workoutMode !== 'perform'}
    />,
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
