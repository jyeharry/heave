import { Link, useLocalSearchParams, useSegments } from 'expo-router'
import { useContext } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { WorkoutExercise } from './WorkoutExercise'
import { WorkoutModeContext } from './WorkoutModeContext'
import { WorkoutSchemaType } from '../types'
import { Button } from '@/components/Button'

export const WorkoutExercises = () => {
  const {
    workoutTemplateID,
    newExerciseID,
    newExerciseName,
    workoutExerciseCount,
  } = useLocalSearchParams<{
    workoutTemplateID: string
    newExerciseName?: string
    newExerciseID?: string
    workoutExerciseCount?: string
  }>()

  const segments = useSegments()

  const {
    fields: exerciseFields,
    append,
    remove,
  } = useFieldArray<WorkoutSchemaType>({
    name: 'exercises',
  })

  if (
    Number(workoutExerciseCount) === exerciseFields.length &&
    newExerciseName &&
    newExerciseID
  ) {
    append({
      exercise: { name: newExerciseName, exerciseID: newExerciseID },
      index: exerciseFields.length,
      sets: [{ setType: 'Standard', reps: 0, weight: 0, index: 0 }],
    })
  }

  const methods = useFormContext()
  const mode = useContext(WorkoutModeContext)

  return (
    <View style={{ gap: 32 }}>
      {exerciseFields.map((exercise, i) => (
        <WorkoutExercise
          key={exercise.id}
          exerciseIndex={i}
          name={methods.getValues(`exercises.${i}.exercise.name`)}
          remove={remove}
        />
      ))}
      <Link
        href={{
          pathname: segments.join('/') + '/add-exercise',
          params: {
            workoutExerciseCount: exerciseFields.length,
            mode,
            workoutTemplateID,
          },
        }}
        asChild
      >
        <Button>Add Exercise</Button>
      </Link>
    </View>
  )
}
