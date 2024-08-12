import { Link, router, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { WorkoutExercise } from './WorkoutExercise'
import { WorkoutParams, WorkoutSchemaType } from '../types'
import { Button } from '@/components/Button'

export const WorkoutExercises = () => {
  const params = useLocalSearchParams<WorkoutParams>()

  const {
    fields: exerciseFields,
    append,
    remove,
    update,
  } = useFieldArray<WorkoutSchemaType>({
    name: 'exercises',
  })

  useEffect(() => {
    if (
      params.mode === 'add' &&
      Number(params.workoutExerciseCount) === exerciseFields.length &&
      params.newExerciseName &&
      params.newExerciseID
    ) {
      router.setParams({
        newExerciseName: '',
        newExerciseID: '',
        workoutExerciseCount: '',
        mode: '',
        exerciseIndex: '',
      })
      append({
        exercise: {
          name: params.newExerciseName,
          exerciseID: params.newExerciseID,
        },
        index: exerciseFields.length,
        sets: [{ setType: 'Standard', reps: 0, weight: 0, index: 0 }],
      })
    }

    if (
      params.mode === 'replace' &&
      params.exerciseIndex &&
      typeof Number(params.exerciseIndex) === 'number' &&
      params.newExerciseName &&
      params.newExerciseID
    ) {
      router.setParams({
        newExerciseName: '',
        newExerciseID: '',
        workoutExerciseCount: '',
        mode: '',
        exerciseIndex: '',
      })
      update(Number(params.exerciseIndex), {
        exercise: {
          name: params.newExerciseName,
          exerciseID: params.newExerciseID,
        },
        index: Number(params.exerciseIndex),
        sets: [{ setType: 'Standard', reps: 0, weight: 0, index: 0 }],
      })
    }
  }, [params])

  const methods = useFormContext()

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
          pathname: './add-exercise',
          params: {
            workoutExerciseCount: exerciseFields.length,
            workoutTemplateID: params.workoutTemplateID,
            mode: 'add',
          },
        }}
        asChild
      >
        <Button>Add Exercise</Button>
      </Link>
    </View>
  )
}
