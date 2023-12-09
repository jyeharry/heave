import { FC } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Button } from '@/components/Button'
import { theme } from '@/constants/theme'
import Text from '@/components/Text'

const Add: FC = () => {
  return (
    <View style={styles.container}>
      <WorkoutTitle />
      <ExerciseList />
      <Button style={{ marginTop: 16 }} colour="danger">
        Cancel Workout
      </Button>
    </View>
  )
}

const WorkoutTitle = () => {
  return (
    <View>
      <TextInput
        placeholder="Workout Title"
        placeholderTextColor={theme.placeholderColour}
      />
      <TextInput
        placeholder="Notes"
        placeholderTextColor={theme.placeholderColour}
        style={styles.notes}
        multiline
      />
    </View>
  )
}

const ExerciseList = () => {
  return (
    <View>
      <Text>Exercise List</Text>
      <Button>Add Exercise</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  notes: {
    marginTop: 8,
  },
})

export default Add
