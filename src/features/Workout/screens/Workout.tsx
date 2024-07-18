import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, Stack, router, useLocalSearchParams } from 'expo-router'
import { FC } from 'react'
import {
  useForm,
  FormProvider,
  useFieldArray,
  Controller,
} from 'react-hook-form'
import { ScrollView, StyleSheet, View } from 'react-native'
import { WorkoutExercise } from '../components/WorkoutExercise'
import { WorkoutModeProvider } from '../components/WorkoutModeContext'
import { mockWorkoutData } from '../mock'
import { ExerciseSchemaType, WorkoutSchema, WorkoutSchemaType } from '../types'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { theme } from '@/constants/theme'
import { useProfile } from '@/hooks/useProfile'
import { supabase } from '@/supabase'

type WorkoutMode = 'create' | 'edit' | 'perform'

export interface WorkoutProps {
  mode: WorkoutMode
}

export const Workout: FC<WorkoutProps> = ({ mode }) => {
  const { data } = useQuery<WorkoutSchemaType>({
    queryKey: ['workouts'],
    queryFn: () => mockWorkoutData,
    enabled: mode === 'edit' || mode === 'perform',
    gcTime: 0,
  })

  const profile = useProfile()

  const mutation = useMutation({
    mutationFn: async (data: WorkoutSchemaType) => {
      try {
        console.log(JSON.stringify(data, null, 2))
        const parsedData = WorkoutSchema.parse(data)

        const template = await supabase
          .from('workout_template')
          .upsert({
            workout_template_id: parsedData.id,
            profile_id: profile.profile_id,
            author_profile_id: profile.profile_id,
            title: parsedData.title,
            notes: parsedData.notes,
          })
          .select()
          .single()

        const templateExercises = await supabase
          .from('workout_template_exercise')
          .insert(
            parsedData.exercises.map((exercise, index) => ({
              workout_template_id: template.data?.workout_template_id,
              exercise_id: exercise.id,
              index,
            })),
          )
          .select()

        if (!templateExercises.data || templateExercises.error) return

        const exerciseMap = parsedData.exercises.reduce<
          Record<string, ExerciseSchemaType>
        >(
          (exMap, ex) => ({
            ...exMap,
            [ex.id]: ex,
          }),
          {},
        )

        await supabase.from('workout_template_exercise_set').insert(
          templateExercises.data.flatMap((tempEx) =>
            exerciseMap[tempEx.exercise_id].sets.map((set, index) => ({
              workout_template_exercise_id: tempEx.workout_template_exercise_id,
              index,
              type: set.setType.name,
              weight: set.weight,
              reps: set.reps,
            })),
          ),
        )

        router.back()
      } catch (e) {
        console.log('Workout schema parse error', e)
      }
    },
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

  const { newExerciseID, newExerciseName, workoutExerciseCount } =
    useLocalSearchParams<{
      newExerciseName?: string
      newExerciseID?: string
      workoutExerciseCount?: string
    }>()

  if (
    Number(workoutExerciseCount) === exerciseFields.length &&
    newExerciseName &&
    newExerciseID
  ) {
    append({
      id: newExerciseID,
      name: newExerciseName,
      sets: [{ setType: { name: 'Standard' } }],
    })
  }

  return (
    <WorkoutModeProvider value={mode}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              onPress={methods.handleSubmit(
                (data) => mutation.mutate(data),
                (data) => console.log('Error', JSON.stringify(data, null, 2)),
              )}
              style={{ backgroundColor: 'transparent' }}
            >
              {mode === 'perform' ? 'Complete' : 'Save'}
            </Button>
          ),
        }}
      />
      <FormProvider {...methods}>
        <ScrollView
          contentInset={{ bottom: 48 }}
          style={styles.container}
          contentContainerStyle={contentStyles.container}
        >
          <View>
            <Controller
              name="title"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <Input
                  placeholder="Workout Title"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  size="title"
                  value={value}
                  style={{
                    borderColor: error ? theme.colours.danger : 'transparent',
                    borderBottomWidth: 1,
                    borderRadius: 0,
                  }}
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
              <WorkoutExercise
                key={exercise.id}
                exerciseIndex={i}
                name={methods.getValues(`exercises.${i}.name`)}
              />
            ))}
            <Link
              href={{
                pathname: '/(app)/(tabs)/workouts/add-exercise',
                params: { workoutExerciseCount: exerciseFields.length },
              }}
              asChild
            >
              <Button>Add Exercise</Button>
            </Link>
            <Button colour="danger">Cancel Workout</Button>
          </View>
        </ScrollView>
      </FormProvider>
    </WorkoutModeProvider>
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
