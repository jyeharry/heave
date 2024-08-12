import { Stack, router, useLocalSearchParams } from 'expo-router'
import { FC, useState } from 'react'
import { Pressable, SectionList, View } from 'react-native'
import { useExercisesQuery } from '../hooks/useExerciseQuery'
import { Text } from '@/components/Text'
import { theme } from '@/constants/theme'
import { WorkoutParams } from '@/features/Workout/types'

const filterAndCategoriseExercisesByLetterReducer =
  (filter: string) =>
    (
      sectionList: {
        title: string
        data: {
          name: string
          bodyPart: string
          exerciseID: string
        }[]
      }[],
      exercise: {
        name: string
        bodyPart: string
        exerciseID: string
      },
    ) => {
      if (
        !exercise.name ||
        !exercise.name.toLowerCase().includes(filter.toLowerCase())
      ) {
        return sectionList
      }
      const title = exercise.name[0].toUpperCase()
      const sectionIndex = sectionList.findIndex(
        (section) => section.title === title,
      )
      if (sectionIndex === -1) {
        return sectionList.concat({ title, data: [exercise] })
      }
      const section = sectionList[sectionIndex]
      return sectionList.toSpliced(sectionIndex, 1, {
        title,
        data: section.data.concat(exercise),
      })
    }

const ExerciseItem = ({
  name,
  body_part,
  exercise_id,
  workoutExerciseCount,
  mode,
  exerciseIndex,
}: {
  name: string
  body_part: string
  exercise_id: string
} & Pick<WorkoutParams, 'workoutExerciseCount' | 'mode' | 'exerciseIndex'>) => (
  <Pressable
    style={({ pressed }) => ({
      gap: 2,
      paddingHorizontal: 16,
      paddingVertical: 8,
      opacity: pressed ? 0.5 : 1,
    })}
    onPress={() => {
      router.navigate({
        pathname: '.',
        params: {
          newExerciseName: name,
          newExerciseID: exercise_id,
          workoutExerciseCount,
          mode,
          exerciseIndex,
        },
      })
    }}
  >
    <Text>{name}</Text>
    <Text type="notes" style={{ color: theme.colours.grey400 }}>
      {body_part}
    </Text>
  </Pressable>
)

export const Exercises: FC = () => {
  const { workoutExerciseCount, mode, exerciseIndex } =
    useLocalSearchParams<WorkoutParams>()
  const { data } = useExercisesQuery()
  const [filter, setFilter] = useState('')
  const sectionList =
    data?.reduce(filterAndCategoriseExercisesByLetterReducer(filter), []) || []

  return (
    <View>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            onChangeText: (e) => setFilter(e.nativeEvent.text),
            barTintColor: theme.colours.light,
          },
        }}
      />
      <SectionList
        contentInsetAdjustmentBehavior="automatic"
        sections={sectionList}
        keyExtractor={(item) => item.exerciseID}
        renderSectionHeader={({ section: { title } }) => (
          <View
            style={{
              justifyContent: 'flex-end',
              height: 48,
              borderBottomWidth: 1,
              borderColor: theme.colours.grey200,
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: theme.colours.grey100,
            }}
          >
            <Text type="notes" style={{ color: theme.colours.grey400 }}>
              {title}
            </Text>
          </View>
        )}
        renderItem={({ item: { name, bodyPart, exerciseID } }) => (
          <ExerciseItem
            name={name}
            body_part={bodyPart}
            exercise_id={exerciseID}
            workoutExerciseCount={workoutExerciseCount}
            mode={mode}
            exerciseIndex={exerciseIndex}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: theme.colours.grey200,
              marginHorizontal: 16,
            }}
          />
        )}
        renderSectionFooter={() => (
          <View
            style={{
              height: 1,
              backgroundColor: theme.colours.grey200,
            }}
          />
        )}
      />
    </View>
  )
}
