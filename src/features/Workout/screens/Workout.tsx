import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { FC } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { WorkoutExercises } from '../components/WorkoutExercises'
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
  const { workout_template_id } = useLocalSearchParams<{
    workout_template_id?: string
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
        const parsedData = WorkoutSchema.parse(data)

        const template = await supabase
          .from('workout_template')
          .upsert({
            workout_template_id: parsedData.workout_template_id,
            profile_id,
            author_profile_id: profile_id,
            title: parsedData.title,
            notes: parsedData.notes,
            ...(mode === 'perform' && {
              last_performed: new Date().toISOString(),
            }),
          })
          .select()
          .single()

        if (!template.data || template.error) {
          console.error('template.error', template.error)
          return
        }

        const templateExercises = await supabase
          .from('workout_template_exercise')
          .upsert(
            parsedData.exercises.map((exercise, index) => ({
              workout_template_id: template.data.workout_template_id,
              ...(exercise.workout_template_exercise_id && {
                workout_template_exercise_id:
                  exercise.workout_template_exercise_id,
              }),
              exercise_id: exercise.exercise.exercise_id,
              index,
            })),
          )
          .select()

        if (!templateExercises.data || templateExercises.error) {
          console.error('templateExercises.error', templateExercises.error)
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

        await supabase.from('workout_template_exercise_set').upsert(
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
        console.error('Workout schema parse error', e)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile', profile_id, 'workouts'],
      })
    },
  })

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

  return (
    <WorkoutModeProvider value={mode}>
      <Stack.Screen
        options={{
          ...(mode === 'perform' && { title: data?.title }),
          headerRight: () => (
            <Button
              onPress={methods.handleSubmit(
                async (data) => {
                  const hasIncompletedSets = data.exercises.some((ex) =>
                    ex.sets.some((set) => !set.completed),
                  )
                  let dataWithoutIncompleteSets: undefined | WorkoutSchemaType

                  if (hasIncompletedSets && mode === 'perform') {
                    const willSubmit = await alertWhetherToSubmit()

                    if (!willSubmit) {
                      return
                    }

                    dataWithoutIncompleteSets = {
                      ...data,
                      exercises: data.exercises.map((ex) => ({
                        ...ex,
                        sets: ex.sets.filter((set) => set.completed),
                      })),
                    }
                  }

                  mutation.mutate(dataWithoutIncompleteSets || data)
                },
                (data) => console.error('Error', JSON.stringify(data, null, 2)),
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
          <WorkoutExercises />
          <Button
            style={{ marginTop: 16 }}
            colour="danger"
            onPress={() => router.back()}
          >
            Cancel Workout
          </Button>
        </ScrollView>
      </FormProvider>
    </WorkoutModeProvider>
  )
}

const alertWhetherToSubmit = () =>
  new Promise<boolean>((res) =>
    Alert.alert(
      'Incomplete sets',
      'If you proceed, all incomplete sets will be disregarded.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => res(false),
        },
        {
          text: 'Submit anyway',
          style: 'destructive',
          onPress: () => res(true),
        },
      ],
      { cancelable: false },
    ),
  )

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
