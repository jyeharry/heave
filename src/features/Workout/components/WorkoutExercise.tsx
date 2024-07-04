import MCIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { FC } from 'react'
import { useFieldArray } from 'react-hook-form'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Row, Table } from 'react-native-reanimated-table'
import { SET_ROW_HEIGHT, SetRow } from './SetRow'
import { SetTypeName, WorkoutSchemaType } from '../types'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import { theme } from '@/constants/theme'

interface ExerciseProps {
  name: string
  exerciseIndex: number
}

export const WorkoutExercise: FC<ExerciseProps> = ({ name, exerciseIndex }) => {
  const {
    fields: setFields,
    append,
    remove,
  } = useFieldArray<WorkoutSchemaType>({
    name: `exercises.${exerciseIndex}.sets`,
  })

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
        <Text>{name}</Text>
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
              remove={remove}
            />
          ))}
        </Animated.View>
        <Button
          size="small"
          colour="grey"
          onPress={() =>
            append(
              {
                setType: { name: 'Standard' },
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
