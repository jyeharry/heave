import { Stack, router, useLocalSearchParams } from 'expo-router'
import { FC, useState } from 'react'
import { Pressable, SectionList, View } from 'react-native'
import { useExercisesQuery } from './hooks/useExerciseQuery'
import { Text } from '@/components/Text'
import { theme } from '@/constants/theme'
import { Tables } from '@/supabase'

const filterAndCategoriseExercisesByLetterReducer =
  (filter: string) =>
  (
    sectionList: { title: string; data: Tables<'exercise'>[] }[],
    exercise: Tables<'exercise'>,
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
}: {
  name: string
  body_part: string
  exercise_id: string
  workoutExerciseCount: string
}) => (
  <Pressable
    style={({ pressed }) => ({
      gap: 2,
      paddingHorizontal: 16,
      paddingVertical: 8,
      opacity: pressed ? 0.5 : 1,
    })}
    onPress={() =>
      router.navigate({
        pathname: '/(app)/(tabs)/workouts/add',
        params: {
          newExerciseName: name,
          newExerciseID: exercise_id,
          workoutExerciseCount,
        },
      })
    }
  >
    <Text>{name}</Text>
    <Text size="notes" style={{ color: theme.colours.grey400 }}>
      {body_part}
    </Text>
  </Pressable>
)

export const Exercise: FC = () => {
  const { workoutExerciseCount } = useLocalSearchParams<{
    newExerciseName?: string
    newExerciseID?: string
    workoutExerciseCount?: string
  }>()
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
          },
        }}
      />
      <SectionList
        contentInsetAdjustmentBehavior="automatic"
        sections={sectionList}
        keyExtractor={(item) => item.exercise_id}
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
            <Text size="notes" style={{ color: theme.colours.grey400 }}>
              {title}
            </Text>
          </View>
        )}
        renderItem={({ item: { name, body_part, exercise_id } }) => (
          <ExerciseItem
            name={name!}
            body_part={body_part!}
            exercise_id={exercise_id}
            workoutExerciseCount={workoutExerciseCount!}
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
