import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { FC } from 'react'
import {
  useForm,
  FormProvider,
  useFieldArray,
  Controller,
} from 'react-hook-form'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Exercise } from './components/Exercise'
import { mockWorkoutData } from './mock'
import { SetTypeName, WorkoutSchema, WorkoutSchemaType } from './types'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { theme } from '@/constants/theme'

export interface WorkoutProps {
  mode: 'create' | 'edit' | 'perform'
}

export const Workout: FC<WorkoutProps> = ({ mode }) => {
  const { data } = useQuery<WorkoutSchemaType>({
    queryKey: ['workouts'],
    queryFn: () =>
      new Promise((res) => setTimeout(() => res(mockWorkoutData), 500)),
    enabled: mode === 'edit',
    gcTime: 0,
  })

  const methods = useForm<WorkoutSchemaType>({
    defaultValues: {
      title: '',
      exercises: [],
    },
    values: data,
    resolver: zodResolver(WorkoutSchema),
  })

  const { fields: exerciseFields, append } = useFieldArray<WorkoutSchemaType>({
    control: methods.control,
    name: 'exercises',
  })

  const { newExerciseName, exerciseCount } = useLocalSearchParams<{
    newExerciseName?: string
    newExerciseID?: string
    exerciseCount?: string
  }>()

  if (Number(exerciseCount) === exerciseFields.length && newExerciseName) {
    append({
      name: newExerciseName,
      sets: [{ setType: { name: SetTypeName.Standard } }],
    })
  }

  return (
    <FormProvider {...methods}>
      <ScrollView
        contentInset={{ bottom: 48 }}
        style={styles.container}
        contentContainerStyle={contentStyles.container}
      >
        <View>
          <Controller
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Workout Title"
                onBlur={onBlur}
                onChangeText={onChange}
                size="title"
                value={value}
              />
            )}
          />
          <Controller
            name="notes"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Notes"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={[theme.text.notes, styles.notes]}
                multiline
              />
            )}
          />
        </View>
        <View style={{ gap: 32 }}>
          {exerciseFields.map((exercise, i) => (
            <Exercise
              key={exercise.id}
              exerciseIndex={i}
              name={methods.getValues(`exercises.${i}.name`)}
            />
          ))}
          <Button
            onPress={() =>
              router.navigate({
                pathname: '/(app)/(tabs)/workouts/add-exercise',
                params: { exerciseCount: exerciseFields.length },
              })
            }
          >
            Add Exercise
          </Button>
        </View>
        <Button colour="danger">Cancel Workout</Button>
      </ScrollView>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  notes: {
    marginTop: 8,
  },
})

const contentStyles = StyleSheet.create({
  container: {
    gap: 16,
  },
})
