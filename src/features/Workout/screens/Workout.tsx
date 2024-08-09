import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { FC, useState } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { WorkoutExercises } from '../components/WorkoutExercises'
import { WorkoutModeProvider } from '../components/WorkoutModeContext'
import { workoutTemplateQueries } from '../queries'
import { WorkoutMode, WorkoutSchema, WorkoutSchemaType } from '../types'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { theme } from '@/constants/theme'
import { useProfile } from '@/hooks/useProfile'
import { supabase } from '@/supabase'

interface WorkoutProps {
  mode: WorkoutMode
}

// TODO: remove non null assertions
export const Workout: FC<WorkoutProps> = ({ mode }) => {
  const { workoutTemplateID } = useLocalSearchParams<{
    workoutTemplateID: string
  }>()
  const [lastPerformed] = useState(new Date().toISOString())

  const profile = useProfile()

  const { data } = useQuery({
    ...workoutTemplateQueries.detail(workoutTemplateID!),
    enabled: mode === 'edit' || mode === 'perform',
    gcTime: 0,
    select: (data) => ({
      ...data,
      mode,
      lastPerformed,
    }),
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: WorkoutSchemaType) => {
      const parsedData = WorkoutSchema.parse(data)
      const { error } = await supabase.rpc('upsert_workout', {
        payload: parsedData,
      })
      if (error) throw error
    },
    onSuccess: () => {
      router.back()
      queryClient.invalidateQueries({
        queryKey: workoutTemplateQueries.list(profile?.profile_id!).queryKey,
      })
    },
    onError: (error) => {
      console.error('Error updating workout', error)
    },
  })

  const methods = useForm<WorkoutSchemaType>({
    defaultValues: {
      title: '',
      mode,
      exercises: [],
    },
    values: WorkoutSchema.safeParse(data).success
      ? WorkoutSchema.safeParse(data).data
      : {
          title: '',
          mode,
          exercises: [],
        },
    resolver: zodResolver(WorkoutSchema),
  })

  const submitWorkout = async (data: WorkoutSchemaType) => {
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
  }

  return (
    <WorkoutModeProvider value={mode}>
      <Stack.Screen
        options={{
          ...(mode === 'perform' && { title: data?.title }),
          headerRight: () => (
            <Button
              disabled={!methods.getValues('exercises').length}
              onPress={methods.handleSubmit(submitWorkout, (data) =>
                console.error(
                  'Workout submit error',
                  JSON.stringify(data, null, 2),
                ),
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
          style={styles.container}
          contentContainerStyle={contentStyles.container}
          contentInset={{ bottom: 48 }}
          automaticallyAdjustKeyboardInsets
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
