import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { theme } from '@/constants/theme'
import { ExerciseList } from '@/features/ExerciseList'

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
      <Input placeholder="Workout Title" size="title" />
      <Input
        placeholder="Notes"
        style={[theme.text.notes, styles.notes]}
        multiline
      />
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
