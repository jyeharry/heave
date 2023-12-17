import { FC } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { theme } from '@/constants/theme'
import { ExerciseList } from '@/features/ExerciseList'

const Add: FC = () => {
  return (
    <ScrollView
      contentInset={{ bottom: 48 }}
      style={styles.container}
      contentContainerStyle={contentStyles.container}
    >
      <WorkoutTitle />
      <ExerciseList />
      <Button colour="danger">Cancel Workout</Button>
    </ScrollView>
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

export default Add
