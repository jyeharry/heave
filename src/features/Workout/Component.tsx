import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Exercise } from './components/Exercise'
import { SetTypeName, WorkoutSchema, WorkoutSchemaType } from './types'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { theme } from '@/constants/theme'

export const Workout = () => {
  const methods = useForm<WorkoutSchemaType>({
    defaultValues: {
      title: '',
      notes: '',
      exercises: [],
    },
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
          <Input
            placeholder="Workout Title"
            size="title"
            {...methods.register('title')}
          />
          <Input
            placeholder="Notes"
            style={[theme.text.notes, styles.notes]}
            multiline
            {...methods.register('notes')}
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
