import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Exercise } from './components/Exercise'
import { mockWorkoutData } from './mock'
import { SetTypeName, WorkoutSchema, WorkoutSchemaType } from './types'
import { Button } from '@/components/Button'
import { ControlledInput } from '@/components/ControlledInput'
import { theme } from '@/constants/theme'

interface WorkoutProps {
  mode: 'create' | 'edit'
}

export const Workout: FC<WorkoutProps> = ({ mode }) => {
  const { data } = useQuery<WorkoutSchemaType>({
    queryKey: ['workouts-'],
    queryFn: () =>
      new Promise((res) => setTimeout(() => res(mockWorkoutData), 1500)),
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

  return (
    <FormProvider {...methods}>
      <ScrollView
        contentInset={{ bottom: 48 }}
        style={styles.container}
        contentContainerStyle={contentStyles.container}
      >
        <View>
          <ControlledInput
            placeholder="Workout Title"
            name="title"
            control={methods.control}
            size="title"
            showValue={mode === 'edit'}
          />
          <ControlledInput
            placeholder="Notes"
            name="notes"
            control={methods.control}
            style={[theme.text.notes, styles.notes]}
            multiline
            showValue={mode === 'edit'}
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
              append(
                {
                  name: 'Bench Press',
                  sets: [{ setType: { name: SetTypeName.Standard } }],
                },
                { shouldFocus: false },
              )
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
