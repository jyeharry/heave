import { Entypo } from '@expo/vector-icons'
import MCIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { router } from 'expo-router'
import { FC } from 'react'
import {
  UseFieldArrayRemove,
  useFieldArray,
  useFormContext,
} from 'react-hook-form'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Row, Table } from 'react-native-reanimated-table'
import { SET_ROW_HEIGHT, SetRow } from './SetRow'
import { WorkoutSchemaType } from '../types'
import { Button } from '@/components/Button'
import { MenuButton, MenuOption } from '@/components/Menu'
import { Text } from '@/components/Text'
import { theme } from '@/constants/theme'

interface ExerciseProps {
  name: string
  exerciseIndex: number
  remove: UseFieldArrayRemove
}

export const WorkoutExercise: FC<ExerciseProps> = ({
  name,
  exerciseIndex,
  remove,
}) => {
  const {
    fields: setFields,
    append,
    remove: removeSet,
  } = useFieldArray<WorkoutSchemaType>({
    name: `exercises.${exerciseIndex}.sets`,
  })

  const { getValues } = useFormContext()

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
  const rowGap = 16
  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(
      setFields.length * SET_ROW_HEIGHT + (setFields.length - 1) * rowGap,
      { duration: 100 },
    ),
  }))

  return (
    <View>
      <Table style={{ rowGap }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{name}</Text>
          <MenuButton
            triggerButtonChildren={
              <Entypo name="dots-three-horizontal" size={16} />
            }
            triggerButtonProps={{
              size: 'small',
              colour: 'grey',
              bordered: false,
            }}
          >
            <MenuOption
              text="Replace exercise"
              onSelect={() =>
                router.navigate({
                  pathname: './add-exercise',
                  params: { action: 'replace', exerciseIndex },
                })
              }
            />
            <MenuOption
              text="Remove exercise"
              onSelect={() => remove(exerciseIndex)}
            />
          </MenuButton>
        </View>
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
        <Animated.View style={[{ rowGap }, animatedStyle]}>
          {setFields.map((set, i) => (
            <SetRow
              key={set.id}
              exerciseIndex={exerciseIndex}
              setRowIndex={i}
              flexArr={flexArr}
              remove={removeSet}
            />
          ))}
        </Animated.View>
        <Button
          size="small"
          colour="grey"
          onPress={() =>
            append(
              {
                setType: 'Standard',
                reps: 0,
                weight: getValues(
                  `exercises.${exerciseIndex}.sets.${setFields.length - 1}.weight`,
                ),
                index: setFields.length,
              },
              { shouldFocus: false },
            )
          }
        >
          Add Set
        </Button>
      </Table>
    </View>
  )
}
