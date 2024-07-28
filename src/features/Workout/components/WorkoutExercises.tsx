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
    workout_template_id,
    newExerciseID,
    newExerciseName,
    workoutExerciseCount,
  } = useLocalSearchParams<{
    workout_template_id?: string
    newExerciseName?: string
    newExerciseID?: string
    workoutExerciseCount?: string
  }>()

  const segments = useSegments()

  const { fields: exerciseFields, append } = useFieldArray<WorkoutSchemaType>({
    name: 'exercises',
  })

  if (
    Number(workoutExerciseCount) === exerciseFields.length &&
    newExerciseName &&
    newExerciseID
  ) {
    append({
      exercise: { name: newExerciseName, exercise_id: newExerciseID },
      sets: [{ setType: 'Standard', reps: 0, weight: 0 }],
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
        />
      ))}
      <Link
        href={{
          pathname: segments.join('/') + '/add-exercise',
          params: {
            workoutExerciseCount: exerciseFields.length,
            mode,
            workout_template_id,
          },
        }}
        asChild
      >
        <Button>Add Exercise</Button>
      </Link>
    </View>
  )
}
