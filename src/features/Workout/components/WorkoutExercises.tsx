import { Link, router, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import {
  useFieldArray,
  useFormContext,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayUpdate,
} from 'react-hook-form'
import { View } from 'react-native'
import { WorkoutExercise } from './WorkoutExercise'
import { WorkoutParams, WorkoutFormSchemaType } from '../types'
import { Button } from '@/components/Button'

export const WorkoutExercises = () => {
  const { fields, remove, append, update } = useFieldArray<WorkoutFormSchemaType>({
    name: 'exercises',
  })

  useNewExerciseEffect(fields, append, update)

  const methods = useFormContext()

  return (
    <View style={{ gap: 32 }}>
      {fields.map((exercise, i) => (
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
            workoutExerciseCount: fields.length,
            action: 'add',
          },
        }}
        asChild
      >
        <Button>Add Exercise</Button>
      </Link>
    </View>
  )
}

const useNewExerciseEffect = (
  fields: FieldArrayWithId<
    WorkoutFormSchemaType,
    'exercises' | `exercises.${number}.sets`,
    'id'
  >[],
  append: UseFieldArrayAppend<
    WorkoutFormSchemaType,
    'exercises' | `exercises.${number}.sets`
  >,
  update: UseFieldArrayUpdate<
    WorkoutFormSchemaType,
    'exercises' | `exercises.${number}.sets`
  >,
) => {
  const {
    action,
    workoutExerciseCount,
    newExerciseName,
    newExerciseID,
    exerciseIndex,
  } = useLocalSearchParams<WorkoutParams>()

  useEffect(() => {
    if (
      action === 'add' &&
      Number(workoutExerciseCount) === fields.length &&
      newExerciseName &&
      newExerciseID
    ) {
      router.setParams({
        newExerciseName: '',
        newExerciseID: '',
        workoutExerciseCount: '',
        action: '',
        exerciseIndex: '',
      })
      append({
        exercise: {
          name: newExerciseName,
          exerciseID: newExerciseID,
        },
        index: fields.length,
        sets: [{ setType: 'Standard', index: 0 }],
      })
    }

    if (
      action === 'replace' &&
      exerciseIndex &&
      typeof Number(exerciseIndex) === 'number' &&
      newExerciseName &&
      newExerciseID
    ) {
      router.setParams({
        newExerciseName: '',
        newExerciseID: '',
        workoutExerciseCount: '',
        action: '',
        exerciseIndex: '',
      })
      update(Number(exerciseIndex), {
        exercise: {
          name: newExerciseName,
          exerciseID: newExerciseID,
        },
        index: Number(exerciseIndex),
        sets: [{ setType: 'Standard', reps: 0, weight: 0, index: 0 }],
      })
    }
  }, [
    action,
    workoutExerciseCount,
    newExerciseName,
    newExerciseID,
    exerciseIndex,
  ])
}
