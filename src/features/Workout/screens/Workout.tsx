import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
import {
  ExerciseSchemaType,
  WorkoutMode,
  WorkoutSchema,
  WorkoutSchemaType,
} from '../types'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { theme } from '@/constants/theme'
import { useProfile } from '@/hooks/useProfile'
import { supabase } from '@/supabase'

export interface WorkoutProps {
  mode: WorkoutMode
}

export const Workout: FC<WorkoutProps> = ({ mode }) => {
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

  const { profile_id } = useProfile()

  const { data } = useQuery({
    queryKey: ['profile', profile_id, 'workout', workout_template_id],
    queryFn: async () => {
      const res = await supabase
        .from('workout_template')
        .select(
          `
          workout_template_id,
          title,
          notes,
          exercises:workout_template_exercise (
            exercise (
              exercise_id,
              name
            ),
            index,
            sets:workout_template_exercise_set (
              setType:type,
              reps,
              weight,
              index
            )
          )
        `,
        )
        .eq('workout_template_id', workout_template_id!)
        .eq('profile_id', profile_id)
        .single()

      return res.data
    },
    enabled: mode === 'edit' || mode === 'perform',
    gcTime: 0,
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: WorkoutSchemaType) => {
      try {
        console.log(JSON.stringify(data, null, 2))
        const parsedData = WorkoutSchema.parse(data)

        const template = await supabase
          .from('workout_template')
          .upsert({
            workout_template_id: parsedData.workout_template_id,
            profile_id,
            author_profile_id: profile_id,
            title: parsedData.title,
            notes: parsedData.notes,
          })
          .select()
          .single()

        if (!template.data || template.error) {
          console.log(template.error)
          return
        }

        const templateExercises = await supabase
          .from('workout_template_exercise')
          .insert(
            parsedData.exercises.map((exercise, index) => ({
              workout_template_id: template.data.workout_template_id,
              exercise_id: exercise.exercise.exercise_id,
              index,
            })),
          )
          .select()

        if (!templateExercises.data || templateExercises.error) {
          console.log(template.error)
          return
        }

        const exerciseMap = parsedData.exercises.reduce<
          Record<string, ExerciseSchemaType>
        >(
          (exMap, ex) => ({
            ...exMap,
            [ex.exercise.exercise_id]: ex,
          }),
          {},
        )

        await supabase.from('workout_template_exercise_set').insert(
          templateExercises.data.flatMap((tempEx) =>
            exerciseMap[tempEx.exercise_id].sets.map((set, index) => ({
              workout_template_exercise_id: tempEx.workout_template_exercise_id,
              index,
              type: set.setType,
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile', profile_id, 'workouts'],
      })
    },
  })

  console.log('hella data', JSON.stringify({ data }, null, 2))
  console.log(
    'WorkoutSchema.safeParse(data)',
    WorkoutSchema.safeParse(data).success,
    WorkoutSchema.safeParse(data).error,
  )

  const methods = useForm<WorkoutSchemaType>({
    defaultValues: {
      title: '',
      exercises: [],
    },
    values: WorkoutSchema.safeParse(data).success
      ? WorkoutSchema.safeParse(data).data
      : {
          title: '',
          exercises: [],
        },
    resolver: zodResolver(WorkoutSchema),
  })

  const { fields: exerciseFields, append } = useFieldArray<WorkoutSchemaType>({
    control: methods.control,
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

  return (
    <WorkoutModeProvider value={mode}>
      <Stack.Screen
        options={{
          ...(mode === 'perform' && { title: data?.title }),
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
                name={methods.getValues(`exercises.${i}.exercise.name`)}
              />
            ))}
            <Link
              href={{
                pathname: '/(app)/(tabs)/workouts/add-exercise',
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
